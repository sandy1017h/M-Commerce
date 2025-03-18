// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
// import { LoginReq, LoginResData, RegisterUserData } from '../Models/Auth';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { ResponseDto } from '../Models/response';
// import { UserDto } from '../Models/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isUserLoggedIn:BehaviorSubject<boolean>= new BehaviorSubject(false);
//   private userDetail=new BehaviorSubject<UserDto|null|undefined>(undefined);
//   private baseUrl = 'https://localhost:7174/api/auth';

//   constructor(private http:HttpClient,private jwtHelper:JwtHelperService) { }

//   UserLoggedIn(){
//     return this.isUserLoggedIn.value && !this.jwtHelper.isTokenExpired(this.getAccessToken());
//   }

//   getLoggedInUserDetail(){
//     return this.userDetail.value;
//   }

//   // Simulating getting the logged-in user (Replace this with real logic)
//   getLoggedInUser(): any {
//     const user = localStorage.getItem('currentUser'); // Assume user is stored in localStorage
//     return user ? JSON.parse(user) : null;
//   }

//   // Store user after login
//   setLoggedInUser(user: any): void {
//     localStorage.setItem('currentUser', JSON.stringify(user));
//   }

//   getUserById(id: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/get-user/${id}`);
//   }

//   Login(crediential:LoginReq){
//       return this.http.post<ResponseDto<LoginResData>>('auth/login',crediential).pipe(
//         map((res)=>{
//             if(res.isSuccessed==true){
//               res.data?.accessToken!==undefined && localStorage.setItem('accestoken',res.data?.accessToken);
//               res.data?.refreshToken!==undefined && localStorage.setItem('refreshtoken',res.data?.refreshToken);
//               this.userDetail.next(res.data?.userData)
//               this.isUserLoggedIn.next(true);
//             }
//             return res;
//         })
//       )
//   }

//   RegisterUser(userData:RegisterUserData){
//     return this.http.post<ResponseDto<null>>('auth/register',userData);
//   }

//   LogOut(){
//     return this.http.get<ResponseDto<null>>('auth/revoke').pipe(
//       map((res)=>{
//         if(res.isSuccessed){
//           localStorage.setItem('accestoken','');
//           localStorage.setItem('refreshtoken','');
//           this.userDetail.next(undefined)
//           this.isUserLoggedIn.next(false);
          
//         }
//         return res;
//       })
//     );

//   }

//   refreshUser() {
//     var accessToken = localStorage.getItem('accestoken');
//     var refreshToken = localStorage.getItem('refreshtoken');

//     return this.http.post<ResponseDto<LoginResData>>('auth/refresh', {
//       accessToken,
//       refreshToken
//     }).pipe(
//       map((res) => {
//         if (res.isSuccessed == true) {
//           res.data?.accessToken!==undefined && localStorage.setItem('accestoken',res.data?.accessToken);
//           res.data?.refreshToken!==undefined && localStorage.setItem('refreshtoken',res.data?.refreshToken);
//           this.isUserLoggedIn.next(true);
//         }
//         else{
//           localStorage.setItem('accestoken','');
//           localStorage.setItem('refreshtoken','');
//           this.isUserLoggedIn.next(false);
//         }
//         return true;
//       }),
//       catchError(()=>{
//         localStorage.setItem('accestoken','');
//         localStorage.setItem('refreshtoken','');
//         this.isUserLoggedIn.next(false);
//         this.userDetail.next(undefined)
//         return of(false);
//       })
//     )

//   }

//   getAccessToken(){
//     return localStorage.getItem('accestoken')
//   }

//   getRefreshToken(){
//     return localStorage.getItem('refreshtoken')
//   }


// }




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { LoginReq, LoginResData, RegisterUserData } from '../Models/Auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseDto } from '../Models/response';
import { UserDto } from '../Models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'https://localhost:7174/api/auth'; // Centralized baseUrl

  private loggedInSubject = new BehaviorSubject<boolean>(this.istheUserLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.checkInitialLoginState());
  logIn$ = this.isUserLoggedIn.asObservable();
  private userDetail = new BehaviorSubject<UserDto | null | undefined>(undefined);
  //router: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router:Router) {
    // Initialize user details on service load
    const currentUser = this.getLoggedInUser();
    if (currentUser) {
      this.userDetail.next(currentUser);
    }
  }

  private checkInitialLoginState(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  istheUserLoggedIn(): boolean {
    return !!localStorage.getItem('accestoken'); // Check if the token exists in localStorage
  }

  UserLoggedIn(): boolean {
    return this.isUserLoggedIn.value && !this.jwtHelper.isTokenExpired(this.getAccessToken()!);
  }

  getLoggedInUserDetail(): UserDto | null | undefined {
    return this.userDetail.value;
  }

  getLoggedInUser(): UserDto | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  setLoggedInUser(user: UserDto): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userDetail.next(user);
    this.loggedInSubject.next(true);
  }

  getUserById(UserId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/get-user/${UserId}`);
  }
  Login(credentials: LoginReq): Observable<ResponseDto<LoginResData>> {
    return this.http.post<ResponseDto<LoginResData>>(`${this.baseUrl}/login`, credentials).pipe(
      map((res) => {
        if (res.isSuccessed) {
          this.storeTokens(res.data?.accessToken, res.data?.refreshToken);
          this.setLoggedInUser(res.data?.userData as UserDto);
          this.isUserLoggedIn.next(true);
  
          const userRole = res.data?.userData?.role?.toUpperCase() || ''; // Convert to uppercase to avoid case issues
  
          console.log('User Role:', userRole); 
  
          if (userRole === 'ADMIN') {
            console.log('Navigating to /busaccdashboard'); 
            this.router.navigate(['/busaccdashboard']);
          } else if (userRole === 'USER') {
            console.log('Navigating to /home'); 
            this.router.navigate(['/home']);
          } 
          // else {
          //   console.warn('Unknown role detected:', userRole); 
          //   this.router.navigate(['/home']); // Default route
          // }
        }
        return res;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of({ isSuccessed: false, message: 'Login failed', data: null });
      })
    );
  }
  
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ADMIN';
  }
  isUser(): boolean {
    return localStorage.getItem('userRole') === 'USER';
  }

  RegisterUser(userData: RegisterUserData): Observable<ResponseDto<null>> {
    return this.http.post<ResponseDto<null>>(`${this.baseUrl}/register`, userData);
  }
  RegisterBusinessacc(businessaccountData: RegisterUserData): Observable<ResponseDto<null>> {
    return this.http.post<ResponseDto<null>>(`${this.baseUrl}/register-admin`, businessaccountData);
  }

  LogOut(): void {
    this.http.get<ResponseDto<null>>(`${this.baseUrl}/revoke`).subscribe({
      next: (res) => {
        if (res.isSuccessed) {
          this.clearSession();
          localStorage.removeItem('userRole');
    this.isUserLoggedIn.next(false);
    this.userDetail.next(null);
          console.log("Logout successful");
        } else {
          console.error("Logout failed:", res.message);
        }
      },
      error: (err) => {
        console.error("Logout API error:", err);
      }
    });
  }
  

  

  refreshUser(): Observable<boolean> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    return this.http.post<ResponseDto<LoginResData>>(`${this.baseUrl}/refresh`, {
      accessToken,
      refreshToken
    }).pipe(
      map((res) => {
        if (res.isSuccessed) {
          this.storeTokens(res.data?.accessToken, res.data?.refreshToken);
          this.isUserLoggedIn.next(true);
          return true;
        } else {
          this.clearSession();
          return false;
        }
      }),
      catchError(() => {
        this.clearSession();
        return of(false);
      })
    );
  }

  private storeTokens(accessToken?: string, refreshToken?: string): void {
    if (accessToken) {
      localStorage.setItem('accestoken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshtoken', refreshToken);
    }
  }

  // private clearSession(): void {
  //   localStorage.removeItem('accestoken');
  //   localStorage.removeItem('refreshtoken');
  //   localStorage.removeItem('currentUser');
  //   this.userDetail.next(undefined);
  //   this.isUserLoggedIn.next(false);
  // }
  clearSession() {
    localStorage.removeItem('accestoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('currentUser');
    this.loggedInSubject.next(false); 
    // this.router.navigate(['/login']); // Redirect to login after logout
  }
  

  getAccessToken(): string | null {
    return localStorage.getItem('accestoken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshtoken');
  }
}


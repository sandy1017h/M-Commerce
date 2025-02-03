import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { LoginReq, LoginResData, RegisterUserData } from '../Models/Auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseDto } from '../Models/response';
import { UserDto } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn:BehaviorSubject<boolean>= new BehaviorSubject(false);
  private userDetail=new BehaviorSubject<UserDto|null|undefined>(undefined);

  constructor(private http:HttpClient,private jwtHelper:JwtHelperService) { }

  UserLoggedIn(){
    return this.isUserLoggedIn.value && !this.jwtHelper.isTokenExpired(this.getAccessToken());
  }

  getLoggedInUserDetail(){
    return this.userDetail.value;
  }

  Login(crediential:LoginReq){
      return this.http.post<ResponseDto<LoginResData>>('auth/login',crediential).pipe(
        map((res)=>{
            if(res.isSuccessed==true){
              res.data?.accessToken!==undefined && localStorage.setItem('accestoken',res.data?.accessToken);
              res.data?.refreshToken!==undefined && localStorage.setItem('refreshtoken',res.data?.refreshToken);
              this.userDetail.next(res.data?.userData)
              this.isUserLoggedIn.next(true);
            }
            return res;
        })
      )
  }

  RegisterUser(userData:RegisterUserData){
    return this.http.post<ResponseDto<null>>('auth/register',userData);
  }

  LogOut(){
    return this.http.get<ResponseDto<null>>('auth/revoke').pipe(
      map((res)=>{
        if(res.isSuccessed){
          localStorage.setItem('accestoken','');
          localStorage.setItem('refreshtoken','');
          this.userDetail.next(undefined)
          this.isUserLoggedIn.next(false);
          
        }
        return res;
      })
    );

  }

  refreshUser() {
    var accessToken = localStorage.getItem('accestoken');
    var refreshToken = localStorage.getItem('refreshtoken');

    return this.http.post<ResponseDto<LoginResData>>('auth/refresh', {
      accessToken,
      refreshToken
    }).pipe(
      map((res) => {
        if (res.isSuccessed == true) {
          res.data?.accessToken!==undefined && localStorage.setItem('accestoken',res.data?.accessToken);
          res.data?.refreshToken!==undefined && localStorage.setItem('refreshtoken',res.data?.refreshToken);
          this.isUserLoggedIn.next(true);
        }
        else{
          localStorage.setItem('accestoken','');
          localStorage.setItem('refreshtoken','');
          this.isUserLoggedIn.next(false);
        }
        return true;
      }),
      catchError(()=>{
        localStorage.setItem('accestoken','');
        localStorage.setItem('refreshtoken','');
        this.isUserLoggedIn.next(false);
        this.userDetail.next(undefined)
        return of(false);
      })
    )

  }

  getAccessToken(){
    return localStorage.getItem('accestoken')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshtoken')
  }
}

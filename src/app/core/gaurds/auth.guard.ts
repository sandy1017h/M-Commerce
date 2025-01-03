import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  var authService=inject(AuthService);
  var isUserAuthenticated = inject(AuthService).UserLoggedIn();
  var router = inject(Router);
  
  if(isUserAuthenticated===true){
    return true;
  }
  else{
    return authService.refreshUser().pipe(
      tap((res)=>{
        if(res){
          return true;
        }
        else{
          router.navigateByUrl('/login');
          return false;
        }
      })
    )
  }

};

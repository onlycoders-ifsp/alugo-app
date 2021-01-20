import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

    jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private authService : AuthService,
    private router : Router
  ){  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

        let isAdmin = false;
        const roles = this.authService.getRolesUsuarioLogado();
        roles.forEach(element => {
        if(element == "ROLE_ADMIN"){
            console.log("vai retornar true no admin")
            isAdmin = true;
        }
        });
        if(!isAdmin){
            this.router.navigate(['/login']);
        }
        return isAdmin;
      }
  
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean;

  constructor(
    private router : Router
    ) { }

  login(){
    // this.loginError = false
    // if(this.username === "alugo" && this.password == "pi2020"){
    //   this.router.navigate(['/usuarios-lista']);
    // }else{
    //   this.loginError = true;
    // }
    this.router.navigate(['/usuarios/lista']);
  }

}

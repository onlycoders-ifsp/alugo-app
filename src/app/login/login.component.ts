import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iIdioma } from '../Interfaces/eIdioma';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  idiomas: iIdioma[] = [
    {id: 1, name: 'pt-br', bandeira: 'BR.png', displayNome: "Portuguese"},
    {id: 2, name: 'en-us', bandeira: 'US.png', displayNome: "English"},
    {id: 3, name: 'chi-zho', bandeira: 'CN.png', displayNome: "Chinese"},
  ];
  currentBandeira: string;

  username: string;
  password: string;
  currentIdioma: string;
  loginError: boolean;

  constructor(
    private router : Router,
    private translate: TranslateService
    ) { 
      translate.setDefaultLang('pt-br');
      this.currentBandeira = 'BR.png';
    }

  login(){
    // this.loginError = false
    // if(this.username === "alugo" && this.password == "pi2020"){
    //   this.router.navigate(['/usuarios-lista']);
    // }else{
    //   this.loginError = true;
    // }
    this.router.navigate(['/usuarios/lista']);
  }

  setNewIdioma(){
    this.translate.use(this.currentIdioma);
    this.idiomas.forEach(element => {
      if(element.name == this.currentIdioma){
        this.currentBandeira = element.bandeira;
      }
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iIdioma } from '../Interfaces/iIdioma';
import { idiomaService } from '../Services/idiomaService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // idiomas: iIdioma[] = [
  //   {id: 1, name: 'pt-br', bandeira: 'BR.png', displayNome: "Portuguese"},
  //   {id: 2, name: 'en-us', bandeira: 'US.png', displayNome: "English"},
  //   {id: 3, name: 'chi-zho', bandeira: 'CN.png', displayNome: "Chinese"},
  // ];
  currentBandeira: string;

  username: string;
  password: string;
  currentIdioma: string;
  loginError: boolean;
  idiomas: iIdioma[];
  

  constructor(
    private router : Router,
    private idiService: idiomaService,
    private translate: TranslateService
    ) { 
      this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()  }

  login(){
    // this.loginError = false
    // if(this.username === "alugo" && this.password == "pi2020"){
    //   this.router.navigate(['/usuarios-lista']);
    // }else{
    //   this.loginError = true;
    // }
    this.router.navigate(['/usuarios/lista']);
  }

  clickMudaIdioma(){
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  setNewIdioma(){
    
  }
}

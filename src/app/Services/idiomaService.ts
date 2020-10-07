import { Injectable } from '@angular/core';
import { iIdioma } from '../Interfaces/iIdioma';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class idiomaService {


  currentBandeira: string;
  constructor( private translate: TranslateService ) { }

  listaIdiomas: iIdioma[] = [
    {id: 1, name: 'pt-br', bandeira: 'BR.png', displayNome: "Portuguese"},
    {id: 2, name: 'en-us', bandeira: 'US.png', displayNome: "English"}
    // ,{id: 3, name: 'chi-zho', bandeira: 'CN.png', displayNome: "Chinese"},
  ];

  setNewIdioma(idiomaName: string){
    this.listaIdiomas.forEach(element => {
      if(element.name == idiomaName){
        this.currentBandeira = element.bandeira;
      }
    });
    this.translate.use(idiomaName);
    return this.currentBandeira;

  }

  getListIdiomas(){
    return this.listaIdiomas;
  }

  setDefaultLanguage(){
    this.translate.setDefaultLang('pt-br');
    return 'BR.png';
  }

  
}

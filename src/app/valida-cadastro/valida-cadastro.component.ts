import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { idiomaService } from 'src/app/Services/idiomaService';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { PortalService } from 'src/app/Services/PortalService';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';

@Component({
  selector: 'app-valida-cadastro',
  templateUrl: './valida-cadastro.component.html',
  styleUrls: ['./valida-cadastro.component.css']
})

export class ValidaCadastroComponent implements OnInit{

    idiomas: iIdioma[];
    currentBandeira: string;
    currentIdioma: string;
    cadastroSucesso: boolean;
    cadastroErro: boolean;

    constructor(
        private router: Router,
        private idiService: idiomaService,
        private activateRoute: ActivatedRoute,
        private portalService: PortalService
      ) {
        this.currentBandeira = idiService.setDefaultLanguage(),
        this.idiomas = idiService.getListIdiomas()
       }
       
    ngOnInit(): void {
      this.activateRoute.queryParams.subscribe(params => {
        let param = params['key'];
        //console.log(param);
        this.portalService.getAtivaUsuario(param).subscribe(response =>{
          if(response){
            console.log(response);
            this.cadastroSucesso = true;
            this.cadastroErro = false;
          }
          else{
            this.cadastroSucesso = false;
            this.cadastroErro = true;
          }
        },
        errorResponse => {
          console.log(errorResponse)
        });
      });
    }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { loadingService } from './loadingService';
import { Router } from '@angular/router';
import { errorRequestService } from './errorRequestService';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  urlsDeslogado : string[] = [
    '/oauth/token', 
    '/usuarios/cadastro', 
    'produtos/produto', 
    '/usuarios/usuario', 
    environment.mlCriaPreferencia];

    urlsMercadoPago : string[] = [
      environment.mlCriaPreferencia
    ];

  //colocar aqui os endpoints que não mostram a tela laranja de carregamento
  urlsSemLoading : string[] = [
    '/assets/i18n/pt-BR.json', 
    '/assets/i18n/en-US.json', 
    '/assets/i18n/es-ES.json', 
    '/assets/i18n/chi-zho.json',
    environment.getAtivaUsuario,
    environment.getVerificaCpf,
    environment.getVerificaEmail,
    environment.getVerificaUserName,
    environment.getVerificaCpfUpdate,
    environment.getVerificaEmailUpdate,
    environment.getVerificaUserNameUpdate,
    environment.getListaUsuarios,
    environment.deleteUsuario,
    environment.getLogsDeErros,
    environment.getProdutosNaoPublicados
  ];

  needBearer : boolean = true;
  needMpToken : boolean = false;
  loadUrlsSemtela : boolean = false;
  countLoader: number = 0;

  constructor(public loaderService: loadingService, public errorRequest: errorRequestService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const tokenString = localStorage.getItem('access_token');
    
    const urlRequest = request.url;

    this.errorRequest.hideError();

    this.countLoader++;

    //console.log(urlRequest)
    //não mostra o loading tradicionalpara estes requests
    for(let index in this.urlsSemLoading){
      if(urlRequest.endsWith(this.urlsSemLoading[index])){
        this.loadUrlsSemtela = true;
      } 
    }
    if(!this.loadUrlsSemtela){
      this.loaderService.show();
    }else{
      this.loadUrlsSemtela = false;
    }
    
    for(let index in this.urlsDeslogado){
      if(urlRequest.endsWith(this.urlsDeslogado[index])){
        this.needBearer = false;
      } 
    }

    if(!this.needBearer){
      for(let index in this.urlsMercadoPago){
        if(urlRequest.endsWith(this.urlsMercadoPago[index])){
          this.needMpToken = true;
        } 
      }
    }

    if( tokenString && this.needBearer){
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      request = request.clone({
        setHeaders : {
          Authorization :  'Bearer ' + jwt
        }
      })
    }
    this.needBearer = true;


    if(this.needMpToken){
      request = request.clone({
        setHeaders : {
          Authorization :  'Bearer ' + environment.mlToken
        }
      })
    }
    this.needMpToken = false;

    console.log(urlRequest + ' = ' + this.countLoader);

    return next.handle(request).pipe(
      tap(event => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
              this.countLoader--;
              console.log(urlRequest + ' = ' + this.countLoader);
              if (this.countLoader === 0) {
                  this.loaderService.hide();
              }
          }
          // else if(event instanceof HttpErrorResponse && event.status === 503){
          //    this.countLoader--;
          //    console.log(this.countLoader)
          //    console.log("deu erro")
          // //   this.loaderService.hide();
          //   this.errorRequest.showError();
          // }
      },(error: HttpErrorResponse) =>{
        this.countLoader--;
        if (this.countLoader === 0) {
          this.loaderService.hide();
      }
        if(error.status == 500 || error.status == 503){
          this.errorRequest.showError();
          this.loaderService.hide();
        }
      }));


      // next.handle(request).pipe(
      // finalize(() => this.loaderService.hide())
      // );
  }
}

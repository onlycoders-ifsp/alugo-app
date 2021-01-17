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

  urlsDeslogado : string[] = ['/oauth/token', '/usuarios/cadastro', 'produtos/produto', '/usuarios/usuario'];
  urlsSemLoading : string[] = [
    '/assets/i18n/pt-BR.json', 
    '/assets/i18n/en-US.json', 
    '/assets/i18n/es-ES.json', 
    '/assets/i18n/chi-zho.json',
    environment.getListaUsuarios,
    environment.deleteUsuario,
    environment.getLogsDeErros];

  needBearer : boolean = true;
  loadUrlsSemtela : boolean = false;
  countLoader: number = 0;

  constructor(public loaderService: loadingService, public errorRequest: errorRequestService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const tokenString = localStorage.getItem('access_token');
    
    const urlRequest = request.url;

    this.errorRequest.hideError();

    this.countLoader++;

    console.log(urlRequest)
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

    return next.handle(request).pipe(
      tap(event => {
          if (event instanceof HttpResponse && event.status === 200) {
              this.countLoader--;
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

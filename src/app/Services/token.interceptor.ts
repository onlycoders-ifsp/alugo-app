import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadingService } from './loadingService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  urlsDeslogado : string[] = ['/oauth/token', '/usuarios/cadastro', 'produtos/produto', '/usuarios/usuario'];
  needBearer : boolean = true;

  constructor(public loaderService: loadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const tokenString = localStorage.getItem('access_token');
    this.loaderService.show();

    const urlRequest = request.url;
    
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
      finalize(() => this.loaderService.hide())
      );
  }
}

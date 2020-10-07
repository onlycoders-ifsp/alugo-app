import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { eUserLogin } from '../entidades/eUserLogin';
import { eUsuario } from '../entidades/eUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiBaseUrl + "/login"
  apiUsuario: string = environment.apiBaseUrl + "/usuarios"
  tokenUrl: string = environment.apiBaseUrl + environment.obterToken;
  clientID: string = environment.clientId;
  clientSecret: string = environment.secret;


  constructor(
    private http: HttpClient
  ) { }

  tentarLogin(username: string, password: string) : Observable<any> {
    const params = new HttpParams()
                                .set('username', username)
                                .set('password', password)
                                .set('grant_type', 'password')

    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenUrl, params.toString(), { headers : headers })
  }
  salvar(usuario: eUserLogin) : Observable<any>{
    return this.http.post<any>(this.apiUrl, usuario);
  }

  cadastrarNovoUsuario(usuario: eUsuario) : Observable<eUsuario>{
    return this.http.post<eUsuario>(this.apiUsuario + "/cadastro",usuario );

  }
}

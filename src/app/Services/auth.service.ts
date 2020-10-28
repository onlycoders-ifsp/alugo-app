import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { eUserLogin } from '../entidades/eUserLogin';
import { eUsuario } from '../entidades/eUsuario';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { eObjetoUsuario } from '../entidades/eObjetoUsuario';
import { eUsuarioConstructor } from '../entidades/eUsuarioConstrutor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenUrl: string = environment.apiBaseUrl + environment.obterToken;
  clientID: string = environment.clientId;
  clientSecret: string = environment.secret;
  jwtHelper: JwtHelperService = new JwtHelperService();


  constructor(
    private http: HttpClient,
    private router: Router
  ) { 

  }

  obterToken(){
    const tokenString = localStorage.getItem('access_token');
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }else{
      return null;
    }
  }

  encerrarSessao(){
    localStorage.removeItem("access_token");
    this.router.navigate(['']);
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();

    if(token){
      const user = this.jwtHelper.decodeToken(token).user_name;
      return user;
    }else{
      return null;
    }
  }

  isAutenticado() : boolean{
    const token = this.obterToken();
    if(token){
      const expirado = this.jwtHelper.isTokenExpired(token);
      return !expirado;
    }
    return false;
  }

  encerraSessao(){
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }

  tentarLogin(username: string, password: string) : Observable<any> {
    const params = new HttpParams()
                                .set('username', username)
                                .set('password', password)
                                .set('grant_type', 'password')

    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
    return this.http.post<any>(this.tokenUrl, params.toString(), { headers  })
  }
  salvar(usuario: eUserLogin) : Observable<any>{
    return this.http.post<any>(environment.apiBaseUrl + environment.login, usuario);
  }

  cadastrarNovoUsuario(usuario: eUsuarioConstructor) : Observable<eUsuarioConstructor>{
    return this.http.post<eUsuarioConstructor>(environment.apiBaseUrl + environment.postCadUsuario,usuario );

  }

  updateUsuario(usuario: eUsuario) : Observable<eUsuario>{
    return this.http.put<eUsuario>(environment.apiBaseUrl + environment.putAlteraUsuario, usuario );

  }

  // getUserByLogin() : Observable<eUsuario>{
  //   let params = new HttpParams();
  //   params = params.append('login' , this.getUsuarioAutenticado());
  //   return this.http.get<eUsuario>(environment.getDadosUsuario, {params});
  // }

  getUserById(idUsuario: string) : Observable<eUsuario>{
    let params = new HttpParams();
    params = params.append('id_usuario' , idUsuario);
    return this.http.get<eUsuario>(environment.apiBaseUrl + environment.getDadosUsuario, {params});
  }

  getCurrentUserLogado() : Observable<eUsuario>{
    return this.http.get<eUsuario>(environment.apiBaseUrl + environment.getUserLogado);
  }

  uploadFotoUsuario(formData: FormData) : Observable<any>{
    return this.http.put(environment.apiBaseUrl + environment.putFotoUsuario, formData)

  }
}

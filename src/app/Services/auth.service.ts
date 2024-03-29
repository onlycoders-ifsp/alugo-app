import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { eUserLogin } from '../entidades/eUserLogin';
import { eUsuario } from '../entidades/eUsuario';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { eUsuarioConstructor } from '../entidades/eUsuarioConstrutor';
import { eSenha } from '../entidades/eSenha';
import { eAvaliacao } from '../entidades/eAvaliacao';

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
  removeToken(){
    localStorage.removeItem("access_token");
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

  getRolesUsuarioLogado(){
    const token = this.obterToken();

    if(token){
      const roleUser = this.jwtHelper.decodeToken(token).authorities;
      return roleUser;
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

  encerraSessaoTLogin(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
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

  cadastrarNovoUsuario(usuario: eUsuarioConstructor, url:string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('url' , url);
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadUsuario,usuario, {params});

  }

  updateUsuario(usuario: eUsuario) : Observable<eUsuario>{
    return this.http.put<eUsuario>(environment.apiBaseUrl + environment.putAlteraUsuario, usuario );

  }

  updateSenha(senha: eSenha) : Observable<boolean>{
    return this.http.put<boolean>(environment.apiBaseUrl + environment.putAlteraSenha, senha );

  }


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

  public getVerificaCpf(cpf:string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('cpf' , cpf);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.getVerificaCpf, {params} );
  }
  public getVerificaCpfUpdate(cpf:string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('cpf' , cpf);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.getVerificaCpfUpdate, {params} );
  }

  /*
  public getVerificaEmail(email:string) : Observable<any>{
    let params = new HttpParams();
    params = params.append('email' , email);
    console.log(email);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.getVerificaEmail, 
      {params}).pipe(
        map((exist)=>{
          return exist ? {emailExiste: true} : null
        })
        );
  }
*/
  public getVerificaEmail(email:string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('email' , email);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.getVerificaEmail,{params})
  }

  public getVerificaEmailUpdate(email:string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('email' , email);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.getVerificaEmailUpdate,{params})
  }

  public getVerificaUserName(user:string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('user' , user);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.getVerificaUserName, {params} );
  }

  public getVerificaUserNameUpdate(user:string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('user' , user);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.getVerificaUserNameUpdate, {params} );
  }


  getAvaliacoesLocador(idUsuario: string) : Observable<eAvaliacao[]>{
    let params = new HttpParams();
    params = params.append('id_usuario', idUsuario);
    return this.http.get<eAvaliacao[]>(environment.apiBaseUrl + environment.getAvaliacoesLocador, {params});
  }

  getAvaliacoesLocatario(idUsuario: string) : Observable<eAvaliacao[]>{
    let params = new HttpParams();
    params = params.append('id_usuario', idUsuario);
    return this.http.get<eAvaliacao[]>(environment.apiBaseUrl + environment.getAvaliacoesLocatario, {params});
  }
}

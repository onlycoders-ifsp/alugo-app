import { HttpClient } from '@angular/common/http';
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

  constructor(
    private http: HttpClient
  ) { }

  salvar(usuario: eUserLogin) : Observable<any>{
    return this.http.post<any>(this.apiUrl, usuario);
  }

  cadastrarNovoUsuario(usuario: eUsuario) : Observable<eUsuario>{
    return this.http.post<eUsuario>(this.apiUsuario + "/cadastro",usuario );

  }
}

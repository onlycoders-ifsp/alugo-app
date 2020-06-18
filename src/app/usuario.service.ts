import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario/Usuario'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

//url: string = environment.apiBaseUrl + '/api/usuarios';

  constructor( 
    private http: HttpClient 
    ) { }

    salvar(Usuario: Usuario) : Observable<Usuario> {
      return this.http.post<Usuario>(this.url, Usuario);
    }
}

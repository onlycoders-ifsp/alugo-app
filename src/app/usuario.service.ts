import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario/Usuario'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

url: string = environment.apiBaseUrl + '/usuarios';

  constructor( private http: HttpClient ) { }

    salvar(Usuario: Usuario) : Observable<Usuario> {
      return this.http.post<Usuario>(this.url, Usuario);
    }

    editaUsuario(Usuario: Usuario) : Observable<Usuario> {
      return this.http.put<Usuario>(this.url, Usuario);
    }

    delete(Usuario: Usuario) : Observable<Usuario> {
      return this.http.delete<Usuario>(this.url + `/${Usuario.id}`);
    }

    getUsuarios() : Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.url);
    }

    getUsuarioById(id: number) : Observable<Usuario> {
      return this.http.get<any>(this.url + `/${id}`);
    }
}

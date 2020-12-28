import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eUsuario } from '../entidades/eUsuario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor( private http: HttpClient ) { }

  nome: boolean = false;


  getUsuarios() : Observable<eUsuario[]> {
    return this.http.get<eUsuario[]>(environment.apiBaseUrl + environment.getListaUsuarios);

  }

  // salvar(Usuario: Usuario) : Observable<Usuario> {
  //   return this.http.post<Usuario>(this.url, Usuario);
  // }

  // editaUsuario(Usuario: Usuario) : Observable<Usuario> {
  //   return this.http.put<Usuario>(this.url, Usuario);
  // }

  // delete(Usuario: Usuario) : Observable<Usuario> {
  //   return this.http.delete<Usuario>(this.url + `/${Usuario.id}`);
  // }

  // getUsuarioById(id: number) : Observable<Usuario> {
  //   return this.http.get<any>(this.url + `/${id}`);
  // }
}

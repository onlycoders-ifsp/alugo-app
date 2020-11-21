import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eUsuario } from '../entidades/eUsuario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

url: string = environment.apiBaseUrl + '/usuarios';

  constructor( private http: HttpClient ) { }

  nome: boolean = false;


  getUsuarios() : Observable<eUsuario[]> {
    let params = new HttpParams();
    params = params.append('id_usuario' , "0");
    return this.http.get<eUsuario[]>(this.url, {params});

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

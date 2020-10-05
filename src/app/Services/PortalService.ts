import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario/Usuario';
import { eProduto } from '../entidades/eProduto';
import { eRequest } from '../entidades/eRequests';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PortalService {

request: eRequest;
url: string = environment.apiBaseUrl + '/produtos';

  constructor( private http: HttpClient ) { }


  getProdutos() : Observable<eProduto[]> {
      let request: object;
    request = {
        "id_usuario": "0",
        "produtos": {
            "id_produto": "0"
        }
    }
    let headers = new HttpHeaders();
    let params = new HttpParams().set("Body", encodeURIComponent(JSON.stringify(request)));

    return this.http.get<eProduto[]>(this.url, {headers,  params});
  }



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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eResponseProdutos } from '../entidades/eResponseProdutos';
import { eProduto } from '../entidades/eProduto';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

url: string = environment.apiBaseUrl + '/produtos/lista-todos';

  constructor( private http: HttpClient ) { }


  getProdutos() : Observable<eResponseProdutos[]> {
    let params = new HttpParams();
    params = params.append('id_usuario' , "0");
    params = params.append('id_produto', "0");
    return this.http.get<eResponseProdutos[]>(this.url, {params});
  }

  getProdutoById(idProduto: string, idUsuario: string) : Observable<eResponseProdutos> {
    let params = new HttpParams();
    params = params.append('id_usuario' , idUsuario);
    params = params.append('id_produto', idProduto);
    return this.http.get<eResponseProdutos>(this.url, {params});
  }
}

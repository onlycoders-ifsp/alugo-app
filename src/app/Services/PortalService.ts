import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eResponseProdutos } from '../entidades/eResponseProdutos';
import { eProduto } from '../entidades/eProduto';
import { eUsuario } from '../entidades/eUsuario';

@Injectable({
  providedIn: 'root'
})
export class PortalService {


  constructor( private http: HttpClient ) { }


  getProdutos() : Observable<eProduto[]> {
    // let params = new HttpParams();
    // params = params.append('id_usuario' , "0");
    // params = params.append('id_produto', "0");
    return this.http.get<eProduto[]>(environment.apiBaseUrl + environment.getListaProdutos);
  }

  getProdutoById(idProduto: string, idUsuario: string) : Observable<eProduto> {
    let params = new HttpParams();
    //params = params.append('id_usuario' , idUsuario);
    params = params.append('id_produto', idProduto);
    return this.http.get<eProduto>(environment.apiBaseUrl + environment.getOnly1Produto, {params});
  }

  
}

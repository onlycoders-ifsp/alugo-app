import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eProduto } from '../entidades/eProduto';

@Injectable({
  providedIn: 'root'
})
export class PortalService {


  constructor( private http: HttpClient ) { }


  getProdutos(page:number,size:number) : Observable<eProduto[]> {
    // let params = new HttpParams();
    // params = params.append('id_usuario' , "0");
    // params = params.append('id_produto', "0");
    let params = new HttpParams();
    params = params.append('page',String(page));
    params = params.append('size',String(size));
    return this.http.get<eProduto[]>(environment.apiBaseUrl + environment.getListaProdutos,{params});
  }

  getProdutosByCategoria(categoria:number, page:number,size:number) : Observable<eProduto[]> {
    let params = new HttpParams();
    params = params.append('categoria',String(categoria));
    params = params.append('page',String(page));
    params = params.append('size',String(size));
    return this.http.get<eProduto[]>(environment.apiBaseUrl + environment.getListaProdutos,{params});
  }

  getProdutoById(idProduto: string) : Observable<eProduto> {
    let params = new HttpParams();
    params = params.append('id_produto', idProduto);
    return this.http.get<eProduto>(environment.apiBaseUrl + environment.getOnly1Produto, {params});
  }

  getProdutosUsuarioLogado(page:number,size:number) : Observable<eProduto[]>{
    let params = new HttpParams();
    params = params.append('page',String(page));
    params = params.append('size',String(size));
    return this.http.get<eProduto[]>(environment.apiBaseUrl + environment.getOnlyUserProducts,{params});
  }

  
}

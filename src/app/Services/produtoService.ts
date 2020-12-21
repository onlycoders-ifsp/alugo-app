import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eProduto } from '../entidades/eProduto';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class produtoService {


  constructor( private http: HttpClient ) { }


  updateProduto(produto: eProduto) : Observable<boolean> {
    return this.http.put<boolean>(environment.apiBaseUrl + environment.putAlteraProduto, produto);
  }

  cadProduto(produto: eProduto) : Observable<eProduto> {
    return this.http.post<eProduto>(environment.apiBaseUrl + environment.postCadProduto, produto);
  }

  getProdutoById(idProduto: string) : Observable<eProduto> {
    let params = new HttpParams();
    params = params.append('id_produto', idProduto);
    return this.http.get<eProduto>(environment.apiBaseUrl + environment.getOnly1Produto, {params});
  }

  getProdutosUsuarioLogado() : Observable<eProduto[]>{
    return this.http.get<eProduto[]>(environment.apiBaseUrl + environment.getOnlyUserProducts);
  }

  getProdutosByPesquisa(txtPesquisa: string,page:number,size:number) : Observable<eProduto[]>{
    let params = new HttpParams();
    params = params.append('produto', txtPesquisa);
    params = params.append('page',String(page));
    params = params.append('size',String(size));
    return this.http.get<eProduto[]>(environment.apiBaseUrl + environment.getProdutosByPesquisa, {params});
  }

  uploadFotoCapa(formData: FormData) : Observable<any>{
    return this.http.put(environment.apiBaseUrl + environment.putFotoCapa, formData)

  }
  
}

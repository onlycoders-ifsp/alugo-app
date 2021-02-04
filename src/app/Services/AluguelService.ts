import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eProduto } from '../entidades/eProduto';
import { eAluguel } from '../entidades/eAluguel';
import { eAluguelDetalhe } from '../entidades/eAluguelDetalhe';
import { eCadAluguel } from '../entidades/eCadAluguel';
import { eEntregaDevolucao } from '../entidades/eEntregaDevolucao';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {


  constructor( private http: HttpClient ) { }
  
  getListAluguelLocador(page:number,size:number) : Observable<eAluguel[]> {
    let params = new HttpParams();
    params = params.append('page',String(page));
    params = params.append('size',String(size));
    return this.http.get<eAluguel[]>(environment.apiBaseUrl + environment.getListAluguelLocador,{params});
  }
  
  getListAluguelLocatario(page:number,size:number) : Observable<eAluguel[]> {
    let params = new HttpParams();
    params = params.append('page',String(page));
    params = params.append('size',String(size));
    return this.http.get<eAluguel[]>(environment.apiBaseUrl + environment.getListAluguelLocatario,{params});
  }
  
  getListAluguelProduto(idProduto: string) : Observable<eAluguelDetalhe[]> {
    let params = new HttpParams();
    params = params.append('id_produto',idProduto);
    return this.http.get<eAluguelDetalhe[]>(environment.apiBaseUrl + environment.getListAluguelProduto,{params});
  }
  
  getEntregaDevolucao(id_aluguel: string) : Observable<eEntregaDevolucao> {
    let params = new HttpParams();
    params = params.append('id_aluguel',id_aluguel);
    return this.http.get<eEntregaDevolucao>(environment.apiBaseUrl + environment.getEntregaDevolucao,{params});
  }

  cadNewAluguel(aluguel: eCadAluguel) : Observable<boolean>{
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadAluguel, aluguel);
  }

  cadNewEntregaDevolucao(EntregaDevolucao: eEntregaDevolucao) : Observable<boolean>{
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadEntregaDevolucao, EntregaDevolucao)
  }
  
  putEntregaDevolucao(EntregaDevolucao: eEntregaDevolucao) : Observable<eAluguelDetalhe[]> {
    return this.http.put<eAluguelDetalhe[]>(environment.apiBaseUrl + environment.getEntregaDevolucao,EntregaDevolucao);
  }

//   getListAluguelLocador() : Observable<eAluguel[]> {
//     let params = new HttpParams();
//     params = params.append('id_produto', idProduto);
//     return this.http.get<eProduto>(environment.apiBaseUrl + environment.getOnly1Produto, {params});
//   }
  
}

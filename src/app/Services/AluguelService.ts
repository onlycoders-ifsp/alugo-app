import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eProduto } from '../entidades/eProduto';
import { eAluguel } from '../entidades/eAluguel';
import { eAluguelDetalhe } from '../entidades/eAluguelDetalhe';
import { eCadAluguel } from '../entidades/eCadAluguel';
import { eEntregaDevolucao } from '../entidades/eEntregaDevolucao';
import { eConfirmaEntregaDevolucao } from '../entidades/eConfirmaEntregaDevolucao';
import { eAvaliacao } from '../entidades/eAvaliacao';
import { eAvaliacaoRetorno } from '../entidades/eAvaliacaoRetorno';
import { eChecklist } from '../entidades/eChecklist';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {


  constructor( private http: HttpClient ) { }
  
  getChecklistEntrega(page:number,size:number) : Observable<eAluguel[]> {
    let params = new HttpParams();
    params = params.append('page',String(page));
    params = params.append('size',String(size));
    return this.http.get<eAluguel[]>(environment.apiBaseUrl + environment.getListAluguelLocador,{params});
  }
  
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

  cadNewAluguel(aluguel: eCadAluguel) : Observable<string>{
    return this.http.post<string>(environment.apiBaseUrl + environment.postCadAluguel, aluguel);
  }

  cadNewEntregaDevolucao(EntregaDevolucao: eEntregaDevolucao) : Observable<boolean>{
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadEntregaDevolucao, EntregaDevolucao)
  }

  cadNewAvaliacaoLocador(Avaliacao: eAvaliacao) : Observable<boolean>{ //Salva avaliação do locador(Locatario para locador)
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadAvaliacaoLocador, Avaliacao)
  }

  cadNewAvaliacaoLocatario(Avaliacao: eAvaliacao) : Observable<boolean>{ //Salva avaliação do locador(Locador para locatario)
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadAvaliacaoLocatario, Avaliacao)
  }

  cadNewAvaliacaoProduto(Avaliacao: eAvaliacao) : Observable<boolean>{
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadAvaliacaoProduto, Avaliacao)
  }
  
  getListAvaliacoesProduto(idProduto: string) : Observable<eAvaliacaoRetorno[]> {
    let params = new HttpParams();
    params = params.append('id_produto',idProduto);
    console.log(environment.apiBaseUrl + environment.getAvaliacoesProduto,{params})
    return this.http.get<eAvaliacaoRetorno[]>(environment.apiBaseUrl + environment.getAvaliacoesProduto,{params});
  }
  
  putEntregaDevolucao(EntregaDevolucao: eEntregaDevolucao) : Observable<boolean> {
    return this.http.put<boolean>(environment.apiBaseUrl + environment.putEntregaDevolucao,EntregaDevolucao);
  }
  
  putConfirmacaoEntregaDevolucao(eConfirmaEntregaDevolucao: eConfirmaEntregaDevolucao) : Observable<boolean> {
    return this.http.put<boolean>(environment.apiBaseUrl + environment.putConfirmacaoEntregaDevolucao,eConfirmaEntregaDevolucao);
  }

//   getListAluguelLocador() : Observable<eAluguel[]> {
//     let params = new HttpParams();
//     params = params.append('id_produto', idProduto);
//     return this.http.get<eProduto>(environment.apiBaseUrl + environment.getOnly1Produto, {params});
//   }
  
}

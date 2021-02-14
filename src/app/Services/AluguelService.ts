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
import { eChecklistCad } from '../entidades/eChecklistCad';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {


  constructor( private http: HttpClient ) { }
  
  cadNewChecklistEntrega(checklist: eChecklistCad, foto:string) : Observable<any>{
    let params = new HttpParams();
    params = params.append('foto',foto);
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadChecklistEntrega, checklist, {params})
  }
  
  cadNewChecklistDevolucao(checklist: eChecklistCad, formdata:FormData) : Observable<boolean>{
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadChecklistDevolucao, checklist)
  }
  
  putChecklistEntrega(id_aluguel: string, motivoRecusa: string, OK:string) : Observable<boolean> {
    let params = new HttpParams();
    params = params.append('id_aluguel',id_aluguel);
    params = params.append('motivoRecusa',motivoRecusa);
    params = params.append('ok',OK);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.putConfirmChecklistEntrega,{params});
  }
  
  putChecklistDevolucao(id_aluguel: string, motivoRecusa: string, OK:string) : Observable<boolean> {
    let params = new HttpParams();
    params = params.append('id_aluguel',id_aluguel);
    params = params.append('motivoRecusa',motivoRecusa);
    params = params.append('ok',OK);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.putConfirmChecklistDevolucao,{params});
  }
  
  getChecklistEntrega(id_aluguel: string) : Observable<eChecklist> {
    let params = new HttpParams();
    params = params.append('idAluguel',id_aluguel);
    return this.http.get<eChecklist>(environment.apiBaseUrl + environment.getChecklistEntrega,{params});
  }
  
  getChecklistDevolucao(id_aluguel: string) : Observable<eChecklist> {
    let params = new HttpParams();
    params = params.append('idAluguel',id_aluguel);
    return this.http.get<eChecklist>(environment.apiBaseUrl + environment.getChecklistDevolucao,{params});
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

  updateAluguelUrl(id_aluguel: string, url: string) : Observable<boolean>{
    let params = new HttpParams();
    params = params.append('id_aluguel', id_aluguel);
    params = params.append('url_pagamento', url);
    console.log(params);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.putUrlAluguel,{params});
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
  
  putConfirmacaoEntregaDevolucao(id_aluguel: string, motivoRecusa: string, OK:string) : Observable<boolean> {
    let params = new HttpParams();
    params = params.append('id_aluguel',id_aluguel);
    params = params.append('motivo',motivoRecusa);
    params = params.append('ok',OK);
    return this.http.get<boolean>(environment.apiBaseUrl + environment.putConfirmacaoEntregaDevolucao,{params});
  }

//   getListAluguelLocador() : Observable<eAluguel[]> {
//     let params = new HttpParams();
//     params = params.append('id_produto', idProduto);
//     return this.http.get<eProduto>(environment.apiBaseUrl + environment.getOnly1Produto, {params});
//   }
  
}

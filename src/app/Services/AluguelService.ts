import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { eProduto } from '../entidades/eProduto';
import { eAluguel } from '../entidades/eAluguel';
import { eCadAluguel } from '../entidades/eCadAluguel';

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

  cadNewAluguel(aluguel: eCadAluguel) : Observable<boolean>{
    return this.http.post<boolean>(environment.apiBaseUrl + environment.postCadAluguel, aluguel);
  }

//   getListAluguelLocador() : Observable<eAluguel[]> {
//     let params = new HttpParams();
//     params = params.append('id_produto', idProduto);
//     return this.http.get<eProduto>(environment.apiBaseUrl + environment.getOnly1Produto, {params});
//   }
  
}

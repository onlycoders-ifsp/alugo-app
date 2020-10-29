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




  getListAluguelLocador() : Observable<eAluguel[]> {
    return this.http.get<eAluguel[]>(environment.apiBaseUrl + environment.getListAluguelLocador);
  }
  
  getListAluguelLocatario() : Observable<eAluguel[]> {
    return this.http.get<eAluguel[]>(environment.apiBaseUrl + environment.getListAluguelLocatario);
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

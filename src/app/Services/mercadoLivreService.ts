import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { ePreferenciaML } from '../entidades/ePreferenciaML';

@Injectable({
  providedIn: 'root'
})
export class mercadoLivreService {


  constructor(private http: HttpClient ) { }

  

  cadPreferencia(preferencia: ePreferenciaML) : Observable<any> {
    return this.http.post<any>(environment.mlBaseUrl + environment.mlCriaPreferencia, preferencia);
  }



}

import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {eCep} from "../entidades/eCep";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient, private request: XMLHttpRequest) {

  }

  // getCep(cep: string): Observable<eCep> {
  //   const url: string = `${environment.cepUrl}/${cep}/json`
  //   return this.xml.get<eCep>(url);
  // }


  getCep(cep: string): Observable<eCep> {
    return new Observable((x)=>{
    var request = new XMLHttpRequest();
    request.open('get', `${environment.cepUrl}/${cep}/json`, true);
    request.send();
    request.onload = function () {
    var data = JSON.parse(this.response);
    x.next(data)
    }
    })
    }

}

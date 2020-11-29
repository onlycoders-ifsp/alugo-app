import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {eCep} from "../entidades/eCep";


export class CepService {
  constructor(private cep: String, private http: HttpClient) {

  }

  getCep(): Observable<eCep[]> {
    const url: string = `${environment.cepUrl}/${this.cep}/json/`
    return this.http.get<eCep[]>(url);
  }

}

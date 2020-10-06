import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isCarregando = new Subject<boolean>();

  show(){
    this.isCarregando.next(true);
  }

  hide(){
    this.isCarregando.next(false);
  }

  constructor() { }
}

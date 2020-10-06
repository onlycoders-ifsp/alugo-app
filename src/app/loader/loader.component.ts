import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  template: '<ngx-loading [show]="carregando | async"></ngx-loading>',
})
export class LoaderComponent {

  public carregando: Subject<boolean> = this.loaderService.isCarregando;


  constructor(private loaderService: LoaderService) { }

}

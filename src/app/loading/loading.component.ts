import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { loadingService } from '../Services/loadingService';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: loadingService){}

}

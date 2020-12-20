import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { errorRequestService } from '../Services/errorRequestService';

@Component({
  selector: 'app-error-request',
  templateUrl: './error-request.component.html',
  styleUrls: ['./error-request.component.css']
})
export class ErrorRequestComponent {

  isError: Subject<boolean> = this.loaderService.isError;
  constructor(private loaderService: errorRequestService){}


}

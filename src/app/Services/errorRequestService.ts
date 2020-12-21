import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class errorRequestService {


    
    isError = new Subject<boolean>();
    showError() {
        this.isError.next(true);
    }
    hideError() {
        this.isError.next(false);
    }
}
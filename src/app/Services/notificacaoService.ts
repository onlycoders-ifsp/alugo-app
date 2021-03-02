import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class NotificacaoService {
    isNotificacaoSuccess = new Subject<boolean>();
    isNotificacaoWarning = new Subject<boolean>();
    isNotificacaoDanger = new Subject<boolean>();
    isNotificacaoInfo = new Subject<boolean>();
    isNotificacaoDark = new Subject<boolean>();
    isNotificacaoPrimary = new Subject<boolean>();
    corpoSucject = new Subject<string>();

    

    showSuccess(texto: string) {
        this.isNotificacaoSuccess.next(true);
        this.corpoSucject.next(texto);
    }
    hideSuccess() {
        this.isNotificacaoSuccess.next(false);
        this.corpoSucject.next('');
    }

    showDanger(texto: string) {
        this.isNotificacaoDanger.next(true);
        this.corpoSucject.next(texto);
    }
    hideDanger() {
        this.isNotificacaoDanger.next(false);
        this.corpoSucject.next('');
    }

    showWarning(texto: string) {
        this.isNotificacaoWarning.next(true);
        this.corpoSucject.next(texto);
    }
    hideWarning() {
        this.isNotificacaoWarning.next(false);
        this.corpoSucject.next('');
    }

    showPrimary(texto: string) {
        this.isNotificacaoPrimary.next(true);
        this.corpoSucject.next(texto);
    }
    hidePrimary() {
        this.isNotificacaoPrimary.next(false);
        this.corpoSucject.next('');
    }

    showInfo(texto: string) {
        this.isNotificacaoInfo.next(true);
        this.corpoSucject.next(texto);
    }
    hideInfo() {
        this.isNotificacaoInfo.next(false);
        this.corpoSucject.next('');
    }

    showDark(texto: string) {
        this.isNotificacaoDark.next(true);
        this.corpoSucject.next(texto);
    }
    hideDark() {
        this.isNotificacaoDark.next(false);
        this.corpoSucject.next('');
    }

    hideAll(){
        this.isNotificacaoDanger.next(false);
        this.isNotificacaoDark.next(false);
        this.isNotificacaoInfo.next(false);
        this.isNotificacaoPrimary.next(false);
        this.isNotificacaoSuccess.next(false);
        this.isNotificacaoWarning.next(false);
        this.corpoSucject.next('');
    }
}
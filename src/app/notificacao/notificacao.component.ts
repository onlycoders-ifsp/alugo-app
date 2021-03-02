import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { idiomaService } from '../Services/idiomaService';
import { NotificacaoService } from '../Services/notificacaoService';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent {

  isNotificacaoDanger: Subject<boolean> = this.notificacaoService.isNotificacaoDanger;
  isNotificacaoDark: Subject<boolean> = this.notificacaoService.isNotificacaoDark;
  isNotificacaoInfo: Subject<boolean> = this.notificacaoService.isNotificacaoInfo;
  isNotificacaoPrimary: Subject<boolean> = this.notificacaoService.isNotificacaoPrimary;
  isNotificacaoSuccess: Subject<boolean> = this.notificacaoService.isNotificacaoSuccess;
  isNotificacaoWarning: Subject<boolean> = this.notificacaoService.isNotificacaoWarning;
  textoSubject: string;

  interval;
  timeLeft: number = 10;
  
  
  constructor(
    private notificacaoService: NotificacaoService,
    private idiService: idiomaService){
    this.notificacaoService.corpoSucject.subscribe((data) => {
      console.log("Subscriber got data >>>>> "+ data);
      this.textoSubject = data;
      //this.timer();
    });

    
  }

  timer(){
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.notificacaoService.hideAll();
      }
    },1000) 
  }
  removeNotificacao(){
      this.notificacaoService.hideSuccess();
  }


}

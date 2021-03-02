import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { eChecklist } from 'src/app/entidades/eChecklist';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';
import { AluguelService } from 'src/app/Services/AluguelService';

@Component({
  selector: 'app-cliente-checklist',
  templateUrl: './cliente-checklist.component.html',
  styleUrls: ['./cliente-checklist.component.css']
})
export class ClienteChecklistComponent implements OnInit {

  idiomas: iIdioma[];
  formularioChecklistEntrega: FormGroup;
  formularioChecklistDevolucao: FormGroup;
  currentBandeira: string;
  currentIdioma: string;
  idCurrentAluguel: string;
  currentChecklistEntrega: eChecklist;
  currentChecklistDevolucao: eChecklist;

  MotivoEntrega: string;
  MotivoDevolucao: string;

  tipo: string;

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private fb: FormBuilder,
    private auth: AuthService,
    private aluguelService: AluguelService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
    if (!this.auth.isAutenticado()){
      this.auth.encerraSessao();
    }

    
    this.createForm();
    this.idCurrentAluguel = localStorage.getItem("idAluguel");
    this.tipo = localStorage.getItem("tipo");
    this.loadCurrentChecklistEntrega();
  }

  createForm() {
    this.formularioChecklistEntrega = this.fb.group({
      descricao_curta: ['', [Validators.required]]
    })
    this.formularioChecklistDevolucao = this.fb.group({
      descricao_curta: ['', [Validators.required]]
    })
  }

  aceitaDevolucao(){
    this.aluguelService.putChecklistDevolucao(this.idCurrentAluguel,null,"true").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }  

  recusaDevolucao(){
    this.aluguelService.putChecklistDevolucao(this.idCurrentAluguel,this.MotivoDevolucao,"false").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    }); 
  }

  aceitaEntrega(){
    this.aluguelService.putChecklistEntrega(this.idCurrentAluguel,null,"true").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }  

  recusaEntrega(){
    this.aluguelService.putChecklistEntrega(this.idCurrentAluguel,this.MotivoEntrega,"false").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    });   
  }

  loadCurrentChecklistEntrega() {
    this.aluguelService.getChecklistEntrega(this.idCurrentAluguel).subscribe(resposta => {  
    if(resposta){
      this.currentChecklistEntrega = resposta; 

      console.log(this.currentChecklistEntrega.descricao)
      this.formularioChecklistEntrega.patchValue({
        descricao_curta: this.currentChecklistEntrega.descricao,
        capa_foto: this.currentChecklistEntrega.foto
      })
      this.MotivoEntrega = this.currentChecklistEntrega.motivo_Recusa
    }    

    this.loadCurrentChecklistDevolucao()
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }
  
  loadCurrentChecklistDevolucao() {
    this.aluguelService.getChecklistDevolucao(this.idCurrentAluguel).subscribe(resposta => {  
    if(resposta){
       this.currentChecklistDevolucao = resposta;

      this.formularioChecklistDevolucao.patchValue({
        descricao_curta: this.currentChecklistDevolucao.descricao,
        capa_foto: this.currentChecklistDevolucao.foto
      })
      this.MotivoDevolucao = this.currentChecklistDevolucao.motivo_Recusa
    }
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }
  

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma);
  }

}

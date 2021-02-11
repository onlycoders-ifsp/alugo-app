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

    //this.idCurrentAluguel = localStorage.getItem("idAluguel");
    this.idCurrentAluguel = "89f29f52-66ec-40a5-b681-691fe8775585"
    this.loadCurrentChecklistEntrega();
    this.createForm();
  }

  createForm() {
    this.formularioChecklistEntrega = this.fb.group({
      descricao_curta: ['', [Validators.required]],
      motivo_recusa: ['', [Validators.required]]
    })
    this.formularioChecklistDevolucao = this.fb.group({
      descricao_curta: ['', [Validators.required]],
      motivo_recusa: ['', [Validators.required]]
    })
  }

  aceitaDevolucao(){
    console.log(true)
    const formCadValues = this.formularioChecklistDevolucao.value
    console.log(formCadValues.motivo_recusa)
    console.log(this.idCurrentAluguel)
    this.aluguelService.putChecklistDevolucao(this.idCurrentAluguel,formCadValues.motivo_recusa,"true").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }  

  recusaDevolucao(){
    console.log(false)
    const formCadValues = this.formularioChecklistDevolucao.value
    console.log(formCadValues.motivo_recusa)
    console.log(this.idCurrentAluguel)   
    this.aluguelService.putChecklistDevolucao(this.idCurrentAluguel,formCadValues.motivo_recusa,"true").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    }); 
  }

  aceitaEntrega(){
    console.log(true)
    const formCadValues = this.formularioChecklistEntrega.value
    console.log(formCadValues.motivo_recusa)
    console.log(this.idCurrentAluguel)
    this.aluguelService.putChecklistEntrega(this.idCurrentAluguel,formCadValues.motivo_recusa,"true").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }  

  recusaEntrega(){
    console.log(false)
    const formCadValues = this.formularioChecklistEntrega.value
    console.log(formCadValues.motivo_recusa)
    console.log(this.idCurrentAluguel)   
    this.aluguelService.putChecklistEntrega(this.idCurrentAluguel,formCadValues.motivo_recusa,"true").subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      errorResponse => {
        console.log(errorResponse)
      }
    });   
  }

  loadCurrentChecklistEntrega() {
    console.log("ENTREGA")
    this.aluguelService.getChecklistEntrega(this.idCurrentAluguel).subscribe(resposta => {
      this.currentChecklistEntrega = resposta;
      console.log(resposta)

      this.loadCurrentChecklistDevolucao()

      console.log(this.currentChecklistEntrega.motivo_Recusa)

      this.formularioChecklistEntrega.patchValue({
        descricao_curta: this.currentChecklistEntrega.descricao,
        capa_foto: this.currentChecklistEntrega.foto,
        motivo_recusa: this.currentChecklistEntrega.motivo_Recusa
      })

      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.createForm();
  }
  
  loadCurrentChecklistDevolucao() {
    console.log("DEVOLUÇÃO")
    this.aluguelService.getChecklistDevolucao(this.idCurrentAluguel).subscribe(resposta => {
      this.currentChecklistDevolucao = resposta;

      this.formularioChecklistDevolucao.patchValue({
        descricao_curta: this.currentChecklistDevolucao.descricao,
        capa_foto: this.currentChecklistDevolucao.foto,
        motivo_recusa: this.currentChecklistDevolucao.motivo_Recusa
      })
      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.createForm();
  }
  

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma);
  }

}

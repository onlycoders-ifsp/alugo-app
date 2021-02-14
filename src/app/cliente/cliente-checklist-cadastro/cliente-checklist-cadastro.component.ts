import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { eChecklist } from 'src/app/entidades/eChecklist';
import { eChecklistCad } from 'src/app/entidades/eChecklistCad';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';
import { AluguelService } from 'src/app/Services/AluguelService';

@Component({
  selector: 'app-cliente-checklist-cadastro',
  templateUrl: './cliente-checklist-cadastro.component.html',
  styleUrls: ['./cliente-checklist-cadastro.component.css']
})
export class ClienteChecklistCadastroComponent implements OnInit {

  idiomas: iIdioma[];
  formularioChecklistEntrega: FormGroup;
  formularioChecklistDevolucao: FormGroup;
  currentBandeira: string;
  currentIdioma: string;
  idCurrentAluguel: string;
  currentChecklistEntrega: eChecklist = new eChecklist();
  currentChecklistDevolucao: eChecklist = new eChecklist();
  checkEntregaAlterado: eChecklistCad = new eChecklistCad();
  checkDevolucaoAlterado: eChecklistCad = new eChecklistCad();
  mensagemSucesso: string;
  mensagemErro: string;

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
    this.tipo = localStorage.getItem("tipo")
    this.loadCurrentChecklistEntrega();

  }

  createForm() {
    this.formularioChecklistEntrega = this.fb.group({
      descricao_curta: ['', [Validators.required]],
      motivo_recusa: ['']
    })
    this.formularioChecklistDevolucao = this.fb.group({
      descricao_curta: ['', [Validators.required]],
      motivo_recusa: ['']
    })
  }

  loadCurrentChecklistEntrega() {
    
    this.aluguelService.getChecklistEntrega(this.idCurrentAluguel).subscribe(resposta => {
      if(resposta){
      this.currentChecklistEntrega = resposta; 
      
        this.formularioChecklistEntrega.patchValue({
          descricao_curta: this.currentChecklistEntrega.descricao,
          capa_foto: this.currentChecklistEntrega.foto,
          motivo_recusa: this.currentChecklistEntrega.motivo_Recusa
        })
      }

      this.loadCurrentChecklistDevolucao()

      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.createForm();
  }
  
  loadCurrentChecklistDevolucao() {    

    this.aluguelService.getChecklistDevolucao(this.idCurrentAluguel).subscribe(resposta => {    
    if(resposta){
     this.currentChecklistDevolucao = resposta;
      
      this.formularioChecklistDevolucao.patchValue({
        descricao_curta: this.currentChecklistDevolucao.descricao,
        capa_foto: this.currentChecklistDevolucao.foto,
        motivo_recusa: this.currentChecklistDevolucao.motivo_Recusa
      })
    }

      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.createForm();
  }
  

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma);
  }

  novaFotoEntrega: string;
  fileAtualEntrega: string;
  setNovaFotoEntrega(event) {
    const files = event.target.files;
    this.fileAtualEntrega = event.target.files;

    if (files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (_event) => {
        this.novaFotoEntrega = reader.result.toString();
      }
    }
  }

  novaFotoDevolucao: string;
  fileAtualDevolucao: string;
  setNovaFotoDevolucao(event) {
    const files = event.target.files;
    this.fileAtualDevolucao = event.target.files;

    if (files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (_event) => {
        this.novaFotoDevolucao = reader.result.toString();
      }
    }
  }

  loadFormToCadOrUpdateEntrega() {    
    const formCadValues = this.formularioChecklistEntrega.value;
    this.checkEntregaAlterado.descricao = formCadValues.descricao_curta;
    this.checkEntregaAlterado.id_aluguel = this.idCurrentAluguel;

    this.cadCheckEntrega();     

  }

  cadCheckEntrega(){
    this.aluguelService.cadNewChecklistEntrega(this.checkEntregaAlterado).subscribe(response => {      
      console.log(response)

      this.upfotoEntrega()
    }, errorResponse => {
      
      console.log(errorResponse)
    })


  }

  upfotoEntrega(){
    const files = this.fileAtualEntrega;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      formData.append("id_aluguel", this.checkEntregaAlterado.id_aluguel);
      this.aluguelService.upFotoChecklistEntrega(formData).subscribe(response => {
        
        console.log(response)
        this.router.navigate(["cliente/perfil/alugueis-locador"])
      }, errorResponse => {
        
        console.log(errorResponse)
      })
    }else{
      this.router.navigate(["cliente/perfil/alugueis-locador"])
    }

  }

  inputaCheckEntrega() {

    if (this.formularioChecklistEntrega.valid) {
      this.loadFormToCadOrUpdateEntrega();
      
    } else {
      this.mensagemErro = "formInvalido"
      
    }
  }

  loadFormToCadOrUpdateDevolucao() {    
    const formCadValues = this.formularioChecklistDevolucao.value;
    this.checkDevolucaoAlterado.descricao = formCadValues.descricao_curta;
    this.checkDevolucaoAlterado.id_aluguel = this.idCurrentAluguel;
    
    this.cadCheckDevolucao();     

  }

  cadCheckDevolucao(){
    this.aluguelService.cadNewChecklistDevolucao(this.checkDevolucaoAlterado).subscribe(response => {      
      console.log(response)

      this.upfotoDevolucao()
    }, errorResponse => {
      
      console.log(errorResponse)
    })


  }

  upfotoDevolucao(){
    const files = this.fileAtualDevolucao;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      formData.append("id_aluguel", this.checkDevolucaoAlterado.id_aluguel);
      this.aluguelService.upFotoChecklistDevolucao(formData).subscribe(response => {
        
        console.log(response)
        this.router.navigate(["cliente/perfil/alugueis-locador"])
      }, errorResponse => {
        
        console.log(errorResponse)
      })
    }else{
      this.router.navigate(["cliente/perfil/alugueis-locador"])
    }

  }

  inputaCheckDevolucao() {

    if (this.formularioChecklistDevolucao.valid) {
      this.loadFormToCadOrUpdateDevolucao();
      
    } else {
      this.mensagemErro = "formInvalido"
      
    }
  }

}

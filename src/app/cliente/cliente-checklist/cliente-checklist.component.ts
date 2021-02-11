import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { eChecklist } from 'src/app/entidades/eChecklist';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';

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

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
    if (!this.auth.isAutenticado()){
      this.auth.encerraSessao();
    }

    this.createForm();
  }

  createForm() {
    this.formularioChecklistEntrega = this.fb.group({
      descricao_curta: ['', [Validators.required]]
    })
    this.formularioChecklistDevolucao = this.fb.group({
      descricao_curta: ['', [Validators.required]]
    })
  }

  

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma);
  }

}

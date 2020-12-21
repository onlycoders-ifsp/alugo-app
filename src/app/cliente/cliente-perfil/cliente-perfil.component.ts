import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { CepService } from 'src/app/Services/CepService';
import { eCep } from 'src/app/entidades/eCep';
import { Validacoes } from 'src/app/Classes/Validacoes';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})
export class ClientePerfilComponent implements OnInit {

  
idiomas: iIdioma[];
currentBandeira: string;
currentIdioma: string;
formularioCliente: FormGroup;
mensagemErro: string;
mensagemSucesso: string;
nomeUsuario: string;
cepPesquisado: eCep = new eCep();
currentUsuarioLogado: eUsuario = new eUsuario();
userAlterado: eUsuario = new eUsuario();
novaFoto: string;

  constructor(private idiService: idiomaService,
    private fb: FormBuilder,
    private auth: AuthService,
    public datepipe: DatePipe,
    private router: Router,
    private cepSearch: CepService
    ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
      
   }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    this.auth.getCurrentUserLogado().subscribe(resposta => {
      this.currentUsuarioLogado = resposta;
      let dataFormatada = this.datepipe.transform(this.currentUsuarioLogado.data_nascimento, 'MM-dd-yyyy');
      let date: Date = new Date(dataFormatada);
      this.formularioCliente.patchValue({
        nome: this.currentUsuarioLogado.nome,
        email: this.currentUsuarioLogado.email,
        cpf: this.currentUsuarioLogado.cpf,
        celular: this.currentUsuarioLogado.celular,
        cep: this.currentUsuarioLogado.cep,
        login: this.currentUsuarioLogado.login,
        dataNascimento: date,
        bairro: this.currentUsuarioLogado.bairro,
        endereco: this.currentUsuarioLogado.endereco,
        numero: this.currentUsuarioLogado.numero,
        complemento: this.currentUsuarioLogado.complemento
      })
      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.createForm();
  }

  createForm(){
    this.formularioCliente = this.fb.group({
      nome:['',[Validators.required]],
      cpf:['',[Validators.required,Validators.maxLength(11), Validators.minLength(11), Validacoes.ValidaCpf]],
      email:['',[Validators.required, Validators.email]],
      login: ['', [Validators.required]],
      celular:[''],
      dataNascimento:['',[]],
      bairro:['',[]],
      cep:[''],
      endereco:['',[]],
      numero:[''],
      complemento:[''],
    })
  }

  
  updateUsuario(){
    const formCadValues = this.formularioCliente.value;
    this.userAlterado.nome = formCadValues.nome;
    this.userAlterado.email = formCadValues.email;
    this.userAlterado.cpf = formCadValues.cpf;
    if(!formCadValues.celular){
      formCadValues.celular = "";
    }
    this.userAlterado.celular = formCadValues.celular;
    if(!formCadValues.cep){
      formCadValues.cep = "";
    }
    this.userAlterado.cep = formCadValues.cep;
    this.userAlterado.login = formCadValues.login;
    // if(!formCadValues.endereco){
    //   formCadValues.endereco = "";
    // }
    this.userAlterado.endereco = formCadValues.endereco;
    if(!formCadValues.numero){
      formCadValues.numero = "";
    }
    this.userAlterado.numero = formCadValues.numero;

    let date: Date = formCadValues.dataNascimento;
    let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    if(!latest_date){
      latest_date = "";
    }
    this.userAlterado.data_nascimento = latest_date;
    // if(!formCadValues.bairro){
    //   formCadValues.bairro = "";
    // }
    this.userAlterado.bairro = formCadValues.bairro;
    if(!formCadValues.complemento){
      formCadValues.complemento = "";
    }
    this.userAlterado.complemento = formCadValues.complemento;

    //precisa passar foto em branco pq não chamou o método de foto ainda
    this.userAlterado.capa_foto = "";

    if(this.formularioCliente.valid){
      this.auth.updateUsuario(this.userAlterado).subscribe(response =>{
        this.mensagemSucesso = "Sucesso"
        this.nomeUsuario = formCadValues.nome;
          this.mensagemErro = null;
          this.uploadFotoUser();
      }, errorResponse => {
        this.mensagemSucesso = null,
          this.mensagemErro = "Erro" + formCadValues.nome;
          this.nomeUsuario = formCadValues.nome;
      });
    }else{
      this.mensagemErro = "Invalido"
      this.mensagemSucesso = null;
    }

  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  
  fileAtual: string;
  setNovaFotoUser(event) {
    const files = event.target.files;
    this.fileAtual = event.target.files;

    if (files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (_event) => {
        this.novaFoto = reader.result.toString();
      }
    }
  }

  uploadFotoUser(){
    const files = this.fileAtual;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("capa_foto", foto);
      this.auth.uploadFotoUsuario(formData).subscribe(response => {
        this.novaFoto = null;
        this.fileAtual = null;
        this.ngOnInit()
      });
    }
  }


  preencheCep(){
    this.cepSearch.getCep(this.formularioCliente.value.cep).subscribe(response => {
      this.cepPesquisado = response;
      this.formularioCliente.patchValue({
        bairro: this.cepPesquisado.bairro,
        endereco: this.cepPesquisado.logradouro,
      })
      
    });
  }
}

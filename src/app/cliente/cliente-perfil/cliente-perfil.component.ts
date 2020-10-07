import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { eUsuarioConstructor } from 'src/app/entidades/eUsuarioConstrutor';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})
export class ClientePerfilComponent implements OnInit {

  
idiomas: iIdioma[];
currentBandeira: string;
currentIdioma: string;
private authService: AuthService;
formularioCliente: FormGroup;
mensagemErro: string;
mensagemSucesso: string;
currentUsuario: eUsuario;

  constructor(private idiService: idiomaService,
    private fb: FormBuilder,
    private auth: AuthService
    ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
      
   }

  ngOnInit(): void {
    this.currentUsuario = new eUsuario();
    this.auth.getUserByLogin().subscribe(resposta => {
      this.currentUsuario = resposta;
      console.log(this.currentUsuario);
      console.log(this.currentUsuario.nome);
      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.formularioCliente = this.fb.group({
      nome:[this.currentUsuario.nome,[Validators.required]],
      cpf:[this.currentUsuario.cpf,[Validators.required,Validators.maxLength(11)]],
      email:[this.currentUsuario.email,[Validators.required, Validators.email]],
      telefone:[this.currentUsuario.celular],
      cep:[this.currentUsuario.cep],
      endereco:[this.currentUsuario.endereco],
      numero:[this.currentUsuario.numero],
      complemento:[this.currentUsuario.complemento],
    })
  }

  updateUsuario(){
    const formCadValues = this.formularioCliente.value;
    const user : eUsuarioConstructor = new eUsuarioConstructor(
      formCadValues.nome, 
      formCadValues.email, 
      formCadValues.senha, 
      formCadValues.cpf, 
      formCadValues.celular,
      formCadValues.cep,
      formCadValues.logradouro,
      formCadValues.numero,
      formCadValues.data_nascimento)
    if(this.formularioCliente.valid){
      this.authService.updateUsuario(user).subscribe(response =>{
        this.mensagemSucesso = "Usuário " + formCadValues.nome + " atualizado com suce!",
          this.mensagemErro = null
      }, errorResponse => {
        this.mensagemSucesso = null,
          this.mensagemErro = "Erro ao realizar a atualização de " + formCadValues.nome;
      });
    }else{
      this.mensagemErro = "O formulário ainda não está valido"
    }
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }
}

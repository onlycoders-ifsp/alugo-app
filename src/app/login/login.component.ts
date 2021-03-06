import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iIdioma } from '../Interfaces/iIdioma';
import { idiomaService } from '../Services/idiomaService';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { eUsuarioConstructor } from '../entidades/eUsuarioConstrutor';
import { Validacoes } from 'src/app/Classes/Validacoes';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { loadingService } from 'src/app/Services/loadingService';
import { environment } from 'src/environments/environment';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioCadastro: FormGroup;
  formularioLogin: FormGroup;
  currentBandeira: string;
  location = Location;
  username: string;
  password: string;
  currentIdioma: string;
  loginError: boolean;
  idiomas: iIdioma[];

  mensagemErro: boolean;
  mensagemSucesso: boolean;
  mensagemErroCad: boolean;
  mensagemSenhaErrada: boolean;
  loginErro: boolean;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private idiService: idiomaService,
    private authService: AuthService,
    private loaderService: loadingService,
    private fb: FormBuilder
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit() {
    if (environment.production && location.protocol === 'http:'){
      window.location.href = location.href.replace('http', 'https');
    }
    this.formularioCadastro = this.fb.group({
      nome:['',[
        Validators.required
      ]],
      email:[null, [
        Validators.required,
        Validators.email],
        [this.VerificaEmail(this.authService)]
      ],
      senha:['',[
        Validators.required,
        Validators.minLength(8)
      ], ],
      confirmaSenha:['', [
        Validators.required,
        Validators.minLength(8)
      ], ],
      cpf:['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11), 
        Validacoes.ValidaCpf], 
        [this.VerificaCpf(this.authService)]
    ],
      celular:['', [
        Validators.required
      ], ]
    },{updateOn: 'blur'})

    this.formularioLogin = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }


  login() {
    if(this.formularioLogin.valid){
      const formLoginValues = this.formularioLogin.value;
      this.authService.tentarLogin(formLoginValues.username, formLoginValues.password)
                                                  .subscribe(response =>{
                                                    const access_token = JSON.stringify(response);
                                                    localStorage.setItem("access_token", access_token)
                                                    this.logaUsuarios();
                                                    this.loginErro = false;
                                                  }, errorResponse =>{
                                                    //this.loginErro = formLoginValues.username + ' Usuário e/ou senha inválidos'
                                                    this.loginErro = true;                                                    
                                                  })
    }
    
    
  }

  logaUsuarios(){
    const roles = this.authService.getRolesUsuarioLogado();
    console.log(roles);
    let isAdmin = false;
    roles.forEach(element => {
      
      if(element == "ROLE_ADMIN"){
        console.log("achou a role de admin");
        isAdmin = true;
      }
    });
    if(isAdmin){
      this.router.navigate(['/admin/lista']);
    }else{
      this.router.navigate(['/cliente/perfil/dados'])
    }
    
  }


  protocol:string= location.protocol;
  host:string = location.hostname;
  port:string = location.port;
  url:string;
  cadastrar() {    
    const formCadValues = this.formularioCadastro.value;
    const user : eUsuarioConstructor = new eUsuarioConstructor(formCadValues.nome, 
      formCadValues.email, 
      formCadValues.senha, 
      formCadValues.cpf, 
      formCadValues.celular,
      "",
      "",
      "",
      "")
    if (this.formularioCadastro.valid) {
      if (formCadValues.senha == formCadValues.confirmaSenha) {
        this.mensagemSenhaErrada = false;
        this.url = this.protocol + "//" + this.host;
        this.url += (this.port==null||this.port=="0")?"":":"+this.port;
        this.authService.cadastrarNovoUsuario(user,this.url).subscribe(response => {
          if(response){
            this.mensagemSucesso = true;
            this.mensagemErro = false;
            this.mensagemErroCad = false
          }else{
            this.mensagemSucesso = false;
            this.mensagemErroCad = true;
            this.mensagemErro = false;  
          }
        }, errorResponse => {
          this.mensagemSucesso = false;
          this.mensagemErroCad = true;
          this.mensagemErro = false;
        });
      } else {
        this.mensagemSenhaErrada = true;
      this.mensagemErro = false;
      this.mensagemSucesso = false;
      this.mensagemErroCad = false;
        
      }
    } else {
      this.mensagemErro = true;
        this.mensagemSucesso = false;
        this.mensagemErroCad = false;
    }
    this.loaderService.hide()
      
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  setNewIdioma() {

  }

  VerificaEmail(authService:AuthService) : AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return authService
              .getVerificaEmail(control.value)
              .map(response => {
                    return response ? {emailExiste: true} : null
                  })
    };
    // ? {emailExiste: true} : null));
    //catchError(error => null)
    
    //return of(null);
  }

  
  VerificaUser(authService:AuthService) : AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return authService
              .getVerificaUserName(control.value)
              .map(response =>{
                    return response ? {userExiste: true} : null
              });
      }
  }

  VerificaCpf(authService:AuthService) : AsyncValidatorFn  {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return authService
              .getVerificaCpf(control.value)
              .map(response =>{
                return response ? {cpfExiste: true} : null
              })
    }
  }
  openModal(id: string) {
    this.modalService.open(id);
}
  closeModal(id: string) {
      //this.modalService.close(id);
      document.getElementById(id).remove();
      //this.modalService.remove(id);
  }
}
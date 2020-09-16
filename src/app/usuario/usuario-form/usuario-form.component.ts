import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Usuario } from '../Usuario';
import { UsuarioService } from 'src/app/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  user: Usuario;
  codigo: string;
  success: boolean;
  error: boolean;

  constructor(
    private service : UsuarioService,
    private router: Router,
    private activatedRoute : ActivatedRoute
    ) { 
    this.user = new Usuario();
  }

  ngOnInit(): void {
    let dados = this.activatedRoute.params
    //@ts-ignore
    if(dados && dados.value && dados.value.codigo){
      console.log(dados);
      // @ts-ignore
      this.codigo = dados.value.codigo;
      this.service
      .getClienteById(this.codigo)
      .subscribe( 
        response => this.user = response,
        errorResponse => this.user = new Usuario());
    }
  }

  listaUsuarios(){
    this.router.navigate(['/usuarios/lista']);
  }

  logout(){
    this.router.navigate(['/']);
  }


  carregaValidacao(){
    alert("funcionando");
  }

  salvaUsuario(){
    this.success = false;
    this.error = false;

    this.user.ativo = true;
    this.user.login = this.user.email;


    if(this.user.id){
      this.service.editaUsuario(this.user).subscribe(response =>{
        this.success = true;
        this.error = false;
        this.user = response;
        }, errorResponse => {
          this.success = false;
          this.error = true;
        });

    }else{
      this.service.salvar(this.user).subscribe(response => {
        this.success = true;
        this.error = false;
        this.user = response;
        }, errorResponse => {
          this.success = false;
          this.error = true;
        });
        
    }
    this.router.navigate(['/usuarios/lista']);
    
  }

}

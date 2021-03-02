import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AdminService } from 'src/app/Services/AdminService';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  listaUsuarios: eUsuario[] = [];
  usuarioSelecionado: eUsuario;
  success: boolean;
  error: boolean;

  ativadoSucesso: Boolean = false;
  inativadoSucesso: Boolean = false;
  erroAtivaInativa: Boolean = false;
  nomeUsuarioAlterado: string;

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;

  constructor(
    private adminService: AdminService,
    private router : Router,
    private idiService: idiomaService,
    ) {
      this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
    }

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(resposta => {
      this.listaUsuarios = resposta['content'];
      console.log(this.listaUsuarios)},
      
      errorResponse => {
        console.log(errorResponse);
      });
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  novoUsuario(){
    this.router.navigate(['/usuarios/cad']);
  }

  logout(){
    this.router.navigate(['/']);
  }

  confirmDelete(user : eUsuario){
    this.usuarioSelecionado = user;
  }

  inativaAtivaUser(userId: string){
    let estadoAntigo;
    this.listaUsuarios.forEach(user => {
      if(user.id_usuario == userId){
        estadoAntigo = user.ativo;
        this.nomeUsuarioAlterado = user.nome;
      }
    });
    this.adminService.inativaOrAtivaUser(userId).subscribe(resposta => {
      if(estadoAntigo){
        this.inativadoSucesso = true;
        this.ativadoSucesso = false;
        this.erroAtivaInativa = false;
      }else{
        this.ativadoSucesso = true;
        this.inativadoSucesso = false;
        this.erroAtivaInativa = false;
      }
      this.ngOnInit();
    },errorResponse =>{
      console.log(errorResponse);
      this.ativadoSucesso = false;
      this.inativadoSucesso = false;
      this.erroAtivaInativa = true;
    });
  }

  // deleteUsuario(userDelete: eUsuario){
  //   this.success = false;
  //   this.error = false;
  //   this.adminService.delete(userDelete).subscribe(response => {
  //     this.success = true;
  //     this.error = false;
  //     this.ngOnInit();
  //     }, errorResponse => {
  //       this.success = false;
  //       this.error = true;
  //     });
  // }
}

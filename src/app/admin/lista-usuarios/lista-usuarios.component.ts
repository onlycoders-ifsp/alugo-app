import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { AdminService } from 'src/app/Services/AdminService';

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

  constructor(
    private adminService: AdminService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(resposta => {
      this.listaUsuarios = resposta;
      console.log(this.listaUsuarios)},
      errorResponse => {
        console.log(errorResponse)
      });
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

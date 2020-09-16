import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Usuario';
import { UsuarioService } from 'src/app/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  Usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario;
  success: boolean;
  error: boolean;

  constructor(
    private service: UsuarioService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.service.getUsuarios().subscribe(resposta => this.Usuarios = resposta);
  }

  novoUsuario(){
    this.router.navigate(['/usuarios/cad']);
  }

  logout(){
    this.router.navigate(['/']);
  }

  confirmDelete(user : Usuario){
    this.usuarioSelecionado = user;
  }

  deleteUsuario(userDelete: Usuario){
    this.success = false;
    this.error = false;
    this.service.delete(userDelete).subscribe(response => {
      this.success = true;
      this.error = false;
      this.ngOnInit();
      }, errorResponse => {
        this.success = false;
        this.error = true;
      });
  }

}

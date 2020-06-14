import { Component, OnInit } from '@angular/core';
import { Usuario } from './Usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor( 
    private service: UsuarioService
  ) { }

  ngOnInit(): void {
    const u : Usuario = new Usuario();
    u.nome = 'Teste Angular';
    u.email = 'email.doangular@angular.com';
    u.login = 'angular';
    u.senha = 'angular';

    this.service.salvar(u).subscribe(resposta => {
      console.log(resposta);
    })
  }

}

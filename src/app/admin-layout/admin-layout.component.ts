import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  listaUsuarios(){
    this.router.navigate(['/usuarios/lista']);
  }

  novoUsuario(){
    this.router.navigate(['/usuarios/cad']);
  }

}

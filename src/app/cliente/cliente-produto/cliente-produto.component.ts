import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-cliente-produto',
  templateUrl: './cliente-produto.component.html',
  styleUrls: ['./cliente-produto.component.css']
})
export class ClienteProdutoComponent implements OnInit {

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  
  constructor(
    private router: Router,
    private idiService: idiomaService,
  ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void {
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }
  
  verProdutoDeslogado(){
    this.router.navigate(['/detalhe-produto']);
  }

  verListaProdutos(){
    this.router.navigate(['/list-all']);
  }
  VerPerfil(){
    this.router.navigate(['/cliente/perfil']);
  }
  verMeuProduto(){
    this.router.navigate(['/cliente/produto']);
  }
  voltaHome(){
    this.router.navigate(['']);
  }

}

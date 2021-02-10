import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { eAvaliacaoRetorno } from 'src/app/entidades/eAvaliacaoRetorno';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { PortalService } from 'src/app/Services/PortalService';
import { AluguelService } from 'src/app/Services/AluguelService';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {
  id_produto: string;
  id_usuario: string;
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  produtoI: eProduto;

  quantidadeAvaliacao: number;
  mediaAvaliacao: number;

  AvaliacoesProduto: eAvaliacaoRetorno[] = [];
  
//getListAvaliacoesProduto
  responseProduto: eProduto;
  
  constructor(
    private portalService : PortalService,
    private aluguelService : AluguelService,
    private idiService: idiomaService,
    private router: Router
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas(),
    this.id_produto = sessionStorage.getItem('idProduto');
    //sessionStorage.removeItem('idProduto');

    this.portalService.getProdutoById(this.id_produto)
    .subscribe( 
      response => {
        this.responseProduto = response;
      },
      errorResponse => {
        console.log(errorResponse)
      });

    console.log(this.id_produto)
    this.aluguelService.getListAvaliacoesProduto(this.id_produto)
    .subscribe(
      response => {
        this.AvaliacoesProduto = response
        this.quantidadeAvaliacao = this.AvaliacoesProduto.length;
        this.mediaAvaliacao = this.AvaliacoesProduto.reduce((total, next) => total + +next.nota, 0)/this.quantidadeAvaliacao;
        this.mediaAvaliacao = +this.mediaAvaliacao.toFixed(2);
      },errorResponse =>{
        console.log(errorResponse)
      });

    
   }

  ngOnInit(): void {
    
    
  }
  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  aluga(idProduto: string){
    localStorage.setItem('idProdutoAluguel', idProduto);
    this.router.navigate(['/aluguel']);
  }

}

import { Component, OnInit } from '@angular/core';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-pagina-nao-existe',
  templateUrl: './pagina-nao-existe.component.html',
  styleUrls: ['./pagina-nao-existe.component.css']
})
export class PaginaNaoExisteComponent implements OnInit {
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;

  constructor(private idiService: idiomaService,) { }

  ngOnInit(): void {
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}

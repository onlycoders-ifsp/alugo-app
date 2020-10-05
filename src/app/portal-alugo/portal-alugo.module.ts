import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLayoutComponent } from './portal-layout/portal-layout.component';
import { HomeComponent } from './home/home.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';
import { PaginaNaoExisteComponent } from './pagina-nao-existe/pagina-nao-existe.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { PortalAlugoRoutingModule } from './portal-alugo-routing.module';



@NgModule({
  declarations: [
    PortalLayoutComponent,
    HomeComponent,
    TodosProdutosComponent,
    PaginaNaoExisteComponent,
    DetalheProdutoComponent,
  ],
  imports: [
    CommonModule,
    PortalAlugoRoutingModule
  ], exports: [
    HomeComponent,
    PortalLayoutComponent,
    TodosProdutosComponent,
    PaginaNaoExisteComponent,
    DetalheProdutoComponent
  ]
})
export class PortalAlugoModule { }

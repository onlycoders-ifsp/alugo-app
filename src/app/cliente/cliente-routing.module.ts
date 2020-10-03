import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLayoutComponent } from '../cliente-layout/cliente-layout.component';
import { PaginaNaoExisteComponent } from '../pagina-nao-existe/pagina-nao-existe.component';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
import { ClienteProdutoComponent } from './cliente-produto/cliente-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';


const routes: Routes = [
  {path: 'cliente', component: ClienteLayoutComponent, children: [
    { path: 'perfil', component: ClientePerfilComponent },
    { path: 'produto', component: ClienteProdutoComponent },
    { path: 'listaProdutos', component: ListaProdutosComponent }
  ]},
  { path: '**', component: PaginaNaoExisteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

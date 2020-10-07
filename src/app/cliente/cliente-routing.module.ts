import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { PaginaNaoExisteComponent } from '../portal-alugo/pagina-nao-existe/pagina-nao-existe.component';
import { PortalLayoutComponent } from '../portal-alugo/portal-layout/portal-layout.component';
import { ClienteCredenciaisComponent } from './cliente-credenciais/cliente-credenciais.component';
import { ClienteLayoutComponent } from './cliente-layout/cliente-layout.component';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
import { ClienteProdutoComponent } from './cliente-produto/cliente-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';


const routes: Routes = [
  {path: 'cliente', component: PortalLayoutComponent, canActivate: [AuthGuard] ,children: [
    { path: '', redirectTo: 'cliente/perfil/dados', pathMatch: 'full' },
    { path: 'perfil', component: ClienteLayoutComponent, children: [
      { path: '', redirectTo: 'cliente/perfil/dados', pathMatch: 'full' },
      { path: 'dados', component: ClientePerfilComponent },
      { path: 'credenciais', component: ClienteCredenciaisComponent },
      { path: 'produto', component: ClienteProdutoComponent },
      { path: 'meusprodutos', component: ListaProdutosComponent }
    ] }    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

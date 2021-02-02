import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { PaginaNaoExisteComponent } from '../portal-alugo/pagina-nao-existe/pagina-nao-existe.component';
import { PortalLayoutComponent } from '../portal-alugo/portal-layout/portal-layout.component';
import { AluguelLocadorComponent } from './aluguel-locador/aluguel-locador.component';
import { AluguelLocatarioComponent } from './aluguel-locatario/aluguel-locatario.component';
import { ClienteCredenciaisComponent } from './cliente-credenciais/cliente-credenciais.component';
import { ClienteLayoutComponent } from './cliente-layout/cliente-layout.component';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
import { ClienteProdutoComponent } from './cliente-produto/cliente-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ClienteProdutoAluguelComponent } from './cliente-produto-aluguel/cliente-produto-aluguel.component';
import { AluguelLocalDataEntregaComponent } from './aluguel-local-data-entrega/aluguel-local-data-entrega.component';

const routes: Routes = [
  {path: 'cliente', component: PortalLayoutComponent, canActivate: [AuthGuard] ,children: [
    { path: 'perfil', component: ClienteLayoutComponent, children: [
      { path: 'dados', component: ClientePerfilComponent },
      { path: 'credenciais', component: ClienteCredenciaisComponent },
      { path: 'produto', component: ClienteProdutoComponent },
      { path: 'meusprodutos', component: ListaProdutosComponent },
      { path: 'alugueis-locador', component: AluguelLocadorComponent },
      { path: 'alugueis-locatario', component: AluguelLocatarioComponent },
      { path: 'local-entrega', component: AluguelLocalDataEntregaComponent },
      { path: 'produto-aluguel', component: ClienteProdutoAluguelComponent }
    ] }  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

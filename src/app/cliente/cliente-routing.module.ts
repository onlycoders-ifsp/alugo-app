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
import { ClienteChecklistComponent } from './cliente-checklist/cliente-checklist.component';
import { ClienteChecklistCadastroComponent } from './cliente-checklist-cadastro/cliente-checklist-cadastro.component';
import { AluguelLocalDataEntregaComponent } from './aluguel-local-data-entrega/aluguel-local-data-entrega.component';
import { AluguelVisualizacaoLocalDataEntregaComponent } from './aluguel-visualizacao-local-data-entrega/aluguel-visualizacao-local-data-entrega.component';
import { AvaliacaoLocadorComponent } from './avaliacao-locador/avaliacao-locador.component';
import { AvaliacaoLocatarioComponent } from './avaliacao-locatario/avaliacao-locatario.component';
import { ClienteRendimentosComponent } from './cliente-rendimentos/cliente-rendimentos.component';
import { ClienteChatComponent } from './cliente-chat/cliente-chat.component';
import { ClienteReporteProblemaComponent } from './cliente-reporte-problema/cliente-reporte-problema.component';

const routes: Routes = [
  {path: 'cliente', component: PortalLayoutComponent, canActivate: [AuthGuard] ,children: [
    { path: 'perfil', component: ClienteLayoutComponent, children: [
      { path: 'dados', component: ClientePerfilComponent },
      { path: 'credenciais', component: ClienteCredenciaisComponent },
      { path: 'produto', component: ClienteProdutoComponent },
      { path: 'rendimentos', component: ClienteRendimentosComponent },
      { path: 'chat', component: ClienteChatComponent },
      { path: 'meusprodutos', component: ListaProdutosComponent },
      { path: 'reporte-problema', component: ClienteReporteProblemaComponent },
      { path: 'alugueis-locador', component: AluguelLocadorComponent },
      { path: 'avaliacao-locador', component: AvaliacaoLocadorComponent },
      { path: 'alugueis-locatario', component: AluguelLocatarioComponent },
      { path: 'avaliacao-locatario', component: AvaliacaoLocatarioComponent },
      { path: 'produto-aluguel', component: ClienteProdutoAluguelComponent },
      { path: 'checklist-entrega', component: ClienteChecklistComponent },
      { path: 'checklist-cadastro', component: ClienteChecklistCadastroComponent },
      { path: 'local-entrega', component: AluguelLocalDataEntregaComponent },
      { path: 'visualizacao-local-entrega', component: AluguelVisualizacaoLocalDataEntregaComponent },
      { path: 'produto-aluguel', component: ClienteProdutoAluguelComponent }
    ] }  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

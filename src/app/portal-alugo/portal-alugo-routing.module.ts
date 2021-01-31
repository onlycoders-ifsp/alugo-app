import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { HomeComponent } from './home/home.component';
import { PaginaNaoExisteComponent } from './pagina-nao-existe/pagina-nao-existe.component';
import { PortalLayoutComponent } from './portal-layout/portal-layout.component';
import { RealizaAluguelComponent } from './realiza-aluguel/realiza-aluguel.component';
import { RedirectComponent } from './redirect/redirect.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';
import { ValidaCadastroComponent } from './valida-cadastro/valida-cadastro.component';

const routes: Routes = [
    {
        path: '', component: PortalLayoutComponent, children: [
            { path: 'aluguel', component: RealizaAluguelComponent, canActivate: [AuthGuard] },
            { path: '', component: HomeComponent },
            { path: 'list-all', component: TodosProdutosComponent },
            { path: 'detalhe-produto', component: DetalheProdutoComponent },
            { path: 'redirect', component: RedirectComponent },
            { path: '404', component: PaginaNaoExisteComponent },
            { path : 'valida-cadastro',component:ValidaCadastroComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalAlugoRoutingModule { }

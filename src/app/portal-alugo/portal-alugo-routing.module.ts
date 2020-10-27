import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { HomeComponent } from './home/home.component';
import { PortalLayoutComponent } from './portal-layout/portal-layout.component';
import { RealizaAluguelComponent } from './realiza-aluguel/realiza-aluguel.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';


const routes: Routes = [
    {
        path: '', component: PortalLayoutComponent, children: [
            { path: 'aluguel', component: RealizaAluguelComponent, canActivate: [AuthGuard] },
            { path: '', component: HomeComponent },
            { path: 'list-all', component: TodosProdutosComponent },
            { path: 'detalhe-produto', component: DetalheProdutoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalAlugoRoutingModule { }

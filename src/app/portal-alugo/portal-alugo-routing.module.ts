import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { HomeComponent } from './home/home.component';
import { PaginaNaoExisteComponent } from './pagina-nao-existe/pagina-nao-existe.component';
import { PortalLayoutComponent } from './portal-layout/portal-layout.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';


const routes: Routes = [
    {
        path: '', component: PortalLayoutComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'list-all', component: TodosProdutosComponent },
            { path: 'detalhe-produto', component: DetalheProdutoComponent }
        ]
    },
    { path: '**', component: PaginaNaoExisteComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalAlugoRoutingModule { }

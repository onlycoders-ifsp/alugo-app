import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DetalheProdutoComponent } from './portal-alugo/detalhe-produto/detalhe-produto.component';
import { HomeComponent } from './portal-alugo/home/home.component';
import { PortalLayoutComponent } from './portal-alugo/portal-layout/portal-layout.component';
import { TodosProdutosComponent } from './portal-alugo/todos-produtos/todos-produtos.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

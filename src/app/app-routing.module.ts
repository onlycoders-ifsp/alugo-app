import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLayoutComponent } from './cliente-layout/cliente-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';


const routes: Routes = [
  { path: '', component: ClienteLayoutComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'list-all', component: TodosProdutosComponent}
  ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

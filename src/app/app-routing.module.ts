import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaNaoExisteComponent } from './portal-alugo/pagina-nao-existe/pagina-nao-existe.component';
import { ValidaCadastroComponent } from './valida-cadastro/valida-cadastro.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path : 'valida-cadastro',component: ValidaCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../admin/admin-layout/admin-layout.component';
import { AuthAdminGuard } from '../authAdmin.guard';
import { AdminGerenciaProdutosComponent } from './admin-gerencia-produtos/admin-gerencia-produtos.component';
import { AdminPainelComponent } from './admin-painel/admin-painel.component';
import { AdminPerfilComponent } from './admin-perfil/admin-perfil.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';


const routes: Routes = [
  {path: 'admin', component: AdminLayoutComponent, canActivate: [AuthAdminGuard], children: [
    { path: 'painel', component: AdminPainelComponent },
    { path: 'gerenciaprodutos', component: AdminGerenciaProdutosComponent },
    { path: 'lista', component: ListaUsuariosComponent },
    { path: 'perfil', component: AdminPerfilComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

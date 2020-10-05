import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../admin/admin-layout/admin-layout.component';
import { UsuarioFormComponent } from '../usuario/usuario-form/usuario-form.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';


const routes: Routes = [
  {path: 'admin', component: AdminLayoutComponent, children: [
    { path: 'lista', component: ListaUsuariosComponent },
    { path: 'cad', component: UsuarioFormComponent },
    { path: 'cad/:codigo', component: UsuarioFormComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

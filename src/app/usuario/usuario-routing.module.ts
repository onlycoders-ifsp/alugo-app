import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';


const routes: Routes = [
  {path: 'usuarios', component: AdminLayoutComponent, children: [
    { path: 'lista', component: UsuarioListaComponent },
    { path: 'cad', component: UsuarioFormComponent },
    { path: 'cad/:codigo', component: UsuarioFormComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

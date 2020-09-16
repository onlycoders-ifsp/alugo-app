import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';


const routes: Routes = [
  { path: 'usuarios-lista', component: UsuarioListaComponent },
  { path: 'usuarios-cad', component: UsuarioFormComponent },
  { path: 'usuarios-cad/:codigo', component: UsuarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

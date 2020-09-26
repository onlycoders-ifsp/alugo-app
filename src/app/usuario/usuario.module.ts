import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from '../app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { MatTableModule } from '@angular/material/table'
import { UsuarioRoutingModule } from './usuario-routing.module';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';


@NgModule({
  declarations: [
    UsuarioListaComponent,
    UsuarioFormComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    MatTableModule,
    MatStepperModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UsuarioRoutingModule
  ], exports: [
    CommonModule,
    UsuarioListaComponent,
    UsuarioFormComponent,
    AdminLayoutComponent
  ]
})
export class UsuarioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
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
import { MatTableModule } from '@angular/material/table'
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteProdutoComponent } from './cliente-produto/cliente-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ClienteCredenciaisComponent } from './cliente-credenciais/cliente-credenciais.component';
import { ClienteLayoutComponent } from './cliente-layout/cliente-layout.component';



@NgModule({
  declarations: [
    ClienteLayoutComponent,
    ClientePerfilComponent,
    ClienteProdutoComponent,
    ListaProdutosComponent,
    ClienteCredenciaisComponent
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
    ClienteRoutingModule
  ], exports: [
    ClienteLayoutComponent,
    CommonModule
  ]
})
export class ClienteModule { }

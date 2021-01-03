import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component'
import { AdminRoutingModule } from './admin-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminPerfilComponent } from './admin-perfil/admin-perfil.component';
import { AdminPainelComponent } from './admin-painel/admin-painel.component';
import { AdminGerenciaProdutosComponent } from './admin-gerencia-produtos/admin-gerencia-produtos.component';



@NgModule({
  declarations: [ListaUsuariosComponent,AdminLayoutComponent, AdminPerfilComponent, AdminPainelComponent, AdminGerenciaProdutosComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    MatTableModule,
    MatStepperModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminRoutingModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ], exports: [
    CommonModule,
    ListaUsuariosComponent,
    AdminPerfilComponent,
    AdminPainelComponent,
    AdminGerenciaProdutosComponent
  ]
})
export class AdminModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

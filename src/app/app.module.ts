import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { UsuarioComponent } from './usuario/usuario.component';


import { UsuarioService} from './usuario.service'
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    MatStepperModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule    
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

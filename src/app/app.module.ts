import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { ModalModule } from './_modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ClienteModule } from './cliente/cliente.module';
import { PortalAlugoModule } from './portal-alugo/portal-alugo.module';
import {MatNativeDateModule} from '@angular/material/core';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './Services/AdminService';
import { idiomaService } from './Services/idiomaService';
import { PortalService } from './Services/PortalService';
import { AuthService } from './Services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './Services/token.interceptor';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { loadingService } from './Services/loadingService';
import { CepService } from './Services/CepService';
import { ErrorRequestComponent } from './error-request/error-request.component';
import { errorRequestService } from './Services/errorRequestService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { NotificacaoService } from './Services/notificacaoService';
import { ValidaCadastroComponent } from './valida-cadastro/valida-cadastro.component';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    ErrorRequestComponent,
    NotificacaoComponent,
    ValidaCadastroComponent
  ],
  imports: [
    ModalModule,
    BrowserModule,
    MatDialogModule,
    FormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
    BrowserAnimationsModule,
    ClienteModule,
    PortalAlugoModule,
    AdminModule,
    RouterModule,
    MatSelectModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgbModule
  ],
  providers: [
    AdminService,
    idiomaService,
    DatePipe,
    PortalService,
    AuthService,
    loadingService,
    NotificacaoService,
    CepService,
    XMLHttpRequest,
    errorRequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
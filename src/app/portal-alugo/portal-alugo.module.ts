import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLayoutComponent } from './portal-layout/portal-layout.component';
import { HomeComponent } from './home/home.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';
import { PaginaNaoExisteComponent } from './pagina-nao-existe/pagina-nao-existe.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { PortalAlugoRoutingModule } from './portal-alugo-routing.module';
import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RealizaAluguelComponent } from './realiza-aluguel/realiza-aluguel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeek, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { RedirectComponent } from './redirect/redirect.component';
import { ValidaCadastroComponent } from '../portal-alugo/valida-cadastro/valida-cadastro.component';

@NgModule({
  declarations: [
    PortalLayoutComponent,
    HomeComponent,
    TodosProdutosComponent,
    PaginaNaoExisteComponent,
    DetalheProdutoComponent,
    RealizaAluguelComponent,
    RedirectComponent,
    ValidaCadastroComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    PortalAlugoRoutingModule,
    BrowserModule,
    MatSelectModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ScheduleModule, RecurrenceEditorModule
    
  ],
  providers: [DayService, WeekService, MonthService, MonthAgendaService],
  exports: [
    HomeComponent,
    PortalLayoutComponent,
    TodosProdutosComponent,
    PaginaNaoExisteComponent,
    DetalheProdutoComponent,
    RealizaAluguelComponent,
    ValidaCadastroComponent
  ]
})
export class PortalAlugoModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
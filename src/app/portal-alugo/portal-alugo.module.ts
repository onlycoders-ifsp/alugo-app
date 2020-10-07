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



@NgModule({
  declarations: [
    PortalLayoutComponent,
    HomeComponent,
    TodosProdutosComponent,
    PaginaNaoExisteComponent,
    DetalheProdutoComponent,
  ],
  imports: [
    CommonModule,
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
        })
    
  ], exports: [
    HomeComponent,
    PortalLayoutComponent,
    TodosProdutosComponent,
    PaginaNaoExisteComponent,
    DetalheProdutoComponent
  ]
})
export class PortalAlugoModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
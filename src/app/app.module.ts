import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { FornecedorComponent } from '../app/Fornecedores/fornecedor.component';
import { FornecedorService } from '../app/Fornecedores/fornecedor.service';

import { RegistoProducaoComponent } from '../app/Fornecedores/RegistoProducao/registoProducao.component';
import { RegistoProducaoService } from '../app/Fornecedores/RegistoProducao/registoProducao.service';

import { ComentarioComponent } from '../app/Fornecedores/Comentario/comentario.component';
import { ComentarioService } from '../app/Fornecedores/Comentario/comentario.service';

import { LoginComponent } from '../app/Login/login.component';
import { LoginService } from '../app/Login/login.service';

import { RegistoUtilizadorComponent } from '../app/RegistoUtilizador/registoUtilizador.component';
import { RegistoUtilizadorService } from '../app/RegistoUtilizador/registoUtilizador.service';

import { RegistoPendentesComponent } from '../app/RegistoPendetes/registoPendentes.component';
import { RegistoPendentesService } from '../app/RegistoPendetes/registoPendentes.service';

import { ValidarPasswordComponent } from '../app/ValidarPassword/validarPassword.component';
import { ValidarPasswordService } from '../app/ValidarPassword/validarPassword.service';

import { ListarUtilizadorComponent } from '../app/ListarUtilizador/listarUtilizador.component';
import { ListarUtilizadorService } from '../app/ListarUtilizador/listarUtilizador.service';

import { ResetPasswordComponent } from '../app/ResetPassword/resetPassword.component';
import { ResetPasswordService } from '../app/ResetPassword/resetPassword.service';

import { CatalogoComponent } from '../app/Catalogo/catalogo.component';
import { CatalogoService } from '../app/Catalogo/catalogo.service';

import { EntradasComponent } from './Entradas/entradas.component';
import { EntradasService } from './Entradas/entradas.service';

import {
  DxButtonModule,
  DxDateBoxModule,
  DxPopupModule,
  DxTabPanelModule,
  DxTextBoxModule,
  DxFormModule,
  DxTextAreaModule,
  DxSelectBoxModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxRadioGroupModule,
  DxScrollViewModule,
  DxTileViewModule,
  DxListModule,
  DxTemplateModule
} from 'devextreme-angular';

import { FormsModule } from '@angular/forms';
import { DxDataGridModule } from 'devextreme-angular';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SlideoutService } from './slideout/slideout.service';

import { GetFileService } from './Login/get.file.service';

import { HttpClientModule } from '@angular/common/http';

import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

// import { ReCaptchaModule } from 'angular2-recaptcha';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppService } from './app.service';
// For date parsing when using Intl localization, please read
// https://github.com/DevExpress/DevExtreme-Intl#restrictions

import './localization';
import { EntradaPecas } from './Entradas/entradas.reg';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'fornecedores', component: FornecedorComponent },
  { path: 'fornecedores/:validacao', component: FornecedorComponent },
  {
    path: 'registoProducao/:CodRecurso/:OF',
    component: RegistoProducaoComponent
  },
  { path: 'comentario/:id/:OF/:CODRecurso', component: ComentarioComponent },
  { path: 'comentario/:id/:OF', component: ComentarioComponent },
  { path: 'registoUtilizador', component: RegistoUtilizadorComponent },
  { path: 'registoPendentes', component: RegistoPendentesComponent },
  {
    path: 'portalweb/validarPassword/:ActiveCode',
    component: ValidarPasswordComponent
  },
  { path: 'listarUtilizador', component: ListarUtilizadorComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'entradas', component: EntradasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FornecedorComponent,
    RegistoProducaoComponent,
    ComentarioComponent,
    LoginComponent,
    RegistoUtilizadorComponent,
    ResetPasswordComponent,
    RegistoPendentesComponent,
    ValidarPasswordComponent,
    ListarUtilizadorComponent,
    CatalogoComponent,
    EntradasComponent
  ],
  imports: [
    BrowserModule,
    DxButtonModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxTabPanelModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxListModule,
    DxTemplateModule,
    DxValidationSummaryModule,
    FormsModule,
    DxRadioGroupModule,
    DxScrollViewModule,
    DxTileViewModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(routes),
    HttpModule,
    DxFormModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    NgbModule.forRoot(),
    PasswordStrengthBarModule,
    RecaptchaModule.forRoot()
  ],
  providers: [
    FornecedorService,
    RegistoProducaoService,
    ComentarioService,
    LoginService,
    SlideoutService,
    GetFileService,
    RegistoUtilizadorService,
    RegistoPendentesService,
    ValidarPasswordService,
    ListarUtilizadorService,
    ResetPasswordService,
    CatalogoService,
    AppService,
    EntradasService
  ],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule {}

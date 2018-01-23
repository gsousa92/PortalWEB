import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';

import { RegistoPendentesService } from './registoPendentes.service';
import {FornecedorService} from '../Fornecedores/fornecedor.service';

import { SlideoutService } from '../slideout/slideout.service';
import { resetFakeAsyncZone } from '@angular/core/testing';

import { DxSelectBoxComponent } from 'devextreme-angular';

import notify from 'devextreme/ui/notify';

@Component({
    //  selector:'menu',
    templateUrl: 'registoPendentes.component.html',
    styleUrls: ['./registoPendentes.component.css']
})

export class RegistoPendentesComponent {

    utilizador: any = {};
    @ViewChild("botaoMenu") element: ElementRef;
    datasourcePendentes: any = {};
    DsTerceiros: any = {};
    DsUserPROTextil: any = {};
    DsGrupos: any = {};
    DsCentros: any = {};
    DsEstado: any = [{ EstadoText: "Pendente", EstadoValue: 0 }, { EstadoText: "Ativo", EstadoValue: 1 }, { EstadoText: "Inativo", EstadoValue: 2 }];
    DsContacto: any = {};

    EstadoValue;
    GrupoID;

    clickTimer: any;
    lastRowCLickedId: any;

    selectRow: any;

    PrimeiroNomeText;
    UltimoNomeNomeText;
    UtilizadorText;
    emailText;
    NomeEmpresaText;
    obsText;
    Terc;
    EstadoText;

    Cod;
    Codigo;
    id;
    messagemErro: boolean;
    messagemUtilizador: boolean;
    messagemEmail: boolean;
    messagemAceite: boolean;

    resposta;


    //  resultado;

    constructor(private route: ActivatedRoute, private router: Router, private registopendentesservice: RegistoPendentesService,
        private fornecedorService: FornecedorService,
        private slideoutservice: SlideoutService, private renderer: Renderer2, element: ElementRef) {

        if (localStorage.getItem("Utilizador")) {
            this.utilizador = JSON.parse(localStorage.getItem("Utilizador"));
            var self = this;
            // this.IDUtilizador=this.utilizador.ID;
            this.registopendentesservice.getRegistosPendentes().then(function (resultado) {
                if (resultado) {
                    self.datasourcePendentes = new DataSource({
                        store: resultado
                    });
                }
            });
            this.registopendentesservice.getTerceiros().then(function (resultado) {
                if (resultado) {
                    self.DsTerceiros = new DataSource({
                        store: resultado
                    })
                }
            })
            this.registopendentesservice.getUserProTextil().then(function (resultado) {
                if (resultado) {
                    self.DsUserPROTextil = new DataSource({
                        store: resultado
                    })
                }
            })
            this.registopendentesservice.getGrupos().then(function (resultado) {
                if (resultado) {
                    self.DsGrupos = new DataSource({
                        store: resultado
                    })
                }
            })
            this.registopendentesservice.getCentros().then(function (resultado) {
                if (resultado) {
                    self.DsCentros = new DataSource({
                        store: resultado
                    })
                }
            })
            this.registopendentesservice.getContactos().then(function (resultado) {
                if (resultado) {
                    self.DsContacto = new DataSource({
                        store: resultado
                    })
                }
            })



        }
        else {

            this.router.navigate(['login']);
        }
    }

    ngAfterViewInit() {
        var self = this;

        let listener = this.renderer.listen(this.element.nativeElement, 'click', (event) => {
            self.slideoutservice.toggle();

        })
    }

    LogOut() {
        this.slideoutservice.close();
        localStorage.removeItem('Utilizador');
        this.fornecedorService.setCodigoFornecedor("");
        this.router.navigate(['login']);
    }

    SelectRow(e: any) {
        // if (this.clickTimer && this.lastRowCLickedId === e.rowIndex) {
        //     clearTimeout(this.clickTimer);
        //     this.clickTimer = null;
        //     this.lastRowCLickedId = e.rowIndex;
        this.selectRow = e.data;
        this.PrimeiroNomeText = this.selectRow.Nome;
        this.UltimoNomeNomeText = this.selectRow.Apelido;
        this.emailText = this.selectRow.Email;
        this.NomeEmpresaText = this.selectRow.Empresa;
        this.obsText = this.selectRow.Obs;
        this.UtilizadorText = this.selectRow.Utilizador;
        // console.log('double');
        // } else {
        //     this.clickTimer = setTimeout(function() {
        //         // console.log('single');
        //     }, 250);
        // }

        // this.lastRowCLickedId = e.rowIndex;

    }


    SelectCombox(e: any, usersPop: DxSelectBoxComponent, terceirosPop: DxSelectBoxComponent, vendedoresPop: DxSelectBoxComponent, nome: string) {
        if (e.value) {
            if (nome === 'user') {
                terceirosPop.instance.option("value", undefined);
                vendedoresPop.instance.option("value", undefined);
            } else if (nome === 'terceiro') {
                vendedoresPop.instance.option("value", undefined);
                usersPop.instance.option("value", undefined);
            } else if (nome === 'vendedor') {
                usersPop.instance.option("value", undefined);
                terceirosPop.instance.option("value", undefined);
            }
        }
    }

    InserirUserPortal() {
        if (this.resposta != undefined) {
            const params: any = {};

            params.IDUser = this.id;
            params.IDTerceiro = this.Codigo;
            params.IDVendedor = this.Cod;
            params.IDContacto = this.Terc;
            params.Nome = this.PrimeiroNomeText;
            params.Apelido = this.UltimoNomeNomeText;
            params.Utilizador = this.UtilizadorText;
            params.Email = this.emailText;
            params.GrupoID = this.GrupoID;
            params.Empresa = this.NomeEmpresaText;
            params.Obs = this.obsText;
            params.Estado = this.EstadoValue;
            params.Url = window.location.origin;
            var seft = this;
            this.registopendentesservice.postUserPortal(params)
                .then(function (r) {
                    if (r == "erro") {
                        // seft.messagemErro=false;
                        // seft.messagemUtilizador=true;
                        // seft.messagemEmail=true;
                        // seft.messagemAceite=true;
                        notify("Falhou registo", "error", 1000);
                    } else if (r == "-1") {
                        // seft.messagemErro=true;
                        // seft.messagemUtilizador=false;
                        // seft.messagemEmail=true;
                        // seft.messagemAceite=true;
                        notify(" O Utilizador que está a tentar registar já existe. Por favor registe um Utilizador diferente.", "error", 1000);
                    } else if (r == "-2") {
                        // seft.messagemErro=true;
                        // seft.messagemUtilizador=true;
                        // seft.messagemEmail=false;
                        // seft.messagemAceite=true;
                        notify("O email fornecido já está a ser utilizado por outro registo. Por favor registe um email diferente.", "error", 1000);
                    } else if (r == "") {
                        // seft.messagemErro=true;
                        // seft.messagemUtilizador=true;
                        // seft.messagemEmail=true;
                        // seft.messagemAceite=false;
                        location.reload();
                    }
                })
                .catch(error => console.log(error))
        }

    }


    // handleCorrectCaptcha(e){
    //     console.log(e);
    // }

    resolved(captchaResponse: any) {
        this.resposta = captchaResponse;
    }

}
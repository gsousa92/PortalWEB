import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

import { LoginService } from './login.service';
import { Utilizador } from './utilizador';

import { Router } from '@angular/router';

import { SlideoutService } from '../slideout/slideout.service';

import { GetFileService } from './get.file.service';

import { DxScrollViewComponent } from 'devextreme-angular';

import{AppService} from '../app.service';

@Component({
    selector: 'app-root',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    utilizadorText: string;
    passwordText: string;
    erro = true;
    urlText: string;
    popupUrl;
    utilizador;
    visibleFornecedore: boolean;


    constructor(private loginService: LoginService, private router: Router, private slideoutservice: SlideoutService, private getFile: GetFileService
        ,private appservice:AppService) {
        // var seft=this;
        // $(document).ready(function() { 
        //     document.querySelector('.toggle-button').addEventListener('click', function() {
        //     seft.slideoutservice.toggle();
        //   });
        // });
        // if(!localStorage.getItem("UrlServico")){
        //     this.popupUrl=true;
        // }
        // else{
        //     this.popupUrl=false;
        // }

        this.getFile.getUrl().then(data => {
            localStorage.setItem("UrlServico", data);
        });
        if (localStorage.getItem("Utilizador")) {
            this.utilizador = JSON.parse(localStorage.getItem("Utilizador"));
            this.utilizador.ID_User = this.utilizador.ID_User ? this.utilizador.ID_User : "";
            this.utilizador.ID_Terceiro = this.utilizador.ID_Terceiro ? this.utilizador.ID_Terceiro : "";
            this.utilizador.ID_Vendedor = this.utilizador.ID_Vendedor ? this.utilizador.ID_Vendedor : "";
            if (this.utilizador.ID_User != "" || this.utilizador.ID_Terceiro != "" || this.utilizador.ID_Vendedor != "") {
              
                if (this.utilizador.GrupoID == "Forn") {
                    this.router.navigate(['fornecedores']);
                }

                if (this.utilizador.GrupoID == "Cli") {
                    this.router.navigate(['catalogo']);

                }

            }
            // this.utilizadorText=this.utilizador.Utilizador;
        }

    }

    // ngAfterViewInit(){
    //     var seft=this;
    //     document.querySelector('.toggle-button').addEventListener('click', function() {
    //         seft.slideoutservice.toggle();});
    // }
    ngOnInit() {

        $(".FundoLogin").height($(window).height());
        $(".FundoBranco").height($(window).height());
        $(".FundoBranco").width($(window).width() * 0.35);
        $(".FundoLogin").width($(window).width() * 0.65);

        $(".ladoEsquerdo").height($(window).height());
        $(".ladoEsquerdo").css("overflow-y", "auto");

        $(window).on("resize", function () {
            $(".FundoBranco").height($(window).height());
            $(".FundoLogin").height($(window).height());
            $(".ladoEsquerdo").height($(window).height());
            $(".ladoEsquerdo").css("overflow-y", "auto");

            let width = $(window).width();
            if (width < 1024) {
                $(".FundoBranco").height($(window).height());
                $(".FundoBranco").width($(window).width());
                $(".FundoLogin").css("display", "none");
            }
            else {
                $(".FundoBranco").height($(window).height());
                $(".FundoBranco").width($(window).width() * 0.35);
                $(".FundoLogin").height($(window).height());
                $(".FundoLogin").width($(window).width() * 0.65);
                $(".FundoLogin").css("display", "block");
            }
        })
    }

    Entrar() {
        let params: any = {};
        params.Utilizador = this.utilizadorText;
        params.Password = this.passwordText;

        var self = this
        this.loginService.postAutenticacao(params).then(function (resultado) {
            //    console.log(resultado);
            var cor = self.loginService.getColorRandom();
            var r = JSON.parse(resultado);
            r.cor = cor;

            //    sessionStorage.setItem('Utilizador', JSON.stringify(r));
            localStorage.setItem('Utilizador', JSON.stringify(r));
            self.utilizador = JSON.parse(localStorage.getItem("Utilizador"));
            if (self.utilizador.GrupoID == "Forn") {
                // self.appservice.ShowMenu("FornecedoresVisible");
                // self.appservice.HiddenMenu("CatalogoVisible");
                self.router.navigate(['fornecedores']);

            }else  if (self.utilizador.GrupoID == "Cli") {
                // self.appservice.ShowMenu("CatalogoVisible");
                // self.appservice.HiddenMenu("FornecedoresVisible");
                self.router.navigate(['catalogo']);
            }else{
                // self.appservice.ShowMenu("CatalogoVisible");
                // self.appservice.ShowMenu("FornecedoresVisible");
                self.router.navigate(['fornecedores']);
            }

        }).catch(function () {
            self.erro = false;
        });
    }

    EntrarUrl() {
        let params;
        params = this.urlText + "/Service1.svc/";
        // console.log(params);
        localStorage.setItem("UrlServico", params);
        this.popupUrl = false;
    }

}
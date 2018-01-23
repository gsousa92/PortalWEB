import { Component,OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {SlideoutService} from  '../slideout/slideout.service';
import { ViewChild } from '@angular/core';

// import { ReCaptchaComponent } from 'angular2-recaptcha';

import{RegistoUtilizadorService} from './registoUtilizador.service';
import * as $ from 'jquery';
import notify from 'devextreme/ui/notify';


@Component({

    templateUrl:'registoUtilizador.component.html',
    styleUrls: ['registoUtilizador.component.css']
})

export class RegistoUtilizadorComponent {

    PrimeiroNomeText:string;
    UltimoNomeNomeText:string;
    UtilizadorText:string;
    emailText:string;
    NomeEmpresaText:string;
    obsText:string;
    grupoValue:string;
    resultado:string;
    naoSucesso:boolean;
    sucesso:boolean;

    DsGrupoUtilizador:any=[{grupoText:"Utilizador Comum",grupoValue:"Utilizador Comum"},{grupoText:"Comercial",grupoValue:"Comercial"},{grupoText:"Cliente",grupoValue:"Cliente"},
    {grupoText:"Fornecedor",grupoValue:"Fornecedor"}]

    // @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    resposta;

    constructor(private registoutilizadorservice:RegistoUtilizadorService){
        
        // console.log(this.captcha);
    }

    // handleCorrectCaptcha(e:any){
    //     console.log(e);
    // }
    resolved(captchaResponse: any) {
        this.resposta=captchaResponse;
    }

    ngOnInit() {
        $(".FundoImagem").height($(window).height());
        this.naoSucesso=true;
        this.sucesso=true;
    }

    Entrar(){
        
        if(this.resposta!=undefined){
            let params: any={};
            params.PrimeiroNome= this.PrimeiroNomeText;
            params.UltimoNome= this.UltimoNomeNomeText;
            params.Utilizador= this.UtilizadorText;
            params.Email= this.emailText;
            params.Grupo= this.grupoValue;
            params.NomeEmpresa= this.NomeEmpresaText;
            params.Obs=this.obsText;
            
           var self=this
            this.registoutilizadorservice.postPedidoCredenciais(params).then(function(resul){
                if(resul==""){
                    // self.sucesso=false;
                    // self.naoSucesso=true;
                    notify("Pedido de credenciais foi aceite", "success", 1000);
                }
                else if (resul=="-1") {
                    notify("Ocorreu um erro no registo!", "error", 1000);
                }
                else if (resul=="-2") {
                    // self.naoSucesso=false;
                    // self.sucesso=true;
                    notify("O email já consta na base de dados", "error", 1000);
                }
            }).catch(function(erro){
                notify("preencher os campos respetivos", "error", 1000);
            }) ;
        }
        else{
            // notify("selecionar Captcha", "error",1000);
        }      
     }
     
}

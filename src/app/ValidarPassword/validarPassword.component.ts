import { Component,OnInit,Renderer2, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {ValidarPasswordService} from './validarPassword.service';

import notify from 'devextreme/ui/notify';



@Component({
    //  selector:'menu',
    templateUrl:'validarPassword.component.html',
    styleUrls: ['./validarPassword.component.css']
})

export class ValidarPasswordComponent{
    passwordText:string;
    ComfirmarPassword:string;

    activecode:any;

    private sub: any;
    
    public barLabel: string = "Força palavra-passe:";

    naoSucesso:boolean;
    sucesso:boolean;
    erro:boolean;
    

    resposta;

    constructor( private router: Router,
        private route: ActivatedRoute, private validarpasswordservice:ValidarPasswordService)
    {

            this.sub = this.route.params.subscribe(params => {
                this.activecode = params['ActiveCode'];
                console.log("codigo:    " + this.activecode);
              });
              this.naoSucesso=true;
              this.sucesso=true;
              this. erro=true;

    }
    ValidarPassword(){
        const params:any={};  
        if (this.resposta!=undefined) {
            if(this.passwordText === this.ComfirmarPassword && this.passwordText != "" && this.ComfirmarPassword !="")
            {
                params.Password=this.passwordText;
                params.ActiveCode=this.activecode;
                console.log(params);
                var self=this;
                this.validarpasswordservice.postValidacaoPassword(params)
                .then(function(resultado){
                    if (resultado) {
                        // console.log("O processo de registo de utilizador está concluído. Já pode efetuar login no Portal PROTêxtil.");
                        // self.sucesso=false;
                        // self.naoSucesso=true;
                        // self.erro=true;
                        notify("O processo de registo de utilizador está concluído. Já pode efetuar login no PortalWeb.", "success", 1000);
                    }else{
                        // console.log("O código de registo parece estar errado. Por favor contacte o administrador do Portal PROTêxtil para atribuição de novo registo.");
                        // self.naoSucesso=false;
                        // self.sucesso=true;
                        // self.erro=true;
                        notify("O código de registo parece estar errado. Por favor contacte o administrador do PortalWeb para atribuição de novo registo.", "error", 1000);
                    }
                })
                .catch(function(erro){
                    console.log(erro);
                })
            }
            else
            {
                //    this.erro=false;
                //    self.sucesso=true;
             //    self.naoSucesso=true;
             notify("As password's não corresponde.", "error", 1000);
            }
        }
       

    }

    resolved(captchaResponse: any) {
        this.resposta=captchaResponse;
    }
}
import { Component,OnInit,Renderer2, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import{ResetPasswordService} from './resetPassword.service';




import notify from 'devextreme/ui/notify';



@Component({
    //  selector:'menu',
    templateUrl:'resetPassword.component.html',
    styleUrls: ['./resetPassword.component.css']
})

export class ResetPasswordComponent{
    resposta;
    Utilizador;
    Email;
    Empresa;


    constructor( private resetpasswordservice: ResetPasswordService){

    }

    resolved(captchaResponse: any) {
        this.resposta=captchaResponse;
    }

    ResetPassword(){
        if (this.resposta!=undefined) {
            let params:any={};
            params.Utilizador= this.Utilizador;
            params.Email= this.Email;
            params.Empresa=this.Empresa;
            params.Url=window.location.origin;

            if(this.Utilizador !=undefined && this.Email != undefined && this.Empresa != undefined)
            {
                this.resetpasswordservice.postResetPassword(params).then(function(resultado){
                    console.log(resultado)
                    if (resultado=="") {
                        notify("", "error", 1000);
                    }else if (resultado=="-1") {
                        notify("O utilizador que introduziu não existe nos registos do portal. Por favor insira um utilizador existente.", "error", 1000);
                        
                    }else if (resultado=="-2") {
                        notify("O utilizador que inseriu já efetuou um pedido de reset password. Por favor aguarde por validação do pedido para redefinir a sua palavra-passe. Se esta informação está errada por favor contacte o administrador do portal.", "error", 1000);
    
                    }else if (resultado=="-3") {
                        notify("O seu pedido de reset password falhou por favor tente de novo ou contacte o administrador do portal.", "error", 1000);
    
                    }else if(resultado=="-4"){
                        notify("O seu pedido de reset à password foi registado. Vai ser notificado por email para redefinir a sua password.", "success", 1000);
                    }
                })
                .catch(error=>console.log(error));
            }
            else{
                notify("ERRO", "error", 1000);
            }
           
        }
    }
}
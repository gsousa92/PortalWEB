import { Component, OnInit,Renderer2, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {SlideoutService} from '../../slideout/slideout.service';

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

import {ComentarioService} from '../Comentario/comentario.service';
import {FornecedorService} from '../fornecedor.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    //  selector:'menu',
    templateUrl:'comentario.component.html',
    styleUrls: ['comentario.component.css'],
})

export class ComentarioComponent implements OnInit,AfterViewInit  {

    @ViewChild("botaoMenu") element:ElementRef;

    priorities: any[];
    priority:any;
    IDPlanRec:number;
    OF:number;
    CodRecurso:string;
    memoText:string;

    IDUtilizador;

    slideout:any;

    txtOP:string;
    Ativo=false;
    AcessoAdmin;
    
    utilizador: any={};

    private sub: any; 
    
    constructor(private route: ActivatedRoute, private comentarioservice:ComentarioService, private router:Router,private fornecedorService: FornecedorService,
                private fornecedorservice:FornecedorService, private slideoutservice:SlideoutService,private renderer: Renderer2, element: ElementRef) {
        
        if (localStorage.getItem("Utilizador")) {
            this.utilizador= JSON.parse(localStorage.getItem("Utilizador"));
            this.IDUtilizador=this.utilizador.ID;
            if(this.utilizador.GrupoID == "Admin")
            {
                this.AcessoAdmin=false;
            }
            else
            {
                this.AcessoAdmin=true;
            }
        }else
        {
            this.router.navigate(['login']);
        }


    }
    
ngAfterViewInit(){
    var self = this;
    console.log(this.element);
    let listener = this.renderer.listen(this.element.nativeElement, 'click', (event) => {
        self.slideoutservice.toggle();
    })
}


    ngOnInit(){ 
        $(document).ready(function () {
            $(window).on("resize", function () {
              $(".chatbox").height($(window).height() - 350);
            })
        })
        this.sub = this.route.params.subscribe(params => {
            this.IDPlanRec = +params['id'];
            this.OF = +params['OF'];
            this.CodRecurso= params['CODRecurso'];
           
            // console.log(this.IDPlanRec);
        });
      
        if(this.IDPlanRec.toString()!="")
        {

            let p:any={};
            p.cod= this.CodRecurso;
            p.IDRec=this.IDPlanRec;
            var self = this;
            this.fornecedorservice.getFornecedor(p).then(function(result){
                // console.log(result.length);
                if (result.length>0) {
                    
                self.priorities=[{Text:"Em Análise", Value:0},{Text:"Confirmar", Value:1},{Text:"Recusar", Value:2}]
    
   
                self.priority = self.priorities[0];
       
                let params : any = {};
          
                if(self.utilizador.ID_Terceiro==""){
                    self.router.navigate(['comentario',self.IDPlanRec,self.OF, self.CodRecurso]);
                }
                else
                {
                    self.router.navigate(['comentario',self.IDPlanRec,self.OF]);
                }
        
                self.txtOP = self.OF.toString();
        
                params.IDPlanRec = self.IDPlanRec;  
                params.IDUtilizador= self.IDUtilizador;
                var nome="";
                var email="";
                // console.log(params);
                $("#scroll").height($(window).height() * 0.58);
               
                self.comentarioservice.getComentario(params).then(function(result){
                    $(".chat-container").html("");
                    result.forEach(function(item){
                        // console.log(item);
                        if(item.IDUser.toString() == item.IDLogin.toString()){
                            nome=item.Nome;
                            email=item.Email;
                            // console.log(nome +" ,"+ email );
                            var s = "<li class='chat-item'>" +
                            "<div class='chat-message'>" + item.Comentario + "</div><div class='chat-hora'>" +
                            item.Nome + " " + new Date(item.Data).toDateString() + "</div><div class='clearfix'></div>"
                            "</li>";
                            
                        $(".chat-container").append(s);
                        }
                        else
                        {
                            nome=item.Nome;
                            email=item.Email;
                            // console.log(nome +" ,"+ email );
                            var s = "<li class='chat-item'>" +
                            "<div class='chat-message-friend'>" + item.Comentario + "</div><div class='chat-hora-friend'>" +
                                item.Nome + " " + new Date(item.Data).toDateString() + "</div><div class='clearfix'></div>"
                        "</li>";
                        $(".chat-container").append(s);
                        }   
                        if(item.Estado == 1 || item.Estado == 2){
                            self.priority = self.priorities[item.Estado]; 
                            self.Ativo=true;  
                        }
                        
                    });
                    
                })
                .catch(error => console.log(error));
                 }
                 else
                 {   self.router.navigate(['fornecedores',false]);
                    //  console.log("nao tem acessso");
                 }
                })
        }
    //     var seft=this;
    //     $(document).ready(function() { 
    //         // console.log(Slideout);
        
    //       document.querySelector('.toggle-button').addEventListener('click', function() {
    //         seft.slideoutservice.toggle();
    //       });
    //   });
    }

    EnviarComentario(){
        var d= new Date();
        
       
        let params : any={};
        params.Comentario=this.memoText;
        params.Data="\/Date(" + d.getTime() + ")\/";
        params.IdPlanRec=this.IDPlanRec;
        params.Estado=this.priority.Value;
        params.IDUser=this.IDUtilizador;
        params.Url=window.location.origin;
        params.Nome= this.utilizador.Nome;
        params.Email=this.utilizador.Email;
        
        console.log(this.CodRecurso);
        if(this.CodRecurso==undefined){
        //    console.log("assas")
            params.CodRecurso= "";
            params.CodRecurso=this.utilizador.ID_Terceiro;
        }
        else
        {  
            params.IDFornecedor=this.CodRecurso;
            params.CodRecurso=this.CodRecurso;
        }
        params.OF=this.OF;
        params.IdPlanRec=this.IDPlanRec;
           


        var self=this
        // console.log(params);
        // console.log(this.memoText, d,this.IDPlanRec, this.IDUtilizador ,this.priority.Value );
        this.comentarioservice.postRegistoComentario(params).then(function(result){
        if (result) {
             self.comentarioservice.postEnviarEmail(params).then(function(result){
                if(result){
                    self.ngOnInit();
                    self.memoText="";
                }
            }).catch(error=> console.log(error));
        }
            
        })
        .catch(error => console.log(error));
    }


    LogOut(){
        this.slideoutservice.close();
        localStorage.removeItem('Utilizador');
        this.fornecedorService.setCodigoFornecedor("");
        this.router.navigate(['login']);
    }
    RegistoPendentes(){
        this.router.navigate(['registoPendentes']);
    }
}
import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

import {ListarUtilizadorService} from './listarUtilizador.service';
import {RegistoPendentesService} from '../RegistoPendetes/registoPendentes.service';
import {FornecedorService} from '../Fornecedores/fornecedor.service';

import { ListarUtilizador } from './listarUtilizador';
import { Terceiro } from '../RegistoPendetes/terceiro';
import{UserProTextil} from '../RegistoPendetes/userPROTextil';
import{Centros} from '../RegistoPendetes/centros';
import { validateConfig } from '@angular/router/src/config';
import { DxSelectBoxComponent } from 'devextreme-angular';

import { SlideoutService } from '../slideout/slideout.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({

    templateUrl:'listarUtilizador.component.html',
    styleUrls:['./listarUtilizador.component.css']
})

export class ListarUtilizadorComponent  implements AfterViewInit{

    @ViewChild("botaoMenu") element: ElementRef;

    self: any;
    utilizador:any;
    DSusers:ListarUtilizador[];
    DSUtilizadores:UserProTextil[];
    DSTerceiros:Terceiro[];
    DSVendedores:Centros[];
    DSContacto:any;
    DSGrupos:any;
    estado: any = [{ Estado: "Pendente", EstadoValue: 0 }, { Estado: "Ativo", EstadoValue: 1 }, { Estado: "Inativo", EstadoValue: 2 }];
    DsEstado:any;

    clickTimer:any;
    lastRowCLickedId:number;
    popupVisible;
    selectrow;
    ID_user;
    
    CodigoG;
    ID_vendedor;
    ID_Contacto;
    Nome1;
    Utilizador;
    Email;
    GrupoID;
    Empresa;
    obs;
    Estado;
    Apelido;
    ID;
   

   

    gridInstance;
    constructor( private listarutilizadorservice:ListarUtilizadorService, private registopendetesserice:RegistoPendentesService,
         private router: Router,private fornecedorService: FornecedorService,
        private slideoutservice: SlideoutService, private renderer: Renderer2, element: ElementRef){
        this.self = this;
        if(localStorage.getItem("Utilizador")){
            this.utilizador=JSON.parse(localStorage.getItem("Utilizador"));
            var self=this;
            this.listarutilizadorservice.getUsersPortal().then(function(UsersPortal){
                if (UsersPortal) {
                    // console.log(UsersPortal);
                    self.DSusers = UsersPortal;
                }
            });
            this.registopendetesserice.getUserProTextil().then(function(usersProTextil) {
                if (usersProTextil) {
                    self.DSUtilizadores = usersProTextil;
                }
            });
            this.registopendetesserice.getTerceiros().then(function(Terceiros) {
                if (Terceiros) {
                    self.DSTerceiros = Terceiros;
                }
            });
            this.registopendetesserice.getCentros().then(function(centros) {
                if (centros) {
                    self.DSVendedores = centros;
                }
            });
            this.registopendetesserice.getContactos().then(function(contacto) {
                if (contacto) {
                    self.DSContacto = contacto;
                }
            });
            this.registopendetesserice.getGrupos().then(function(grupos) {
                if (grupos) {
                    self.DSGrupos = grupos;
                }
            });
            this.DsEstado=this.estado;
            // this.DSUtilizadores=this.registopendetesserice.getUserProTextil();
        }

    }
   
    ALtrarRegisto(e){

        this.selectrow=e.data;
        console.log(this.selectrow);
        // console.log(this.selectrow);
        if (this.clickTimer && this.lastRowCLickedId === e.rowIndex) {
            clearTimeout(this.clickTimer);
            this.clickTimer = null;
            this.lastRowCLickedId = e.rowIndex;

            this.ID=this.selectrow.ID;
          
            this.ID_user=this.selectrow.ID_user;
            this.CodigoG=this.selectrow.CodigoG;
            // this.CodigoG= this.CodigoG.split("#");
            // this.CodigoG=this.CodigoG[0];
            this.ID_vendedor=this.selectrow.ID_vendedor
            this.ID_Contacto=this.selectrow.ID_Contacto
            this.Nome1=this.selectrow.PrimeiroNome;
            this.Apelido=this.selectrow.Apelido
            this.Utilizador=this.selectrow.Utilizador
            this.Email=this.selectrow.Email
            
            this.GrupoID=this.selectrow.GrupoID
            
            this.Empresa=this.selectrow.Empresa
            this.obs=this.selectrow.obs
            this.Estado=this.selectrow.Estado
           

            this.popupVisible = true;

            // console.log('double');
        } else {
            this.clickTimer = setTimeout(function () {
                // console.log('single');
            }, 250);
        }

        this.lastRowCLickedId = e.rowIndex;

    }

    SelectCombox(e: any, usersPop: DxSelectBoxComponent, terceirosPop: DxSelectBoxComponent, vendedoresPop: DxSelectBoxComponent, nome:string) {
        if (e.value){
            if (nome === 'user'){
                terceirosPop.instance.option("value", undefined);
                vendedoresPop.instance.option("value", undefined);
            }else if (nome === 'terceiro') {
                vendedoresPop.instance.option("value", undefined);
                usersPop.instance.option("value", undefined);
            }else if (nome === 'vendedor') {
                usersPop.instance.option("value", undefined);
                terceirosPop.instance.option("value", undefined);
            }
        }
    }


    Save(){
        let params:any={};
        params.IDUser=  this.ID_user;
        this.CodigoG=this.selectrow.CodigoG;
        if(this.CodigoG!=undefined){
            this.CodigoG= this.CodigoG.split("#");
            this.CodigoG=this.CodigoG[0];
        }
        params.IDTerceiro=   this.CodigoG;
        params.IDVendedor=   this.ID_vendedor;
        params.IDContacto= this.ID_Contacto;
        params.Nome=this.Nome1;
        params.Apelido=this.Apelido;
        params.Utilizador=this.Utilizador;
        params.Email=this.Email;
        params.GrupoID=this.GrupoID;
        params.Empresa=this.Empresa;
        params.Obs=this.obs;
        params.Estado=this.Estado;
        params.ID=this.ID;

        console.log(params);
        this.listarutilizadorservice.AtualizarUtilizador(params).then(function(resultado){
            if (resultado) {
                location.reload();
            }
        }).catch(error => console.log(error));

    }

    LogOut() {
        this.slideoutservice.close();
        localStorage.removeItem('Utilizador');
        this.fornecedorService.setCodigoFornecedor("");
        this.router.navigate(['login']);
    }

    RegistoPendentes() {
        this.router.navigate(['registoPendentes']);
    }
    
    ngAfterViewInit() {
        var self = this;
        
        let listener = this.renderer.listen(this.element.nativeElement, 'click', (event) => {
            self.slideoutservice.toggle();
        })
    }

}
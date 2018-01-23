import { Injectable, Inject } from '@angular/core';
import { Http, ConnectionBackend, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Resolve } from '@angular/router/src/interfaces';

import{ListarUtilizador}from './listarUtilizador';


@Injectable()
export class ListarUtilizadorService{

    url:string;
    headers:Headers;
    options:RequestOptions;

    constructor(private http:Http){
        this.url= localStorage.getItem("UrlServico");
        this.url= this.url.replace(/"/g,"");
        this.headers= new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        this.options= new RequestOptions({headers:this.headers});
    }

    private extractData(res:Response){
        let body= res.json();
        return JSON.parse(body);
    }

    private handleErrorPromise(error:Response|any){
        return Promise.reject(error.message || error);
    }

    getUsersPortal(): Promise<ListarUtilizador[]>{
        var urlAtual= this.url;
        urlAtual= urlAtual +"getUsersPortal";
        return this.http.get(urlAtual).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
    }

    AtualizarUtilizador(params:Object): Promise<Boolean>{
        var urlAtual=this.url;
        urlAtual=urlAtual+"AtualizarUtilizador";
        let bodyString = JSON.stringify(params);
        return this.http.post(urlAtual, bodyString ,this.options).toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);

    }
}
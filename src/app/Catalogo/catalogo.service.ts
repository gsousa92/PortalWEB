import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Artigo} from '../Catalogo/artigo';
import {Cliente} from '../Catalogo/cliente';

import{AnoArtigo} from '../Catalogo/anoArtigo';




@Injectable()
export class CatalogoService{
    url: string;

    constructor( private http:Http){

        this.url=localStorage.getItem("UrlServico");
        this.url= this.url.replace(/"/g,"");
    }

    private extractData(res: Response) {
        let body = res.json();
        // console.log(JSON.parse(body));
        return JSON.parse(body);
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

    getCliente(params): Promise <Cliente[]>{
        var urlAtual= this.url;
        urlAtual= urlAtual + "getClientes";

        if (params !== '') {
            urlAtual = urlAtual + '?cod=' + params;
        }

        return this.http.get(urlAtual).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
    }

    getArtigos(params): Promise<Artigo[]>
    {
        var urlAtual=this.url;
        urlAtual= urlAtual + "getArtigos?";
        var count = 0;
        
        if (params.cod != undefined) {
            if (count == 0)
            urlAtual = urlAtual + "cod=" + params.cod;
            else
            urlAtual = urlAtual + "&cod=" + params.cod;
            count++;
        }
        if (params.anoArtigo != undefined) {
            if (count == 0)
            urlAtual = urlAtual + "anoArtigo=" + params.anoArtigo;
            else
            urlAtual = urlAtual + "&anoArtigo=" + params.anoArtigo;
            count++;
        }

        return this.http.get(urlAtual).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);

    }

    getImagens(caminho): Promise<string>{
        var urlAtual=this.url;
        urlAtual=urlAtual +"devolveImagemFromCaminho";
        if(caminho!==''){
            urlAtual= urlAtual + '?caminho='+ caminho;
        }
        return this.http.get(urlAtual).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
    }
    getAnoArtigo(params): Promise<AnoArtigo[]>{
        var urlAtual=this.url;
        urlAtual= urlAtual + "getAnoArtigo";

        if (params.cod !== '') {
            urlAtual = urlAtual + '?cod=' + params.cod;
        }

        return this.http.get(urlAtual).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
    }

}


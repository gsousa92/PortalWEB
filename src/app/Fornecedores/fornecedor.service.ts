import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Fornecedor } from '../Fornecedores/fornecedor';
import { Anexo } from '../Fornecedores/anexo';
import { Terceiro } from './terceiro';
import { parse } from 'querystring';




@Injectable()
export class FornecedorService {
    // selectedOF: Fornecedor
    url: string;
    fornecedor:any;
    constructor(private http: Http) {
        //  this.url="http://localhost:54210/Service1.svc/getPedidosFornecedores"
        //  this.url="http://inforcavado.dyndns.org:81/ServicoPortalWEB/Service1.svc/"^
        this.url = localStorage.getItem("UrlServico");
        this.url = this.url.replace(/"/g, "");
        // this.url=" http://192.168.1.4/BestActiveWCF/Service1.svc/"
    }
    // FornecedorParametros(params: object) {
    //     this.url += "";
    //     return this.url
    // }
    getFornecedor(params): Promise<Fornecedor[]> {
        // console.log(this.http.get(this.url).toPromise())
        var urlActual = this.url;
        urlActual = urlActual + "getPedidosFornecedores?";
        var count = 0;
        if (params.cod != undefined) {
            if (count == 0)
                urlActual = urlActual + "cod=" + params.cod;
            else
                urlActual = urlActual + "&cod=" + params.cod;
            count++;
        }
        if (params.IDRec != undefined) {
            if (count == 0)
                urlActual = urlActual + "IDRec=" + params.IDRec;
            else
                urlActual = urlActual + "&IDRec=" + params.IDRec;
            count++;
        }
        if (params.situacao != undefined) {
            if (count == 0)
                urlActual = urlActual + "situacao=" + params.situacao;
            else
                urlActual = urlActual + "&situacao=" + params.situacao;
            count++;
        }

        // console.log(this.url);
        return this.http.get(urlActual).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
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

    getTamanhos(params): Promise<Fornecedor[]> {

        // console.log(params.PontoControl);
        // "getTamanhos?cod={cod}&PC={pontoControl}&OF={of}&OP={op}"
        var urlActual = this.url;
        urlActual = urlActual + "getTamanhos?";
        var count = 0;

        if (params.cod != undefined) {
            if (count == 0)
                urlActual = urlActual + "cod=" + params.cod;
            else
                urlActual = urlActual + "&cod=" + params.cod;
            count++;
        }
        if (params.PontoControl != undefined) {
            if (count == 0)
                urlActual = urlActual + "PC=" + params.PontoControl;
            else
                urlActual = urlActual + "&PC=" + params.PontoControl;
            count++;
        }
        if (params.of != undefined) {
            if (count == 0)
                urlActual = urlActual + "OF=" + params.of;
            else
                urlActual = urlActual + "&OF=" + params.of;
            count++;
        }
        if (params.op != undefined) {
            if (count == 0)
                urlActual = urlActual + "Op=" + params.op;
            else
                urlActual = urlActual + "&op=" + params.op;
            count++;
        }

        // this.url= this.url + "getTamanhos?"+"cod="+"&PC="+params.PontoControl+"&OF="+params.of+"&OP="+params.of;
        // console.log(this.url);
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getPontosControl(params): Promise<Fornecedor[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getPontosControl?";
        var count = 0;

        if (params.cod != undefined) {
            if (count == 0)
                urlActual = urlActual + "cod=" + params.cod;
            else
                urlActual = urlActual + "&cod=" + params.cod;
            count++;
        }
        if (params.PontoControl != undefined) {
            if (count == 0)
                urlActual = urlActual + "PC=" + params.PontoControl;
            else
                urlActual = urlActual + "&PC=" + params.PontoControl;
            count++;
        }
        if (params.of != undefined) {
            if (count == 0)
                urlActual = urlActual + "OF=" + params.of;
            else
                urlActual = urlActual + "&OF=" + params.of;
            count++;
        }
        if (params.op != undefined) {
            if (count == 0)
                urlActual = urlActual + "Op=" + params.op;
            else
                urlActual = urlActual + "&op=" + params.op;
            count++;
        }
        // console.log(this.http.get(this.url).toPromise())
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getTiposAnexos(params): Promise<Anexo[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getTiposAnexos?";
        var count = 0;

        if (params.of != undefined) {
            if (count == 0)
                urlActual = urlActual + "of=" + params.of;
            else
                urlActual = urlActual + "&of=" + params.of;
            count++;
        }
        if (params.op || params.op === 0) {
            if (count == 0)
                urlActual = urlActual + "op=" + params.op;
            else
                urlActual = urlActual + "&op=" + params.op;
            count++;
        }
        if (params.refer != undefined) {
            if (count == 0)
                urlActual = urlActual + "refer=" + params.refer;
            else
                urlActual = urlActual + "&refer=" + params.refer;
            count++;
        }

        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getDonwloadAnexos(params): Promise<Anexo[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getDonwloadAnexos?";
        var count = 0;

        if (params.id != undefined) {
            if (count == 0)
                urlActual = urlActual + "id=" + params.id;
            else
                urlActual = urlActual + "&id=" + params.id;
            count++;
        }
        if (params.codigo != undefined) {
            if (count == 0)
                urlActual = urlActual + "codigo=" + params.codigo;
            else
                urlActual = urlActual + "&codigo=" + params.codigo;
            count++;
        }

        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    getTerceirosCombox(params): Promise<Terceiro[]> {
        let urlAux = this.url;

        urlAux = urlAux + 'getTerceirosCombox';

        if (params !== '') {
            urlAux = urlAux + '?cod=' + params;
        }

        return this.http
            .get(urlAux)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getImagem(params): Promise<string> {
        var urlActual = this.url;
        urlActual = urlActual + "getImagem?";
        var count = 0;
        if (params.artigo != undefined) {
            if (count == 0)
                urlActual = urlActual + "artigo=" + params.artigo;
            else
                urlActual = urlActual + "&artigo=" + params.artigo;
            count++;
        }
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);

    }
    getCodigoFornecedor(){
        return sessionStorage.getItem("CodigoFornecedor");
    }
    setCodigoFornecedor(codigofornecedor:any){
        sessionStorage.setItem("CodigoFornecedor", codigofornecedor);
    }





}

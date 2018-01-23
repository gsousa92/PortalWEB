import {Injectable} from '@angular/core';
import { Http, ConnectionBackend, Response,Headers, RequestOptions  } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RegistoProducao} from '../RegistoProducao/registoProducao';
import {OrdemFabricoProducao} from '../RegistoProducao/ordemFabricoProducao';
import {Seccao} from '../RegistoProducao/seccao';
import {Cores} from '../RegistoProducao/cores';
import {Quantidade} from '../RegistoProducao/quantidade';
import { race } from 'q';

@Injectable()
export class RegistoProducaoService{
    url: string;
    headers: Headers;
    options: RequestOptions;
    
    
    constructor(private http:Http){
        // this.url=" http://192.168.1.4/BestActiveWCF/Service1.svc/";
        this.url=localStorage.getItem("UrlServico");
        this.url= this.url.replace(/"/g,"");
        this.headers = new Headers({ 'Content-Type': 'application/json', 
        'Accept': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getRegistoProducao(params): Promise<RegistoProducao[]>{
        var urlAtual=this.url;
        urlAtual = urlAtual +"getRegistoProducao";
        var count = 0;
        if(params != undefined){
            if (count == 0)
                urlAtual= urlAtual+"?OF="+params;
            else 
                urlAtual= urlAtual+"&OF="+params;
            count++;
        }
        return  this.http.get(urlAtual).toPromise().then(this.extraData)
        .catch(this.handleErroPromisse);
    }

    private extraData(res:Response){
        let body = res.json();
        // console.log(JSON.parse(res.json()));
        return JSON.parse(res.json());
    }

    private handleErroPromisse(error: Response | any){
        console.error(error.message || error);

        return Promise.reject(error.message || error);
    }

    getOrdemFabrico(params): Promise<OrdemFabricoProducao[]>{
        var urlAtual=this.url;
        
        urlAtual = urlAtual + "getOrdemFabricoProducao?" ;
        var count = 0;
        if(params != undefined){
            if (count == 0)
                urlAtual= urlAtual+"cod="+params;
            else 
                urlAtual= urlAtual+"&cod="+params;
            count++;
        }
        
        return  this.http.get(urlAtual).toPromise().then(this.extraData)
        .catch(this.handleErroPromisse);
    }

    getSeccao(params):Promise<Seccao[]>{
        var urlAtual= this.url;
        urlAtual = urlAtual + "getSeccao?" ;
        var count = 0;
     
        if(params!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"cod="+params;
            else 
                urlAtual= urlAtual+"&cod="+params;
            count++;
        }
        return  this.http.get(urlAtual).toPromise().then(this.extraData)
        .catch(this.handleErroPromisse);
    }

    getCores(params): Promise<Cores[]>{
        var urlAtual= this.url;
        urlAtual = urlAtual + "getCores?" ;
        var count = 0;
        if(params.of!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"of="+ params.of;
            else 
                urlAtual= urlAtual+"&of="+ params.of;
            count++; 
        }
        if(params.refer!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"refer="+params.refer;
            else 
                urlAtual= urlAtual+"&refer="+params.refer;
            count++;
        }
        return  this.http.get(urlAtual).toPromise().then(this.extraData)
        .catch(this.handleErroPromisse);
    }
    
    getQuantidade(params): Promise<Quantidade[]>{
        var urlAtual= this.url;
        urlAtual = urlAtual + "getQuantidade" ;
        var count = 0;
        if(params.of!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"?of="+ params.of;
            else 
                urlAtual= urlAtual+"&of="+ params.of;
            count++; 
        }
        if(params.refer!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"?refer="+params.refer;
            else 
                urlAtual= urlAtual+"&refer="+params.refer;
            count++;
        }
        // console.log(this.http.get(urlAtual).toPromise());
        return  this.http.get(urlAtual).toPromise().then(this.extraData)
        .catch(this.handleErroPromisse);
    }

    getQuantidadeTamanhosEncomenda(params):Promise<Quantidade[]>{
        var urlAtual= this.url;
        urlAtual = urlAtual + "getQuantidadeTamanhosEncomenda?" ;
        var count = 0;
        // console.log(params);
        if(params.of!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"of="+ params.of;
            else 
                urlAtual= urlAtual+"&of="+ params.of;
            count++; 
        }
        if(params.formato!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"formato="+ params.formato;
            else 
                urlAtual= urlAtual+"&formato="+ params.formato;
            count++; 
        }
        if(params.tipo || params.tipo=== 0){
            if (count == 0)
                urlAtual= urlAtual+"tipo="+ params.tipo;
            else 
                urlAtual= urlAtual+"&tipo="+ params.tipo;
            count++; 
        }
        
        if(params.refer!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"refer="+params.refer;
            else 
                urlAtual= urlAtual+"&refer="+params.refer;
            count++;
        }
        console.log('url' + urlAtual);

        return  this.http.get(urlAtual).toPromise().then(this.extraData)
        .catch(this.handleErroPromisse);
    }
    
   postRegistoProducao(params:Object): Promise<RegistoProducao> {
       
        let bodyString = JSON.stringify(params);
      
        var urlAtual=this.url;
        urlAtual = urlAtual +"postRegistoProducao";
        console.log(params);

        return this.http.post(urlAtual, bodyString ,this.options).toPromise()
        .then(this.extraData)
        .catch(this.handleErroPromisse);
    }
    InserirEditarEliminarQuantidadesRegistoProducao(params): Promise<RegistoProducao>{

        var urlAtual= this.url;
        urlAtual = urlAtual + "InserirEditarEliminarQuantidadesRegistoProducao?" ;
        var count = 0;
        let bodyString = JSON.stringify(params);
        // console.log(params);
        if(params.OrdemFabrico!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"of="+ params.OrdemFabrico;
            else 
                urlAtual= urlAtual+"&of="+ params.OrdemFabrico;
            count++; 
        }
        if(params.Artigo!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"refer="+params.Artigo;
            else 
                urlAtual= urlAtual+"&refer="+params.Artigo;
            count++;
        }
        if(params.VtDoc!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"formato="+ params.VtDoc;
            else 
                urlAtual= urlAtual+"&formato="+ params.VtDoc;
            count++; 
        }
        if(params.VnDoc || params.tipo=== 0){
            if (count == 0)
                urlAtual= urlAtual+"tipo="+ params.VnDoc;
            else 
                urlAtual= urlAtual+"&tipo="+ params.VnDoc;
            count++; 
        }
        console.log(urlAtual);
        
        return this.http.post(urlAtual, bodyString ,this.options).toPromise()
        .then(this.extraData)
        .catch(this.handleErroPromisse);

    }


    deleteRegistoProducao(params): Promise<RegistoProducao>{
        var urlAtual= this.url;
        urlAtual = urlAtual + "deleteRegistoProducao?" ;
        var count = 0;
        // console.log(params);
        if(params.of!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"of="+ params.of;
            else 
                urlAtual= urlAtual+"&of="+ params.of;
            count++; 
        }
        if(params.formato!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"formato="+ params.formato;
            else 
                urlAtual= urlAtual+"&formato="+ params.formato;
            count++; 
        }
        if(params.doc || params.doc === 0){
            if (count == 0)
                urlAtual= urlAtual+"tipo="+ params.doc;
            else 
                urlAtual= urlAtual+"&tipo="+ params.doc;
            count++; 
        }
        return this.http.get(urlAtual,this.options).toPromise()
        .then(this.extraData)
        .catch(this.handleErroPromisse);
    }

    getValidarData(params): Promise<Boolean>{
     
        var urlAtual= this.url;
        urlAtual = urlAtual + "getValidarData?" ;
        var count = 0;

        // params.data= params.data.replace(/%/g,"");
        if(params.data!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"data="+ params.data;
            else 
                urlAtual= urlAtual+"&data="+ params.data;
            count++; 
        }
        if(params.horasDiferenciais!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"horasDiferenciais="+ params.horasDiferenciais;
            else 
                urlAtual= urlAtual+"&horasDiferenciais="+ params.horasDiferenciais;
            count++; 
        }

        return this.http.get(urlAtual,this.options).toPromise()
        .then(this.extraData)
        .catch(this.handleErroPromisse);
        
    }
    
}
import {Injectable} from '@angular/core';
import { Http, ConnectionBackend, Response,Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Utilizador} from  '../Login/utilizador';

@Injectable()
export class LoginService{
    url: string;
    headers: Headers;
    options: RequestOptions;
    arraycores:any=["#751334","#ffb521","#cfef5b","#7adb84","#16823f","#6cbec9","#4286f4","#187582","#185082","#573b75","#9978c9","#887e96","#f26868","#303030","#b24971","#ffe121"];
    constructor(private http:Http){
        // this.url=" http://192.168.1.4/BestActiveWCF/Service1.svc/";
        // this.url="http://inforcavado.dyndns.org:81/ServicoPortalWEB/Service1.svc/"
    
        // if(localStorage.getItem("UrlServico")){
        //     this.url=localStorage.getItem("UrlServico");
        //     this.url= this.url.replace(/"/g,"");
        // }
       
        
        
        this.headers = new Headers({ 'Content-Type': 'application/json', 
        'Accept': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }
    private extractData(res: Response) {
        let body = res.json();
        // console.log(JSON.parse(body));
        return JSON.parse(body);
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

    postAutenticacao(params:Object): Promise<string> {
        
         let bodyString = JSON.stringify(params);
         this.url=localStorage.getItem("UrlServico");
         this.url= this.url.replace(/"/g,"");
        console.log(this.url);
         var urlAtual=this.url;
       
         urlAtual = urlAtual +"postAutenticacao";
        //  console.log(params);
 
         return this.http.post(urlAtual, bodyString ,this.options).toPromise()
         .then(this.extractData)
         .catch(this.handleErrorPromise);
     }

     getColorRandom(){
        return this.arraycores[Math.floor(Math.random() * this.arraycores.length)];
     }
}
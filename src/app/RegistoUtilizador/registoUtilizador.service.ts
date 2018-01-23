import {Injectable} from '@angular/core';
import { Http, ConnectionBackend, Response,Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {RegistoUtilizador} from './registoutilizador';

@Injectable()
export class RegistoUtilizadorService{
    url: string ; 
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http){
        this.url=localStorage.getItem("UrlServico");
        this.url= this.url.replace(/"/g,"");
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
        // console.log(error);
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

    postPedidoCredenciais(params:Object): Promise<String> {
        
         let bodyString = JSON.stringify(params);
       
         var urlAtual=this.url;
         urlAtual = urlAtual +"postPedidoCredenciais";
        //  console.log(params);
 
         return this.http.post(urlAtual, bodyString ,this.options).toPromise()
         .then(this.extractData)
         .catch(this.handleErrorPromise);
     }
}

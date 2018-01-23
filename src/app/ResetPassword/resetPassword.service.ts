import {Injectable} from '@angular/core';
import { Http, ConnectionBackend, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ParseSpan } from '@angular/compiler';

@Injectable()
export class ResetPasswordService{
    url:string;
    headers:Headers;
    option:RequestOptions;

    constructor(private http:Http){
        this.url=localStorage.getItem('UrlServico');
        this.url=this.url.replace(/"/g,"");
        this.headers=new Headers({ 'Content-Type': 'application/json', 
        'Accept': 'application/json' });
        this.option= new RequestOptions({headers:this.headers});
    }

    private extractData(res:Response){
        let body=res.json();
        return JSON.parse(body);
    }

    private handleErrorPromise(error: Response|any){
        return Promise.reject(error.message||error);
    }

    postResetPassword(params:Object):Promise<String>{
        var urlActual=this.url;
        urlActual= urlActual+"postResetPassword";
        const bodystring=JSON.stringify(params);
        return this.http.post(urlActual,bodystring,this.option).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
    }

}
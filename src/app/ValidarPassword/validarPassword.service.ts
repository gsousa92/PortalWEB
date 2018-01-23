import {Injectable} from '@angular/core';
import { Http, ConnectionBackend, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ValidarPasswordService{

    url: string;
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

        return JSON.parse(body);
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

    postValidacaoPassword(params:Object): Promise<Boolean>{
        var urlActual = this.url;
        urlActual = urlActual + "postValidacaoPassword";

        const bodystring = JSON.stringify(params);

        return this.http.post(urlActual, bodystring, this.options).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
    }
}
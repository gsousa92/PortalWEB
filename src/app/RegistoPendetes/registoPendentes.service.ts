import { Injectable, Inject } from '@angular/core';
import { Http, ConnectionBackend, Response, Headers, RequestOptions } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RegistoPendentes } from './registoPendentes';
import { Terceiro } from './terceiro';
import { UserProTextil } from './userPROTextil';
import { Grupos } from './grupos';
import { Centros } from './centros';
import { Contactos } from './contactos';

@Injectable()
export class RegistoPendentesService {

    url: string;
    headers: Headers;
    options: RequestOptions;


    constructor(private http: Http) {
        this.url = localStorage.getItem("UrlServico");
        this.url = this.url.replace(/"/g, "");
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
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

    getRegistosPendentes(): Promise<RegistoPendentes> {
        var urlActual = this.url;
        urlActual = urlActual + "getRegistosPendentes";

        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getTerceiros(): Promise<Terceiro[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getTerceiros";
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getUserProTextil(): Promise<UserProTextil[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getUserProTextil";
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    getGrupos(): Promise<Grupos[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getGrupos";
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getCentros(): Promise<Centros[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getCentros";
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getContactos(): Promise<Contactos[]> {
        var urlActual = this.url;
        urlActual = urlActual + "getContactos";
        return this.http.get(urlActual).toPromise().then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    postUserPortal(params: Object) : Promise<String>{
        var urlActual = this.url;
        urlActual = urlActual + "postuserPortal";

        const bodystring = JSON.stringify(params);

        return this.http.post(urlActual, bodystring, this.options).toPromise().then(this.extractData)
        .catch(this.handleErrorPromise);
    }
}
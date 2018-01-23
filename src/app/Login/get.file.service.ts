import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Injectable()
export class GetFileService {
    constructor(private http: HttpClient) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getUrl() {
        let url = './assets/url.txt';
        var self = this;
        return this.http.get(url, { responseType: 'text' })
            .toPromise()
            .then(res => {
                return res;
            });
            // .catch(this.handleError);
    }
}
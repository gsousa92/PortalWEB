import {Injectable} from '@angular/core';
import { Http, ConnectionBackend, Response,Headers, RequestOptions  } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Comentario}  from '../Comentario/comentario';


@Injectable()
export class ComentarioService{
    url: string;
    headers: Headers;
    options: RequestOptions;

    constructor(private http:Http){
        // this.url=" http://192.168.1.4/BestActiveWCF/Service1.svc/";
        this.url=localStorage.getItem("UrlServico");
        this.url= this.url.replace(/"/g,"");
        // this.url="http://inforcavado.dyndns.org:81/ServicoPortalWEB/Service1.svc/";
        this.headers = new Headers({ 'Content-Type': 'application/json', 
        'Accept': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getComentario(params): Promise<Comentario[]>{
        var urlAtual=this.url;
        urlAtual = urlAtual +"getComentario?";
        var count = 0;
        if(params.IDPlanRec!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"IDPlanRec="+ params.IDPlanRec;
            else 
                urlAtual= urlAtual+"&IDPlanRec="+ params.IDPlanRec;
            count++; 
        }
        if(params.IDUtilizador!=undefined){
            if (count == 0)
                urlAtual= urlAtual+"IDUtilizador="+params.IDUtilizador;
            else 
                urlAtual= urlAtual+"&IDUtilizador="+params.IDUtilizador;
            count++;
        }
        return  this.http.get(urlAtual).toPromise().then(this.extraData)
        .catch(this.handleErroPromisse);
    }

    postRegistoComentario(params:Object): Promise<Comentario> {
        
         let bodyString = JSON.stringify(params);
       
         var urlAtual=this.url;
         urlAtual = urlAtual +"postRegistoComentario";
        //  console.log(params);
 
         return this.http.post(urlAtual, bodyString ,this.options).toPromise()
         .then(this.extraData)
         .catch(this.handleErroPromisse);
     }

     postEnviarEmail(params): Promise<Comentario[]>{
        let bodyString = JSON.stringify(params);
        var urlAtual=this.url;
        urlAtual = urlAtual +"postEnviarEmail";
        var count = 0;

        // if(params.nome!=undefined){
        //     if (count == 0)
        //         urlAtual= urlAtual+"nome="+ params.nome;
        //     else 
        //         urlAtual= urlAtual+"&nome="+ params.nome;
        //     count++; 
        // }
        // if(params.comentario!=undefined){
        //     if (count == 0)
        //         urlAtual= urlAtual+"comentario="+params.comentario;
        //     else 
        //         urlAtual= urlAtual+"&comentario="+params.comentario;
        //     count++;
        // }
        // if(params.email!=undefined){
        //     if (count == 0)
        //         urlAtual= urlAtual+"email="+params.email;
        //     else 
        //         urlAtual= urlAtual+"&email="+params.email;
        //     count++;
        // }
        // if(params.codRecurso!=undefined){
        //     if (count == 0)
        //         urlAtual= urlAtual+"codRecurso="+params.codRecurso;
        //     else 
        //         urlAtual= urlAtual+"&codRecurso="+params.codRecurso;
        //     count++;
        // }
        // if(params.OF!=undefined){
        //     if (count == 0)
        //         urlAtual= urlAtual+"OF="+params.OF;
        //     else 
        //         urlAtual= urlAtual+"&OF="+params.OF;
        //     count++;
        // }
        // if(params.IDPlanRec!=undefined){
        //     if (count == 0)
        //         urlAtual= urlAtual+"IDPlanRec="+params.IDPlanRec;
        //     else 
        //         urlAtual= urlAtual+"&IDPlanRec="+params.IDPlanRec;
        //     count++;
        // }
        return  this.http.post(urlAtual, bodyString ,this.options).toPromise().then(this.extraData)
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
}
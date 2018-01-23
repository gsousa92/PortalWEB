import { Injectable } from '@angular/core';

import { Fornecedores, Tamanhos } from './fornecedores';
import { EntradaPecas, RegistoEntrada } from './entradas.reg';
import { RegistoEntradas, Envios, Entradas } from './registo.entradas';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EntradasService {
  private url: string;
  private headers;

  constructor(private http: HttpClient) {
    this.url = localStorage.getItem('UrlServico');
    this.url = this.url.replace(/"/g, '');

    this.headers = new HttpHeaders().set('Content-type', 'application/json');
  }

  private extractData(res) {
    return JSON.parse(res);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getFornecedores(): Promise<Fornecedores[]> {
    return this.http
      .get(this.url + 'getTerceirosEntradaPecas')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getEntradaPecas(params): Promise<EntradaPecas[]> {
    const urlAux =
      this.url + 'getEntradaPecas?&fornecedor=' + params.fornecedor;

    return this.http
      .get(urlAux)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getRegistoEntradas(params): Promise<RegistoEntradas[]> {
    const urlAux =
      this.url +
      'getRegistoEntradas?of=' +
      params.of +
      '&cor=' +
      params.cor +
      '&pc=' +
      params.pc +
      '&fornecedor=' +
      params.fornecedor +
      '&ops=' +
      params.ops;

    return this.http
      .get(urlAux)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTamanhosRegistoEntradas(params): Promise<Tamanhos[]> {
    const urlAux =
      this.url +
      'getTamanhosRegistoEntradas?of=' +
      params.of +
      '&cor=' +
      params.cor +
      '&pc=' +
      params.pc +
      '&fornecedor=' +
      params.fornecedor +
      '&ops=' +
      params.ops;

    return this.http
      .get(urlAux)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getRegistoNovaEntrada(params): Promise<Entradas[]> {
    const urlAux =
      this.url +
      'getRegistoNovaEntrada?of=' +
      params.of +
      '&cor=' +
      params.cor +
      '&pc=' +
      params.pc +
      '&fornecedor=' +
      params.fornecedor +
      '&ops=' +
      params.ops;

    return this.http
      .get(urlAux)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getConsultaEnvios(params): Promise<Envios[]> {
    const urlAux =
      this.url +
      'getConsultaEnvios?of=' +
      params.of +
      '&cor=' +
      params.cor +
      '&pc=' +
      params.pc +
      '&fornecedor=' +
      params.fornecedor +
      '&ops=' +
      params.ops;

    return this.http
      .get(urlAux)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getConsultaEntradas(params): Promise<Entradas[]> {
    const urlAux =
      this.url +
      'getConsultaEntradas?of=' +
      params.of +
      '&cor=' +
      params.cor +
      '&pc=' +
      params.pc +
      '&fornecedor=' +
      params.fornecedor +
      '&ops=' +
      params.ops;

    return this.http
      .get(urlAux)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  verificarVDoc(params): Promise<Boolean> {
    const urlAux =
      this.url +
      'verificarVDoc?of=' +
      params.Enc +
      '&cor=' +
      params.Cor +
      '&pc=' +
      params.Pc +
      '&fornecedor=' +
      params.Terc +
      '&vdoc=' +
      params.VDoc +
      '&data=' +
      params.Data;

    return this.http
      .get(urlAux)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  postNovoRegistoEntrada(params): Promise<String> {
    const bodyString = JSON.stringify(params);
    const urlAtual =
      this.url +
      'novoRegistoEntradas?of=' +
      params.Enc +
      '&art=' +
      params.Art +
      '&cor=' +
      params.Cor +
      '&pc=' +
      params.Pc +
      '&fornecedor=' +
      params.Terc +
      '&tam=' +
      params.Tam +
      '&ops=' +
      params.Ops;

    return this.http
      .post(urlAtual, bodyString, { headers: this.headers })
      .toPromise()
      .then(res => {
        if (res) {
          return <String> res;
        }
      }).catch(this.handleError);
  }
}

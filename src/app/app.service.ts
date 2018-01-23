import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() {}

  getVisibleCatalogo() {
    const utilizador = JSON.parse(localStorage.getItem('Utilizador'));
    if (utilizador) {
      if (utilizador.GrupoID === 'Forn') {
        return true;
      } else if (utilizador.GrupoID === 'Cli') {
        return false;
      } else {
        return false;
      }
    }
  }

  getVisibleFornecedor() {
    const utilizador = JSON.parse(localStorage.getItem('Utilizador'));
    if (utilizador) {
      if (utilizador.GrupoID === 'Forn') {
        return false;
      } else if (utilizador.GrupoID === 'Cli') {
        return true;
      } else {
        return false;
      }
    }
  }

  getVisibleEntradas() {
    const utilizador = JSON.parse(localStorage.getItem('Utilizador'));
    if (utilizador) {
      if (utilizador.GrupoID === 'Cli') {
        return true;
      } else {
        return false;
      }
    }
  }
}

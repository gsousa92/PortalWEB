import { Component } from '@angular/core';


import { SlideoutService } from './slideout/slideout.service'



import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  utilizador;

  // FronecedoresVisible:boolean;
  // CatalogoVisible:boolean;

  constructor(private slideoutservice: SlideoutService, private router: Router,
    private route: ActivatedRoute, private appservice: AppService) {
    const self = this;
    $(document).ready(function () {
      self.slideoutservice.init(document.getElementById('panel'), document.getElementById('menu'));
      self.slideoutservice.disableTouch();
    });



  }
  getVisibleCatalogo() {
    return this.appservice.getVisibleCatalogo();
  }

  getVisibleFornecedor() {
    return this.appservice.getVisibleFornecedor();
  }

  getVisibleEntradas() {
    return this.appservice.getVisibleEntradas();
  }
  // getCatalogoIconSlideoutState() {
  //   return this.appservice.getShowItem('CalalogoVisible');
  // }

  Fornecedores() {
    this.router.navigate(['fornecedores']);
    this.slideoutservice.close();
  }
  Calalogo() {
    this.router.navigate(['catalogo']);
    this.slideoutservice.close();
  }
  Entradas() {
    this.router.navigate(['entradas']);
    this.slideoutservice.close();
  }
}

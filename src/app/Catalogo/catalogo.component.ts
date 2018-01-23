import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Pipe,
  PipeTransform
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { SlideoutService } from '../slideout/slideout.service';
import { CatalogoService } from '../Catalogo/catalogo.service';

import { FornecedorService } from '../Fornecedores/fornecedor.service';
import { forEach } from '@angular/router/src/utils/collection';

import { DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';

import FileSaver from 'file-saver';
import mime from 'mime-types';

@Component({
  templateUrl: 'catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements AfterViewInit, OnInit {
  popHidden() {
    $('body').css('overflow-y', 'auto');
  }

  popShown() {
    $('body').css('overflow-y', 'hidden');
  }

  resizePopupDetalhes() {
    var width = $(window).width();
    var height = $(window).height();

    var pop = this.popupDetalhes.instance;

    if (pop) {
      if (width < 1400) {
        pop.option('width', '100%');
        pop.repaint();
      } else {
        pop.option('width', '1200px');
        pop.repaint();
      }
      if (height < 930) {
        pop.option('height', '100%');
        pop.repaint();
      } else {
        pop.option('height', '700px');
        pop.repaint();
      }
    }
  }

  @ViewChild('botaoMenu') element: ElementRef;
  @ViewChild('popupDetalhes') popupDetalhes: DxPopupComponent;

  utilizador: any = {};
  AcessoAdmin: boolean;
  atualCliente: any;
  clientReadOnly: boolean;
  DsClientes: any = {};
  DsArtigo: any = [];

  DsAnoArtigo: any = [];
  popupVisible: boolean;
  ano;

  TituloArtigo: string;

  imagemArtigo;
  descricao;
  codigo;
  cores;
  Data: Date;
  largura;
  altura;
  tecnica;
  marca;
  VRef;
  arrumacao;

  term;

  constructor(
    private catalogoservice: CatalogoService,
    private fornecedorService: FornecedorService,
    private slideoutservice: SlideoutService,
    private renderer: Renderer2,
    element: ElementRef,
    private router: Router
  ) {
    if (localStorage.getItem('Utilizador')) {
      this.utilizador = JSON.parse(localStorage.getItem('Utilizador'));
      if (this.utilizador.GrupoID == 'Admin') {
        this.AcessoAdmin = false;
      } else {
        this.AcessoAdmin = true;
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  ngAfterViewInit() {
    var self = this;

    let listener = this.renderer.listen(
      this.element.nativeElement,
      'click',
      event => {
        self.slideoutservice.toggle();
      }
    );
  }

  ngOnInit() {
    this.CarregaCombo();
    var self = this;
    $(document).ready(function() {
      $(window).on('resize', function() {
        self.resizePopupDetalhes();
      });
    });
  }

  CarregaCombo() {
    const self = this;
    this.catalogoservice
      .getCliente(this.utilizador.ID_Terceiro)
      .then(function(resultado) {
        if (self.utilizador.ID_Terceiro !== '') {
          self.atualCliente = resultado[0].Codigo;
          self.clientReadOnly = true;
        } else {
          self.clientReadOnly = false;
        }
        if (resultado) {
          self.DsClientes = new DataSource({
            store: resultado
          });
        }
      });
  }

  changeImagemYear() {
    const params: any = {};
    var selt = this;
    params.cod = this.atualCliente;

    if (this.ano != 'Todos') {
      params.anoArtigo = this.ano;
      this.catalogoservice.getArtigos(params).then(function(resultado) {
        if (resultado) {
          // console.log(resultado);
          selt.DsArtigo = resultado;
        }

        resultado.forEach(function(item) {
          selt.catalogoservice
            .getImagens(item.caminho)
            .then(function(resultado) {
              if (resultado != '') {
                item.imagem = 'url(data:image/jpeg;base64,' + resultado + ')';
              }
            });
        });
      });
    } else {
      this.catalogoservice.getArtigos(params).then(function(resultado) {
        if (resultado) {
          // console.log(resultado);
          selt.DsArtigo = resultado;
        }

        resultado.forEach(function(item) {
          selt.catalogoservice
            .getImagens(item.caminho)
            .then(function(resultado) {
              if (resultado != '') {
                item.imagem = 'url(data:image/jpeg;base64,' + resultado + ')';
              }
            });
        });
      });
    }
  }

  ChangeCliente() {
    const params: any = {};
    var selt = this;
    params.cod = this.atualCliente;
    if (this.atualCliente !== undefined) {
      this.catalogoservice.getAnoArtigo(params).then(function(result) {
        if (result) {
          selt.DsAnoArtigo = result;
        }
      });
      this.catalogoservice.getArtigos(params).then(function(resultado) {
        if (resultado) {
          // console.log(resultado);
          selt.DsArtigo = resultado;
        }

        resultado.forEach(function(item) {
          selt.catalogoservice
            .getImagens(item.caminho)
            .then(function(resultado) {
              if (resultado != '') {
                item.imagem = 'url(data:image/jpeg;base64,' + resultado + ')';
              }
            })
            .catch(function(erro) {
              item.imagem = 'url(./assets/Imagens/imagem_nao_disponivel.png)';
            });
        });
      });
    }
  }

  ShowInfo(e: any) {
    console.log(e);
    this.popupVisible = true;
    this.imagemArtigo = e.imagem;
    this.TituloArtigo = 'Ref.Interna ' + e.codigo + ' - ' + e.descricao;
    // console.log(this.imagemArtigo);
    this.descricao = e.descricao;
    this.codigo = e.codigo;
    this.cores = e.cores;
    this.Data = new Date(e.data);
    this.tecnica = e.tecnica;
    this.altura = e.altura;
    this.largura = e.largura;
    this.marca = e.marca;
    this.arrumacao = e.arrumacao;
    this.VRef = e.VRef;
  }

  LogOut() {
    this.slideoutservice.close();
    localStorage.removeItem('Utilizador');
    this.fornecedorService.setCodigoFornecedor('');
    this.router.navigate(['login']);
  }
  RegistoPendentes() {
    this.router.navigate(['registoPendentes']);
  }
}

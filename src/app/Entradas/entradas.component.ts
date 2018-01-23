import { EntradaPecas, RegistoEntrada } from './entradas.reg';
import { RegistoEntradas } from './registo.entradas';
import { EntradasService } from './entradas.service';

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { resolve } from 'url';
import {
  DxDataGridComponent,
  DxTextBoxComponent,
  DxPopupComponent,
  DxPopoverComponent
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

import { SlideoutService } from '../slideout/slideout.service';
import { FornecedorService } from '../Fornecedores/fornecedor.service';
import { Utilizador } from '../Login/utilizador';

@Component({
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit, AfterViewInit {
  dsFornecedores: any = {};
  dsEntradaPecas: any = {};
  dsRegistoEntradas: any = {};
  dsConsultaEnvios: any = {};
  dsConsultaEntradas: any = {};

  utilizador: any = {};
  AcessoAdmin;
  fixedForn = '';
  lastRowClicked;
  toolbarElement: any;

  atual = {
    Cor: '',
    Of: '',
    Ref: '',
    Pc: '',
    CodigoForn: '',
    Ops: ''
  };

  verHistoricoParams = {
    Of: '',
    NDoc: '',
    DataInicio: Date(),
    DataFim: Date()
  };

  popupVisible = {
    RegistoEntradas: false,
    RegistoNovaEntrada: false,
    ConsultaEnvios: false,
    ConsultaEntradas: false,
    AvisoExcessoEntradas: false,
    VerHistorico: false
  };
  readOnlyComboForn = false;
  verPendentes = true;

  arrayTamExcesso = [, ];

  novoRegisto = {
    dataRegistoEntrada: Date(),
    vDoc: '',
    partida: ''
  };

  arrayTam = [, ];

  @ViewChild('gridEntradaPecas') gridEntradaPecas: any;
  @ViewChild('botaoMenu') element: ElementRef;
  @ViewChild('popupConsultaEntradas')
  popupConsultaEntradasInstance: DxPopupComponent;
  @ViewChild('popupConsultaEnvios')
  popupConsultaEnviosInstance: DxPopupComponent;
  @ViewChild('popupRegistoEntradas') popupRegistoEntradasInstance: DxPopupComponent;
  @ViewChild('popRegistoNovaEntrada') popupNovoRegistoInstance: DxPopupComponent;
  @ViewChild('popupAvisoExcessoEntradas')
  popupAvisoExcessoEntradasInstance: DxPopupComponent;

  gridRegistoEntradas: any;

  constructor(
    private EntradasService: EntradasService,
    private activeRoute: ActivatedRoute,
    private slideoutservice: SlideoutService,
    private router: Router,
    private renderer: Renderer2,
    element: ElementRef,
    private fornecedorService: FornecedorService
  ) {}

  ngAfterViewInit() {
    const self = this;
    const listener = this.renderer.listen(
      this.element.nativeElement,
      'click',
      event => {
        self.slideoutservice.toggle();
      }
    );
  }

  popupRegistoEntradas() {
    this.dsRegistoEntradas = null;
    this.arrayTam = [];
    const self = this;

    const params: any = {};
    params.of = this.atual.Of;
    params.cor = this.atual.Cor;
    params.pc = this.atual.Pc;
    params.fornecedor = this.atual.CodigoForn;
    params.ops = this.atual.Ops;

    this.EntradasService.getTamanhosRegistoEntradas(params).then(function(
      result
    ) {
      if (result) {
        self.arrayTam[0] = ' ';
        for (let i = 1; i < result.length + 1; i++) {
          self.arrayTam[i] = result[i - 1].Tam.toString();
        }
      }
    });

    const source = new CustomStore({
      load: loadOption => {
        return new Promise((_resolve, reject) => {
          this.EntradasService.getRegistoEntradas(params).then(function(
            fornecedor
          ) {
            if (fornecedor) {
              _resolve(fornecedor);
            } else {
              reject('Sem dados');
            }
          });
        });
      }
    });


    this.dsRegistoEntradas = new DataSource({
      store: source
    });

    this.openPopup('RegistoEntradas');
  }

  popupRegistoNovaEntrada() {
    this.dsRegistoEntradas = null;
    this.arrayTam = [];
    const self = this;

    const params: any = {};
    params.of = this.atual.Of;
    params.cor = this.atual.Cor;
    params.pc = this.atual.Pc;
    params.fornecedor = this.atual.CodigoForn;
    params.ops = this.atual.Ops;

    this.EntradasService.getTamanhosRegistoEntradas(params).then(function(
      result
    ) {
      if (result) {
        self.arrayTam[0] = ' ';
        for (let i = 1; i < result.length + 1; i++) {
          self.arrayTam[i] = result[i - 1].Tam.toString();
        }
      }
    });

    const source = new CustomStore({
      load: loadOption => {
        return new Promise((_resolve, reject) => {
          this.EntradasService.getRegistoNovaEntrada(params).then(function(
            fornecedor
          ) {
            if (fornecedor) {
              _resolve(fornecedor);
            } else {
              reject('Sem dados');
            }
          });
        });
      }
    });

    this.dsRegistoEntradas = new DataSource({
      store: source
    });

    this.openPopup('RegistoNovaEntrada');
  }


  onInitializedGridRegistoEntradas(e) {
    this.gridRegistoEntradas = e.component;
  }

  novoRegistoEntrada() {
    this.arrayTamExcesso.length = 0;
    let j = 0;
    const that = this;
    const params: any = {};
    const d = new Date(this.novoRegisto.dataRegistoEntrada);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

    const faltaRowObj = this.gridRegistoEntradas.getVisibleRows()[1].data;
    const movRowObj: any = this.gridRegistoEntradas.getVisibleRows()[2].data;

    const arraySize = Object.keys(this.arrayTam).length;
    const arrayAux = Array.from(this.arrayTam);
    arrayAux.splice(arrayAux.indexOf(' '), 1);

    params.Enc = this.atual.Of;
    params.Cor = this.atual.Cor;
    params.Pc = this.atual.Pc;
    params.VDoc = this.novoRegisto.vDoc;
    params.Terc = this.atual.CodigoForn;
    params.Data = d.toUTCString();

    this.EntradasService.verificarVDoc(params).then(function(result) {
      if (result) {
        for (let i = 0; i < arraySize - 1; i++) {
          if (
            movRowObj[arrayAux[i].toString()] >
              faltaRowObj[arrayAux[i].toString()] &&
            movRowObj[arrayAux[i].toString()] !== 0
          ) {
            that.arrayTamExcesso[j] = arrayAux[i].toString();
            j++;
          }
        }
        if (j > 0) {
          that.openPopup('AvisoExcessoEntradas');
        } else {
          that.postNovoRegistoEntrada();
        }
      } else {
        notify('V.Doc já utilizado', 'error', 3000);
      }
    });
  }

  postNovoRegistoEntrada() {
    const that = this;
    const params: any = {};
    const d = new Date(this.novoRegisto.dataRegistoEntrada);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

    const faltaRowObj = this.gridRegistoEntradas.getVisibleRows()[1].data;
    const movRowObj: any = this.gridRegistoEntradas.getVisibleRows()[2].data;

    const arraySize = Object.keys(this.arrayTam).length;
    const arrayAux = Array.from(this.arrayTam);
    arrayAux.splice(arrayAux.indexOf(' '), 1);

    params.Enc = this.atual.Of;
    params.Art = this.atual.Ref;
    params.Cor = this.atual.Cor;
    params.Pc = this.atual.Pc;
    params.VDoc = this.novoRegisto.vDoc;
    params.Terc = this.atual.CodigoForn;
    params.Data = d.toUTCString();
    params.Ops = this.atual.Ops;
    params.Partida = this.novoRegisto.partida;

    for (let i = 0; i < arraySize - 1; i++) {
      if (movRowObj[arrayAux[i].toString()] > 0) {
        params.Entrada = movRowObj[arrayAux[i].toString()];
        params.Tam = arrayAux[i].toString();
        params.Data = '/Date(' + d.getTime() + ')/';
        this.EntradasService.postNovoRegistoEntrada(params);
      }
    }
    this.loadGrid(this.atual.CodigoForn);
    this.closePopup('RegistoEntradas');
    this.closePopup('AvisoExcessoEntradas');
  }

  popupConsultaEnvios() {
    const params: any = {};

    params.of = this.atual.Of;
    params.cor = this.atual.Cor;
    params.pc = this.atual.Pc;
    params.fornecedor = this.atual.CodigoForn;
    params.ops = this.atual.Ops;

    const source = new CustomStore({
      load: loadOption => {
        return new Promise((_resolve, reject) => {
          this.EntradasService.getConsultaEnvios(params).then(function(result) {
            if (result) {
              _resolve(result);
            } else {
              reject('Sem dados');
            }
          });
        });
      }
    });
    this.dsConsultaEnvios = new DataSource({
      store: source
    });
    this.openPopup('ConsultaEnvios');
  }

  popupConsultaEntradas() {
    const params: any = {};

    params.of = this.atual.Of;
    params.cor = this.atual.Cor;
    params.pc = this.atual.Pc;
    params.fornecedor = this.atual.CodigoForn;
    params.ops = this.atual.Ops;

    const source = new CustomStore({
      load: loadOption => {
        return new Promise((_resolve, reject) => {
          this.EntradasService.getConsultaEntradas(params).then(function(
            entradas
          ) {
            if (entradas) {
              _resolve(entradas);
            } else {
              _resolve(entradas);
            }
          });
        });
      }
    });
    this.dsConsultaEntradas = new DataSource({
      store: source
    });
    this.openPopup('ConsultaEntradas');
  }

  loadCombo() {
    const self = this;
    this.EntradasService.getFornecedores().then(result => {
      if (result) {
        self.dsFornecedores = new DataSource({
          store: result
        });
      }
    });
  }

  loadGrid(Terc) {
    const params: any = {};

    params.fornecedor = Terc;
    const source = new CustomStore({
      load: loadOption => {
        return new Promise((_resolve, reject) => {
          this.EntradasService.getEntradaPecas(params).then(function(
            entradaPecas
          ) {
            if (entradaPecas) {
              for (let i = 0; i < entradaPecas.length; i++) {
                if (entradaPecas[i].Ops.toString() !== '0') {
                  entradaPecas[i].EncOps =
                    entradaPecas[i].Enc + ' / ' + entradaPecas[i].Ops;
                } else {
                  entradaPecas[i].EncOps = entradaPecas[i].Enc;
                }
              }
              _resolve(entradaPecas);
            } else {
              reject('Sem dados');
            }
          });
        });
      }
    });
    this.dsEntradaPecas = new DataSource({
      store: source
    });
  }

  changeForn(e: any) {
    this.lastRowClicked = undefined;

    this.atual.CodigoForn = e.selectedItem.Codigo;
    console.log(this.atual.CodigoForn);

    this.loadGrid(e.selectedItem.Codigo);
  }

  toggleHistoricoPendentes(e) {
    this.verPendentes = !this.verPendentes;
    console.log(this.verPendentes);
    if (!this.verPendentes) {
      this.openPopup('VerHistorico');
    }

    e.component.option({
      text: this.verPendentes ? 'Ver histórico' : 'Ver pendentes',
      icon: this.verPendentes
        ? './assets/Imagens/verHistorico.svg'
        : './assets/Imagens/verPendentes.svg'
    });
  }

  addBtnHistoricoPendentes(e) {
    this.toolbarElement = e;
    e.toolbarOptions.items.unshift({
      class: 'verHistoricoPendentes',
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Ver histórico',
        icon: './assets/Imagens/verHistorico.svg',
        onClick: this.toggleHistoricoPendentes.bind(this)
      }
    });
  }

  onCLickConfirmarVerHistorico() {
    this.closePopup('VerHistorico');
  }

  onClickNovoRegistoEntrada() {
    if (this.lastRowClicked !== undefined) {
      this.popupRegistoNovaEntrada();
    }
  }

  onClickConsultarEnvios() {
    if (this.lastRowClicked !== undefined) {
      this.popupConsultaEnvios();
    }
  }

  onClickConsultarEntradas() {
    if (this.lastRowClicked !== undefined) {
      const selectedRowObj: any = this.gridEntradaPecas.instance.getSelectedRowsData()[0];
      if (
        selectedRowObj.Recebido !== 0 &&
        selectedRowObj.Recebido !== undefined
      ) {
        this.popupConsultaEntradas();
      } else {
        notify('Não existem entradas disponíveis', 'error', 2000);
      }
    }
  }

  rowClicked(e: any) {
    this.atual.Cor = e.data.Cor;
    this.atual.Of = e.data.Enc;
    this.atual.Pc = e.data.PcNum;
    this.atual.Ref = e.data.Art;
    this.atual.Ops = e.data.Ops;

    if (this.lastRowClicked === e.rowIndex) {
      this.popupRegistoEntradas();
    } else {
      this.lastRowClicked = e.rowIndex;
    }
  }

  onEditorRegistoEntradas(e: any) {
    e.editorOptions.disabled = !(e.row.rowIndex === 2 && e.index > 0);
  }

  closePopup(popup: string) {
    this.popupVisible[popup] = false;
    if (popup === 'RegistoEntradas') {
      for (
        let i = 1;
        i < this.gridRegistoEntradas.getVisibleRows()[2].data.lenght;
        i++
      ) {
        this.gridRegistoEntradas.getVisibleRows()[2].data[i].fill(0);
      }
    }
    $('body').css('overflow-y', 'auto');
  }

  popShown() {
    $('body').css('overflow-y', 'hidden');
  }

  openPopup(popup: string) {
    window.scrollTo(0, 0);
    this.popupVisible[popup] = true;
    this.resizePopupDetalhes();
  }

  onInitPopup(e: any) {
    e.component.registerKeyHandler('escape', function(arg) {
      arg.stopPropagation();
    });
  }

  ngOnInit() {
    const that = this;
    this.loadCombo();

    if (localStorage.getItem('Utilizador')) {
      this.utilizador = JSON.parse(localStorage.getItem('Utilizador'));
      if (this.utilizador.ID_Terceiro !== '') {
        this.atual.CodigoForn = this.utilizador.ID_Terceiro;
        this.readOnlyComboForn = true;
        this.fixedForn = this.utilizador.ID_Terceiro + '|2';
        this.loadGrid(this.utilizador.ID_Terceiro);
      }

      if (this.utilizador.GrupoID === 'Admin') {
        this.AcessoAdmin = false;
      } else {
        this.AcessoAdmin = true;
      }
    }

    $(document).ready(function() {
      $(window).on('resize', function() {
        that.resizePopupDetalhes();
      });
    });
  }

  RegistoPendentes() {
    this.router.navigate(['registoPendentes']);
  }

  LogOut() {
    this.slideoutservice.close();
    localStorage.removeItem('Utilizador');
    this.fornecedorService.setCodigoFornecedor('');
    this.router.navigate(['login']);
  }

  resizePopupDetalhes() {
    const width = $(window).width();
    const height = $(window).height();
    let popupConsultaEntradas;
    let popupConsultaEnvios;
    let popupRegistoEntradas;
    let popupAvisoExcessoEntradas;

    if (this.popupConsultaEntradasInstance.instance !== undefined) {
      popupConsultaEntradas = this.popupConsultaEntradasInstance.instance;
    }
    if (this.popupConsultaEnviosInstance.instance !== undefined) {
      popupConsultaEnvios = this.popupConsultaEnviosInstance.instance;
    }
    if (this.popupNovoRegistoInstance.instance !== undefined) {
      popupRegistoEntradas = this.popupNovoRegistoInstance.instance;
    }
    if (this.popupAvisoExcessoEntradasInstance.instance !== undefined) {
      popupAvisoExcessoEntradas = this.popupAvisoExcessoEntradasInstance
        .instance;
    }

    if (popupConsultaEntradas) {
      if (width < 1400) {
        popupConsultaEntradas.option('width', '100%');
        popupConsultaEntradas.repaint();
      } else {
        popupConsultaEntradas.option('width', '1200px');
        popupConsultaEntradas.repaint();
      }
      if (height < 950) {
        popupConsultaEntradas.option('height', '100%');
        popupConsultaEntradas.repaint();
      } else {
        popupConsultaEntradas.option('height', '800px');
        popupConsultaEntradas.repaint();
      }
    }
    if (popupConsultaEnvios) {
      if (width < 1400) {
        popupConsultaEnvios.option('width', '100%');
        popupConsultaEnvios.repaint();
      } else {
        popupConsultaEnvios.option('width', '1200px');
        popupConsultaEnvios.repaint();
      }
      if (height < 950) {
        popupConsultaEnvios.option('height', '100%');
        popupConsultaEnvios.repaint();
      } else {
        popupConsultaEnvios.option('height', '800px');
        popupConsultaEnvios.repaint();
      }
    }
    if (popupRegistoEntradas) {
      if (width < 1400) {
        popupRegistoEntradas.option('width', '100%');
        popupRegistoEntradas.repaint();
      } else {
        popupRegistoEntradas.option('width', '850');
        popupRegistoEntradas.repaint();
      }
      if (height < 950) {
        if (width > 1400) {
          popupRegistoEntradas.option('height', '480px');
          popupRegistoEntradas.repaint();
        } else {
          popupRegistoEntradas.option('height', '100%');
          popupRegistoEntradas.repaint();
        }
      } else {
        popupRegistoEntradas.option('height', '800px');
        popupRegistoEntradas.repaint();
      }
    }
    if (popupAvisoExcessoEntradas) {
      if (width < 1400 || height < 950) {
        popupAvisoExcessoEntradas.option('width', '100%');
        popupAvisoExcessoEntradas.option('height', '100%');
        popupAvisoExcessoEntradas.repaint();
      } else {
        popupAvisoExcessoEntradas.option('width', '600px');
        popupAvisoExcessoEntradas.option('height', '240px');
        popupAvisoExcessoEntradas.repaint();
      }
    }
  }
}

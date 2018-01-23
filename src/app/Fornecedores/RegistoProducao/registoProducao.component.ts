import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { RegistoProducaoService } from '../RegistoProducao/registoProducao.service';

import { SlideoutService } from '../../slideout/slideout.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';
import { Console } from '@angular/core/src/console';
import { log } from 'util';

import { DxPopupComponent } from 'devextreme-angular';

import notify from 'devextreme/ui/notify';


@Component({
  //  selector:'menu',
  templateUrl: 'registoProducao.component.html',
  styleUrls: ['registoProducao.component.css']
})
export class RegistoProducaoComponent implements OnInit, AfterViewInit {
  @ViewChild('botaoMenu') element: ElementRef;

  fornecedorOF: any = {};
  pc: any = {};
  nPessoa;
  cor: any = {};
  data: any;
  dataSource: any = {};
  ordemFabrico: any = {};
  seccao: any = {};
  cores: any = {};
  gridQuantidades: any = {};

  popupVisible = false;
  txtdescricao: null;

  btnEliminar;

  selectedItems: any = {};

  gridInstance: any;
  gridRegistos: any;
  Enc: any;
  artigo: any;
  op: any;

  clickTimer: any;
  lastRowCLickedId: any;

  slideout: any;
  Data;
  tipoDoc;

  utilizador: any = {};

  add: boolean;
  edit: boolean;

  private sub: any;

  Ativo = false;

  numeroPessoas: number;
  AcessoAdmin;

  CodRecurso;

  @ViewChild('PopupRegisto') PopupRegisto: DxPopupComponent;

  onInitializedEventHandler(e) {
    this.gridInstance = e.component;

  }

  onInitializedEventHandlerDate(e) {
    this.data = e.component;
    //  console.log(this.data);
  }

  popHidden() {
    $("body").css("overflow-y", "auto");
  }
  popShown() {
    $("body").css("overflow-y", "hidden");
  }
  resizePopupDetalhes() {
    var width = $(window).width();
    var height = $(window).height();

    var popupRegisto = this.PopupRegisto.instance;

    if (popupRegisto) {
      if (width < 1400) {
        popupRegisto.option("width", "100%");
        popupRegisto.repaint();

      } else {
        popupRegisto.option("width", "1200px");
        popupRegisto.repaint();

      }
      if (height < 900) {
        popupRegisto.option("height", "100%");
        popupRegisto.repaint();

      } else {
        popupRegisto.option("height", "800px");
        popupRegisto.repaint();
      }
    }
  }

  constructor(
    private registoProducaoService: RegistoProducaoService,
    private router: Router,
    private route: ActivatedRoute,
    private slideoutservice: SlideoutService,
    private fornecedorservice: FornecedorService,
    private renderer: Renderer2,
    element: ElementRef
  ) {
    if (localStorage.getItem('Utilizador')) {
      this.utilizador = JSON.parse(localStorage.getItem('Utilizador'));
      this.sub = this.route.params.subscribe(params => {
        this.fornecedorOF = +params['OF'];
        this.CodRecurso = params['CodRecurso'];
      });
      if (this.utilizador.GrupoID == "Admin") {
        this.AcessoAdmin = false;
      }
      else {
        this.AcessoAdmin = true;
      }

      // this.Enc=this.fornecedorOF;
      // this.fornecedorOF=this.fornecedorservice.selectedOF;
      const paramsOF = this.fornecedorOF;
      // console.log(this.fornecedorOF);
      var seft = this;
      const source = new CustomStore({
        load: loadOption => {
          return new Promise((resolve, reject) => {
            this.registoProducaoService
              .getRegistoProducao(paramsOF)
              .then(function (registoproducao) {
                if (registoproducao) {
                  if (registoproducao.length > 0)
                    seft.numeroPessoas = registoproducao[registoproducao.length - 1].NPessoas;
                  // console.log('Regpro:    ' + registoproducao);
                  resolve(registoproducao);
                } else {
                  reject('Sem dados');
                }
              });
          });
        },
        byKey: key => {
          return key;
        }
      });

      this.dataSource = new DataSource({
        store: source
      });
    } else {
      this.router.navigate(['login']);
    }
  }

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

  ngOnInit() {
    const params: any = {};

    const self = this;

    $(document).ready(function () {
      $(window).on("resize", function () {
        self.resizePopupDetalhes();
      })
    });
    this.getOrdemFabrico();

    this.registoProducaoService
      .getSeccao(this.CodRecurso)
      .then(function (seccao) {
        if (seccao) {
          self.seccao = new DataSource({
            store: seccao,

          });
          if (seccao.length === 1) {
            self.pc = seccao[0].pc;
          }
        } else {
        }
      });
  }

  RegistoProducao() {
    this.Data = new Date();

    this.getOrdemFabrico();
    this.fornecedorOF = parseFloat(this.fornecedorOF);
    this.Enc = this.fornecedorOF;
    // console.log(Object.keys(this.seccao._items));
    // this.seccao = null;


    const self = this;
    if (this.gridRegistos != null) {
      this.nPessoa = this.gridRegistos.NPessoas;
      this.fornecedorOF = this.gridRegistos.Enc;
      this.Enc = this.gridRegistos.Enc;
    } else {
      this.nPessoa = this.numeroPessoas;
    }

    this.gridQuantidades = null;

    this.edit = false;
    this.add = true;

    this.Ativo = false;
    this.popupVisible = true;
    this.btnEliminar = false;
  }

  EditarProducao() {
    // NA PRIMEIRA ENTRADA, 'OF' MUDA
    const p: any = {};
    var data = new Date(this.gridRegistos.Data);
    // this.url= this.url.replace(/"/g,"");
    const self = this;
    p.data = data.toUTCString();
    p.horasDiferenciais = 24;
    this.registoProducaoService.getValidarData(p).then(function (resultado) {

      if (resultado) {
        // console.log(resultado);
        if (self.gridRegistos != null) {
          self.getOrdemFabrico();
          self.fillPopup();
          self.add = false;
          self.edit = true;
          self.Ativo = true; // READ-ONLY
          self.popupVisible = true;
          self.btnEliminar = true;
        }
      } else {
        notify("Não pode alterar registo de produção ", "error", 1000);
      }
    }).catch();
    //   if (resultado) {

  }

  changeOF(e: any) {
    const self = this;
    const params: any = {};

    if (this.edit) {
      // var data = new Date(this.gridRegistos.Data);
      // // this.url= this.url.replace(/"/g,"");

      // p.data = data.toUTCString();
      // p.horasDiferenciais = 24;
      // this.registoProducaoService.getValidarData(p).then(function (resultado) {
      //   if (resultado) {
      console.log('edit');
      params.of = self.gridRegistos.Enc;
      params.formato = self.gridRegistos.formato;
      params.tipo = self.gridRegistos.Doc;
      params.refer = self.gridRegistos.Refer;

      self.registoProducaoService.getCores(params).then(function (cores) {
        if (cores) {
          self.cores = new DataSource({
            store: cores
          });
        }
      });

      self.registoProducaoService
        .getQuantidadeTamanhosEncomenda(params)
        .then(function (quantidades) {
          if (quantidades) {
            self.gridQuantidades = new DataSource({
              store: quantidades
            });
            const cols = [];
            for (const i in quantidades[0]) {
              if (quantidades.length > 0) {
                cols.push({
                  dataField: i
                });
              }
            }

            self.gridInstance.option('dataSource', self.gridQuantidades);
            self.gridInstance.option('columns', cols);
          }
        });
      // }else
      // {
      //   this.popupVisible = false;
      // }
      // });

    } else if (this.add) {          // ADICIONAR
      console.log('ADD');
      console.log(this.gridInstance);
      params.of = e.selectedItem.Enc;
      params.refer = e.selectedItem.Artigo;
      this.op = e.selectedItem.Ops;
      this.artigo = e.selectedItem.Artigo;
      setTimeout(() => {
        this.txtdescricao = e.selectedItem.Descricao;
        // this.pc = {};
        this.cor = {};
      });

      this.registoProducaoService.getCores(params).then(function (cores) {
        if (cores) {
          self.cores = new DataSource({
            store: cores
          });
        }
        if (cores.length == 1) {
          self.cor = cores[0].cor;
        }

      });
      // this.pc = {};
      // this.cor = {};

      this.registoProducaoService
        .getQuantidadeTamanhosEncomenda(params)
        .then(function (quantidades) {
          if (quantidades) {
            self.gridQuantidades = new DataSource({
              store: quantidades
            });
            const cols = [];
            for (const i in quantidades[0]) {
              if (quantidades.length > 0) {
                cols.push({
                  dataField: i
                });
              }
            }

            self.gridInstance.option('dataSource', self.gridQuantidades);
            self.gridInstance.option('columns', cols);
          }
        });
    }
  }

  showInfo(e: any) {
    // QUANDO O UTILIZADOR CARREGA NUMA LINHA, OS DADOS DESSA LINHA SAO CARREGADOS
    this.gridRegistos = e.data;
    const self = this;
    if (this.clickTimer && this.lastRowCLickedId === e.rowIndex) {
      clearTimeout(this.clickTimer);
      this.clickTimer = null;
      this.lastRowCLickedId = e.rowIndex;
      this.EditarProducao();
      this.resizePopupDetalhes();
    } else {
      this.clickTimer = setTimeout(function () { }, 250);
    }
    this.lastRowCLickedId = e.rowIndex;
  }

  Save() {
    const d = new Date(this.data.option('value'));

    const params: any = {};

    if (this.utilizador.ID_Terceiro) {
      params.Terceiro = this.utilizador.ID_Terceiro;
      params.LogUser = 0;
    }
    else {
      params.Terceiro = this.CodRecurso;
      params.LogUser = this.utilizador.ID;
    }



    params.Grupo = 2;
    params.Data = '/Date(' + d.getTime() + ')/';

    params.Entrada = 0;

    params.IdMov = 0;
    params.PrecoBase = 0;
    params.Serie = '';
    params.Un = '';
    params.UnMov = '';
    params.UnFactor = 0;
    params.DescontoGlobal = 0;
    params.Agravamento = 0;
    params.TaxaIva = 0;
    params.SnLote = 0;
    params.Partida = '';
    params.Largura = 0;
    params.Gramagem = 0;
    params.FactorConv = 0;
    params.Beneficiar = 0;
    params.SnFactorPeso = 0;

    params.VtDoc = 'web';
    params.Fase = 1;
    params.nVol = this.nPessoa;
    params.GridQuantidade = JSON.stringify(
      this.gridInstance.getVisibleRows()[0].data
    );

    var self = this;
    if (this.gridRegistos != undefined) {
      // console.log(this.gridRegistos);
      params.OrdemFabrico = this.gridRegistos.Enc;
      params.Artigo = this.gridRegistos.Refer;
      params.Cor = this.gridRegistos.Cor;
      params.PontosControl = this.gridRegistos.PC;
      params.OP = this.gridRegistos.OPS;
      params.VnDoc = this.gridRegistos.Doc;
      // console.log(params);
      this.registoProducaoService
        .InserirEditarEliminarQuantidadesRegistoProducao(params)
        .then(function (result) {
          if (result) {
            location.reload();
            self.router.navigate(['registoProducao', self.CodRecurso, params.OrdemFabrico]);
            // self.AtualizarRegisto();

            // self.popupVisible = false;
          }
        })
        .catch(error => console.log(error));
    }
    else {
      if (this.fornecedorOF) {
        params.OrdemFabrico = this.fornecedorOF.toString();
      } else {
        params.OrdemFabrico = this.Enc;
      }

      params.Artigo = this.artigo;
      params.Cor = this.cor;
      params.PontosControl = this.pc;
      params.OP = this.op;
      params.VnDoc = 0;

      // console.log(params);
      var self = this
      this.registoProducaoService
        .postRegistoProducao(params)
        .then(function (result) {
          if (result) {
            location.reload();
            self.router.navigate(['registoProducao', self.CodRecurso, params.OrdemFabrico]);
            // self.AtualizarRegisto();


            // self.popupVisible = false;
          }
        })
        .catch(error => console.log(error));
    }
  }

  Eliminar() {
    const params: any = {};
    var self = this

    // console.log(this.gridRegistos);
    params.of = this.gridRegistos.Enc;
    params.formato = this.gridRegistos.formato;
    params.doc = this.gridRegistos.Doc;
    // console.log(this.gridRegistos.Doc);

    this.registoProducaoService
      .deleteRegistoProducao(params)
      .then(function (result) {
        if (result) {
          location.reload();
          // self.AtualizarRegisto();
          self.router.navigate(['registoProducao', self.CodRecurso, params.OrdemFabrico]);

          // self.popupVisible = false;
        }
      })
      .catch(error => console.log(error));
  }

  AtualizarRegisto() {
    let params;
    if (this.fornecedorOF) {
      params = this.fornecedorOF;
    } else {
      params = null;
    }

    const self = this;
    this.registoProducaoService
      .getRegistoProducao(params)
      .then(function (registoProducao) {
        if (registoProducao) {
          self.dataSource = new DataSource({
            store: registoProducao
          });
        } else {
        }
      });
  }

  LogOut() {
    this.slideoutservice.close();
    localStorage.removeItem('UrlServico');
    localStorage.removeItem('Utilizador');
    this.fornecedorservice.setCodigoFornecedor("");
    this.router.navigate(['login']);
  }

  private fillPopup() {
    this.txtdescricao = this.gridRegistos.Descricao; // PASSA VALORES DA GRID DO REGISTO DE PRODUÇÃO PARA O POPUP
    this.Data = this.gridRegistos.Data;
    this.pc = this.gridRegistos.PC;
    this.Enc = this.gridRegistos.Enc;
    this.fornecedorOF = this.gridRegistos.Enc;
    this.cor = this.gridRegistos.Cor;
    this.nPessoa = this.gridRegistos.NPessoas;
  }

  private getOrdemFabrico() {
    const self = this;
    this.registoProducaoService
      .getOrdemFabrico(this.CodRecurso)
      .then(function (ordemFabrico) {
        if (ordemFabrico) {
          self.ordemFabrico = new DataSource({
            store: ordemFabrico
          });
        }
      });
  }

  RegistoPendentes() {
    this.router.navigate(['registoPendentes']);
  }

  CelulaBlock(e: any) {
    e.editorOptions.disabled = (e.index === 0 && e.row.rowIndex === 0);
  }

  Voltar() {
    this.router.navigate(['fornecedores']);
  }
}

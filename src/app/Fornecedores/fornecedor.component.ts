import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

import { DxDataGridComponent, DxPopupComponent } from "devextreme-angular";

import { Fornecedor } from "./fornecedor";
import { FornecedorService } from "./fornecedor.service";
import { SlideoutService } from "../slideout/slideout.service";

import FileSaver from "file-saver";
import mime from "mime-types";

@Component({
  //  selector:'menu',
  templateUrl: "fornecedor.component.html",
  styleUrls: ["./fornecedor.component.css"]
})
export class FornecedorComponent implements AfterViewInit, OnInit {
  popHidden() {
    $("body").css("overflow-y", "auto");
  }

  popShown() {
    $("body").css("overflow-y", "hidden");
  }

  resizePopupDetalhes() {
    var width = $(window).width();
    var height = $(window).height();

    var pop = this.popupDetalhes.instance;
    var popAnexos = this.popupAnexos.instance;
    if (pop) {
      if (width < 1400) {
        pop.option("width", "100%");
        pop.repaint();
        popAnexos.option("width", "100%");
        popAnexos.repaint();
      } else {
        pop.option("width", "1200px");
        pop.repaint();
        popAnexos.option("width", "1200px");
        popAnexos.repaint();
      }
      if (height < 950) {
        pop.option("height", "100%");
        pop.repaint();
        popAnexos.option("height", "100%");
        popAnexos.repaint();
      } else {
        pop.option("height", "800px");
        pop.repaint();
        popAnexos.option("height", "800px");
        popAnexos.repaint();
      }
    }
  }

  @ViewChild("botaoMenu") element: ElementRef;

  dataSourcez: any = [
    {
      title: "Detalhes"
    },
    {
      title: "PontosControl"
    }
  ];
  selectedRow: any = {};
  dataSource: any = {};
  dataSourceTamanho: any = {};
  dataSourceAnexo: any = {};
  dataSourcePontosControl: any = {};
  dsFornecedores: any = {};
  popupVisible = false;
  popupVisibleAnexos = false;
  clickTimer: any;
  lastRowCLickedId: any;
  popupError = false;
  slideout: any;
  DsSituacaoOrdem: any = [
    { Text: "Produção", ValueSitacao: 1 },
    { Text: "Entregue", ValueSitacao: 2 }
  ];
  ValueSitacao;
  linkAnexos = true;

  gridAnexos: any;
  utilizador: any = {};
  validacao = "true";

  atualFornecedor;
  fornReadOnly;

  registoProducao: boolean;
  registoProducaoApa: boolean;

  AcessoAdmin: boolean;

  imagem;

  private sub: any;
  @ViewChild("popupDetalhes") popupDetalhes: DxPopupComponent;
  @ViewChild("popupAnexos") popupAnexos: DxPopupComponent;

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private router: Router,
    private slideoutservice: SlideoutService,
    private renderer: Renderer2,
    element: ElementRef
  ) {
    // this.utilizador= JSON.parse(sessionStorage.getItem('Utilizador'));~
    if (localStorage.getItem("Utilizador")) {
      this.sub = this.route.params.subscribe(params => {
        this.validacao = params["validacao"]; // console.log(this.IDPlanRec);
      });
      if (this.validacao == "false") {
        this.popupError = true;
      }

      this.utilizador = JSON.parse(localStorage.getItem("Utilizador"));
      if (this.utilizador.GrupoID == "Admin") {
        this.AcessoAdmin = false;
      } else {
        this.AcessoAdmin = true;
      }

      this.atualFornecedor = this.fornecedorService.getCodigoFornecedor();
      // console.log(this.atualFornecedor);
      // if (this.utilizador.GrupoID=='UComum') {
      //     this.registoProducao=true;
      //     this.registoProducaoApa=false;
      // } else{

      //     this.registoProducao=false;
      //     this.registoProducaoApa=true;
      // }

      // $(document).ready(function() {
      //    this.ResizePopupDetalhes();
      // });
    } else {
      this.router.navigate(["login"]);
    }
  }

  showInfo(e: any) {
    let params: any = {};

    this.selectedRow = e.data;
    console.log(e.data);

    if (this.selectedRow.Anexos) {
      this.linkAnexos = false;
    } else {
      this.linkAnexos = true;
    }

    if (this.clickTimer && this.lastRowCLickedId === e.rowIndex) {
      clearTimeout(this.clickTimer);
      this.clickTimer = null;
      this.lastRowCLickedId = e.rowIndex;
      if (e.data.PontoControl) {
        params.PontoControl = e.data.PontoControl;
      }
      if (e.data.OF) {
        params.of = e.data.OF;
      }
      if (e.data.Op || e.data.Op === 0) {
        params.op = e.data.Op;
      }
      params.cod = this.atualFornecedor;

      params.artigo = e.data.Artigo;

      // console.log(params);
      let source = new CustomStore({
        load: loadOption => {
          return new Promise((resolve, reject) => {
            this.fornecedorService
              .getTamanhos(params)
              .then(function(fornecedor) {
                if (fornecedor) {
                  resolve(fornecedor);
                } else {
                  reject("Sem dados");
                }
              });
          });
        }
      });

      this.dataSourceTamanho = new DataSource({
        store: source
        // searchOperation:'contains',
        // searchExpr:'Name'
      });
      let source1 = new CustomStore({
        load: loadOption => {
          return new Promise((resolve, reject) => {
            this.fornecedorService
              .getPontosControl(params)
              .then(function(fornecedor) {
                if (fornecedor) {
                  resolve(fornecedor);
                } else {
                  reject("Sem dados");
                }
              });
          });
        }
      });

      this.dataSourcePontosControl = new DataSource({
        store: source1
        // searchOperation:'contains',
        // searchExpr:'Name'
      });
      var selt = this;

      this.fornecedorService.getImagem(params).then(function(resultado) {
        if (resultado != "") {
          selt.imagem = "data:image/jpeg;base64," + resultado;
        } else {
          selt.imagem = "./assets/Imagens/imagem_nao_disponivel.png";
        }
      });

      this.popupVisible = true;
      this.resizePopupDetalhes();

      // console.log('double');
    } else {
      this.clickTimer = setTimeout(function() {
        // console.log('single');
      }, 250);
    }

    this.lastRowCLickedId = e.rowIndex;
  }

  ngAfterViewInit() {
    var self = this;

    let listener = this.renderer.listen(
      this.element.nativeElement,
      "click",
      event => {
        self.slideoutservice.toggle();
      }
    );
    // this.ResizePopupDetalhes();
  }

  ngOnInit() {
    var self = this;
    this.carregaCombos();

    $(document).ready(function() {
      $(window).on("resize", function() {
        self.resizePopupDetalhes();
      });
    });
  }

  carregaCombos() {
    const self = this;
    const idGrupo = this.utilizador.GrupoID;

    // CARREGA COMBO FORNECEDORES
    this.fornecedorService
      .getTerceirosCombox(this.utilizador.ID_Terceiro)
      .then(function(result) {
        if (self.utilizador.ID_Terceiro !== "") {
          self.atualFornecedor = result[0].Codigo;
          self.fornReadOnly = true;
        } else {
          self.fornReadOnly = false;
        }
        if (result) {
          self.dsFornecedores = new DataSource({
            store: result
          });
        }
      });

    // INICIALIZA COMBO SITUAÇAO
    this.ValueSitacao = this.DsSituacaoOrdem[0].ValueSitacao;
  }

  changeForn(e) {
    const params: any = {};

    params.situacao = this.ValueSitacao;
    params.cod = this.atualFornecedor;
    if (this.atualFornecedor !== undefined) {
      const source = new CustomStore({
        load: loadOption => {
          return new Promise((resolve, reject) => {
            this.fornecedorService
              .getFornecedor(params)
              .then(function(fornecedor) {
                if (fornecedor) {
                  resolve(fornecedor);
                } else {
                  reject("Sem dados");
                }
              });
          });
        }
      });
      this.dataSource = new DataSource({
        store: source
      });
    }
  }

  Anexos() {
    let params: any = {};

    params.of = this.selectedRow.OF;
    params.op = this.selectedRow.Op;
    params.refer = this.selectedRow.Artigo;

    let source = new CustomStore({
      load: loadOption => {
        return new Promise((resolve, reject) => {
          this.fornecedorService.getTiposAnexos(params).then(function(anexo) {
            if (anexo) {
              resolve(anexo);
            } else {
              reject("Sem dados");
            }
          });
        });
      }
    });

    this.dataSourceAnexo = new DataSource({
      store: source
    });

    this.popupVisibleAnexos = true;
  }

  DownloadAnexo(e: any) {
    let params: any = {};
    let img;
    console.log(e.data);

    params.id = e.data.ID;
    params.codigo = e.data.codigo;
    var extencao = e.data.extencao;
    var nome = e.data.Descricao;
    // console.log(nome);
    var mm = mime.lookup(extencao);
    this.fornecedorService
      .getDonwloadAnexos(params)
      .then(function(result) {
        var url = "data:" + mm + ";base64," + result;
        fetch(url)
          .then(res => res.blob())
          .then(blob => FileSaver.saveAs(blob, nome + "." + extencao));
      })
      .catch(error => console.log(error));
  }

  Comentario() {
    if (this.selectedRow.Id != null) {
      if (this.utilizador.ID_Terceiro == "") {
        this.fornecedorService.setCodigoFornecedor(this.selectedRow.CodRecurso);
        this.router.navigate([
          "comentario",
          this.selectedRow.Id,
          this.selectedRow.OF,
          this.selectedRow.CodRecurso
        ]);
      } else {
        this.fornecedorService.setCodigoFornecedor(this.selectedRow.CodRecurso);
        this.router.navigate([
          "comentario",
          this.selectedRow.Id,
          this.selectedRow.OF
        ]);
      }
    } else {
      console.log("nada");
    }
  }

  LogOut() {
    this.slideoutservice.close();
    localStorage.removeItem("Utilizador");
    this.fornecedorService.setCodigoFornecedor("");
    this.router.navigate(["login"]);
  }

  RegistoPendentes() {
    this.router.navigate(["registoPendentes"]);
  }

  FecharErro() {
    this.router.navigate(["fornecedores"]);
    this.popupError = false;
  }

  RegistoProducao() {
    if (this.selectedRow.Id != null) {
      // this.fornecedorService.selectedOF= this.selectedRow.OF;
      if (this.ValueSitacao == 1) {
        this.fornecedorService.setCodigoFornecedor(this.selectedRow.CodRecurso);
        this.router.navigate([
          "registoProducao",
          this.selectedRow.CodRecurso,
          this.selectedRow.OF
        ]);
      }
    }
  }

  // AlterarFiltor(e: any) {

  //     let params: any = {}
  //     params.cod = this.utilizador.ID_Terceiro;
  //     params.situacao = e.selectedItem.ValueSitacao
  //     let source = new CustomStore({
  //         load: loadOption => {
  //             return new Promise((resolve, reject) => {
  //                 this.fornecedorService.getFornecedor(params).then(function (fornecedor) {
  //                     if (fornecedor) {
  //                         resolve(fornecedor);
  //                     } else {
  //                         reject('Sem dados');
  //                     }
  //                 })
  //             })
  //         },
  //     });
  //     this.dataSource = new DataSource({
  //         store: source,

  //     });

  // }

  //  ResizePopupDetalhes(e:any) {

  //     // var width= $(window).width();
  //     // var heigth=$(window).height();
  //     var width=e.target.innerWidth ;
  //     var heigth=e.target.innerHeight;
  //     console.log(e.target.innerHeight, e.target.innerWidth);

  //     if(width<992 || heigth<650){
  //          console.log( 'largura' +  width);
  //         // /window.scrollTo(0,0);
  //         $('#PopupDetalhes').css({
  //             width:width,
  //             height:heigth
  //             // left:'0px',
  //             // top:'0px'
  //         });
  //         $('#PopupDetalhes > .dx-overlay-content.dx-popup-normal.dx-resizable').css('heigth',heigth);
  //     }
  // //     else{
  // //         // console.log('altura' + heigth);
  // //         $('#PopupDetalhes').css({
  // //             width:width *0.6,
  // //             height: heigth * 0.6,
  // //             left: (width * 0.4) / 2,
  // //             top: (heigth * 0.4) / 2,
  // //         });
  // //         $('#PopupDetalhes > .dx-popup-contente').css('heigth',heigth);
  // //     }
  //  }
}

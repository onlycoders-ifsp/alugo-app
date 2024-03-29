import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { eCategorias } from 'src/app/entidades/eCategorias';
import { eProduto } from 'src/app/entidades/eProduto';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { PortalService } from 'src/app/Services/PortalService';
import { produtoService } from 'src/app/Services/produtoService';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-cliente-produto',
  templateUrl: './cliente-produto.component.html',
  styleUrls: ['./cliente-produto.component.css']
})
export class ClienteProdutoComponent implements OnInit {

  maxValor: number = 1;
  dataMaxCompra: string;
  idiomas: iIdioma[];
  categorias: eCategorias[] = [];
  currentBandeira: string;
  currentIdioma: string;
  formularioProduto: FormGroup;
  currentProduto: eProduto;
  produtoAlterado: eProduto = new eProduto();
  idCurrentProduto: string;
  mensagemSucesso: string;
  mensagemErro: string;
  nomeProduto: string;
  percSugeridoDiaria: number = 0.02;
  percSugeridoMensal: number = 0.25;
  erroDescricao: boolean = false;
  erroDescricaoCurta: boolean = false;

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private fb: FormBuilder,
    private portalService: PortalService,
    public datepipe: DatePipe,
    private auth: AuthService,
    private produtoService: produtoService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void {
    if (!this.auth.isAutenticado()){
      this.auth.encerraSessao();
    }    
    this.dataMaxCompra = new Date().toISOString().split("T")[0]
    this.getListaCategorias();
    this.createForm();
    if (localStorage.getItem("idProdutoMudanca")) {
      this.idCurrentProduto = localStorage.getItem("idProdutoMudanca");

      this.loadCurrentProduto();
    }else{
      this.currentProduto = new eProduto();
    }

  }

  createForm() {
    this.formularioProduto = this.fb.group({
      nome: ['', [Validators.required]],
      descricao_curta: ['', [Validators.required]],
      categorias: ['', [Validators.required]],
      ativo: [''],
      descricao: ['', [Validators.required]],
      valor_base_diaria: ['', [Validators.required,Validators.max(10000),Validators.min(0)]],
      valor_base_mensal: ['', [Validators.required,Validators.max(10000),Validators.min(0)]],
      valor_produto: ['', [Validators.required,Validators.max(10000),Validators.min(0)]],
      data_compra: ['', [Validators.required]],
      capa_foto: ['',],
      qtd_alugueis: ['',],
      total_ganhos: ['',],
      media_avaliacao: ['',]

    })
  }

  loadFormToCadOrUpdate() {    
    const formCadValues = this.formularioProduto.value;
    this.produtoAlterado.nome = formCadValues.nome;
    this.produtoAlterado.descricao_curta = formCadValues.descricao_curta;
    this.produtoAlterado.categorias = this.categorias.filter(categoria => categoria.id_categoria == formCadValues.categorias).map(function(item) {
      return { id_categoria: item.id_categoria, nome_categoria: item.descricao };
    });
    this.produtoAlterado.ativo = formCadValues.ativo;
    this.produtoAlterado.descricao = formCadValues.descricao;
    this.produtoAlterado.valor_base_diaria = Number(formCadValues.valor_base_diaria);
    this.produtoAlterado.valor_base_mensal = Number(formCadValues.valor_base_mensal);
    this.produtoAlterado.valor_produto = Number(formCadValues.valor_produto);
    if(!formCadValues.capa_foto){
      formCadValues.capa_foto = "";
    }
    this.produtoAlterado.capa_foto = formCadValues.capa_foto;

    // if(!formCadValues.qtd_alugueis){
    //   formCadValues.qtd_alugueis = 0;
    // }
    // this.produtoAlterado.qtd_alugueis = Number(formCadValues.qtd_alugueis);

    // if(!formCadValues.total_ganhos){
    //   formCadValues.total_ganhos = 0;
    // }
    // this.produtoAlterado.total_ganhos = Number(formCadValues.total_ganhos);

    // if(!formCadValues.media_avaliacao){
    //   formCadValues.media_avaliacao = 0;
    // }
    // this.produtoAlterado.media_avaliacao = Number(formCadValues.media_avaliacao);

    let date: Date = formCadValues.data_compra;
    let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.produtoAlterado.data_compra = latest_date;

    if (localStorage.getItem("idProdutoMudanca")) {
      this.updateProduto();
    } else {
      this.cadProduto();
    }
  }

  getListaCategorias(){
    this.produtoService.getCategorias().subscribe(resposta => {
      this.categorias = resposta;
      errorResponse => {
        console.log(errorResponse);
      }
    });
  }

  inputaProduto() {

    if (this.formularioProduto.valid) {
      this.erroDescricao = false;
      this.erroDescricaoCurta = false;
      this.loadFormToCadOrUpdate();
      
    } else {
      if(this.formularioProduto.controls.descricao.errors){
        this.erroDescricao = true;
      }else{
        this.erroDescricao = false;
      }
      if(this.formularioProduto.controls.descricao_curta.errors){
        this.erroDescricaoCurta = true;
      }else{
        this.erroDescricaoCurta = false;
      }
      this.mensagemErro = "formInvalido"
    }
  }

  updateProduto() {
    this.produtoAlterado.id_produto = this.idCurrentProduto;
    this.produtoService.updateProduto(this.produtoAlterado).subscribe(response => {
      if(response){
        this.nomeProduto = this.produtoAlterado.nome;
        this.mensagemSucesso = "AtualizadoSucesso";
        this.mensagemErro = null;
        localStorage.setItem("produtoInputadoSucesso", this.mensagemSucesso);
        localStorage.setItem("produtoNome", this.nomeProduto);
      localStorage.removeItem("idProdutoMudanca");
      this.uploadFotoDeCapa();
      }else{
        this.nomeProduto = this.produtoAlterado.nome;
        this.mensagemErro = "AtualizadoErro";
      }
    }, errorResponse => {
      this.mensagemSucesso = null,
        this.nomeProduto = this.produtoAlterado.nome;
        this.mensagemErro = "AtualizadoErro";
    });
  }

  cadProduto() {
    this.produtoAlterado.ativo = false;
    this.produtoService.cadProduto(this.produtoAlterado).subscribe(response => {
      this.currentProduto = response;
      this.nomeProduto = this.produtoAlterado.nome;
      this.mensagemSucesso = "CadastroSucesso",
        this.mensagemErro = null;
        localStorage.setItem("produtoInputadoSucesso", this.mensagemSucesso);
        localStorage.setItem("produtoNome", this.nomeProduto);
        this.uploadFotoDeCapa();
    }, errorResponse => {
      this.mensagemSucesso = null,
      this.nomeProduto = this.produtoAlterado.nome;
        this.mensagemErro = "CadastroErro";
    });
  }

  loadCurrentProduto() {
    this.portalService.getProdutoById(this.idCurrentProduto).subscribe(resposta => {
      this.currentProduto = resposta;
      let dataFormatada = this.datepipe.transform(this.currentProduto.data_compra, 'MM-dd-yyyy');
      let date: Date = new Date(dataFormatada);

      this.formularioProduto.patchValue({
        nome: this.currentProduto.nome,
        descricao_curta: this.currentProduto.descricao_curta,
        ativo: this.currentProduto.ativo,
        categorias: this.currentProduto.categorias[0].id_categoria,
        descricao: this.currentProduto.descricao,
        valor_base_diaria: this.currentProduto.valor_base_diaria,
        valor_base_mensal: this.currentProduto.valor_base_mensal,
        valor_produto: this.currentProduto.valor_produto,
        data_compra: date,
        capa_foto: this.currentProduto.capa_foto,
        qtd_alugueis: this.currentProduto.qtd_alugueis,
        total_ganhos: this.currentProduto.total_ganhos,
        media_avaliacao: this.currentProduto.media_avaliacao
      })
      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.createForm();
  }
  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma);
  }

  verProdutoDeslogado() {
    this.router.navigate(['/detalhe-produto']);
  }

  verListaProdutos() {
    this.router.navigate(['/list-all']);
  }
  VerPerfil() {
    this.router.navigate(['/cliente/perfil']);
  }
  verMeuProduto() {
    this.router.navigate(['/cliente/produto']);
  }
  voltaHome() {
    this.router.navigate(['']);
  }

  setFotoCapa(){
    
  }

  

  novaFoto: string;
  fileAtual: string;
  setNovaFotoProduto(event) {
    const files = event.target.files;
    this.fileAtual = event.target.files;

    if (files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (_event) => {
        this.novaFoto = reader.result.toString();
      }
    }
  }


  uploadFotoDeCapa(){
    const files = this.fileAtual;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("capa_foto", foto);
      formData.append("id_produto", this.currentProduto.id_produto);
        this.produtoService.uploadFotoCapa(formData).subscribe(response => {
          this.router.navigate(["cliente/perfil/meusprodutos"])
        }, errorResponse => {
          console.log(errorResponse)
          this.nomeProduto = this.produtoAlterado.nome;
            this.mensagemErro = "CadastroErro";
        })
    }else{
      this.router.navigate(["cliente/perfil/meusprodutos"])
    }

  }

  preencheValorSugerido(){
    this.formularioProduto.patchValue({
      valor_base_diaria: this.formularioProduto.value.valor_produto*this.percSugeridoDiaria,
      valor_base_mensal: this.formularioProduto.value.valor_produto*this.percSugeridoMensal
    })

  }

}

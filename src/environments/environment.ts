// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://hml-backend-alugo.herokuapp.com', //'https://hml-backend-alugo.herokuapp.com',//'http://localhost:8080',
  clientId: 'front-alugo',
  secret: 'aluGo@123!321',
  authorizedGrantTypes: 'password',
  obterToken: "/oauth/token",
  cepUrl: "https://viacep.com.br/ws",
  login: "/login",
  notificationML:'',


  //ENDPOINTS DE PRODUTO
  putAlteraProduto: "/produtos/altera",
  deleteAtivaInativaProduto: "/produtos/ativa-nativa",
  postCadProduto: "/produtos/cadastro",
  getCategorias: "/produtos/categorias",
  getPesquisaProduto: "/produtos/pesquisa",
  getProdutosUsuario: "/produtos/usuario",
  getListaProdutos: '/produtos/lista-produto',
  getOnly1Produto: '/produtos/produto',
  getOnlyUserProducts: "/produtos/lista-produto-logado",
  putFotoCapa: "/produtos/upload-foto",
  getProdutosByPesquisa: "/produtos/produto-pesquisa",


  //ENDPOINTS DE USUARIO
  putAlteraUsuario: "/usuarios/altera-dados",
  putAlteraSenha: "/usuarios/altera-senha",
  postCadUsuario: "/usuarios/cadastro",
  getAtivaUsuario: "/usuarios/verficacao-email",
  getDadosUsuario: "/usuarios/usuario",
  getUserLogado: "/usuarios/usuario-logado",
  putFotoUsuario: "/usuarios/upload-foto",
  getVerificaCpf: "/usuarios/verifica/cpf",
  getVerificaEmail: "/usuarios/verifica/email",
  getVerificaUserName: "/usuarios/verifica/username",
  getVerificaCpfUpdate: "/usuarios/verifica/cpf-update",
  getVerificaEmailUpdate: "/usuarios/verifica/email-update",
  getVerificaUserNameUpdate: "/usuarios/verifica/username-update",

  //ENDPOINTS DE ALUGUEL
  getListAluguelLocador: "/aluguel/locador",
  getListAluguelLocatario: "/aluguel/locatario",
  getListAluguelProduto: "/aluguel/detalhe",
  postCadAluguel: "/aluguel/aluguel-efetua",
  postCadEntregaDevolucao: "/aluguel/entrega-devolucao",
  getEntregaDevolucao:"/aluguel/encontro",
  putEntregaDevolucao:"/aluguel/banana",
  putConfirmacaoEntregaDevolucao:"/aluguel/confirma-encontro",
  postCadAvaliacaoLocatario: "/aluguel/avaliacao/grava/locatario",
  postCadAvaliacaoLocador: "/aluguel/avaliacao/grava/locador",
  postCadAvaliacaoProduto: "/aluguel/avaliacao/grava/produto",
  getAvaliacoesProduto: "/aluguel/avaliacao/retorna/produto",
  
  getChecklistEntrega: "/aluguel/checklist/retorna-entrega",
  getChecklistDevolucao: "/aluguel/checklist/retorna-devolucao",
  putConfirmChecklistEntrega: "/aluguel/checklist/aceite-entrega",
  putConfirmChecklistDevolucao: "/aluguel/checklist/aceite-devolucao",

  //ENDPOINTS PAGAMENTO
  putUrlpagamentoAluguel:'/pagamento/url-pagamento',
  putEfetuaPagamento:'/pagamento/efetua',

  //ENDPOINTS ADMIN
  getListaUsuarios: "/admin/lista-usuario",
  deleteUsuario: "/admin/inativa-usuario",
  getLogsDeErros: "/admin/log-erros",
  getProdutosNaoPublicados: "/admin/publicar-produtos",


  //ENDPOINTS MERCADO LIVRE
  mlBaseUrl:'https://api.mercadopago.com',
  mlToken:'TEST-3839591210769699-020717-920ee176862d215166e271d66e8432f7-132870722',
  mlCriaPreferencia:'/checkout/preferences',

  //URLS DE REDIRECIONAMENTO
  redirectBase:'', // 'http://localhost:4200/' 'https://hml-alugo-app.herokuapp.com/'
  redirectSucesso:'',
  redirectErro:'',
  redirectPendente:''

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

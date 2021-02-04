export const environment = {
  production: true,
  apiBaseUrl: 'https://hml-backend-alugo.herokuapp.com',//https://backend-alugo.herokuapp.com',
  clientId: 'front-alugo',
  secret: 'aluGo@123!321',
  authorizedGrantTypes: 'password',
  obterToken: "/oauth/token",
  cepUrl: "https://viacep.com.br/ws",
  login: "/login",


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
  getEntregaDevolucao:"/aluguel/banana",//********OLHAR AQUI RAMON
  putEntregaDevolucao:"/aluguel/banana",//********OLHAR AQUI RAMON

  //ENDPOINTS ADMIN
  getListaUsuarios: "/admin/lista-usuario",
  deleteUsuario: "/admin/inativa-usuario",
  getLogsDeErros: "/admin/log-erros",
  getProdutosNaoPublicados: "/admin/publicar-produtos"
};

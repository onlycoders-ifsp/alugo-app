export const environment = {
  production: true,
  apiBaseUrl: 'https://backend-alugo.herokuapp.com',
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
  deleteDeleteUsuario: "/usuarios/inativa",
  getDadosUsuario: "/usuarios/usuario",
  getUserLogado: "/usuarios/usuario-logado",
  putFotoUsuario: "/usuarios/upload-foto",


  //ENDPOINTS DE ALUGUEL
  getListAluguelLocador: "/aluguel/locador",
  getListAluguelLocatario: "/aluguel/locatario",
  postCadAluguel: "/aluguel/aluguel-efetua"

};

export class eUsuarioConstructor {
    id_usuario: number;
    nome: string;
    cpf: string;
    email: string;
    login: string;
    senha: string;
    cep: string;
    logradouro: string;
    numero: string;
    data_nascimento: string;
    ativo: boolean;
    celular: string;

    constructor(nome: string, email: string, senha: string, cpf: string, celular: string,
        cep: string, logradouro: string, numero: string, data_nascimento: string ){

            this.nome = nome;
            this.email = email,
            this.login = email,
            this.senha = senha,
            this.cpf = cpf,
            this.celular = celular;
            this.cep = cep
            this.logradouro = logradouro
            this.numero = numero
            this.data_nascimento = data_nascimento
            this.ativo = true;
    }
}
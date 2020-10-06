export class eUsuario {
    id_usuario: number;
    nome: string;
    cpf: string;
    email: string;
    login: string;
    senha: string;
    cep: string;
    logradouro: string;
    numero: string;
    data_nascimento: Date;
    ativo: boolean;
    codigo: string;
    celular: string;

    constructor(nome: string, email: string, senha: string, cpf: string, celular: string){
        this.nome = nome;
        this.email = email,
        this.login = email,
        this.senha = senha,
        this.cpf = cpf,
        this.celular = celular;
    }
}
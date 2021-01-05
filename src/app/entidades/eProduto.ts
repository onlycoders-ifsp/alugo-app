import { eCategorias } from './ECategorias';
import { eDatasAlugado } from './eDatasAlugado';

export class eProduto {
    id_produto: string;
    id_usuario: string;
    nome: string;
    ganhos: number;
    valorAluguel: number;
    descricao: string;
    descricao_curta: string;
    valor_base_diaria: number;
    valor_base_mensal: number;
    dt_alugadas: eDatasAlugado[];
    valor_produto: number;
    data_compra: string;
    qtd_alugueis: number;
    total_ganhos: number;
    categorias: eCategorias[];
    media_avaliacao: number;
    capa_foto: string;
    ativo: boolean
}
import { eProduto } from './eProduto';
import { eUsuario } from './eUsuario';

export class eAluguel{
    data_saque: string;
    data_fim: string;
    data_inicio: string;
    produto: eProduto;
    valor_aluguel: number;
    locador: eUsuario;
    locatario: eUsuario;
    id_aluguel: string;
}
import { eProduto } from './eProduto';
import { eUsuario } from './eUsuario';

export class eAluguel{
    data_saque: Date;
    data_fim: Date;
    data_inicio: Date;
    produto: eProduto;
    valor_aluguel: number;
    locador: eUsuario;
    locatario: eUsuario;
    id_aluguel: string;
}
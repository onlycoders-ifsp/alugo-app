enum enumStatusAluguel {
    Agendado = 1,
    EmAndamento = 2,
    FinalizadoSemOcorrencia = 3,
    FinalizadoComOcorrencia = 4,
    CanceladoPeloLocador = 5,
    CanceladoPeloLocatario = 6,
    AguardandoPagamento = 7,
    CancelamentoAutomatico = 8,
    AguardandoAceiteLocador = 9,
    AguardandoDevolucao = 10,
    PagamentoConfirmado = 11,
    AguardandoEntrega = 12
}
// CRIA ALUGUEL = 13 (AGUARDANDO ACEITE DO ALUGUEL)
// DONO ACEITA = 7 (AGUARDANDO PAGAMENTO)
// CARA PAGO = 11 (PAGAMENTO CONFIRMADO)
// INFORMOU LOCAIS = 9 (AGUARDANDO ACEITE LOCADOR)
// ACEITOU = 1 (AGENDADO)
// RECEBEU EMAIL (ALUGUEL EM 2H) = 12 (AGUARDANDO ENTREGA)
// PREENCHEU CHECKLIST = 14 (AGUARDANDO OK DO LOCATARIO)
// LOCATARIO CONFIRMOU = 2 (EM ANDAMENTO)
// RECEBEU EMAIL (DEVOLVE EM 2H) = 10 (AGUARDANDO DEVOLUCAO)
// PREENCHEU CHECKLIST DEVOL = 15 (AGUARDANDO OK LOCATARIO DEVOL)
// LOCATARIO DEU OK = 3 (FINALIZADO SEM OCORRENCIA)

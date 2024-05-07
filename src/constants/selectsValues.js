//constants for selects values
export const constants = {
  tipoProprietario: [
    { value: "Pessoa Física", label: "Pessoa Física" },
    { value: "Pessoa Jurídica", label: "Pessoa Jurídica" },
  ],
  destinacaoObra: [
    { value: "Casa Unifamiliar", label: "Casa Unifamiliar" },
    { value: "Casa Multi Familiar", label: "Casa Multi Familiar" },
    { value: "Comercial, Salas, Lojas", label: "Comercial, Salas, Lojas" },
    { value: "Galpão Industrial", label: "Galpão Industrial" },
  ],
  concretoUsinado: [
    { value: "Sim", label: "Sim" },
    { value: "Não", label: "Não" },
  ],
  tipoConstrucao: [
    { value: "Alvenaria", label: "Alvenaria" },
    { value: "Madeira Ou Mista", label: "Madeira Ou Mista" },
  ],
  obraFinanciamento: [
    { value: "Sim", label: "Sim" },
    { value: "Não", label: "Não" },
  ],
  ufObra: [
    { value: "AC", label: "AC" },
    { value: "AL", label: "AL" },
    { value: "AP", label: "AP" },
    { value: "AM", label: "AM" },
    { value: "BA", label: "BA" },
    { value: "CE", label: "CE" },
    { value: "DF", label: "DF" },
    { value: "ES", label: "ES" },
    { value: "GO", label: "GO" },
    { value: "MA", label: "MA" },
    { value: "MT", label: "MT" },
    { value: "MS", label: "MS" },
    { value: "MG", label: "MG" },
    { value: "PA", label: "PA" },
    { value: "PB", label: "PB" },
    { value: "PR", label: "PR" },
    { value: "PE", label: "PE" },
    { value: "PI", label: "PI" },
    { value: "RJ", label: "RJ" },
    { value: "RN", label: "RN" },
    { value: "RS", label: "RS" },
    { value: "RO", label: "RO" },
    { value: "RR", label: "RR" },
    { value: "SC", label: "SC" },
    { value: "SP", label: "SP" },
    { value: "SE", label: "SE" },
    { value: "TO", label: "TO" },
  ],
  // cidadeObra: [];
  faseObra: [
    { value: "Início de Obras", label: "Início de Obras" },
    { value: "Meio da Obra", label: "Meio da Obra" },
    { value: "Acabamento", label: "Acabamento" },
    { value: "Pronta", label: "Pronta" },
    { value: "Com Habita-se", label: "Com Habita-se" },
    {
      value: "Foi Notificada Pela Receita",
      label: "Foi Notificada Pela Receita",
    },
    { value: "Pronta a Mais de 5 Anos", label: "Pronta a Mais de 5 Anos" },
  ],

  mesAtual: new Date().getMonth() + 1,

  mesRetroativoQuandoMenorQueUmAno: 100,
  mesRetroativoQuandoMenorQueDoisAnos: 200,
  mesRetroativoQuandoMenorQueTresAnos: 300,
  mesRetroativoQuandoMenorQueQuatroAnosEmDiante: 400,

  usoDeConcretoUsinadoDesconto: 0.6,

  tipoDeConstrucaoComAlvenaria: 0.20,
  tipoDeConstrucaoComMadeiraOuMista: 0.15,

  menorQueCem: 0.2,
  deCemADozentos: 0.4,
  deDuzentosATrezeentos: 0.55,
  deTrezentosAQuatrocentos: 0.7,
  acimaDeQuatrocentos: 0.9,

  percentualAreaPrincipal: 0.89,
  percentualAreaComplementar: 0.25,

  rmtParaAteTrezentosECinquenta: 0.5,
  rmtParaAcimaDeTrezentosECinquenta: 0.7,

  fatorMultiplicadorRmt: 0.368,

  cotaPatronal: 0.2,

  quantidaMaximasParcelas: 60,
};

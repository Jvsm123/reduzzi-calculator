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

  mesRetroativoQuandoMenorQueUmAno: 100,
  mesRetroativoQuandoMenorQueDoisAnos: 200,
  mesRetroativoQuandoMenorQueTresAnos: 300,
  mesRetroativoQuandoMenorQueQuatroAnosEmDiante: 400,

  metragemAte100: "1",
  metragemAte120: "3",
  metragemAte200: "6",
  metragemAte300: "8",
  metragemAte400: "10",
  metragemAcima400: "12",

  dataAtual: new Date(),

  descontoPorMesRetroativo: 364,

  honorarioAteCem: "metade do valor",
  honorarioAteDuzentos: 2500,
  honorarioAteTrezentos: 3500,
  honorarioAteQuatrocentos: 4500,
  honorarioAteDeQuinhentos: 5500,
  honorarioAteDeSeiscentos: 7500,
  honorarioAteDeSetecentos: 9500,
  honorarioAteDeOitocentos: 11500,
  honorarioAteDeNovecentos: 13500,
  honorarioAcimaDeMil: "A CONSULTAR",

  usoDeConcretoUsinadoDesconto: 0.6,

  tipoDeConstrucaoComAlvenaria: 0.2,
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

  percentualAteTrezentosECinquenta: 0.01,
  percentualAcimaDeTrezentosECinquenta: 0.02,

  fatorMultiplicadorRmt: 0.368,

  cotaPatronal: 0.2,

  quantidaMaximasParcelas: 60,
};

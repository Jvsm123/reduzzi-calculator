import * as yup from "yup";

export const schema = yup.object().shape({
  proprietario: yup.string().email("Email invalido!").required("O campo email é necessário!"),
  celular: yup.string().required("O campo celular é necessário!"),
  tipoProprietario: yup.string().required("O campo Tipo de proprietário é necessário!"),
  destinacaoObra: yup.string().required("O campo Destinação da obra é necessário!"),
  obraFinanciamento: yup.string().required("O campo Obra com Financiamento é necessário!"),
  ufObra: yup.string().required("O campo UF é necessário!"),
  cidadeObra: yup.string().required("O campo Cidade da Obra é necessário!"),
  faseObra: yup.string().required("O campo Fase Atual é necessário!"),
  m2Construcao: yup.string().required("O campo M² De Construcao é necessário!"),
  m2PiscinaQuadra: yup.string().required("O campo M² De Piscina + Quadra é necessário!"),
  inicioConstrucao: yup.string().required("O campo Início da Construção é necessário!"),
  previsaoTermino: yup.string().required("O campo Previsão de Término é necessário!"),
})

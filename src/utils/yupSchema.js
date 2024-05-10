import * as yup from "yup";

export const schema = yup.object().shape({
  proprietario: yup.string().required("O campo Proprietario é necessário!"),
  celular: yup.string().required("O campo celular é necessário!").min(17, "Celular inválido"),
  tipoProprietario: yup.object().shape({
    value: yup.string().required("O campo Tipo de proprietario é necessário!"),
    label: yup.string().required("O campo Tipo de proprietario é necessário!"),
  }),
  destinacaoObra: yup.object().shape({
    value: yup.string().required("O campo Destinação da Obra é necessário!"),
    label: yup.string().required("O campo Destinação da Obra é necessário!"),
  }),
  obraFinanciamento: yup.object().shape({
    value: yup.string().required("O Obra com financiamento é necessário!"),
    label: yup.string().required("O Obra com financiamento é necessário!"),
  }),
  tipoConstrucao: yup.object().shape({
    value: yup.string().required("Tipo Da Construção é necessário!"),
    label: yup.string().required("Tipo Da Construção é necessário!"),
  }),
  concretoUsinado: yup.object().shape({
    value: yup.string().required("Uso do concretoUsinado é necessário!"),
    label: yup.string().required("Uso do concretoUsinado é necessário!"),
  }),
  ufObra: yup.object().shape({
    value: yup.string().required("O campo UF é necessário!"),
    label: yup.string().required("O campo UF é necessário!"),
  }),
  cidadeObra: yup.object().shape({
    value: yup.string().required("O campo cidade é necessário!"),
    label: yup.string().required("O campo cidade é necessário!"),
  }),
  faseObra: yup.object().shape({
    value: yup.string().required("O campo Fase Atual da Obra é necessário!"),
    label: yup.string().required("O campo Fase Atual da Obra é necessário!"),
  }),
  m2Construcao: yup.string().required("O campo M² De Construcao é necessário!"),
  m2PiscinaQuadra: yup
    .string()
    .required("O campo M² De Piscina + Quadra é necessário!"),
  inicioConstrucao: yup
    .string()
    .required("O campo Início da Construção é necessário!"),
  previsaoTermino: yup
    .string()
    .required("O campo Previsão de Término é necessário!"),
});

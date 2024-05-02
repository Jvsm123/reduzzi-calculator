import * as yup from "yup";

export const schema = yup.object().shape({
  proprietario: yup.string().required("O campo proprietario é necessário!"),
  celular: yup.string().min(15, "Informe um numero válido!").required("O campo celular é necessário!"),
  tipoProprietario: yup.string().required("O campo tipo de proprietario é necessário!"),
  destinacaoObra: yup.string().required("O campo destinacao da obra é necessário!"),
  obraFinanciamento: yup.string().required("O campo financiamento da obra é necessário!"),
  ufObra: yup.string().required("O campo uf da obra é necessário!"),
  cidadeObra: yup.string().required("O campo cidade da obra é necessário!"),
  faseObra: yup.string().required("O campo fase da obra é necessário!"),
  m2Construcao: yup.string().required("O campo m² da construcao é necessário!"),
  m2PiscinaQuadra: yup.string().required("O campo m² da piscina na quadra é necessário!"),
  inicioConstrucao: yup.string().required("O campo inicio da construcao é necessário!"),
  previsaoTermino: yup.string().required("O campo previsão de termino é necessário!"),
})

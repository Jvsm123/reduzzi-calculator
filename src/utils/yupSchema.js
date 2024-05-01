import * as yup from "yup";

export const schema = yup.object().shape({
  proprietario: yup.string().email("Email invalido!").required("O campo email é necessário!"),
  celular: yup.string().required("O campo celular é necessário!"),
  tipoProprietario: yup.string().required("O campo tipoProprietario é necessário!"),
  destinacaoObra: yup.string().required("O campo destinacaoObra é necessário!"),
  obraFinanciamento: yup.string().required("O campo obraFinanciamento é necessário!"),
  ufObra: yup.string().required("O campo ufObra é necessário!"),
  cidadeObra: yup.string().required("O campo cidadeObra é necessário!"),
  faseObra: yup.string().required("O campo faseObra é necessário!"),
  m2Construcao: yup.string().required("O campo m2Construcao é necessário!"),
  m2PiscinaQuadra: yup.string().required("O campo m2PiscinaQuadra é necessário!"),
  inicioConstrucao: yup.string().required("O campo inicioConstrucao é necessário!"),
  previsaoTermino: yup.string().required("O campo previsaoTermino é necessário!"),
})

import * as yup from "yup";


export const schema = yup.object().shape({
  proprietario: yup.string().email("Email invalido!").required("O campo email é necessário!"),
  celular: yup.string().required("O campo celular é necessário!"),
  tipoProprietario: yup.object().shape({
	value: yup.string().required("O campo UF é necessário!"),
	label: yup.string().required("O campo UF é necessário!"),
  }),
  destinacaoObra: yup.object().shape({
	value: yup.string().required("O campo UF é necessário!"),
	label: yup.string().required("O campo UF é necessário!"),
  }),
  obraFinanciamento: yup.object().shape({
	value: yup.string().required("O campo UF é necessário!"),
	label: yup.string().required("O campo UF é necessário!"),
  }),
  ufObra: yup.object().shape({
	value: yup.string().required("O campo UF é necessário!"),
	label: yup.string().required("O campo UF é necessário!"),
  }),
  cidadeObra: yup.object().shape({
	// value: yup.string().required("O campo UF é necessário!"),
	// label: yup.string().required("O campo UF é necessário!"),
  }),
  faseObra: yup.object().shape({
	value: yup.string().required("O campo UF é necessário!"),
	label: yup.string().required("O campo UF é necessário!"),
  }),
  m2Construcao: yup.string().required("O campo M² De Construcao é necessário!"),
  m2PiscinaQuadra: yup.string().required("O campo M² De Piscina + Quadra é necessário!"),
  inicioConstrucao: yup.string().required("O campo Início da Construção é necessário!"),
  previsaoTermino: yup.string().required("O campo Previsão de Término é necessário!"),
})

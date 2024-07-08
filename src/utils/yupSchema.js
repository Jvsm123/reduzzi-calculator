import * as yup from "yup";

export const schema = yup.object().shape({
  proprietario: yup.string().required("O campo Proprietario é necessário!"),
  cpf: yup
    .string()
    .required("O campo CPF é necessário!")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido! Digite no formato: xxx.xxx.xxx-xx",
    ),
  celular: yup
    .string()
    .required("O campo celular é necessário!")
    .max(18, "celular invalido!")
    .min(14, "celular invalido!"),
  tipoProprietario: yup.object().shape({
    value: yup.string().required("O campo Tipo de Proprietario é necessário!"),
    label: yup.string().required("O campo Tipo de Proprietario é necessário!"),
  }),
  destinacaoObra: yup.object().shape({
    value: yup.string().required("O campo Destinação da Obra é necessário!"),
    label: yup.string().required("O campo Destinação da Obra é necessário!"),
  }),
  obraFinanciamento: yup.object().shape({
    value: yup.string().required("O Obra com Financiamento é necessário!"),
    label: yup.string().required("O Obra com Financiamento é necessário!"),
  }),
  tipoConstrucao: yup.object().shape({
    value: yup.string().required("Tipo Da Construção é necessário!"),
    label: yup.string().required("Tipo Da Construção é necessário!"),
  }),
  // concretoUsinado: yup.object().shape({
  //   value: yup.string().required("Uso do Concreto Usinado é necessário!"),
  //   label: yup.string().required("Uso do Concreto Usinado é necessário!"),
  // }),
  ufObra: yup.object().shape({
    value: yup.string().required("O campo UF é necessário!"),
    label: yup.string().required("O campo UF é necessário!"),
  }),
  cidadeObra: yup.object().shape({
    value: yup.string().required("O campo Cidade é necessário!"),
    label: yup.string().required("O campo Cidade é necessário!"),
  }),
  faseObra: yup.object().shape({
    value: yup.string().required("O campo Fase Atual da Obra é necessário!"),
    label: yup.string().required("O campo Fase Atual da Obra é necessário!"),
  }),
  m2Construcao: yup
    .string()
    .typeError("Digite um número válido")
    .required("O campo M² De Construcao é necessário!"),
  m2PiscinaQuadra: yup
    .string()
    .typeError("Digite um número válido")
    .required("O campo M² De Piscina + Quadra é necessário!"),
  inicioConstrucao: yup
    .string()
    .typeError("Valor da data não é válido!")
    .matches(
      /^(0[1-9]|1[0-2])\/\d{4}$/,
      "Valor da data não segue o padrão mm/yyyy!",
    )
    .min(7, "A data deve ter no mínimo 5 caracteres!")
    .max(7, "A data deve ter no máximo 5 caracteres!")
    .required("O campo Início da Construção é necessário!"),
  previsaoTermino: yup
    .string()
    .typeError("Valor da data não é válido!")
    .matches(
      /^(0[1-9]|1[0-2])\/\d{4}$/,
      "Valor da data não segue o padrão mm/yyyy!",
    )
    .min(7, "A data deve ter no mínimo 5 caracteres!")
    .max(7, "A data deve ter no máximo 5 caracteres!")
    .required("O campo Previsão de Término é necessário!"),
});

import { constants } from "../constants/selectsValues";

export const useCalculatorHandler = () => {
  const handleCalculatorData = (data) => {
    let {
      // celular,
      // destinacaoObra,
      // faseObra,
      // inicioConstrucao,
      m2PiscinaQuadra,
      m2Construcao,
      // obraFinanciamento,
      // previsaoTermino,
      // proprietario,
      tipoProprietario,
      // ufObra,
      // cidadeObra,
    } = data;

    let fatorSocial;
    let tipoDeConstrucaoPorcentagem;
    let totalImpostoComReducao;
    let porcentagemDaReducao;
    let valorDoParcelamentoTotal;
    let porcentagemDoParcelamentoTotal;

    m2Construcao = m2Construcao.replace(/\D/g, "");
    m2PiscinaQuadra = m2PiscinaQuadra.replace(/\D/g, "");

    switch (Number(m2Construcao)) {
      case m2Construcao < 100: tipoDeConstrucaoPorcentagem = constants.menorQueCem; break;
      case m2Construcao >= 100 && m2Construcao < 200: tipoDeConstrucaoPorcentagem = constants.deCemADozentos; break;
      case m2Construcao >= 200 && m2Construcao < 300: tipoDeConstrucaoPorcentagem = constants.deDuzentosATrezeentos; break;
      case m2Construcao >= 300 && m2Construcao < 400: tipoDeConstrucaoPorcentagem = constants.deTrezentosAQuatrocentos; break;
      case m2Construcao >= 400: tipoDeConstrucaoPorcentagem = constants.acimaDeQuatrocentos; break;
    }

    const metroTotal = Number(m2Construcao) + Number(m2PiscinaQuadra);

    switch (metroTotal) {
      case metroTotal < 350: porcentagemDaReducao = 50; break;
      case metroTotal >= 350: porcentagemDaReducao = 70; break;
    }

    //O valor que tiver no tipo de construção, também será o do fator social
    fatorSocial = tipoDeConstrucaoPorcentagem;

    const custoObra = m2Construcao * valorVau * 89 + m2PiscinaQuadra * 25 * valorVau;
    const rmtObra = custoObra * tipoDeConstrucaoPorcentagem * fatorSocial;
    const totalImpostoSemReducao = rmtObra * 36.8;

    if (tipoProprietario.value !== "Pessoa Judírica") {
      return "Pessoa Judírica";
    }

    totalImpostoComReducao = rmtObra * porcentagemDaReducao * constants.cotaPatronal;

    porcentagemDoParcelamentoTotal = (totalImpostoComReducao % 60) === 0 ? 60 : totalImpostoComReducao % 60;

    valorDoParcelamentoTotal = totalImpostoComReducao / porcentagemDoParcelamentoTotal;

    console.log(
      `O valor do imposto sem redução é de: ${totalImpostoSemReducao} \n
	  O valor do imposto com redução é de: ${totalImpostoComReducao} \n
	  O valor do parcelamento total é de: ${valorDoParcelamentoTotal} \n
	  A porcentagem do parcelamento total é de: ${porcentagemDoParcelamentoTotal} \n
	  A Área total da obra é de: ${metroTotal} \n
	  A Área Complementar da obra é de: ${m2PiscinaQuadra} \n
	  O RMT da obra é de: ${rmtObra} \n
	  Tabela VAU(A fazer) \n
	  Usar o valor da quantidade de meses e ver se temos retroativos ou não
	  `
	);
  };

    return { handleCalculatorData };
};

import { constants } from "../constants/selectsValues";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { saveData } from "../utils/firebase/saveDataUser";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useCalculatorHandler = () => {
  const handleCalculatorData = async (data, user) => {
    let {
      // celular,
      // destinacaoObra,
      // faseObra,
      m2PiscinaQuadra,
      m2Construcao,
      tipoConstrucao,
      // concretoUsinado,
      // obraFinanciamento,
      previsaoTermino,
      inicioConstrucao,
      // proprietario,
      tipoProprietario,
      ufObra,
      // cidadeObra,
    } = data;

    let valorVau;
    let fatorSocial;
    let tipoDeConstrucaoPorcentagem;
    let regraAtual;
    let porcentagemDaReducao;
    let valorDoParcelamentoTotal;
    let porcentagemDoParcelamentoTotal;
    let valorMesRetroativo;
    let rmtObra;
    let metragemPorMes;
    let honorarioValor;
    let terminoMenorOuIgualQueAtual;
    let valorFinalDaObra;
    let mesesALancar;
    let percentualDoImpostoComReducao;
    let mesesALancarNormal;
    let valorFinalDaObraParcelamento;
    let valorFinalDaEntradaParcelamento;
    let valorDaEntradaParcelamentoTotal;
    let quantTrabalhadores;

    try {
      async function getValorVau() {
        const result = await getDocs(collection(db, "VAU"));

        result.forEach((doc) => {
          if (doc.id === ufObra.value) {
            valorVau = doc.data().valor;
          }
        });
      }

      await getValorVau();
    } catch (e) {
      console.error(e);

      return;
    }

    //remover m² da piscina e quadra
    m2Construcao = m2Construcao.replace("m²", "").replace(",", ".");
    m2PiscinaQuadra = m2PiscinaQuadra.replace("m²", "").replace(",", ".");

    m2Construcao = Number(m2Construcao);
    m2PiscinaQuadra = Number(m2PiscinaQuadra);

    //Valor total da área
    switch (true) {
      case m2Construcao < 100:
        tipoDeConstrucaoPorcentagem = constants.menorQueCem;
        break;
      case m2Construcao >= 100 && m2Construcao <= 200:
        tipoDeConstrucaoPorcentagem = constants.deCemADozentos;
        break;
      case m2Construcao >= 200 && m2Construcao <= 300:
        tipoDeConstrucaoPorcentagem = constants.deDuzentosATrezeentos;
        break;
      case m2Construcao >= 300 && m2Construcao <= 400:
        tipoDeConstrucaoPorcentagem = constants.deTrezentosAQuatrocentos;
        break;
      default:
        tipoDeConstrucaoPorcentagem = constants.acimaDeQuatrocentos;
        break;
    }

    const metroTotal = m2Construcao + m2PiscinaQuadra;

    //calcula fator social
    switch (true) {
      case metroTotal < 100:
        fatorSocial = constants.menorQueCem;
        break;
      case metroTotal >= 100 && metroTotal <= 200:
        fatorSocial = constants.deCemADozentos;
        break;
      case metroTotal >= 200 && metroTotal <= 300:
        fatorSocial = constants.deDuzentosATrezeentos;
        break;
      case metroTotal >= 300 && metroTotal <= 400:
        fatorSocial = constants.deTrezentosAQuatrocentos;
        break;
      default:
        fatorSocial = constants.acimaDeQuatrocentos;
        break;
    }

    switch (true) {
      case metroTotal <= 100:
        metragemPorMes = constants.metragemAte100;
        break;
      case metroTotal <= 120:
        metragemPorMes = constants.metragemAte120;
        break;
      case metroTotal <= 200:
        metragemPorMes = constants.metragemAte200;
        break;
      case metroTotal <= 300:
        metragemPorMes = constants.metragemAte300;
        break;
      case metroTotal <= 400:
        metragemPorMes = constants.metragemAte400;
        break;
      default:
        metragemPorMes = constants.metragemAcima400;
        break;
    }

    inicioConstrucao = inicioConstrucao.replace(/\//g, "-").split("-");
    previsaoTermino = previsaoTermino.replace(/\//g, "-").split("-");

    const dateInicio = new Date();
    dateInicio.setMonth(inicioConstrucao[0] - 1);
    dateInicio.setFullYear(inicioConstrucao[1]);

    const dataFinal = new Date();
    dataFinal.setMonth(previsaoTermino[0] - 1);
    dataFinal.setFullYear(previsaoTermino[1]);

    terminoMenorOuIgualQueAtual = dataFinal.getTime() <= new Date().getTime();

    const diffTermino = Math.abs(
      dataFinal.getTime() - constants.dataAtual.getTime(),
    );
    const monthDiffTermino = Math.round(
      diffTermino / (1000 * 60 * 60 * 24 * 30),
    );

    valorMesRetroativo = metragemPorMes * constants.descontoPorMesRetroativo;

    const custoObraTotal = (
      m2Construcao * constants.percentualAreaPrincipal * valorVau +
      m2PiscinaQuadra * constants.percentualAreaComplementar * valorVau
    ).toFixed(2);

    const tipoConstrucaoPorcentagem =
      tipoConstrucao.value === "Alvenaria"
        ? constants.tipoDeConstrucaoComAlvenaria
        : constants.tipoDeConstrucaoComMadeiraOuMista;

    //Calculo da RMT
    rmtObra = (
      custoObraTotal *
      tipoConstrucaoPorcentagem *
      fatorSocial
    ).toFixed(2);

    const totalImpostoSemReducao = (
      rmtObra * constants.fatorMultiplicadorRmt
    ).toFixed(2);

    //Apresenta numero para contato devido pessoa Jurídica
    if (tipoProprietario.value !== "Pessoa Física")
      return "Por favor, entre em contato com nossos especialistas.";

    //Descobre valor da redução com base na metragem total do terreno
    if (metroTotal < 350)
      porcentagemDaReducao = constants.rmtParaAteTrezentosECinquenta;
    else porcentagemDaReducao = constants.rmtParaAcimaDeTrezentosECinquenta;

    regraAtual = (
      rmtObra *
      porcentagemDaReducao *
      constants.cotaPatronal
    ).toFixed(2);

    switch (true) {
      case metroTotal <= 100:
        honorarioValor = Math.round((totalImpostoSemReducao - regraAtual) / 2);
        break;
      case metroTotal <= 200:
        honorarioValor = constants.honorarioAteDuzentos;
        break;
      case metroTotal <= 300:
        honorarioValor = constants.honorarioAteTrezentos;
        break;
      case metroTotal <= 400:
        honorarioValor = constants.honorarioAteQuatrocentos;
        break;
      case metroTotal <= 500:
        honorarioValor = constants.honorarioAteDeQuinhentos;
        break;
      case metroTotal <=600:
        honorarioValor = constants.honorarioAteDeSeiscentos;
        break;
      case metroTotal <=700:
        honorarioValor = constants.honorarioAteDeSetecentos;
        break;
      case metroTotal <=800:
        honorarioValor = constants.honorarioAteDeOitocentos;
        break;
      case metroTotal <= 900:
        honorarioValor = constants.honorarioAteDeNovecentos;
        break;
      default:
        honorarioValor = constants.honorarioAcimaDeMil;
        break;
    }

    switch (true) {
      case metroTotal <= 350:
        percentualDoImpostoComReducao =
          constants.percentualAteTrezentosECinquenta;
        break;
      default:
        percentualDoImpostoComReducao =
          constants.percentualAcimaDeTrezentosECinquenta;
        break;
    }

    if (metragemPorMes - monthDiffTermino <= 0)
      mesesALancar = Number(metragemPorMes);
    else mesesALancar = monthDiffTermino;

    console.log("regraAtual", regraAtual);

    //data de previsão e termino for menor ou igual que a data de hoje
    //regraAtual + (valor da tabela dos meses * 100) + (1% quando menor ou igual que 350 ou 2% da RMT gerada)
    if (terminoMenorOuIgualQueAtual) {
      console.log("caiu aqui", regraAtual);
      regraAtual =
        Number(regraAtual) +
        Number(metragemPorMes) * 100 +
        Number(rmtObra) * Number(percentualDoImpostoComReducao);
      console.log("caiu aqui 1", regraAtual);

      regraAtual =
        regraAtual +
        Number(regraAtual) *
          Number(import.meta.env.VITE_JUROS) *
          Number(monthDiffTermino);
      console.log("caiu aqui 2", regraAtual);
    } else {
      mesesALancarNormal =
        Number(valorMesRetroativo) -
        Number(monthDiffTermino * constants.descontoPorMesRetroativo);

      valorMesRetroativo = mesesALancarNormal >= 0 ? mesesALancarNormal : 0;

      regraAtual =
        mesesALancarNormal > 0
          ? Number(regraAtual) +
            (Number(metragemPorMes) - monthDiffTermino > 0
              ? (Number(metragemPorMes) - monthDiffTermino) * 100
              : 0)
          : regraAtual;

      valorFinalDaObra =
        regraAtual -
        valorMesRetroativo -
        mesesALancar * import.meta.env.VITE_DESCONTO_METRAGEM;
    }

    if (!terminoMenorOuIgualQueAtual) {
      if ((valorFinalDaObra + valorFinalDaObra * 0.2) / 60 < 100) {
        valorFinalDaObraParcelamento = Math.round(
          (valorFinalDaObra + valorFinalDaObra * 0.2) / 100,
        );
        valorDoParcelamentoTotal = 100;
      } else {
        valorFinalDaObraParcelamento = 60;
        valorDoParcelamentoTotal =
          (valorFinalDaObra + valorFinalDaObra * 0.2) / 60;

        if (valorDoParcelamentoTotal < 100) valorDoParcelamentoTotal = 100;
      }

      if ((valorMesRetroativo + valorMesRetroativo * 0.2) / 60 < 100) {
        valorFinalDaEntradaParcelamento = Math.round(
          (valorMesRetroativo + valorMesRetroativo * 0.2) / 100,
        );
        valorDaEntradaParcelamentoTotal = 100;
      } else {
        valorFinalDaEntradaParcelamento = 60;
        valorDaEntradaParcelamentoTotal =
          (valorMesRetroativo + valorMesRetroativo * 0.2) / 60;

        if (valorFinalDaEntradaParcelamento < 100)
          valorFinalDaEntradaParcelamento = 100;
      }
    } else {
      if ((regraAtual + regraAtual * 0.2) / 100 < 60) {
        valorFinalDaObraParcelamento = Math.round(
          (regraAtual + regraAtual * 0.2) / 100,
        );
        valorDoParcelamentoTotal = 100;
      } else {
        valorFinalDaObraParcelamento = 60;
        valorDoParcelamentoTotal = (regraAtual + regraAtual * 0.2) / 60;
      }
    }

    quantTrabalhadores =
      m2Construcao <= 100 ? 1 : Math.round(regraAtual / 100 / 2 / 10);

    const result = await fetch(`${import.meta.env.VITE_BACKEND_API}/contatos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        honorarioValor,
        porcentagemDoParcelamentoTotal,
        // monthDiff,
        metroTotal,
        mesesALancar,
        metragemPorMes,
        m2Construcao,
        m2PiscinaQuadra,
        rmtObra,
        terminoMenorOuIgualQueAtual,
        totalImpostoSemReducao,
        quantTrabalhadores,
        regraAtual,
        valorVau,
        valorFinalDaObra,
        valorMesRetroativo,
        valorDoParcelamentoTotal,
        valorFinalDaObraParcelamento,
        valorFinalDaEntradaParcelamento,
        valorDaEntradaParcelamentoTotal,

        //campos da home
        proprietario: data.proprietario,
        celular: data.celular,
        tipoProprietario: data.tipoProprietario.value,
        destinacaoObra: data.destinacaoObra.value,
        obraFinanciamento: data.obraFinanciamento.value,
        tipoConstrucao: data.tipoConstrucao.value,
        faseObra: data.faseObra.value,
        ufObra: data.ufObra.value,
        cidadeObra: data.cidadeObra.value,
        previsaoTermino: data.previsaoTermino,
        inicioConstrucao: data.inicioConstrucao,
        cpf: data.cpf,
      }),
    });

    const response = await result.json();

    if (response.error) {
      console.error(response.error);

      return;
    }

    console.log("resssaaa", response);

    return;

    //Insert on localstorage
    localStorage.setItem(
      "obraData",
      JSON.stringify({
        // valores do useCalculatorHandler
        honorarioValor,
        porcentagemDoParcelamentoTotal,
        // monthDiff,
        metroTotal,
        mesesALancar,
        metragemPorMes,
        m2Construcao,
        m2PiscinaQuadra,
        quantTrabalhadores,
        rmtObra,
        terminoMenorOuIgualQueAtual,
        totalImpostoSemReducao,
        regraAtual,
        valorVau,
        valorFinalDaObra,
        valorMesRetroativo,
        valorDoParcelamentoTotal,
        valorFinalDaObraParcelamento,
        valorFinalDaEntradaParcelamento,
        valorDaEntradaParcelamentoTotal,

        //campos da home
        proprietario: data.proprietario,
        celular: data.celular,
        tipoProprietario: data.tipoProprietario,
        destinacaoObra: data.destinacaoObra,
        obraFinanciamento: data.obraFinanciamento,
        tipoConstrucao: data.tipoConstrucao,
        faseObra: data.faseObra,
        ufObra: data.ufObra,
        cidadeObra: data.cidadeObra,
        previsaoTermino: data.previsaoTermino,
        inicioConstrucao: data.inicioConstrucao,
        cpf: data.cpf,
      }),
    );

    if (user)
      saveData(
        {
          totalImpostoSemReducao,
          regraAtual,
          valorDoParcelamentoTotal,
          porcentagemDoParcelamentoTotal,
          metroTotal,
          m2PiscinaQuadra,
          rmtObra,
          valorVau,
          valorMesRetroativo,
          metragemPorMes,
          honorarioValor,
        },
        user,
      );

    // navigate to /res with react router
    window.location.href = "/res";
  };

  return { handleCalculatorData };
};

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
    let totalImpostoComReducao;
    let porcentagemDaReducao;
    let valorDoParcelamentoTotal;
    let porcentagemDoParcelamentoTotal;
    let valorMesRetroativo;
    let rmtObra;
    let metragemPorMes;
    let honorarioValor;
    let terminoMaiorQueAtual;
    let valorFinalDaObra;
    let mesesALancar;

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
    m2Construcao = m2Construcao.replace('m²', '');
    m2PiscinaQuadra = m2PiscinaQuadra.replace('m²', '');

    m2Construcao = Number(m2Construcao);
    m2PiscinaQuadra = Number(m2PiscinaQuadra);

    //Valor total da área
    switch (true) {
      case m2Construcao < 100: tipoDeConstrucaoPorcentagem = constants.menorQueCem; break;
      case m2Construcao >= 100 && m2Construcao <= 200: tipoDeConstrucaoPorcentagem = constants.deCemADozentos; break;
      case m2Construcao >= 200 && m2Construcao <= 300: tipoDeConstrucaoPorcentagem = constants.deDuzentosATrezeentos; break;
      case m2Construcao >= 300 && m2Construcao <= 400: tipoDeConstrucaoPorcentagem = constants.deTrezentosAQuatrocentos; break;
      default: tipoDeConstrucaoPorcentagem = constants.acimaDeQuatrocentos; break;
    }

    const metroTotal = m2Construcao + m2PiscinaQuadra;

    //calcula fator social
    switch (true) {
      case metroTotal < 100: fatorSocial = constants.menorQueCem; break;
      case metroTotal >= 100 && metroTotal <= 200: fatorSocial = constants.deCemADozentos; break;
      case metroTotal >= 200 && metroTotal <= 300: fatorSocial = constants.deDuzentosATrezeentos; break;
      case metroTotal >= 300 && metroTotal <= 400: fatorSocial = constants.deTrezentosAQuatrocentos; break;
      default: fatorSocial = constants.acimaDeQuatrocentos; break;
    }

    inicioConstrucao = inicioConstrucao.replace(/\//g, '-').split('-');
    previsaoTermino = previsaoTermino.replace(/\//g, '-').split('-');

    const dateInicio = new Date();
    dateInicio.setMonth(inicioConstrucao[0] - 1);
    dateInicio.setFullYear(inicioConstrucao[1]);

    const dataFinal = new Date();
    dataFinal.setMonth(previsaoTermino[0] - 1);
    dataFinal.setFullYear(previsaoTermino[1]);

    terminoMaiorQueAtual = dataFinal < new Date();

    const diff = Math.abs(dateInicio.getTime() - constants.dataAtual.getTime());
    const monthDiff = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
    const diffTermino = Math.abs(dataFinal.getTime() - constants.dataAtual.getTime());
    const monthDiffTermino = Math.round(diffTermino / (1000 * 60 * 60 * 24 * 30));

    if(!terminoMaiorQueAtual)
      valorMesRetroativo = (monthDiff > 0 && monthDiff * constants.descontoPorMesRetroativo + 100);
    else
      valorMesRetroativo = (monthDiff - monthDiffTermino - 1) * constants.descontoPorMesRetroativo;

    switch (true) {
      case metroTotal <= 120: metragemPorMes = constants.metragemAte120; break;
      case metroTotal <= 200: metragemPorMes = constants.metragemAte200; break;
      case metroTotal <= 300: metragemPorMes = constants.metragemAte300; break;
      case metroTotal <= 400: metragemPorMes = constants.metragemAte400; break;
      default: metragemPorMes = constants.metragemAcima400; break;
    }

    switch (true) {
      case metroTotal <= 100: honorarioValor = metroTotal / 2; break;
      case metroTotal <= 200: honorarioValor = constants.honorarioAteDuzentos; break;
      case metroTotal <= 300: honorarioValor = constants.honorarioAteTrezentos; break;
      case metroTotal <= 400: honorarioValor = constants.honorarioAteQuatrocentos; break;
      case metroTotal <= 500: honorarioValor = constants.honorarioAteDeQuinhentos; break;
      default: honorarioValor = constants.honorarioAcimaDeQuinhentos; break;
    }

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

    totalImpostoComReducao = (
      rmtObra *
      porcentagemDaReducao *
      constants.cotaPatronal
    ).toFixed(2);

    if(monthDiff > 0 && !terminoMaiorQueAtual) totalImpostoComReducao = Math.round(Number(totalImpostoComReducao) + Math.round(rmtObra * 0.01) + Number(valorMesRetroativo));
    else totalImpostoComReducao = Math.round(Number(totalImpostoComReducao) + Math.round(rmtObra * 0.02) + valorMesRetroativo);

    if(!terminoMaiorQueAtual) valorFinalDaObra = totalImpostoComReducao - (valorMesRetroativo + ((metragemPorMes - monthDiff - (monthDiff > 0 ? 1 : 0)) * Number(import.meta.env.VITE_DESCONTO_METRAGEM)));
    else valorFinalDaObra = totalImpostoComReducao

    let valorFinalDaObraParcelamento;

    //Se valor final da obra + 10% / 100 for menor que 60, parcela em até 59x e se for maior que 100, parcela em até 60x
    if((valorFinalDaObra + (valorFinalDaObra * 0.10)) / 100 < 60 ) {
      valorFinalDaObraParcelamento = Math.round((valorFinalDaObra + (valorFinalDaObra * 0.10)) / 100);
      valorDoParcelamentoTotal = 100;
    }
    else {
      valorFinalDaObraParcelamento = 60;
      valorDoParcelamentoTotal = Math.round(valorFinalDaObra / valorFinalDaObraParcelamento);
    }

    if(!terminoMaiorQueAtual) {
      mesesALancar = monthDiff > 0 ? metragemPorMes - monthDiff - 1 : metragemPorMes
    }
    else {
      mesesALancar = 0;
      valorMesRetroativo = 0;
    }

    //Insert on localstorage
    localStorage.setItem(
      "obraData",
      JSON.stringify({
        // valores do useCalculatorHandler
        honorarioValor,
        porcentagemDoParcelamentoTotal,
        monthDiff,
        metroTotal,
        mesesALancar,
        metragemPorMes,
        m2Construcao,
        m2PiscinaQuadra,
        rmtObra,
        terminoMaiorQueAtual,
        totalImpostoSemReducao,
        totalImpostoComReducao,
        valorVau,
        valorFinalDaObra,
        valorMesRetroativo,
        valorDoParcelamentoTotal,
        valorFinalDaObraParcelamento,

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
      }),
    );

    if (user)
      saveData(
        {
          totalImpostoSemReducao,
          totalImpostoComReducao,
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
        user
      );

    // navigate to /res with react router
    window.location.href = "/res";
  };

  return { handleCalculatorData };
};

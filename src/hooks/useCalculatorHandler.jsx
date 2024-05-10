import { constants } from "../constants/selectsValues";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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
  const handleCalculatorData = async (data) => {
    let {
      // celular,
      // destinacaoObra,
      // faseObra,
      m2PiscinaQuadra,
      m2Construcao,
      tipoConstrucao,
      // concretoUsinado,
      // obraFinanciamento,
      // previsaoTermino,
      inicioConstrucao,
      // proprietario,
      tipoProprietario,
      ufObra,
      // cidadeObra,
    } = data;

	console.log('jdlkasjldl' ,m2Construcao)

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

    const mesInicioDaConstrucao = new Date().getMonth(inicioConstrucao) + 1;

    //Verifica se inicio da construção é menor que o mês atual
    switch (true) {
      case mesInicioDaConstrucao < constants.mesAtual - 3: valorMesRetroativo = constants.mesRetroativoQuandoMenorQueQuatroAnosEmDiante; break;
      case mesInicioDaConstrucao < constants.mesAtual - 2: valorMesRetroativo = constants.mesRetroativoQuandoMenorQueTresAnos; break;
      case mesInicioDaConstrucao < constants.mesAtual - 1: valorMesRetroativo = constants.mesRetroativoQuandoMenorQueDoisAnos; break;
      case mesInicioDaConstrucao < constants.mesAtual: valorMesRetroativo = constants.mesRetroativoQuandoMenorQueUmAno; break;
      default: valorMesRetroativo = false; break;
    }

    switch(true) {
      case metroTotal <= 120: metragemPorMes = constants.metragemAte120; break;
      case metroTotal <= 200: metragemPorMes = constants.metragemAte200; break;
      case metroTotal <= 300: metragemPorMes = constants.metragemAte300; break;
      case metroTotal <= 400: metragemPorMes = constants.metragemAte400; break;
      default: metragemPorMes = constants.metragemAcima400; break;
    }

    switch(true) {
      case metroTotal <= 100: honorarioValor = metroTotal / 2; break;
      case metroTotal <= 200: honorarioValor = constants.honorarioAteDuzentos; break;
      case metroTotal <= 300: honorarioValor = constants.honorarioAteTrezentos; break;
      case metroTotal <= 400: honorarioValor = constants.honorarioAteQuatrocentos; break;
      case metroTotal <= 500: honorarioValor = constants.honorarioAteDeQuinhentos; break;
      default: honorarioValor = constants.honorarioAcimaDeQuinhentos; break;
    }

    const custoObraTotal = (m2Construcao * constants.percentualAreaPrincipal * valorVau + m2PiscinaQuadra * constants.percentualAreaComplementar * valorVau).toFixed(2);

    const tipoConstrucaoPorcentagem = tipoConstrucao.value === "Alvenaria" ? constants.tipoDeConstrucaoComAlvenaria : constants.tipoDeConstrucaoComMadeiraOuMista;

    //Calculo da RMT
    rmtObra = ( custoObraTotal * tipoConstrucaoPorcentagem * fatorSocial).toFixed(2);

    const totalImpostoSemReducao = (rmtObra * constants.fatorMultiplicadorRmt).toFixed(2);

    //Apresenta numero para contato devido pessoa Jurídica
    if (tipoProprietario.value !== "Pessoa Física") return "Por favor, entre em contato com nossos especialistas.";

    //Descobre valor da redução com base na metragem total do terreno
    if (metroTotal < 350) porcentagemDaReducao = constants.rmtParaAteTrezentosECinquenta;
    else porcentagemDaReducao = constants.rmtParaAcimaDeTrezentosECinquenta;

    totalImpostoComReducao = (rmtObra * porcentagemDaReducao * constants.cotaPatronal).toFixed(2);

    porcentagemDoParcelamentoTotal = totalImpostoComReducao % 60 === 0 ? 60 : totalImpostoComReducao % 60;

    valorDoParcelamentoTotal = (totalImpostoComReducao / porcentagemDoParcelamentoTotal).toFixed(2);

    //Insert on localstorage
    localStorage.setItem(
      "obraData",
      JSON.stringify({
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
      }),
    );

    //navigate to /res with react router
    window.location.href = "/res";
  };

  return { handleCalculatorData };
};

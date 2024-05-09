import AppBar from "../Home/AppBar";
import arrowBlue from "../../assets/arrow-blue.png";
import arrowGray from "../../assets/arrow-gray.png";
import iconPlusBlue from "../../assets/icon-plus-blue.png";
import iconEqualBlue from "../../assets/icon-equal-blue.png";

import Footer from "../Home/Footer";
import { WhatsappHandler } from "../../componentes/WhatsappHandler";

const DivResultData = ({ label, value }) => (
  <div className="w-full flex flex-col gap-2 max-w-[48%]">
    <label className="text-xl font-semibold text-[var(--gray)]">{label}</label>
    <div className="border border-gray-300 rounded p-3">
      <div className="text-lg text-gray-500">{value}</div>
    </div>
  </div>
);

const ResultPage = () => {
  //get value obraData on localstorage
  const {
    totalImpostoSemReducao,
    totalImpostoComReducao,
    valorDoParcelamentoTotal,
    porcentagemDoParcelamentoTotal,
    metroTotal,
    m2PiscinaQuadra,
    rmtObra,
    valorVau,
    valorMesRetroativo,
  } = JSON.parse(localStorage.getItem("obraData"));

  return (
    <>
      <AppBar />
      <WhatsappHandler
        className={
          "w-[100rem] h-[100rem] fixed right-[60rem] bottom-[40rem] shadow-xl cursor-pointer bg-green-500 flex items-center justify-center p-3 rounded-[20rem]"
        }
      />
      <main className="max-w-[1440rem] m-auto">
        <div className="mt-[60rem] mb-4 flex items-center justify-center gap-2">
          <img src={arrowBlue} alt="arrow blue" className="w-[20rem]" />
          <h2 className="text-4xl font-bold">RESULTADO</h2>
        </div>

        <section className="bg-[#ffffff] mb-20 mx-14 border border-[#006837ff] rounded-[8rem]">
          <div className="bg-[var(--bg-gray-detail)] flex gap-10 px-10 py-7 rounded-t-lg">
            <DivResultData
              label="Área total"
              value={`${Number(metroTotal).toLocaleString({ maximumFractionDigits: 2, minimumFractionDigits: 2 })} m²`}
            />
            <DivResultData
              label="Complementar"
              value={`${Number(m2PiscinaQuadra).toLocaleString({ maximumFractionDigits: 2, minimumFractionDigits: 2 })} m²`}
            />
            <DivResultData
              label="RMT gerada"
              value={`${Number(rmtObra).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
            />
            <DivResultData label="Tabela VAU" value={`${valorVau}`} />
          </div>

          <div className="flex justify-center gap-12 mt-14">
            <div className="text-[#666666ff]">
              <p className="text-[30rem] font-medium ml-10">Na regra antiga</p>
              <span className="inline-flex items-end gap-3">
                <p className="text-[24rem] font-medium italic mb-2">De</p>
                <p className="border border-[#ccccccff] rounded-[8rem] inline-block px-4 py-2 text-4xl font-bold">
                  R$ 23.000,00
                </p>
              </span>
            </div>

            <div className="text-[#666666ff]">
              <p className="text-[30rem] font-medium text-[#006837ff] ml-12">
                Na regra atual
              </p>
              <span className="inline-flex items-end gap-3">
                <p className="text-[24rem] font-medium italic mb-2">Por</p>
                <p className="text-[#063958ff] border border-[#ccccccff] rounded-[8rem] inline-block px-4 py-2 text-4xl font-bold">
                  {`${Math.round(Number(totalImpostoComReducao)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                </p>
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5 m-auto max-w-[650rem]">
            <hr className="w-full h-[2rem] bg-[#999999ff]" />
            <p className="italic text-[#666666ff] min-w-[220rem] text-[18rem] mx-10">
              Valor do imposto a pagar
            </p>
            <hr className="w-full h-[2rem] bg-[#999999ff]" />
          </div>

          <div className="flex gap-4 items-center justify-center mt-14 mb-16">
            <p className="text-[#666666ff] font-medium text-xl">
              Nº de parcelas
            </p>
            <p className="border border-[#ccccccff] text-[#999999ff] text-xl w-[100rem] h-[50rem] pl-4 font-medium rounded-[8rem] flex items-center">{`${Number(porcentagemDoParcelamentoTotal).toFixed(0)}`}</p>

            <p className="text-[#666666ff] font-medium text-xl ml-3">Valor</p>
            <p className="border border-[#ccccccff] text-[#063958ff] text-xl pr-4 h-[50rem] pl-4 font-medium rounded-[8rem] inline-flex items-center">
              {`${Number(valorDoParcelamentoTotal).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
            </p>
          </div>

          <div className="bg-[#006837ff] flex justify-between rounded-b-lg overflow-hidden">
            <section className="flex items-center justify-between w-[60%] py-6 px-10">
              <p className="border-l-[5rem] border-[#00cc93ff] text-white font-bold text-[24rem] pl-3">
                ECONOMIA <br />
                GERADA:
              </p>

              <p className="text-white font-bold text-[50rem]">{`${Number(23000 - totalImpostoComReducao).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}</p>
            </section>

            <section className="bg-[#063958ff] text-center py-3 px-10">
              <p className="text-white font-bold text-[40rem]">
                {
                  `${(100 - (Number(totalImpostoComReducao) / 23000) * 100).toFixed(0)}% De Redução`
                }
              </p>
              <p className="text-white font-bold text-[16rem] text-center">
                BASE LEGAL ATUAL DA RECEITA FEDERAL CONFORME IN. 2021/2021
              </p>
            </section>
          </div>
        </section>

        {/* FORMA DE PAGAMENTO DOS IMPOSTOS */}
        <section className="mx-14 border border-[#999999ff] rounded-[8rem] relative flex flex-col items-center mb-10 py-10">
          <div className="inline-flex items-center gap-1 bg-white border border-[#999999ff] rounded-[8rem] px-4 py-1 absolute top-[-20rem]">
            <img src={arrowBlue} alt="arrow blue" className="w-[17rem]" />
            <h2 className="text-lg font-bold">
              FORMA DE PAGAMENTO DOS IMPOSTOS
            </h2>
          </div>

          <section className="flex gap-4">
            <div>
              <p className="text-xl text-[#666666ff] font-medium ml-4">
                Entrada:
              </p>
              <span className="inline-flex items-center gap-1 bg-[#eef1f6ff] px-4 py-2 rounded-[8rem]">
                <img
                  src={arrowGray}
                  alt="arrow gray"
                  className="w-[10rem] h-[12rem]"
                />
                <p className="text-[#063958ff] font-bold text-xl">{`${Number(valorMesRetroativo).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}</p>
              </span>
            </div>
            <img
              src={iconPlusBlue}
              alt="icon plus blue"
              className="w-[40rem] h-[40rem] mt-7"
            />
            <div>
              <p className="text-xl text-[#666666ff] font-medium ml-4">
                <span className="text-[#063958ff] font-bold">6</span> meses de:
              </p>
              <span className="inline-flex items-center gap-1 bg-[#eef1f6ff] px-4 py-2 rounded-[8rem]">
                <img
                  src={arrowGray}
                  alt="arrow gray"
                  className="w-[10rem] h-[12rem]"
                />
                <p className="text-[#063958ff] font-bold text-xl">R$ 264,00</p>
              </span>
            </div>
            <img
              src={iconPlusBlue}
              alt="icon plus blue"
              className="w-[40rem] h-[40rem] mt-7"
            />

            {/* final da obra */}
            <div>
              <div>
                <p className="text-xl text-[#666666ff] font-medium ml-4">
                  Final da obra:
                </p>
                <span className="inline-flex items-center gap-1 bg-[#eef1f6ff] px-4 w-full py-2 rounded-[8rem]">
                  <img
                    src={arrowGray}
                    alt="arrow gray"
                    className="w-[10rem] h-[12rem]"
                  />
                  <p className="text-[#063958ff] font-bold text-xl">
                    R$ 3.816,00
                  </p>
                </span>
              </div>
              <p className="text-[#808080ff] text-[12rem] font-bold mt-4">
                NO FINAL DA OBRA ESSES
              </p>
              <p className="text-[#808080ff] font-bold">
                <span className="text-[#063958ff] text-lg font-bold">
                  R$ 3.816,00
                </span>
                <span className="text-[12rem] ml-1"> PODERÁ SER PAGO</span>
              </p>
              <p className="text-[#808080ff] font-bold text-[12rem]">
                Á VISTA OU PARCELADO EM ATÉ
              </p>
              <p className="text-[#063958ff] font-bold text-3xl my-2">
                42<span className="text-[#999999ff] text-xl font-bold">X</span>{" "}
                R$ 100,00
              </p>
              <hr className="h-[2rem] bg-[#999999ff]" />
              <p className="text-[#808080ff] font-bold mt-2 text-[12rem]">
                NO DÉBITO AUTOMÁTICO
              </p>
            </div>
            <img
              src={iconEqualBlue}
              alt="icon plus blue"
              className="w-[40rem] h-[40rem] mt-7"
            />

            <div>
              <p className="text-xl text-[#666666ff] font-medium ml-4">
                Total pago:
              </p>
              <span className="inline-flex items-center gap-1 bg-[#eef1f6ff] px-4 py-2 rounded-[8rem]">
                <img
                  src={arrowGray}
                  alt="arrow gray"
                  className="w-[10rem] h-[12rem]"
                />
                <p className="text-[#063958ff] font-bold text-xl">
                  R$ 5.800,00
                </p>
              </span>
            </div>
          </section>
        </section>

        <section className="mx-14 border border-[#999999ff] rounded-[8rem] relative flex justify-center items-center text-center mb-10 py-10 gap-8">
          <div className="inline-flex items-center gap-1 bg-white border border-[#999999ff] rounded-[8rem] px-4 py-1 absolute top-[-20rem]">
            <img src={arrowBlue} alt="arrow blue" className="w-[17rem]" />
            <h2 className="text-lg font-bold">
              FORMA DE PAGAMENTO DOS NOSSOS HONORÁRIOS
            </h2>
          </div>

          <div>
            <p className="text-xl text-[#666666ff] font-medium ml-4">
              Honorários:
            </p>
            <span className="inline-flex items-center gap-1 bg-[#eef1f6ff] px-4 py-2 rounded-[8rem]">
              <img
                src={arrowGray}
                alt="arrow gray"
                className="w-[10rem] h-[12rem]"
              />
              <p className="text-[#063958ff] font-bold text-xl">R$ 3.500,00</p>
            </span>
          </div>

          <p className="text-[#063958ff] font-bold text-2xl mt-6">À vista</p>
          <div className="border-l border-[#999999ff] pl-5 mt-6">
            <p className="text-[#808080ff] font-bold text-[12rem]">PARCELADO</p>
            <p className="text-[#063958ff] font-bold text-2xl">
              12<span className="text-[#808080ff] font-bold text-lg">X</span> R$
              350,00
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResultPage;

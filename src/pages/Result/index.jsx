import AppBar from "../Home/AppBar";
import arrowBlue from "../../assets/arrow-blue.png";
import arrowGray from "../../assets/arrow-gray.png";
import iconPlusBlue from "../../assets/icon-plus-blue.png";
import iconEqualBlue from "../../assets/icon-equal-blue.png";

import Footer from "../Home/Footer";
import { WhatsappHandler } from "../../componentes/WhatsappHandler";
import { useNavigate } from "react-router-dom";

const DivResultData = ({ label, value }) => (
  <div className="w-full flex flex-col gap-2 md:max-w-fit">
    <label className="text-[20rem] font-semibold md:max-w-fit text-[var(--gray)]">
      {label}
    </label>
    <div className="border border-gray-300 rounded max-w-[145rem] p-3">
      <div className="text-lg text-gray-500">{value}</div>
    </div>
  </div>
);

const ResultPage = () => {
  const {
    totalImpostoSemReducao,
    regraAtual,
    valorDoParcelamentoTotal,
    mesesALancar,
    m2Construcao,
    m2PiscinaQuadra,
    rmtObra,
    valorVau,
    valorMesRetroativo,
    valorFinalDaObra,
    valorFinalDaObraParcelamento,
    valorFinalDaEntradaParcelamento,
    valorDaEntradaParcelamentoTotal,
    proprietario,
    ufObra,
    terminoMenorOuIgualQueAtual,
    previsaoTermino,
    honorarioValor,
    cpf,
  } = JSON.parse(localStorage.getItem("obraData"));

  const navigator = useNavigate();

  return (
    <>
      <AppBar />
      <WhatsappHandler />
      <main className="max-w-[1440rem] m-auto scale-90">
        <div className="mt-[60rem] mb-4 flex items-center justify-center gap-2">
          <img src={arrowBlue} alt="arrow blue" className="w-[20rem]" />
          <h2 className="text-4xl font-bold">RESULTADO</h2>
        </div>

        <section className="bg-[#ffffff] mb-20 mx-7 md:mx-14 border border-[#006837ff] rounded-[8rem]">
          <div className="bg-[var(--bg-gray-detail)] flex gap-[67rem] px-10 py-7 rounded-t-lg justify-center flex-wrap">
            <DivResultData
              label="M² De Construção"
              value={`${Number(m2Construcao).toLocaleString({
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })} m²`}
            />
            <DivResultData
              label="Complementar"
              value={`${Number(m2PiscinaQuadra).toLocaleString({
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })} m²`}
            />
            <DivResultData
              label="RMT gerada"
              value={`${Number(rmtObra).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}`}
            />
            <DivResultData label="Tabela VAU" value={`${valorVau}`} />
            <DivResultData
              label="Trabalhadores"
              value={`${
                m2Construcao <= 100 ? 1 : Math.round(regraAtual / 100 / 2 / 10)
              }`}
            />
            {/*<DivResultData label="CPF" value={`${valorVau}`} />*/}
            <DivResultData label="UF" value={`${ufObra.value}`} />
            <DivResultData label="Nome do Cliente" value={`${proprietario}`} />
            <DivResultData label="CPF" value={`${cpf}`} />
            <DivResultData
              label="Data de Termino"
              value={`${previsaoTermino}`}
            />
            {!terminoMenorOuIgualQueAtual && (
              <DivResultData label="Meses a Lançar" value={`${mesesALancar}`} />
            )}
          </div>

          <div className="flex justify-center gap-12 mt-14 flex-wrap">
            <div className="text-[#666666ff]">
              <p className="text-[35rem] font-bold ml-10">Na regra antiga</p>
              <span className="inline-flex items-end gap-3">
                <p className="text-[28rem] font-bold italic mb-2">De</p>
                <p className="border border-[#ccccccff] rounded-[8rem] inline-block px-4 py-2 text-5xl font-bold">
                  {`${Math.round(Number(totalImpostoSemReducao)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                </p>
              </span>
            </div>

            <div className="text-[#666666ff]">
              <p className="text-[35rem] font-bold text-[#006837ff] ml-12">
                Na regra atual
              </p>
              <span className="inline-flex items-end gap-3">
                <p className="text-[28rem] font-bold italic mb-2">Por</p>
                <p className="text-[#063958ff] border border-[#ccccccff] rounded-[8rem] inline-block px-4 py-2 text-5xl font-bold">
                  {`${Math.round(Number(regraAtual)).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`}
                </p>
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5 mb-14 m-auto max-w-[800rem] text-center">
            <hr className="w-full h-[3rem] bg-[#999999ff]" />
            <p className="italic text-[#666666ff] min-w-[300rem] text-[26rem] mx-10 mb-1">
              Valor do imposto a pagar
            </p>
            <hr className="w-full h-[3rem] bg-[#999999ff]" />
          </div>

          <div className="bg-[#006837ff] flex justify-between rounded-b-lg md:overflow-hidden flex-wrap lg:flex-nowrap">
            <section className="flex md:items-center justify-between w-full lg:w-[60%] py-6 px-10 flex-col md:flex-row">
              <p className="border-l-[5rem] border-[#00cc93ff] text-white font-extrabold text-[24rem] pl-3">
                ECONOMIA <br />
                GERADA:
              </p>

              <p className="text-white font-extrabold text-[40rem] sm:text-[50rem]">{`${Number(
                totalImpostoSemReducao - regraAtual,
              ).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}`}</p>
            </section>

            <section className="bg-[#063958ff] text-center py-3 px-10 w-full lg:max-w-[40%]">
              <p className="text-white font-extrabold text-[40rem]">
                {`${(
                  100 -
                  (Number(regraAtual) / totalImpostoSemReducao) * 100
                ).toFixed(0)}% DE REDUÇÃO`}
              </p>
              <p className="text-white font-bold text-[16rem] text-center">
                BASE LEGAL ATUAL DA RECEITA FEDERAL CONFORME IN. 2021/2021
              </p>
            </section>
          </div>
        </section>

        {/* FORMA DE PAGAMENTO DOS IMPOSTOS */}
        <section className="mx-7 md:mx-14 border border-[#999999ff] rounded-[8rem] relative flex flex-col items-center mb-10 py-10">
          <div className="inline-flex items-center gap-1 bg-white border border-[#999999ff] rounded-[8rem] px-4 py-1 absolute top-[-20rem]">
            <img src={arrowBlue} alt="arrow blue" className="w-[12rem]" />
            <h2 className="text-lg font-bold">
              FORMA DE PAGAMENTO DOS IMPOSTOS
            </h2>
          </div>

          <section className="flex gap-4 flex-wrap justify-center">
            {!terminoMenorOuIgualQueAtual && (
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
                  <p className="text-[#063958ff] font-bold text-xl">{`${Number(
                    valorMesRetroativo,
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`}</p>
                </span>
                {valorMesRetroativo > 0 && (
                  <>
                    <p className="text-[#808080ff] text-[12rem] font-bold mt-4">
                      NA ENTRADA ESSES
                    </p>
                    <p className="text-[#808080ff] font-bold">
                      <span className="text-[#063958ff] text-lg font-bold">
                        {`${Math.round(Number(valorMesRetroativo)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                      </span>
                      <span className="text-[12rem] ml-1">
                        {" "}
                        PODERÁM SER PAGOS
                      </span>
                    </p>
                    <p className="text-[#808080ff] font-bold text-[12rem]">
                      Á VISTA OU PARCELADO EM ATÉ
                    </p>
                    <p className="text-[#063958ff] font-bold text-3xl my-2">
                      {`${Number(valorFinalDaEntradaParcelamento)}`}
                      <span className="text-[#999999ff] text-xl font-bold">
                        X
                      </span>{" "}
                      {`${Math.round(Number(valorDaEntradaParcelamentoTotal)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                    </p>
                    <hr className="h-[2rem] bg-[#999999ff]" />
                    <p className="text-[#808080ff] font-bold mt-2 text-[12rem]">
                      NO DÉBITO AUTOMÁTICO
                    </p>
                  </>
                )}
              </div>
            )}
            ) (
            {!terminoMenorOuIgualQueAtual && (
              <>
                <img
                  src={iconPlusBlue}
                  alt="icon plus blue"
                  className="w-[40rem] h-[40rem] mt-7"
                />
                <div>
                  <p className="text-xl text-[#666666ff] font-medium ml-4">
                    <span className="text-[#063958ff] font-bold">
                      {mesesALancar}
                    </span>{" "}
                    {mesesALancar < 2 ? "mes de:" : "meses de:"}
                  </p>
                  <span className="inline-flex items-center gap-1 bg-[#eef1f6ff] px-4 py-2 rounded-[8rem]">
                    <img
                      src={arrowGray}
                      alt="arrow gray"
                      className="w-[10rem] h-[12rem]"
                    />
                    <p className="text-[#063958ff] font-bold text-xl">{`${Number(import.meta.env.VITE_DESCONTO_METRAGEM).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}</p>
                  </span>
                </div>
                <img
                  src={iconPlusBlue}
                  alt="icon plus blue"
                  className="w-[40rem] h-[40rem] mt-7"
                />
              </>
            )}
            )
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
                    {terminoMenorOuIgualQueAtual
                      ? Math.round(regraAtual).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : Math.round(valorFinalDaObra).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                  </p>
                </span>
              </div>
              <p className="text-[#808080ff] text-[12rem] font-bold mt-4">
                NO FINAL DA OBRA ESSES
              </p>
              <p className="text-[#808080ff] font-bold">
                <span className="text-[#063958ff] text-lg font-bold">
                  {!terminoMenorOuIgualQueAtual
                    ? `${Math.round(Number(valorFinalDaObra)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
                    : Math.round(regraAtual).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </span>
                <span className="text-[12rem] ml-1"> PODERÁ SER PAGO</span>
              </p>
              <p className="text-[#808080ff] font-bold text-[12rem]">
                Á VISTA OU PARCELADO EM ATÉ
              </p>
              <p className="text-[#063958ff] font-bold text-3xl my-2">
                {`${Number(valorFinalDaObraParcelamento)}`}
                <span className="text-[#999999ff] text-xl font-bold">
                  X
                </span>{" "}
                {`${Math.round(Number(valorDoParcelamentoTotal)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
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
                  {`${Math.round(Number(regraAtual)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                </p>
              </span>
            </div>
          </section>
        </section>

        <section className="mx-7 md:mx-14 border border-[#999999ff] rounded-[8rem] relative flex justify-center items-center text-center mb-10 py-10 gap-8 flex-wrap">
          <div className="inline-flex items-center gap-1 bg-white border border-[#999999ff] rounded-[8rem] px-4 py-1 absolute top-[-20rem]">
            <img src={arrowBlue} alt="arrow blue" className="w-[12rem]" />
            <h2 className="text-lg font-bold">
              FORMA DE PAGAMENTO DOS NOSSOS HONORÁRIOS
            </h2>
          </div>
          {typeof honorarioValor !== "string" && (
            <>
              <div className="pl-5">
                <p className="text-[#808080ff] font-bold text-[12rem]">
                  PARCELADO
                </p>
                <p className="text-[#063958ff] font-bold text-2xl">
                  12
                  <span className="text-[#808080ff] font-bold text-lg">
                    X de
                  </span>{" "}
                  {`${Number(honorarioValor / 10).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                </p>
              </div>
            </>
          )}
          <div
            className={`${typeof honorarioValor !== "string" && "border-l border-[#999999ff]"} h-[50rem] pl-5`}
          >
            {/* <p className="text-xl text-[#666666ff] font-medium ml-4 mt-8 md:mt-0">
              Honorários:
            </p> */}
            <div className="flex items-center justify-center gap-5">
              {typeof honorarioValor !== "string" && (
                <p className="text-[#063958ff] font-bold text-2xl">
                  À vista com 20% de Desconto
                </p>
              )}
              <span className="inline-flex items-center gap-1 bg-[#eef1f6ff] px-4 py-2 rounded-[8rem]">
                <img
                  src={arrowGray}
                  alt="arrow gray"
                  className="w-[10rem] h-[10rem]"
                />
                <p className="text-[#063958ff] font-bold text-xl">{`${(typeof honorarioValor === "string" && honorarioValor) || Number(honorarioValor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}</p>
              </span>
            </div>
          </div>
        </section>

        <section className="mx-7 md:mx-14 flex justify-start items-center text-center mb-10 py-10 gap-8 flex-wrap">
          <button
            className="bg-[#ff9000] text-white font-bold text-2xl px-10 py-3 rounded-[8rem]"
            onClick={() =>
              window.open("/pdf", "_blank", "rel=noopener noreferrer")
            }
          >
            GERAR PDF
          </button>
          <a
            href="http://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=116968"
            target="_blank"
          >
            <button className="bg-[#063958] text-white font-bold text-2xl px-10 py-3 rounded-[8rem]">
              BAIXE A INSTRUÇÃO NORMATIVA
            </button>
          </a>
          <button
            className="bg-gray-400 text-white font-bold text-2xl px-10 py-3 rounded-[8rem]"
            onClick={() => navigator("/")}
          >
            VOLTAR
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResultPage;

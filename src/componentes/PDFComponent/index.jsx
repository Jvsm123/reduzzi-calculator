import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";

import logo from "../../assets/pdf/reduzzi_logo_pdf.png";
import arrowGray from "../../assets/pdf/arrow_gray_pdf.png";
import plusIcon from "../../assets/pdf/plus_pdf.png";
import equalIcon from "../../assets/pdf/equal_pdf.png";
import correct from "./correct.png";
import whatsIcon from "../../assets/pdf/whats.png";

import { tw } from "./tailwindConfig.js";

Font.register({
  family: "axiforma",
  src: "https://fonts.gstatic.com/s/axiforma/v10/1Ptsg8LJRfWJmhDAuUsw0L5OcCk.ttf",
});

const ValoresGerais = ({ label, value, textStyle, valueStyle, divStyle }) => (
  <div style={tw("flex flex-col items-start")}>
    <Text style={textStyle}>{label}</Text>
    <div
      style={
        divStyle ||
        tw(
          "px-2 border-[1px] border-gray-400 rounded-lg w-[99px] text-base items-center text-start pt-2",
        )
      }
    >
      <Text style={valueStyle}>{value}</Text>
    </div>
  </div>
);

const ContainerComparativo = ({ header, content, container }) => (
  <div
    style={tw(
      container ||
        `w-[210px] gap-2 flex flex-col items-center bg-white border-[1px] border-gray-700 rounded-lg p-6`,
    )}
  >
    <div style={tw("flex flex-row items-start gap-2 w-[100%] mb-6")}>
      <Image src={arrowGray} style={tw("w-[10px] h-[10px]")} />
      <Text
        style={tw("text-[12px] font-extrabold text-[#00395e] max-w-[140px]")}
      >
        {header}
      </Text>
    </div>

    {content.map((item, index, arr) => (
      <div style={tw("text-gray-600 w-[100%] text-[10px]")} key={index}>
        {item}
        {index !== arr.length - 1 && (
          <hr style={tw("w-[100%] h-[1px] my-3 bg-gray-500")} />
        )}
      </div>
    ))}
  </div>
);

export const PDFComponent = () => {
  const data = JSON.parse(localStorage.getItem("obraData"));

  return (
    <PDFViewer style={{ width: window.innerWidth, height: window.innerHeight }}>
      <Document title="Orçamento" author="Reduzzi">
        <Page size="A4">
          <View
            style={tw(
              "h-[8rem] p-6 flex flex-row justify-between items-center bg-gray-500 bg-[#00395e]",
            )}
          >
            <Image src={logo} style={tw("w-[140px] h-[45px]")} />
            <div style={tw("text-white flex flex-row items-center gap-2")}>
              <Svg
                viewBox="0 0 5.9333191 7.3599852"
                style={tw("w-[18px] h-[18px]")}
              >
                <Path
                  d="M 0.000 0.000 L 5.933 3.680 L 0.000 7.360 L 0.000 0.000 Z"
                  fill="gray"
                />
              </Svg>
              <Text style={tw("text-[24px] text-extrabold")}>ORÇAMENTO</Text>
            </div>
          </View>

          <View
            style={tw(
              "bg-white h-[720px] flex flex-col items-center gap-8 text-white",
            )}
          >
            <div
              style={tw("flex flex-row justify-center items-center mt-4 gap-2")}
            >
              <Image src={arrowGray} style={tw("w-[10px] h-[10px]")} />
              <Text style={tw("text-[1rem] text-[#00395e] mt-0")}>
                DADOS DO ORÇAMENTO DE PRESTAÇÃO DE SERVIÇOS: REDUÇÃO DE INSS
              </Text>
            </div>

            <div
              style={tw(
                "flex flex-row flex-wrap items-center justify-center text-sm text-gray-600 gap-6",
              )}
            >
              <ValoresGerais
                label="Área Principal"
                value={`${data?.m2Construcao} m²`}
              />
              <ValoresGerais
                label="Complementar"
                value={`${data?.m2PiscinaQuadra} m²`}
              />
              <ValoresGerais
                label="Área total"
                value={`${data?.metroTotal} m²`}
              />
              <ValoresGerais
                label="RMT gerada"
                value={`${Number(data?.rmtObra).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
              />
              <ValoresGerais label="Tabela VAU" value={`${data?.valorVau}`} />
              <ValoresGerais
                label="Trabalhadores"
                value={`${Math.round(data?.regraAtual / 100 / 2 / 10)}`}
              />
              <ValoresGerais
                label="Nome do Cliente"
                value={data.proprietario}
              />
              <ValoresGerais label="CPF" value={data.cpf} />
              <ValoresGerais
                label="Data de Termino"
                value={data.previsaoTermino}
              />
              {!data.terminoMenorOuIgualQueAtual && (
                <ValoresGerais
                  label="Meses a Lançar"
                  value={data.mesesALancar}
                />
              )}
            </div>

            <div style={tw("flex flex-row text-sm text-gray-600 gap-[8rem]")}>
              <ValoresGerais
                label="Na regra antiga"
                value={`${Number(data?.totalImpostoSemReducao).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                textStyle={tw("text-gray-600 text-extrabold text-[16px]")}
                valueStyle={tw("text-gray-500 text-extrabold text-[20px]")}
                divStyle={tw(
                  "px-2 border-[1px] border-gray-400 rounded-lg w-[90px] text-base items-center text-start pt-2 w-[150px]",
                )}
              />
              <ValoresGerais
                label="Na regra atual"
                value={`${Number(data?.regraAtual).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                textStyle={tw(
                  "text-gray-600 font-extrabold text-[16px] text-[#036838ff]",
                )}
                valueStyle={tw(
                  "text-gray-500 font-bold text-[20px] text-[#093957ff]",
                )}
                divStyle={tw(
                  "px-2 border-[1px] border-gray-400 rounded-lg w-[90px] text-base items-center text-start pt-2 w-[150px]",
                )}
              />
            </div>

            <div
              style={tw(
                "bg-[#006837ff] flex flex-row justify-between rounded-lg md:overflow-hidden flex-wrap lg:flex-nowrap",
              )}
            >
              <div
                style={tw(
                  "flex md:items-center justify-between w-full lg:w-[340px] py-6 px-8 flex-col md:flex-row gap-7",
                )}
              >
                <div>
                  <Text
                    style={tw(
                      "border-l-[5px] border-green-400 font-axiforma text-white font-extrabold text-[14px] w-[80px] pl-3",
                    )}
                  >
                    ECONOMIA GERADA:
                  </Text>
                </div>
                <Text
                  style={tw(
                    "text-white font-extrabold text-[20px] sm:text-[30px]",
                  )}
                >
                  {`${Number(data?.totalImpostoSemReducao - data?.regraAtual).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
                </Text>
              </div>

              <div
                style={tw(
                  "bg-[#063958ff] text-center py-3 px-10 w-full lg:max-w-[250px]",
                )}
              >
                <Text style={tw("text-white font-extrabold text-[20px]")}>
                  {`${(
                    100 -
                    (Number(data?.regraAtual) / data?.totalImpostoSemReducao) *
                      100
                  ).toFixed(0)}% DE REDUÇÃO`}
                </Text>
                <Text style={tw("text-white font-bold text-[8px] text-center")}>
                  BASE LEGAL ATUAL DA RECEITA FEDERAL
                </Text>
                <Text style={tw("text-white font-bold text-[8px] text-center")}>
                  CONFORME IN. 2021/2021
                </Text>
              </div>
            </div>

            <div style={tw("flex flex-row gap-6")}>
              {(!data.terminoMenorOuIgualQueAtual && (
                <ContainerComparativo
                  comp={1}
                  header={"FORMA DE PAGAMENTO DOS IMPOSTOS"}
                  container={
                    "w-[210px] flex flex-col items-center bg-white border-[1px] border-gray-700 rounded-lg p-6"
                  }
                  content={[
                    <div style={tw("flex flex-row items-start gap-6")}>
                      <>
                        <Svg
                          viewBox="0 0 5.9333191 7.3599852"
                          style={tw("w-[8px]")}
                        >
                          <Path
                            d="M 0.000 0.000 L 5.933 3.680 L 0.000 7.360 L 0.000 0.000 Z"
                            fill="#00395e"
                          />
                        </Svg>
                        <div style={tw("flex flex-row gap-3 flex-end")}>
                          <Text style={tw("ml-[-8px]")}>Entrada:</Text>
                          <Text style={tw("text-[#063958ff]")}>
                            {Number(data?.valorMesRetroativo).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" },
                            )}
                          </Text>
                        </div>
                      </>
                    </div>,

                    <div style={tw("flex flex-row items-start gap-6")}>
                      <Image src={plusIcon} style={tw("w-[8px] h-[8px]")} />
                      <div style={tw("flex flex-row gap-2 flex-end")}>
                        <Text style={tw("ml-[-8px]")}>
                          {!data.terminoMenorOuIgualQueAtual &&
                            data.mesesALancar}
                        </Text>
                        <Text style={tw("")}>
                          {data.mesesALancar <= 1 ? "mes de" : "meses de"}:{" "}
                        </Text>
                        <Text style={tw("text-[#063958ff]")}>
                          {Number(
                            import.meta.env.VITE_DESCONTO_METRAGEM,
                          ).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Text>
                      </div>
                    </div>,

                    <div style={tw("flex flex-col items-start gap-6")}>
                      <div style={tw("flex flex-row gap-2")}>
                        <Image src={plusIcon} style={tw("w-[8px] h-[8px]")} />
                        <div style={tw("flex flex-row gap-3 flex-end")}>
                          <Text style={tw("")}>Final da Obra:</Text>
                          <Text style={tw("text-[#063958ff]")}>
                            {Math.round(data?.valorFinalDaObra).toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              },
                            )}
                          </Text>
                        </div>
                      </div>

                      <div style={tw("flex flex-col gap-5 items-center pl-1")}>
                        <Text style={tw("text-[10px]")}>
                          NO FINAL DA OBRA ESSES
                          <Text style={tw("text-[#063958ff]")}>
                            {Math.round(data?.valorFinalDaObra).toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              },
                            )}
                          </Text>{" "}
                          PODERÁ SER PAGO Á VISTA OU PARCELADO EM ATÉ
                        </Text>
                        <div style={tw("flex flex-row items-center gap-2")}>
                          <div style={tw("flex flex-row items-center")}>
                            <Text style={tw("text-[#063958ff] text-[12px]")}>
                              {data?.valorFinalDaObraParcelamento}
                            </Text>
                            <Text style={tw("text-[10px]")}>x</Text>
                          </div>
                          <Text style={tw("text-[#063958ff] text-[12px]")}>
                            {Number(
                              data?.valorDoParcelamentoTotal,
                            ).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Text>
                          <Text style={tw("text-[6px]")}>
                            NO DÉBITO AUTOMÁTICO
                          </Text>
                        </div>
                      </div>
                    </div>,

                    <div style={tw("flex flex-row items-center gap-10")}>
                      <Image src={equalIcon} style={tw("w-[8px] h-[8px]")} />
                      <div style={tw("flex flex-row gap-3 flex-end")}>
                        <Text style={tw("ml-[-20px]")}>Total a ser pago:</Text>
                        <Text style={tw("text-[#063958ff]")}>
                          {Number(data?.regraAtual).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Text>
                      </div>
                    </div>,
                  ]}
                />
              )) || (
                <ContainerComparativo
                  comp={1}
                  header={"FORMA DE PAGAMENTO DOS IMPOSTOS"}
                  container={
                    "w-[210px] flex flex-col items-center bg-white border-[1px] border-gray-700 rounded-lg p-6"
                  }
                  content={[
                    <div style={tw("flex flex-col items-start gap-6")}>
                      <div style={tw("flex flex-row gap-2")}>
                        <Image src={plusIcon} style={tw("w-[8px] h-[8px]")} />
                        <div style={tw("flex flex-row gap-3 flex-end")}>
                          <Text style={tw("")}>Final da Obra:</Text>
                          <Text style={tw("text-[#063958ff]")}>
                            {data.terminoMenorOuIgualQueAtual
                              ? Math.round(data.regraAtual).toLocaleString(
                                  "pt-BR",
                                  {
                                    style: "currency",
                                    currency: "BRL",
                                  },
                                )
                              : Math.round(
                                  data?.valorFinalDaObra,
                                ).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                          </Text>
                        </div>
                      </div>

                      <div style={tw("flex flex-col gap-5 items-center pl-1")}>
                        <Text style={tw("text-[10px]")}>
                          NO FINAL DA OBRA ESSES
                          <Text style={tw("text-[#063958ff]")}>
                            {data.terminoMenorOuIgualQueAtual
                              ? Math.round(data.regraAtual).toLocaleString(
                                  "pt-BR",
                                  {
                                    style: "currency",
                                    currency: "BRL",
                                  },
                                )
                              : Math.round(
                                  data?.valorFinalDaObra,
                                ).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                          </Text>{" "}
                          PODERÁ SER PAGO Á VISTA OU PARCELADO EM ATÉ
                        </Text>
                        <div style={tw("flex flex-row items-center gap-2")}>
                          <div style={tw("flex flex-row items-center")}>
                            <Text style={tw("text-[#063958ff] text-[12px]")}>
                              {data?.valorFinalDaObraParcelamento}
                            </Text>
                            <Text style={tw("text-[10px]")}>x</Text>
                          </div>
                          <Text style={tw("text-[#063958ff] text-[12px]")}>
                            {Number(
                              data?.valorDoParcelamentoTotal,
                            ).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Text>
                          <Text style={tw("text-[6px]")}>
                            NO DÉBITO AUTOMÁTICO
                          </Text>
                        </div>
                      </div>
                    </div>,

                    <div style={tw("flex flex-row items-center gap-10")}>
                      <Image src={equalIcon} style={tw("w-[8px] h-[8px]")} />
                      <div style={tw("flex flex-row gap-3 flex-end")}>
                        <Text style={tw("ml-[-20px]")}>Total a ser pago:</Text>
                        <Text style={tw("text-[#063958ff]")}>
                          {Number(data?.regraAtual).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Text>
                      </div>
                    </div>,
                  ]}
                />
              )}
              <div style={tw("flex flex-col justify-between ")}>
                <ContainerComparativo
                  comp={2}
                  header={"FORMA DE PAGAMENTO DOS HONORÁRIOS"}
                  container={
                    "w-[210px] h-[10rem] flex flex-col items-center bg-white border-[1px] border-gray-700 rounded-lg p-6"
                  }
                  content={[
                    <div style={tw("flex flex-row gap-4")}>
                      <Svg
                        viewBox="0 0 5.9333191 7.3599852"
                        style={tw("w-[8px]")}
                      >
                        <Path
                          d="M 0.000 0.000 L 5.933 3.680 L 0.000 7.360 L 0.000 0.000 Z"
                          fill="#00395e"
                        />
                      </Svg>
                      {(data.honorarioValor !== "CONSULTAR" && (
                        <div style={tw("flex flex-col gap-4 mb-[5px]")}>
                          <Text>A vista com 16,50% de Desconto:</Text>
                          <Text style={tw("text-[#063958ff]")}>
                            {Number(data?.honorarioValor).toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              },
                            )}
                          </Text>
                        </div>
                      )) || (
                        <Text style={tw("text-[#063958ff]")}>A CONSULTAR</Text>
                      )}
                    </div>,

                    <>
                      {data?.honorarioValor !== "CONSULTAR" && (
                        <div style={tw("flex flex-row gap-4")}>
                          <Svg
                            viewBox="0 0 5.9333191 7.3599852"
                            style={tw("w-[8px]")}
                          >
                            <Path
                              d="M 0.000 0.000 L 5.933 3.680 L 0.000 7.360 L 0.000 0.000 Z"
                              fill="#00395e"
                            />
                          </Svg>
                          <Text>Ou em</Text>
                          <Text style={tw("ml-[-10px] text-[#063958ff]")}>
                            12X
                          </Text>
                          <Text style={tw("ml-[-10px] mr-[-10px]")}>de</Text>
                          <Text>
                            {(typeof data.honorarioValor === "string" &&
                              data.honorarioValor) ||
                              (
                                Number(data?.honorarioValor) / 10
                              ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                          </Text>
                        </div>
                      )}
                    </>,
                  ]}
                />

                <Text
                  style={tw("text-gray-500 w-[16rem] text-[10px] mb-[2rem]")}
                >
                  *Este orçamento tem cunho informativo, com valores
                  aproximados, ao fazer a analise detalhada da documentação da
                  obra os valores podem ser alterados de acordo com as datas e
                  metragem do imóvel
                </Text>
              </div>
            </div>

            <div
              style={tw(
                "bg-[#00395e] flex flex-row h-[12rem] w-[100%] justify-between items-center px-14",
              )}
            >
              <div style={tw("flex flex-col text-[8px] w-[260px]")}>
                <div style={tw("flex flex-row items-center gap-2 mb-4")}>
                  <Image src={arrowGray} style={tw("w-[10px] h-[10px]")} />
                  <Text style={tw("text-[15px]")}>GARANTIAS REDUZZI</Text>
                </div>

                <div style={tw("flex flex-col gap-4")}>
                  <div style={tw("flex flex-row items-center gap-2")}>
                    <Image src={correct} style={tw("w-[20px] h-[20px]")} />
                    <Text style={tw("text-white")}>
                      SEGURANÇA JURÍDICA E TRIBUTÁRIA
                    </Text>
                  </div>

                  <div style={tw("flex flex-row items-center gap-2")}>
                    <Image src={correct} style={tw("w-[20px] h-[20px]")} />
                    <Text style={tw("text-white")}>
                      PARCELAMENTO E FLEXIBILIDADE DE PAGAMENTO
                    </Text>
                  </div>

                  <div style={tw("flex flex-row items-center gap-2")}>
                    <Image src={correct} style={tw("w-[21px] h-[20px]")} />
                    <Text style={tw("text-white")}>
                      RESPONSABILIDADE POR ATÉ 5 ANOS NOS VALORES PASSADOS
                    </Text>
                  </div>
                </div>
              </div>

              <div style={tw("flex flex-col justify-between gap-12")}>
                <div style={tw("flex flex-row bg-white p-4 rounded-[50%]")}>
                  <Text style={tw("text-[#00395e]")}>
                    DATA: {new Date().toLocaleDateString("pt-BR")}
                  </Text>
                </div>

                <div style={tw("flex flex-col")}>
                  <div style={tw("flex flex-row items-center gap-2")}>
                    <Image src={whatsIcon} style={tw("w-[12px] h-[12px]")} />
                    <Text>19 98136.1910</Text>
                  </div>

                  <Text>www.reduzzi.com.br</Text>
                </div>
              </div>
            </div>

            <div style={tw("px-6")}>
              <Text style={tw("text-sm text-center text-gray-600")}>
                Reduzzi Todos os Direitos Reservados: CNPJ 00.000.000/0001-58
              </Text>
            </div>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

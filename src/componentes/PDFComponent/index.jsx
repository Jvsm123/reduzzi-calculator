import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

import logo from "../../assets/logo_pdf_falandodeobra.png";
import cross from "./remove.png";
import correct from "./correct.png";

import { tw } from "./tailwindConfig.js";

const ValoresGerais = ({ label, value }) => (
  <div style={tw("flex flex-col items-center")}>
    <Text style={{ fontWeight: "demibold" }}>{label}</Text>
    <div
      style={tw(
        "px-2 border-2 border-gray-400 rounded-lg w-[90px] text-base items-center text-start pt-2",
      )}
    >
      <Text>{value}</Text>
    </div>
  </div>
);

const ContainerComparativo = ({
  comp,
  header,
  icon,
  comparativos,
  valorInss,
}) => (
  console.log('key', comp),
  <div
    style={tw(
      `w-[210px] flex flex-col items-center bg-[${comp === 1 ? "#1a8fc4" : "#097abc"}] rounded-lg p-6 gap-4`,
    )}
  >
    <Text style={tw("text-1xl text-white text-center max-w-[120px]")}>
      {header}
    </Text>

    <hr style={tw("w-[90%] h-[1px] bg-gray-400")} />

    <div style={tw("flex flex-col justify-between gap-5")}>
      <div style={tw("gap-5")}>
        {comparativos.map((comparativo, index) => (
          <div
            key={index}
            style={tw("flex flex-row gap-2 items-center text-white text-sm")}
          >
            <Image src={icon} style={tw("w-[8px] h-[8px]")} />
            <Text>{comparativo}</Text>
          </div>
        ))}
      </div>
      <div
        style={tw(`w-[180px] items-center gap-2 p-2 bg-[${ comp === 1 ? "#1fa5e1" : "#1a8fc4" }] rounded-lg`)}
      >
        <Text style={tw("text-[8px]")}>VALOR APROXIMADO DE INSS A PAGAR</Text>
        <Text>{`R$ ${valorInss}`}</Text>
      </div>
    </div>
  </div>
);

export const PDFComponent = () => {
  return (
    <PDFViewer style={{ width: window.innerWidth, height: window.innerHeight }}>
      <Document>
        <Page size="A4" style={tw("bg-white p-3")}>
          <View
            style={tw(
              "h-[100px] p-6 flex flex-row justify-between bg-gray-500 drop-shadow-xl bg-[#0070c0]",
            )}
          >
            <Image src={logo} style={tw("w-[100px] h-[50px]")} />
            <div style={tw("text-white")}>
              <Text>Orçamento de Prestação de Serviços</Text>
              <Text style={tw("text-2xl")}>REDUÇÃO DE INSS</Text>
            </div>
          </View>

          <View
            style={tw(
              "bg-[#0070c0] h-[720px] flex flex-col items-center gap-8 text-white",
            )}
          >
            <Text style={tw("text-white mt-6")}>
              ORÇAMENTO GERADO COM BASE NOS DADOS ABAIXO
            </Text>

            <div style={tw("flex flex-row text-sm text-gray-200 gap-6")}>
              <ValoresGerais label="ÁREA TOTAL" value={"16,20 m²"} />
              <ValoresGerais label="COMPLEMENTAR" value={"16,20 m²"} />
              <ValoresGerais label="RMT GERADA" value={"R$ 97.608,57"} />
              <ValoresGerais label="TABELA VAU" value={"10/04/2024"} />
            </div>

            <div style={tw("flex flex-row")}>
              <ContainerComparativo
                comp={1}
                header={"SEM NOSSO TRABALHO"}
                icon={cross}
                comparativos={[
                  "Sem redução de valores",
                  "Risco Jurídico",
                  "Não acessa o fator de ajuste",
                  "Dados incorretos aferidos",
                  "Sua obra irregular",
                ]}
                valorInss={"35.919,96"}
              />

              <ContainerComparativo
                comp={2}
                header={"COM NOSSO TRABALHO"}
                icon={correct}
                comparativos={[
                  "Com redução de valores",
                  "Garantia Jurídico",
                  "Fator de ajuste aplicado",
                  "Aferição correta da obra",
                  "Obra regularizada na Receita Federal",
                ]}
                valorInss={"11.760,86"}
              />
            </div>

            <div style={tw("flex flex-row gap-8 items-center")}>
              <Text style={tw("max-w-[130px] text-center text-2xl")}>
                COM O NOSSO TRABALHO
              </Text>
              <div
                style={tw(
                  "flex flex-col gap-4 items-center bg-blue-400 p-4 rounded-lg",
                )}
              >
                <div style={tw("flex flex-row gap-4 items-center")}>
                  <div
                    style={tw(
                      "flex items-center text-center bg-green-300 rounded-[50%] p-2",
                    )}
                  >
                    <Text style={tw("text-lg text-white font-extrabold pt-3")}>
                      -67,26%
                    </Text>
                  </div>

                  <div style={tw("text-white")}>
                    <Text style={tw("line-through")}>R$ 35.919,96</Text>
                    <Text>R$ 11.760,86</Text>
                  </div>
                </div>

                <div>
                  <Text style={tw("text-green-400")}>R$ 24.159,10</Text>
                </div>
              </div>
            </div>

            <div style={tw("px-6")}>
              <Text style={tw("text-sm text-center")}>
                Este documento tem cunho informativo, com valores aproximados,
                ao fazer a analise detalhada da documentação da obra os valores
                podem ser alterados de acordo com as datas e metragem do imóvel.
              </Text>
            </div>

            <div>
              <Text style={tw("text-sm text-center")}>
                Para mais informações acesse: www.falandodeobra.com.br
              </Text>
            </div>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

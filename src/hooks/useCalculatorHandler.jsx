import { useState } from "react";

export const useCalculatorHandler = () => {
  const [calculatorData, setCalculatorData] = useState({
    proprietario: "",
    celular: "",
    tipoProprietario: "",
    destinacaoObra: "",
    obraFinanciamento: "",
    ufObra: "",
    cidadeObra: "",
    faseObra: "",
    m2Construcao: "",
    m2PiscinaQuadra: "",
    inicioConstrucao: "",
    previsaoTermino: "",
  });

  const handleCalculatorData = (data) => {
    console.log(data);
  };

  return { calculatorData, handleCalculatorData };
};

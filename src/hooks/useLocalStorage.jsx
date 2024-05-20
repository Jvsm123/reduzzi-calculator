import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [dataObra, setDataObra] = useState();

  useEffect(() => {
    const data = localStorage.getItem("obraData");

    if (data) {
      setDataObra(JSON.parse(data));
    }

    return () => {};
  }, []);

  return { dataObra };
};

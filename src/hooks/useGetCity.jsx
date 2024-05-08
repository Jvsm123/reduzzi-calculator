import { useState, useEffect } from "react";

export const useGetCity = () => {
  const [cities, setCities] = useState(null);
  const [uf, setUf] = useState(null);

  useEffect(() => {
    const getCity = async () => {
      const result = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.value}/distritos`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!result.ok) {
        console.error(
          "We had an error on fetching the city: ",
          result.statusText,
        );
        return;
      }

      const data = await result.json();

      let cities = [];

      data.forEach((city) => {
        cities.push({ label: city.nome, value: city.nome });
      });

      setCities(cities);
    };

    uf && getCity();
  }, [uf]);

  return { cities, setUf };
};

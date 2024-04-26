import React from "react";
import AppBar from "./AppBar";

const Home = () => {
  return (
    <main className="max-w-[1440px]">
      <AppBar />
      <section className="px-14">
        <div className="mt-[90px]">
          <h2 className="text-[var(--main-blue)] text-3xl font-semibold">
            Calculadora para redução de impsoto de obra
          </h2>
        </div>

        <p className="text-[var(--gray)] italic text-lg mt-2">
          Instrução Normativa RFB Nº 2.021 de 16/04/2021
        </p>

        <div className="mt-[60px]">
          <h2 className="text-2xl font-bold">DADOS DO PROPRIETÁRIO</h2>
        </div>

        <section className="mt-4 flex gap-14">
          <div className="bg-[var(--bg-modal-whitegray)] rounded-[10px] p-6 w-full">
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-[var(--gray)] text-xl font-semibold"
              >
                Responsável pela obra
              </label>
              <Input />
            </div>

            <section className="flex justify-between gap-10 mt-7">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[var(--gray)] text-xl font-semibold"
                >
                  DDD + Celular
                </label>
                <Input />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[var(--gray)] text-xl font-semibold"
                >
                  Tipo de proprietário
                </label>
                <Input />
              </div>
            </section>
          </div>

          <div>
            <button className="bg-[#00CC93] text-white text-xl font-semibold px-14 py-3 rounded-lg">CALCULAR</button>
          </div>
        </section>
      </section>

      <footer className="w-full bg-[var(--main-blue)] h-[200px] mt-20"></footer>
    </main>
  );
};

export default Home;

const Input = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Preencha aqui..."
        className="focus:outline-none border-[2px] focus:border-[var(--green-input)] rounded-[8px] text-lg text-gray-400 focus:font-medium w-full p-2"
      />
    </div>
  );
};

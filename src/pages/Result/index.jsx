import React from "react";
import AppBar from "../Home/AppBar";
import arrowBlue from "../../assets/arrow-blue.png";
import { useForm } from "react-hook-form";

const ResultPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // {
  // resolver: yupResolver(schema),
  // }

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <AppBar />
      <main className="max-w-[1440px] m-auto">
        <div className="mt-[60px] mb-4 flex items-center justify-center gap-2">
          <img src={arrowBlue} alt="arrow blue" className="w-[20px]" />
          <h2 className="text-2xl font-bold">RESULTADO</h2>
        </div>

        <section className="bg-[#ffffff] mb-20 mx-14">
          <div className="bg-[var(--bg-gray-detail)] flex gap-10 px-10 pt-7 rounded-t-lg">
            <div className="w-full flex flex-col gap-2 max-w-[48%]">
              <label
                htmlFor="areatotal"
                className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
              >
                Área total
              </label>
              <Input
                placeholder={"00.00 m²"}
                label={"areatotal"}
                register={register}
                required={true}
                errors={errors}
                addClass={"max-w-[310px]"}
              />
            </div>

            <div className="w-full flex flex-col gap-2 max-w-[48%]">
              <label
                htmlFor="areacomplementar"
                className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
              >
                Complementar
              </label>
              <Input
                placeholder={"00.00 m²"}
                label={"areacomplementar"}
                register={register}
                required={true}
                errors={errors}
                addClass={"max-w-[310px]"}
              />
            </div>

            <div className="w-full flex flex-col gap-2 max-w-[48%]">
              <label
                htmlFor="rmtgerada"
                className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
              >
                RMT gerada
              </label>
              <Input
                placeholder={"00.00 m²"}
                label={"rmtgerada"}
                register={register}
                required={true}
                errors={errors}
                addClass={"max-w-[310px]"}
              />
            </div>

            <div className="w-full flex flex-col gap-2 max-w-[48%]">
              <label
                htmlFor="tabelavau"
                className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
              >
                Tabela VAU
              </label>
              <Input
                placeholder={"00.00 m²"}
                label={"tabelavau"}
                register={register}
                required={true}
                errors={errors}
                addClass={"max-w-[310px]"}
              />
            </div>
          </div>

          <div className="flex justify-center gap-12 mt-14">
            <div className="text-[#666666ff]">
              <p className="text-[30px] font-medium ml-10">Na regra antiga</p>
              <span className="inline-flex items-end gap-3">
                <p className="text-[24px] font-medium italic mb-2">De</p>
                <p className="border border-[#ccccccff] rounded-[8px] inline-block px-4 py-2 text-4xl font-bold">
                  R$ 23.000,00
                </p>
              </span>
            </div>

            <div className="text-[#666666ff]">
              <p className="text-[30px] font-medium ml-9 text-[#006837ff] ml-12">
                Na regra atual
              </p>
              <span className="inline-flex items-end gap-3">
                <p className="text-[24px] font-medium italic mb-2">Por</p>
                <p className="text-[#063958ff] border border-[#ccccccff] rounded-[8px] inline-block px-4 py-2 text-4xl font-bold">
                  R$ 5.800,00
                </p>
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5 m-auto max-w-[650px]">
            <hr className="w-full h-[2px] bg-[#999999ff]" />
            <p className="italic text-[#666666ff] min-w-[220px] text-[20px] mx-10">
              Valor do imposto a pagar
            </p>
            <hr className="w-full h-[2px] bg-[#999999ff]" />
          </div>

          <div className="flex gap-4 items-center justify-center mt-14 mb-16">
            <p className="text-[#666666ff] font-medium text-xl">
              Nº de parcelas
            </p>
            <input
              type="number"
              className="border border-[#ccccccff] text-[#999999ff] text-xl w-[100px] h-[50px] pl-4 font-medium rounded-[8px]"
              defaultValue={60}
            />

            <p className="text-[#666666ff] font-medium text-xl ml-3">Valor</p>
            <p className="border border-[#ccccccff] text-[#063958ff] text-xl pr-4 h-[50px] pl-4 font-medium rounded-[8px] inline-flex items-center">
              R$ 102,00
            </p>
          </div>

          <div className="bg-[#006837ff] flex justify-between">
            <section className="flex items-center justify-between w-[60%] py-6 px-10">
              <p className="border-l-[5px] border-[#00cc93ff] text-white font-bold text-[24px] pl-3">
                ECONOMIA <br />
                GERADA:
              </p>

              <p className="text-white font-bold text-[50px]">R$ 17.200,00</p>
            </section>

            <section className="bg-[#063958ff] text-center py-3 px-10">
              <p className="text-white font-bold text-[40px]">72% DE REDUÇÃO</p>
              <p className="text-white font-bold text-center">
                BASE LEGAL ATUAL DA RECEITA FEDERAL CONFORME IN. 2021/021
              </p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default ResultPage;

const getFormErrorMessage = (errors, name) => {
  return errors[name] ? (
    <small className="p-error">{errors[name].message}</small>
  ) : (
    <small className="p-error">&nbsp;</small>
  );
};

const Input = ({
  type,
  placeholder,
  label,
  register,
  required,
  errors,
  onChange,
  addClass,
}) => {
  return (
    <div>
      <input
        {...register(label, { required })}
        type={type}
        placeholder={placeholder}
        className={`max-h-[60px] focus:outline-none border-[2px] focus:border-[var(--green-input)] rounded-[8px] text-lg text-gray-400 focus:font-medium w-full p-2 ${addClass}`}
      />
      {getFormErrorMessage(errors, label)}
    </div>
  );
};

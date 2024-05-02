import "react-phone-number-input/style.css";

import Select from "react-select";
import PhoneInput from "react-phone-number-input";

import React from "react";
import AppBar from "./AppBar";
import Footer from "./Footer";

import { useForm } from "react-hook-form";
import { schema } from "../../utils/yupSchema.js";
import { yupResolver } from "@hookform/resolvers/yup";

import { constants } from "../../constants/selectsValues.js";

import { useGetCity } from "../../hooks/useGetCity";
import arrowBlue from "../../assets/arrow-blue.png";
import arrowGreen from "../../assets/arrow-green.png";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <main className="max-w-[1440px] m-auto">
      <AppBar />
      <section className="px-14">
        <div className="mt-[90px] flex items-center gap-2">
          <img src={arrowGreen} alt="arrow green" className="w-[20px]" />
          <h2 className="text-[var(--main-blue)] text-3xl font-semibold">
            Calculadora para redução de impsoto de obra
          </h2>
        </div>

        <p className="text-[var(--gray)] italic text-lg mt-2 ml-7">
          Instrução Normativa RFB Nº 2.021 de 16/04/2021
        </p>

        <div className="mt-[60px] mb-4 flex items-center gap-2 ml-4">
          <img src={arrowBlue} alt="arrow blue" className="w-[20px]" />
          <h2 className="text-2xl font-bold">DADOS DO PROPRIETÁRIO</h2>
        </div>

        <section className="flex gap-14">
          <div className="w-full">
            <DadosDoProprietario register={register} errors={errors} />

            <div className="mt-[60px] mb-4 flex items-center gap-2 ml-4">
              <img src={arrowBlue} alt="arrow blue" className="w-[20px]" />
              <h2 className="text-2xl font-bold">DADOS DA OBRA</h2>
            </div>
            <DadosObra register={register} errors={errors} />

            <div className="mt-[60px] mb-4 flex items-center gap-2 ml-4">
              <img src={arrowBlue} alt="arrow blue" className="w-[20px]" />
              <h2 className="text-2xl font-bold">METRAGEM DA OBRA</h2>
            </div>
            <MetragemObra register={register} errors={errors} />
          </div>

          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-[#00CC93] text-white text-xl font-semibold px-14 py-3 rounded-lg"
            >
              CALCULAR
            </button>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
};

export default Home;

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
}) => {
  return (
    <div>
      {label === "celular" && (
        <>
          <PhoneInput
            {...register(label, { required })}
            placeholder={placeholder}
            defaultCountry="BR"
            countries={["BR"]}
            maxLength="17"
            international={true}
            withCountryCallingCode={false}
            className="h-[60px] bg-white focus:outline-none border-[2px] focus:border-[var(--green-input)] rounded-[8px] text-lg text-gray-400 focus:font-medium w-full p-2"
          />
          {getFormErrorMessage(errors, label)}
        </>
      )}
      {type === "text" && (
        <>
          <input
            {...register(label, { required })}
            type={type}
            placeholder={placeholder}
            className="h-[60px] focus:outline-none border-[2px] focus:border-[var(--green-input)] rounded-[8px] text-lg text-gray-400 focus:font-medium w-full p-2"
          />
          {getFormErrorMessage(errors, label)}
        </>
      )}
      {type === "select" && (
        <>
          <Select
            {...register(label, { required })}
            options={constants[label]}
            styles={{
              control: (styles) => ({
                ...styles,
                borderColor: "",
                borderWidth: "",
                outline: "",
                boxShadow: "",
              }),
            }}
            separator={false}
            placeholder={placeholder}
            onChange={label === 'ufObra' && onChange || null}
            className="bg-white focus:outline-none border-[2px] focus:border-[var(--green-input)] rounded-[8px] text-lg text-gray-400 focus:font-medium w-full p-2"
          />
          {getFormErrorMessage(errors, label)}
        </>
      )}
    </div>
  );
};

const DadosDoProprietario = ({ register, errors }) => {
  return (
    <div className="bg-[var(--bg-modal-whitegray)] rounded-[10px] p-6 w-full">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="proprietario"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Responsável pela obra
        </label>
        <Input
          type={"text"}
          placeholder={"Responsável pela obra"}
          label={"proprietario"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <section className="flex justify-between gap-10 mt-7">
        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="celular"
            className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
          >
            DDD + Celular
          </label>
          <Input
            type={"phone"}
            placeholder={"DDD + Celular"}
            label={"celular"}
            register={register}
            required={true}
            errors={errors}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="tipoProprietario"
            className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
          >
            Tipo de proprietário
          </label>
          <Input
            type={"select"}
            placeholder={"Tipo de proprietário"}
            label={"tipoProprietario"}
            register={register}
            required={true}
            errors={errors}
          />
        </div>
      </section>
    </div>
  );
};

const DadosObra = ({ register, errors }) => {
  // const { setUf } = useGetCity();

  return (
    <div className="bg-[var(--bg-modal-whitegray)] rounded-[10px] p-6 w-full flex justify-between gap-5 mt-7 flex-wrap">
      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="destinacaoObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Destinação da obra
        </label>
        <Input
          type={"select"}
          placeholder={"Destinação da obra"}
          label={"destinacaoObra"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="obraFinanciamento"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Obra com financiamento?
        </label>
        <Input
          type={"select"}
          placeholder={"Obra com financiamento?"}
          label={"obraFinanciamento"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="ufObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          UF da obra
        </label>
        <Input
          type={"select"}
          placeholder={"UF da obra"}
          label={"ufObra"}
          register={register}
          required={true}
          errors={errors}
          onChange={(e) => setUf(e)}
        />
      </div>

      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="cidadeObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Cidade da obra
        </label>
        <Input
          type={"select"}
          placeholder={"Cidade da obra"}
          label={"cidadeObra"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor="faseObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Fase atual da obra
        </label>
        <Input
          type={"select"}
          placeholder={"Fase atual da obra"}
          label={"faseObra"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>
    </div>
  );
};

const MetragemObra = ({ register, errors }) => {
  return (
    <div className="bg-[var(--bg-modal-whitegray)] rounded-[10px] p-6 w-full flex justify-between gap-5 mt-7 flex-wrap">
      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="m2Construcao"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          M² DE CONSTRUÇÃO{" "}
          <span className="text-sm italic">(EXCETO PISCINA OU QUADRA)</span>
        </label>
        <Input
          type={"text"}
          placeholder={"M² DE CONSTRUÇÃO"}
          label={"m2Construcao"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="m2PiscinaQuadra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          M² DE PISCINA + QUADRA POLIESPORTIVA
        </label>
        <Input
          type={"text"}
          placeholder={"M² DE PISCINA + QUADRA POLIESPORTIVA"}
          label={"m2PiscinaQuadra"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="inicioConstrucao"
          className="after:content-['_*'] text-[var(--gray)] text-xl font-semibold"
        >
          INÍCIO DA CONSTRUÇÃO
        </label>
        <Input
          type={"text"}
          placeholder={"INÍCIO DA CONSTRUÇÃO"}
          label={"inicioConstrucao"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 max-w-[48%]">
        <label
          htmlFor="previsaoTermino"
          className="after:content-['_*'] text-[var(--gray)] text-xl font-semibold"
        >
          PREVISÃO DE TÉRMINO
        </label>
        <Input
          type={"text"}
          placeholder={"PREVISÃO DE TÉRMINO"}
          label={"previsaoTermino"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>
    </div>
  );
};

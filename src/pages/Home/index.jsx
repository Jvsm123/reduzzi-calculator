import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-number-input";
import Select, { components } from "react-select";
import { NumericFormat } from "react-number-format";
import InputMask from "react-input-mask";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import AppBar from "./AppBar";
import Footer from "./Footer";
import { Modal } from "../../componentes/Modal";
import { WhatsappHandler } from "../../componentes/WhatsappHandler";

import { schema } from "../../utils/yupSchema.js";
import { constants } from "../../constants/selectsValues.js";

import arrowBlue from "../../assets/arrow-blue.png";
import arrowGreen from "../../assets/arrow-green.png";
import selectIcon from "../../assets/selectIcon.svg";
import calculatorIcon from "../../assets/calculatorIcon.svg";

import { useGetCity } from "../../hooks/useGetCity.jsx";
import { useCalculatorHandler } from "../../hooks/useCalculatorHandler";
import { useModal } from "../../hooks/useModal";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isOpen, openModal, closeModal } = useModal();

  const { cities, setUf } = useGetCity();

  const { handleCalculatorData } = useCalculatorHandler();

  const onSubmit = (data) => handleCalculatorData(data);

  return (
    <>
      <AppBar />
      {isOpen && <Modal closeModal={closeModal} />}
      <WhatsappHandler
        className={
          "w-[60rem] h-[60rem] rounded-[10rem] lg:w-[100rem] lg:h-[100rem] lg:rounded-[20rem] fixed right-[55rem] lg:right-[60rem] bottom-[20rem] lg:bottom-[40rem] shadow-xl cursor-pointer bg-green-500 flex items-center justify-center p-3 z-50"
        }
      />
      <main className="max-w-[1440rem] m-auto scale-90">
        <section className="px-14 relative">
          <div className="mt-[90rem] flex items-center gap-2">
            <img
              src={arrowGreen}
              alt="arrow green"
              className="w-[20rem] h-[20rem]"
            />
            <h2 className="text-[var(--main-blue)] text-3xl font-semibold">
              Calculadora para redução de imposto de obra
            </h2>
          </div>

          <p className="text-[var(--gray)] italic text-lg mt-2 ml-7">
            Instrução Normativa RFB Nº 2.021 de 16/04/2021
          </p>

          <div className="mt-[60rem] mb-4 flex items-center gap-2">
            <img
              src={arrowBlue}
              alt="arrow blue"
              className="w-[20rem] h-[20rem]"
            />
            <h2 className="text-2xl font-bold">DADOS DO PROPRIETÁRIO</h2>
          </div>

          <section className="lg:flex gap-14 sticky">
            <div className="w-full">
              <DadosDoProprietario
                register={register}
                errors={errors}
                control={control}
              />

              <div className="mt-[60rem] mb-4 flex items-center gap-2">
                <img
                  src={arrowBlue}
                  alt="arrow blue"
                  className="w-[20rem] h-[20rem]"
                />
                <h2 className="text-2xl font-bold">DADOS DA OBRA</h2>
              </div>
              <DadosObra
                register={register}
                errors={errors}
                control={control}
                cityControl={{ cities: cities, setUf: setUf }}
              />

              <div className="mt-[60rem] mb-4 flex items-center gap-2">
                <img
                  src={arrowBlue}
                  alt="arrow blue"
                  className="w-[20rem] h-[20rem]"
                />
                <h2 className="text-2xl font-bold">METRAGEM DA OBRA</h2>
              </div>
              <MetragemObra
                register={register}
                errors={errors}
                control={control}
              />
            </div>

            <div
              onClick={handleSubmit((data) => {
                if (data.tipoProprietario.value === "Pessoa Jurídica")
                  return openModal();

                onSubmit(data);
              })}
              className="bg-[#00CC93] sticky top-[200rem] text-white text-xl font-semibold pr-[50rem] rounded-lg h-[70rem] flex items-center hover:cursor-pointer lg:w-[436rem] w-full lg:mt-0 mt-10 justify-center lg:justify-end z-10"
            >
              <button className="mr-[50rem]">CALCULAR</button>
              <img src={calculatorIcon} className="h-[40rem]" />
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;

const getFormErrorMessage = (errors, name, type = false) => {
  return (
    <>
      {(errors[name] && type === "select" && (
        <small className="font-bold text-sm text-red-700">
          {errors[name].value.message}
        </small>
      )) ||
        (errors[name] && type !== "select" && (
          <small className="font-bold text-sm text-red-700">
            {errors[name].message}
          </small>
        ))}
    </>
  );
};

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <img
      src={selectIcon}
      label={"Icon Select"}
      className="color-[#ff9000] w-[15rem] h-[15rem]"
    />
  </components.DropdownIndicator>
);

const IndicatorSeparator = () => {};

const Input = ({
  type,
  placeholder,
  label,
  register,
  required,
  errors,
  control,
  cityControl = false,
  // onChange,
}) => {
  return (
    <div>
      {label === "celular" && (
        <Controller
          name={label}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <PhoneInput
                {...field}
                placeholder={placeholder}
                defaultCountry="BR"
                countries={["BR"]}
                maxLength="17"
                countryCallingCodeEditable={false}
                international={true}
                withCountryCallingCode={false}
                className={`h-[60rem] bg-white focus:outline-none focus-visible:bg-transparent border-[2rem] focus:border-[var(--green-input)] rounded-[8rem] text-lg text-gray-400 ${
                  errors[label] && "border-red-500"
                } focus:font-medium w-full p-2 shadow`}
              />
              {getFormErrorMessage(errors, label)}
            </>
          )}
        />
      )}
      {(type === "text" &&
        (label === "previsaoTermino" || label === "inicioConstrucao") && (
          <>
            <InputMask
              mask="99/99"
              {...register(label, { required })}
              type={type}
              placeholder={placeholder}
              className={`h-[60rem] focus:outline-none border-[2rem] focus:border-[var(--green-input)] rounded-[8rem] text-lg text-gray-400 focus:font-medium w-full p-2 shadow ${
                errors[label] && "border-red-500"
              } h-[60rem]`}
            />
            {getFormErrorMessage(errors, label)}
          </>
        )) ||
        (type === "text" && (
          <>
            <input
              {...register(label, { required })}
              type={type}
              placeholder={placeholder}
              className={`h-[60rem] focus:outline-none border-[2rem] focus:border-[var(--green-input)] rounded-[8rem] text-lg text-gray-400 focus:font-medium w-full p-2 shadow ${
                errors[label] && "border-red-500"
              } h-[60rem]`}
            />
            {getFormErrorMessage(errors, label)}
          </>
        ))}
      {type === "number" && (
        <Controller
          name={label}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <>
              <NumericFormat
                {...field}
                allowNegative={false}
                type="text"
                allowLeadingZeros={false}
                decimalScale={2}
                decimalSeparator=","
                placeholder={placeholder}
                suffix=" m²"
                className={`h-[60rem] focus:outline-none border-[2rem] focus:border-[var(--green-input)] rounded-[8rem] text-lg text-gray-400 focus:font-medium w-full p-2 shadow ${
                  errors[label] && "border-red-500"
                } h-[60rem]`}
              />
              {getFormErrorMessage(errors, label)}
            </>
          )}
        />
      )}
      {type === "select" && label !== "cidadeObra" && label !== "ufObra" && (
        <Controller
          name={label}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <Select
                components={{ DropdownIndicator, IndicatorSeparator }}
                options={constants[label]}
                {...field}
                ref={field.ref}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    borderColor: "",
                    borderWidth: "",
                    outline: "",
                    boxShadow: "",
                  }),
                }}
                placeholder={placeholder}
                className={`bg-white focus:outline-none border-[2rem] focus:border-[var(--green-input)] rounded-[8rem] text-lg text-gray-400 focus:font-medium w-full p-2 shadow ${
                  errors[label] && "border-red-500"
                } h-[60rem]`}
              />
              {getFormErrorMessage(errors, label, type)}
            </>
          )}
        />
      )}
      {type === "select" && label === "cidadeObra" && (
        <Controller
          name={label}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <Select
                options={cityControl.cities}
                components={{ DropdownIndicator, IndicatorSeparator }}
                {...field}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    borderColor: "",
                    borderWidth: "",
                    outline: "",
                    boxShadow: "",
                  }),
                }}
                placeholder={placeholder}
                className={`bg-white focus:outline-none border-[2rem] focus:border-[var(--green-input)] rounded-[8rem] text-lg text-gray-400 focus:font-medium w-full p-2 shadow ${
                  errors[label] && "border-red-500"
                } h-[60rem]`}
              />
              {getFormErrorMessage(errors, label, type)}
            </>
          )}
        />
      )}
      {type === "select" && label === "ufObra" && (
        <Controller
          name={label}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <Select
                options={constants[label]}
                components={{ DropdownIndicator, IndicatorSeparator }}
                {...field}
                onChange={(e) => {
                  cityControl.setUf(e);
                  field.onChange(e);
                }}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    borderColor: "",
                    borderWidth: "",
                    outline: "",
                    boxShadow: "",
                  }),
                }}
                placeholder={placeholder}
                className={`bg-white focus:outline-none border-[2rem] focus:border-[var(--green-input)] rounded-[8rem] text-lg text-gray-400 focus:font-medium w-full p-2 shadow ${
                  errors[label] && "border-red-500"
                } h-[60rem]`}
              />
              {getFormErrorMessage(errors, label, type)}
            </>
          )}
        />
      )}
    </div>
  );
};

const DadosDoProprietario = ({ register, errors, control }) => {
  return (
    <div className="bg-[var(--bg-modal-whitegray)] rounded-[10rem] p-6 w-full">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="proprietario"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Responsável pela obra
        </label>
        <Input
          type={"text"}
          placeholder={"Nome do Proprietário"}
          label={"proprietario"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <section className="flex justify-between gap-10 mt-7 flex-wrap lg:flex-nowrap">
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
            control={control}
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
            placeholder={"Selecione"}
            label={"tipoProprietario"}
            register={register}
            required={true}
            errors={errors}
            control={control}
          />
        </div>
      </section>
    </div>
  );
};

const DadosObra = ({ register, errors, control, cityControl }) => {
  return (
    <div className="bg-[var(--bg-modal-whitegray)] rounded-[10rem] p-6 w-full flex justify-between gap-5 mt-7 flex-wrap">
      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="destinacaoObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Destinação da obra
        </label>
        <Input
          type={"select"}
          placeholder={"Selecione"}
          label={"destinacaoObra"}
          register={register}
          required={true}
          errors={errors}
          control={control}
        />
      </div>

      <div className="w-full flex flex-col gap-2 md:max-w-[48%] ">
        <label
          htmlFor="obraFinanciamento"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Obra com Financiamento?
        </label>
        <Input
          type={"select"}
          placeholder={"Selecione"}
          label={"obraFinanciamento"}
          register={register}
          required={true}
          errors={errors}
          control={control}
        />
      </div>

      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="tipoConstrucao"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Tipo Da Construção
        </label>
        <Input
          type={"select"}
          placeholder={"Selecione"}
          label={"tipoConstrucao"}
          register={register}
          required={true}
          errors={errors}
          control={control}
        />
      </div>

      {/*
      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="concretoUsinado"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Uso de Concreto Usinado?
        </label>
        <Input
          type={"select"}
          placeholder={"Selecione"}
          label={"concretoUsinado"}
          register={register}
          required={true}
          errors={errors}
          control={control}
        />
      </div>
	  */}

      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="faseObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Fase atual da obra
        </label>
        <Input
          type={"select"}
          placeholder={"Selecione"}
          label={"faseObra"}
          register={register}
          required={true}
          errors={errors}
          control={control}
        />
      </div>

      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="ufObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          UF da obra
        </label>
        <Input
          type={"select"}
          placeholder={"Selecione"}
          label={"ufObra"}
          register={register}
          required={true}
          errors={errors}
          control={control}
          cityControl={cityControl}
          // onChange={(e) => setUf(e)}
        />
      </div>

      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="cidadeObra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          Cidade da obra
        </label>
        <Input
          type={"select"}
          placeholder={"Selecione"}
          label={"cidadeObra"}
          register={register}
          required={true}
          errors={errors}
          control={control}
          cityControl={cityControl}
        />
      </div>
    </div>
  );
};

const MetragemObra = ({ register, control, errors }) => {
  return (
    <div className="bg-[var(--bg-modal-whitegray)] rounded-[10rem] p-6 w-full flex justify-between gap-5 mt-7 flex-wrap">
      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="m2Construcao"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          M² DE CONSTRUÇÃO{" "}
          <span className="text-sm italic">(EXCETO PISCINA OU QUADRA)</span>
        </label>
        <Input
          type={"number"}
          placeholder={"00,00 m²"}
	      control={control}
          label={"m2Construcao"}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="m2PiscinaQuadra"
          className="after:content-['_*'] after:text-red-500 text-[var(--gray)] text-xl font-semibold"
        >
          M² DE PISCINA + QUADRA POLIESPORTIVA
        </label>
        <Input
          type={"number"}
          placeholder={"00,00 m²"}
          label={"m2PiscinaQuadra"}
	      control={control}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="inicioConstrucao"
          className="after:content-['_*'] text-[var(--gray)] text-xl font-semibold"
        >
          INÍCIO DA CONSTRUÇÃO
        </label>
        <Input
          type={"text"}
          placeholder={"Mês/Ano"}
          label={"inicioConstrucao"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>

      <div className="w-full flex flex-col gap-2 md:max-w-[48%]">
        <label
          htmlFor="previsaoTermino"
          className="after:content-['_*'] text-[var(--gray)] text-xl font-semibold"
        >
          PREVISÃO DE TÉRMINO
        </label>
        <Input
          type={"text"}
          placeholder={"Mês/Ano"}
          label={"previsaoTermino"}
          register={register}
          required={true}
          errors={errors}
        />
      </div>
    </div>
  );
};

import WhatsappFooterIcon from "../../assets/whatsappFooterIcon.svg";

export const WhatsappHandler = () => {
  return (
    <div>
      <div>
        <a
          href="https://wa.me/5519981361910"
          target="_blank"
          className="w-[100rem] h-[100rem] fixed right-[60rem] bottom-[40rem] shadow-xl cursor-pointer bg-green-500 flex items-center justify-center p-3 rounded-[20rem] z-50"
        >
          <img src={WhatsappFooterIcon} alt="Whatsapp" />
        </a>
      </div>
    </div>
  );
};

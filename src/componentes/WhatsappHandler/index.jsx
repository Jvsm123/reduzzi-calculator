import WhatsappFooterIcon from "../../assets/whatsappFooterIcon.svg";

export const WhatsappHandler = (props) => {
  return (
    <div className="sticky">
      <div className="bg-green-500" {...props}>
        <img src={WhatsappFooterIcon} alt="Whatsapp" />
      </div>
    </div>
  );
};

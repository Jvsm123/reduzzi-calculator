import WhatsappFooterIcon from "../../assets/whatsappFooterIcon.svg";

export const WhatsappHandler = (props) => {
  return (
    <div className="sticky">
      <a href="https://wa.me/5519981361910" target="_blank">
        <div className="bg-green-500" {...props}>
          <img src={WhatsappFooterIcon} alt="Whatsapp" />
        </div>
      </a>
    </div>
  );
};

import React from "react";
import logo from "../../../assets/logo.png";
import facebook from "../../../assets/facebook.svg";
import insta from "../../../assets/insta.svg";
import linkedin from "../../../assets/linkedin.svg";
import whats from "../../../assets/whats.svg";
import youtube from "../../../assets/youtube.svg";

const AppBar = () => {
  return (
    <>
      <nav className="bg-[var(--main-blue)] w-full h-[110px] flex items-center justify-between px-14">
        <img src={logo} alt="Reduzzi Logo" className="max-h-[70px] " />

        <div className="flex gap-6">
          <img
            src={facebook}
            alt="facebook"
            className="max-w-[30px] fill-white"
          />
          <img src={insta} alt="insta" className="max-w-[30px] fill-white" />
          <img src={whats} alt="whats" className="max-w-[30px] fill-white" />
          <img
            src={youtube}
            alt="youtube"
            className="max-w-[30px] fill-white"
          />
          <img
            src={linkedin}
            alt="linkedin"
            className="max-w-[30px] fill-white"
          />

          <button className="bg-white text-[var(--main-blue)] rounded-[10px] text-xl py-4 px-14">
            Login
          </button>
        </div>
      </nav>
    </>
  );
};

export default AppBar;

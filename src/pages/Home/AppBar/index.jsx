import React from "react";
import logo from "../../../assets/reduzziLogo1.svg";
import facebook from "../../../assets/facebook.svg";
import insta from "../../../assets/insta.svg";
import linkedin from "../../../assets/linkedin.svg";
import whats from "../../../assets/whats.svg";
import youtube from "../../../assets/youtube.svg";

const AppBar = () => {
  return (
    <>
      <nav className="bg-[var(--main-blue)] w-full">
        <div className="max-w-[1440rem] m-auto w-full flex items-center justify-between px-14 h-[110rem]">
          <img
            src={logo}
            alt="Reduzzi Logo"
            className="max-h-[70rem] cursor-pointer"
          />

          <div className="flex gap-6">
            <img
              src={facebook}
              alt="facebook"
              className="max-w-[30rem] fill-white cursor-pointer"
            />
            <img
              src={insta}
              alt="insta"
              className="max-w-[30rem] fill-white cursor-pointer"
            />
            <img
              src={whats}
              alt="whats"
              className="max-w-[30rem] fill-white cursor-pointer"
            />
            <img
              src={youtube}
              alt="youtube"
              className="max-w-[30rem] fill-white cursor-pointer"
            />
            <img
              src={linkedin}
              alt="linkedin"
              className="max-w-[30rem] fill-white cursor-pointer"
            />

            <button className="bg-white text-[var(--main-blue)] rounded-[10rem] text-xl py-4 px-14">
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppBar;

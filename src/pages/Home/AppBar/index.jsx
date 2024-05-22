import React from "react";
import logo from "../../../assets/reduzziLogo1.svg";
import facebook from "../../../assets/facebook.svg";
import insta from "../../../assets/insta.svg";
import linkedin from "../../../assets/linkedin.svg";
import whats from "../../../assets/whats.svg";
import youtube from "../../../assets/youtube.svg";

import { doSignInWithGoogle, doSignOut } from "../../../utils/firebase/auth";
import { useAuth } from "../../../contexts/authContext";

const AppBar = () => {
  const { userLoggedIn, currentUser, isGoogleUser } = useAuth();

  const handleChangeBtn = () => {
    if (userLoggedIn) {
      return (
        <button
          className="bg-white text-[var(--main-blue)] rounded-[10rem] text-xl py-4 px-14 hidden sm:block"
          onClick={() => doSignOut()}
        >
          Sign out
        </button>
      );
    }

    return (
      <button
        className="bg-white text-[var(--main-blue)] rounded-[10rem] text-xl py-4 px-14 hidden sm:block"
        onClick={() => doSignInWithGoogle()}
      >
        Login
      </button>
    );
  };

  return (
    <>
      <nav className="bg-[var(--main-blue)] w-full">
        <div className="max-w-[1440rem] m-auto w-full flex items-center justify-between px-14 h-[110rem] scale-90">
          <img
            src={logo}
            alt="Reduzzi Logo"
            className="max-h-[70rem] cursor-pointer"
          />

          <div className="flex gap-6 ">
            <img
              src={facebook}
              alt="facebook"
              className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
            />
            <img
              src={insta}
              alt="insta"
              className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
            />
            <img
              src={whats}
              alt="whats"
              className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
            />
            <img
              src={youtube}
              alt="youtube"
              className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
            />
            <img
              src={linkedin}
              alt="linkedin"
              className="max-w-[30rem] fill-white cursor-pointer hidden md:flex"
            />

            {handleChangeBtn()}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppBar;

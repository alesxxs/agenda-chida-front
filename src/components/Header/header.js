import React from "react";
import "./css/header.css";
import { Avatar } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useHeader } from "./hooks/useHeader";

const Header = () => {
  const { handleSignOut } = useHeader();
  return (
    <div className="containerIMGLogin">
      <div className="logoHeader">
        <Avatar alt="Bemy Sharp" src="./bbc.jpg" className="imageLogoHeader" />
      </div>
      <div className="logOut">
        <p className="logOutText" onClick={handleSignOut}>
          Cerrar Sesión
        </p>
        <LogoutRoundedIcon />
      </div>
    </div>
  );
};

export default Header;

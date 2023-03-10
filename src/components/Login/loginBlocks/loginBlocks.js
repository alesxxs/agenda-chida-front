import React from "react";
import "./css/loginBlocks.css";
import { Button } from "@mui/material";
import { Form } from "informed";
import { useLoginBlocks } from "./hooks/useLoginBlocks";
import { isRequired } from "../../../helpers/formValidations";
import CustomInput from "../../../customComponentsForm/TextFields";

const LoginBlocks = () => {
  const { handleSubmit, isErrorLogin } = useLoginBlocks();

  return (
    <div className="containerBlock">
      <div className="imageBlock">
        <img src="./bbcLogin.jpg" className="imageLogo" />
      </div>
      <div className="formDiv">
        <div className="messageError">{isErrorLogin ? isErrorLogin : ""}</div>
        <Form onSubmit={handleSubmit}>
          <div className="inputEmail">
            <CustomInput
              type="email"
              name="email"
              validate={isRequired}
              id="outlined-basic"
              label="Usuario"
              variant="outlined"
            />
          </div>
          <div className="inputPass">
            <CustomInput
              type="password"
              name="password"
              validate={isRequired}
              id="outlined-basic"
              label="Contraseña"
              variant="outlined"
            />
          </div>

          <div>
            <Button variant="contained" className="buttonLogin" type={"submit"}>
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginBlocks;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const useLoginBlocks = () => {
  const [isErrorLogin, setIsErrorLogin] = useState("");

  let history = useHistory();
  const URL = `${process.env.REACT_APP_LOCAL_PORT}login`;

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history.push("/home");
    }
  }, []);

  const handleSubmit = ({ values }) => {
    if (values.email && values.password) {
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: values.email,
          password: values.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            setIsErrorLogin("Usuario o contraseña incorrecto");
          }
          return response.json();
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("studioID", data.id);
            history.push("/home");
          }
        })
        .catch((error) => {
          // Ocurrió un error al realizar la solicitud
          console.log(error);
        });
    }
  };

  return {
    handleSubmit,
    isErrorLogin,
  };
};

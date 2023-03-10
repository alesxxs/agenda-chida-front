import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useMenuCenter = () => {
  const URL = `${process.env.REACT_APP_LOCAL_PORT}home`;

  const token = localStorage.getItem("accessToken");

  const history = useHistory();

  useEffect(() => {
    if (token) {
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }).then((response) => {
        if (!response.ok) {
          alert("La sesión caduco. Vuelva a iniciar sesión.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("studioID");
          history.push("/");
        }
        return response.json();
      });
    } else {
      history.push("/");
    }
  }, [token]);

  return {};
};

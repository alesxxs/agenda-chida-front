import { useHistory } from "react-router-dom";

export const useHeader = () => {
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("studioID");
    history.push("/");
  };

  return { handleSignOut };
};

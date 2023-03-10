import { useEffect, useState } from "react";
import { useAppContext } from "../../../AppContext/appContext";

export const useEarningsBox = () => {
  const { isAttended } = useAppContext();

  const URL = `${process.env.REACT_APP_LOCAL_PORT}getEarnings`;

  const [earningsData, setEarningsData] = useState();

  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setEarningsData(data.results[0]);
        }
      });
  }, [isAttended]);

  return {
    earningsData,
  };
};

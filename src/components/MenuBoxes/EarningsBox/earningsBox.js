import React from "react";
import "./css/earningsBox.css";
import { useEarningsBox } from "./hooks/useEarningsBox";

const EarningsBox = () => {
  const { earningsData } = useEarningsBox();

  return (
    <>
      <div className="containerEarnings">
        <div className="titleEarningsBox">
          <span>
            <p>Ganancias</p>
          </span>
        </div>
        <div className="flexEarnings">
          <div className="daily">
            <div className="titleDaily">
              <span>
                <p>Hoy</p>
              </span>
            </div>
            <div className="earningsDaily">
              <span>
                <p>${earningsData?.today}</p>
              </span>
            </div>
          </div>
          <div className="week">
            <div className="titleWeek">
              <span>
                <p>Semanal</p>
              </span>
            </div>
            <div className="earningsWeekly">
              <span>
                <p>${earningsData?.weekly}</p>
              </span>
            </div>
          </div>
          <div className="monthly">
            <div className="titleMonthly">
              <span>
                <p>Mensual</p>
              </span>
            </div>
            <div className="earningsMonthly">
              <span>
                <p>${earningsData?.monthly}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarningsBox;

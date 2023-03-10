import React from "react";
import "./css/daybox.css";
import { useDayBox } from "./hooks/useDayBox";
import { useAppContext } from "../../AppContext/appContext";

const DayBox = () => {
  const { todayTotalAppointments } = useAppContext();
  const { day, dayText } = useDayBox();
  return (
    <div className="containerDay">
      <div className="textDay">{dayText}</div>
      <div className="date">{day}</div>
      <div className="dating">
        {todayTotalAppointments === 0
          ? `Hoy no tienes citas`
          : todayTotalAppointments > 1
          ? `Hoy tienes ${todayTotalAppointments} citas`
          : `Hoy tienes ${todayTotalAppointments} cita`}
      </div>
    </div>
  );
};

export default DayBox;

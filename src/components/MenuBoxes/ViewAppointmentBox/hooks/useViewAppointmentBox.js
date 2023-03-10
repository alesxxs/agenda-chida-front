import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext/appContext";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export const useViewAppointmentBox = () => {
  const {
    todayTotalAppointments,
    setTodayTotalAppointments,
    setIsAttended,
    isAttended,
    addedAppointment,
  } = useAppContext();
  const [infoAppointmentsToday, setInfoAppointmentsToday] = useState({});

  const URL = `${process.env.REACT_APP_LOCAL_PORT}appointments-today`;

  const studioID = localStorage.getItem("studioID");

  useEffect(() => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_clientsRequeriments: studioID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInfoAppointmentsToday(data);
        setTodayTotalAppointments(data.results.length);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, [isAttended, addedAppointment]);

  const handleAppointmentAttended = (isTrueOrFalse, finalPrice, id, name) => {
    const URLAttended = `${process.env.REACT_APP_LOCAL_PORT}isAttended`;

    fetch(URLAttended, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attended: isTrueOrFalse,
        id_clientsRequeriments: studioID,
        finalPrice: finalPrice,
        idAppointment: id,
      }),
    }).then((data) => {
      try {
        if (isTrueOrFalse) {
          NotificationManager.success(
            `${name} asistió a su cita. Se han actualizado las ganancias.`,
            "Cita Actualizada",
            5000,
            () => {}
          );
          setIsAttended(!isAttended);
        } else {
          NotificationManager.success(
            `${name} no asistió a su cita. Se han actualizado las ganancias.`,
            "Cita Actualizada",
            5000,
            () => {}
          );
          setIsAttended(!isAttended);
        }
      } catch (error) {
        console.log(error, "ERRIR");
      }
    });
  };

  return {
    infoAppointmentsToday,
    handleAppointmentAttended,
    todayTotalAppointments,
  };
};

import { useEffect, useState } from "react";
import { useAppContext } from "../../../AppContext/appContext";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export const useTableAppointment = (props) => {
  const { selected, setSelected } = props;
  const { addedAppointment, isAttended, setIsAttended } = useAppContext();
  const [allAppointmentData, setAllAppointmentData] = useState([]);

  const URL = `${process.env.REACT_APP_LOCAL_PORT}admAppointment`;

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
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAllAppointmentData(data.results);
        }
      });
  }, [addedAppointment, isAttended]);

  const handleDelete = () => {
    const URL = `${process.env.REACT_APP_LOCAL_PORT}deleteAppointments`;

    fetch(URL, {
      method: "DELETE",
      body: JSON.stringify({ ids: selected, id_clientsRequeriments: studioID }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsAttended(!isAttended);
          setSelected([]);
          NotificationManager.success(
            "La cita se ha borrado con éxito",
            "Cita Borrada",
            5000,
            () => {}
          );
        }
      })
      .catch((error) => console.error(error));
  };

  return {
    allAppointmentData,
    handleDelete,
  };
};

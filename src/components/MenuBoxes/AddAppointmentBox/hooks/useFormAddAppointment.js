import { useAppContext } from "../../../AppContext/appContext";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export const useFormAddAppointment = (props) => {
  const { handleCloseDialog } = props;
  const { setIsLoader, setAddedApointment, addedAppointment } = useAppContext();

  const handleSubmitAppointment = ({ values }) => {
    const URL = `${process.env.REACT_APP_LOCAL_PORT}appointments`;
    const studioID = localStorage.getItem("studioID");

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        anticipo: values.anticipo,
        clientName: values.clientName,
        initialDate: values.dateCalendar,
        finalPrice: values.finalPrice,
        image: values.imageReference,
        instagram: values.instagram,
        lastName: values.lastName,
        notes: values.notes,
        phoneNumber: values.phoneNumber,
        service: values.service,
        initialTime: values.timeClock,
        finishTime: values.timeFinishClock,
        attended: null,
        id_clientsRequeriments: studioID,
      }),
    })
      .then((data) => {
        setIsLoader(true);
        if (data.status === 200) {
          setAddedApointment(true);
          setTimeout(() => {
            setIsLoader(false);
            setAddedApointment(!addedAppointment);
            handleCloseDialog();
            NotificationManager.success(
              "La cita se ha guardado con éxito",
              "Cita Guardada",
              5000,
              () => {}
            );
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
    console.log(values, "values");
  };

  return {
    handleSubmitAppointment,
  };
};

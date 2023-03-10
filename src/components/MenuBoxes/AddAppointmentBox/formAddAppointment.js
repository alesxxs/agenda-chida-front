import React from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "informed";
import CustomInput from "../../../customComponentsForm/TextFields/textField";
import { isRequired } from "../../../helpers/formValidations";
import TextArea from "../../../customComponentsForm/TextArea/";
import AmountInput from "../../../customComponentsForm/AmountInput/amountInput";
import CalendarInput from "../../../customComponentsForm/CalendarInput";
import TimeInput from "../../../customComponentsForm/TimeInput/timeInput";
import { Box } from "@mui/system";
import {
  styleModalAddAppointment,
  styleModalAddAppointmentResponsive,
  styleModalAddAppointmentLessResponsive,
} from "../../../helpers/modalStyles";
import { useFormAddAppointment } from "./hooks/useFormAddAppointment";
import Spinner from "../../Spinner";
import { useWindowSize } from "../../../hooks/useWindowSize";

const FormAddAppointment = (props) => {
  const { handleCloseDialog, isLoader } = props;
  const { handleSubmitAppointment } = useFormAddAppointment({
    handleCloseDialog,
  });

  const {
    windowSize: { width },
  } = useWindowSize();

  return (
    <Box
      sx={
        width > 1000
          ? styleModalAddAppointment
          : width <= 620
          ? styleModalAddAppointmentLessResponsive
          : styleModalAddAppointmentResponsive
      }
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Registrar Cita
      </Typography>
      {isLoader ? (
        <Spinner />
      ) : (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
            <Form onSubmit={handleSubmitAppointment}>
              <div className="containerInputs">
                <div className="firstBlock">
                  <div className="clientName">
                    <CustomInput
                      type="text"
                      name="clientName"
                      validate={isRequired}
                      id="outlined-basic"
                      label="Nombre"
                      variant="outlined"
                    />
                  </div>
                  <div className="lastName">
                    <CustomInput
                      type="text"
                      name="lastName"
                      validate={isRequired}
                      id="outlined-basic"
                      label="Apellido"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="secondBlock">
                  <div className="dateCalendar">
                    <CalendarInput
                      name="dateCalendar"
                      field="dateCalendar"
                      type="date"
                      label="Fecha de Cita"
                      className="marginDiv"
                    />
                  </div>
                  <div className="timeClock">
                    <TimeInput
                      name="timeClock"
                      field="timeClock"
                      type="time"
                      label="Hora de Inicio de Cita"
                      className="marginDiv"
                    />
                  </div>
                </div>
                <div className="thirdBlock">
                  <div className="timeFinishClock">
                    <TimeInput
                      name="timeFinishClock"
                      field="timeFinishClock"
                      type="time"
                      label="Hora de Termino de Cita"
                    />
                  </div>
                  <div className="anticipo">
                    <AmountInput
                      type="number"
                      name="anticipo"
                      validate={isRequired}
                      id="outlined-basic"
                      label="Anticipo"
                      variant="outlined"
                      textTitle={"Anticipo"}
                      className="anticipoField"
                    />
                  </div>
                </div>
                <div className="fourthBlock">
                  <div className="finalPrice">
                    <AmountInput
                      type="number"
                      name="finalPrice"
                      validate={isRequired}
                      id="outlined-basic"
                      textTitle="Precio Final"
                      variant="outlined"
                      className={"finalPriceField"}
                    />
                  </div>
                  <div className="service">
                    <TextArea
                      type="textarea"
                      name="service"
                      validate={isRequired}
                      id="outlined-basic"
                      label="Servicio a realizar"
                      variant="outlined"
                      minRows={3.4}
                      className="serviceField"
                    />
                  </div>
                </div>
                <div className="fifthBlock">
                  <div className="phoneNumber">
                    <CustomInput
                      type="number"
                      name="phoneNumber"
                      validate={isRequired}
                      id="outlined-basic"
                      label="Número de teléfono"
                      variant="outlined"
                      className={"phoneNumberField"}
                    />
                  </div>
                  <div className="instagram">
                    <CustomInput
                      type="text"
                      name="instagram"
                      validate={isRequired}
                      id="outlined-basic"
                      label="Usuario Instagram"
                      variant="outlined"
                      className={"instaField"}
                    />
                  </div>
                </div>
                <div className="sixthBlock">
                  <div className="notes">
                    <TextArea
                      type="textarea"
                      name="notes"
                      id="outlined-basic"
                      label="Notas extras"
                      variant="outlined"
                      minRows={3.4}
                      className="notesField"
                    />
                  </div>
                </div>
                <div className="groupButtons">
                  <Button variant="contained" type="submit">
                    Guardar Cita
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    type="button"
                    onClick={handleCloseDialog}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Typography>
      )}
    </Box>
  );
};

export default FormAddAppointment;

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
import { styleModalAddAppointment } from "../../../helpers/modalStyles";
import { useFormEditAppointment } from "./hooks/useFormEditAppointment";
import Spinner from "../../Spinner";

const FormEditAppointment = (props) => {
  const { handleCloseDialog, isLoader, infoRow, infoRowID } = props;
  const { handleSubmitAppointment } = useFormEditAppointment({
    handleCloseDialog,
    infoRowID,
  });

  const dateAppointment = new Date(infoRow.initialDate);

  const day = dateAppointment.getDate();
  const month = dateAppointment.getMonth() + 1;
  const year = dateAppointment.getFullYear().toString();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return (
    <Box sx={styleModalAddAppointment}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Editar Cita
      </Typography>
      {isLoader ? (
        <Spinner />
      ) : (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
            <Form onSubmit={handleSubmitAppointment}>
              <div className="firstBlock">
                <div className="clientName">
                  <CustomInput
                    type="text"
                    name="clientName"
                    validate={isRequired}
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    defaultValue={infoRow?.name}
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
                    defaultValue={infoRow?.lastName}
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
                    defaultValue={formattedDate}
                  />
                </div>
                <div className="timeClock">
                  <TimeInput
                    name="timeClock"
                    field="timeClock"
                    type="time"
                    label="Hora de Inicio de Cita"
                    defaultValue={infoRow?.initialTime}
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
                    defaultValue={infoRow?.finishTime}
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
                    defaultValue={infoRow?.anticipo}
                  />
                </div>
              </div>
              <div className="fourthBlock">
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
                    defaultValue={infoRow?.service}
                  />
                </div>
                <div className="imageReference">
                  <label>Imagen de Referencia</label>
                  <CustomInput
                    name="imageReference"
                    id="outlined-basic"
                    variant="outlined"
                    type="file"
                    accept="image/*"
                    className="referenceField"
                  />
                </div>
              </div>
              <div className="fifthBlock">
                <div className="finalPrice">
                  <AmountInput
                    type="number"
                    name="finalPrice"
                    validate={isRequired}
                    id="outlined-basic"
                    textTitle="Precio Final"
                    variant="outlined"
                    className={"finalPriceField"}
                    defaultValue={parseInt(infoRow?.finalPrice)}
                  />
                </div>
                <div className="phoneNumber">
                  <CustomInput
                    type="number"
                    name="phoneNumber"
                    validate={isRequired}
                    id="outlined-basic"
                    label="Número de teléfono"
                    variant="outlined"
                    className={"phoneNumberField"}
                    defaultValue={infoRow?.phoneNumber}
                  />
                </div>
              </div>
              <div className="sixthBlock">
                <div className="instagram">
                  <CustomInput
                    type="text"
                    name="instagram"
                    validate={isRequired}
                    id="outlined-basic"
                    label="Usuario Instagram"
                    variant="outlined"
                    className={"instaField"}
                    defaultValue={infoRow?.instagram}
                  />
                </div>
                <div className="notes">
                  <TextArea
                    type="textarea"
                    name="notes"
                    id="outlined-basic"
                    label="Notas extras"
                    variant="outlined"
                    minRows={3.4}
                    className="notesField"
                    defaultValue={infoRow?.notes}
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
            </Form>
          </div>
        </Typography>
      )}
    </Box>
  );
};

export default FormEditAppointment;

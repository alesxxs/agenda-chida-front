import React, { useState } from "react";
import "./css/addAppointmentBox.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DialogComponent from "../../Dialog/dialogComponent";
import FormAddAppointment from "./formAddAppointment";
import { useAppContext } from "../../AppContext/appContext";

const AddAppointmentBox = () => {
  const { isLoader } = useAppContext();

  const [openDialog, setOpenDialog] = useState();

  const handleClickOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <div className="containerAdd">
      <div className="titleAddBox">
        <span>
          <p>Registrar Cita</p>
        </span>
      </div>
      <div>
        <div className="AddIcon">
          <PersonAddAlt1Icon
            className="iconSize"
            onClick={handleClickOpenDialog}
          />
        </div>
      </div>
      <DialogComponent
        open={openDialog}
        handleCloseDialog={handleCloseDialog}
        component={
          <FormAddAppointment
            handleCloseDialog={handleCloseDialog}
            isLoader={isLoader}
          />
        }
      />
    </div>
  );
};

export default AddAppointmentBox;

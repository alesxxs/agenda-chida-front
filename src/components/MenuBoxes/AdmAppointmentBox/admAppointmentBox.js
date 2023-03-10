import React from "react";
import "./css/admAppointmentBox.css";

import TableAppointment from "./tableAppointment";

const AdmAppointmentBox = () => {
  return (
    <div className="containerAdm">
      <div className="titleAddBox">
        <span>
          <p>Administrar Citas</p>
        </span>
      </div>
      <TableAppointment />
    </div>
  );
};

export default AdmAppointmentBox;

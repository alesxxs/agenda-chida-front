import React from "react";
import "./css/ViewAppointmentBox.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InstagramIcon from "@mui/icons-material/Instagram";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useViewAppointmentBox } from "./hooks/useViewAppointmentBox";

const ViewAppointmentBox = () => {
  const {
    infoAppointmentsToday: { results: resultsAppointmentToday },
    handleAppointmentAttended,
    todayTotalAppointments,
  } = useViewAppointmentBox();

  const mapAppointment = resultsAppointmentToday?.map((appointment) => {
    const instaURL = `https://www.instagram.com/${appointment.instagram}/`;

    const formattedTime = appointment.initialTime.slice(0, 5);

    const dateAppointment = new Date(appointment.initialDate);

    const day = dateAppointment.getDate();
    const month = dateAppointment.getMonth() + 1;
    const year = dateAppointment.getFullYear().toString().slice(-2);

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    const totalToCharge = `$${appointment.finalPrice - appointment.anticipo}`;

    return (
      <TableRow
        key={appointment.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {appointment.name}
        </TableCell>
        <TableCell align="center">{formattedDate}</TableCell>
        <TableCell align="center">{formattedTime}</TableCell>
        <TableCell align="center">
          <a href={instaURL} target="_blank">
            {<InstagramIcon className="click" />}
          </a>
        </TableCell>
        <TableCell align="center">{appointment.phoneNumber}</TableCell>
        <TableCell align="center">
          {/* {<MoreVertIcon className="click" />} */}
          {totalToCharge}
        </TableCell>
        <TableCell align="center">
          {
            <CheckIcon
              className="click"
              onClick={() =>
                handleAppointmentAttended(
                  true,
                  appointment.finalPrice,
                  appointment.id,
                  appointment.name
                )
              }
            />
          }
        </TableCell>
        <TableCell align="center">
          {
            <ClearIcon
              className="click"
              onClick={() =>
                handleAppointmentAttended(
                  false,
                  null,
                  appointment.id,
                  appointment.name
                )
              }
            />
          }
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className="appointmentContainer">
      <div className="titleBox">
        <span>
          <p>Citas para hoy</p>
        </span>
      </div>

      {todayTotalAppointments === 0 ? (
        <div className="all4today">
          <span>Es todo por hoy.</span>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="zels">Nombre</TableCell>
                <TableCell align="center" className="zels">
                  Día
                </TableCell>
                <TableCell align="center" className="zels">
                  Hora
                </TableCell>
                <TableCell align="center" className="zels">
                  Red Social
                </TableCell>
                <TableCell align="center" className="zels">
                  Tel
                </TableCell>
                <TableCell align="center" className="zels">
                  Por Cobrar
                </TableCell>
                <TableCell align="center" className="zels">
                  Asistió
                </TableCell>
                <TableCell align="center" className="zels">
                  No Asistió
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{mapAppointment}</TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewAppointmentBox;

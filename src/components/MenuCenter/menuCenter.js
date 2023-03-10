import React from "react";
import Header from "../Header/header";
import ViewAppointmentBox from "../MenuBoxes/ViewAppointmentBox/ViewAppointmentBox";
import DayBox from "../MenuBoxes/DayBox/daybox";
import "./css/menuCenter.css";
import AddAppointmentBox from "../MenuBoxes/AddAppointmentBox/addAppointmentBox";
import EarningsBox from "../MenuBoxes/EarningsBox/earningsBox";
import AdmAppointmentBox from "../MenuBoxes/AdmAppointmentBox/admAppointmentBox";

import { useMenuCenter } from "./hooks/useMenuCenter";
import { NotificationContainer } from "react-notifications";

const MenuCenter = () => {
  const {} = useMenuCenter();

  return (
    <>
      <Header />
      <div className="menuCenterMain">
        <DayBox />
        <ViewAppointmentBox />
        <EarningsBox />
        <AddAppointmentBox />
        <AdmAppointmentBox />
      </div>
      <NotificationContainer />
    </>
  );
};

export default MenuCenter;

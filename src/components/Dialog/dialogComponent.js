import React from "react";
import "./css/dialog.css";
import { Modal } from "@mui/material";

const DialogComponent = (props) => {
  const { handleCloseDialog, open, component } = props;

  return (
    <Modal
      onClose={handleCloseDialog}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={"modalSize"}
    >
      {component}
    </Modal>
  );
};

export default DialogComponent;

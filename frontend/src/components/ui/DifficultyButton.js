import { Button } from "@mui/material";

import React from "react";

import styles from "./DifficultButton.module.css";

function DifficultyButton(props) {
  //Logic for button color
  var btnStyling = styles.btn;
  if (props.buttonText === "Easy") {
    btnStyling += " " + styles.btn_green;
  } else if (props.buttonText === "Medium") {
    btnStyling += " " + styles.btn_orange;
  } else if (props.buttonText === "Hard") {
    btnStyling += " " + styles.btn_red;
  }
  return (
    <Button
      className={btnStyling}
      variant="outlined"
      size="large"
    >
      {props.buttonText}
    </Button>
  );
}

export default DifficultyButton;

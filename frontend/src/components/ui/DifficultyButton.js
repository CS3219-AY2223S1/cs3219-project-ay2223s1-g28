import { Button } from "@mui/material";

import React from "react";

import styles from "./DifficultButton.module.css";

function DifficultyButton(props) {
  //Logic for button color
  let btnStyling = styles.btn;
  switch (props.buttonText) {
    case "Easy":
      btnStyling += " " + styles.btn_easy;
      break;
    case "Medium":
      btnStyling += " " + styles.btn_medium;
      break;
    case "Hard":
      btnStyling += " " + styles.btn_hard;
      break;
    default:
  }
  return (
    <Button
      className={btnStyling}
      variant="outlined"
      size="large"
      onClick={chooseDifficulty}
      id={props.buttonText}
    >
      {props.buttonText}
    </Button>
  );
}

//Clicking on Difficulty button
function chooseDifficulty(e) {
  console.log(e.currentTarget.id);
}

export default DifficultyButton;

import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

import styles from "./DifficultButton.module.css";

function DifficultyButton(props) {
  const navigate = useNavigate();

  // Clicking on a Difficulty button
  const selectDifficulty = (e) => {
    navigate('/match', { state: { difficulty: e.currentTarget.id }})
  }

  // Logic for button color
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
      break;
  }

  return (
    <Button
      className={btnStyling}
      variant="outlined"
      size="large"
      onClick={selectDifficulty}
      id={props.buttonText}
    >
      {props.buttonText}
    </Button>
  );
}

export default DifficultyButton;

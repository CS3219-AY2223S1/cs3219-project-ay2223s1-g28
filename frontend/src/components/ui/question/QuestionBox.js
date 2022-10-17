import { useEffect, useState } from "react";

import axios from "axios";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import GreenDivider from "../GreenDivider";
import OutlinedContainer from "../OutlinedContainer";
import QuestionCategories from "./QuestionCategories";
import QuestionTitle from "./QuestionTitle";
import Question from "./Question";

import styles from './QuestionBox.module.css'

/* 
  Find out which difficulty user chose,
  obtain a Question of that difficulty from
  Question service and display it
*/

function QuestionBox() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:8004/api/question/level/Hard") // 'Hard' is hardcoded for now
        .then((res) => {
          try {
            console.log(
              "Setting the variables with data from question service!"
            );
            setTitle(res.data.title);
            setCategories(res.data.categories);
            setContent(res.data.content);
            setDifficulty("Hard") // 'Hard' is hardcoded for now
          } catch (err) {
            console.log(
              "Encountered error when fetching data from endpoint: " + err
            );
          }
        });
    }
    fetchData();
  }, []);

  function difficultyButtonStyle(difficulty) {
    switch (difficulty) {
      case "Easy":
        return styles.btn_easy;
      case "Medium":
        return styles.btn_medium;
      case "Hard":
        return styles.btn_hard;
      default:
        break;
    }
  }

  return (
    <OutlinedContainer justifyContent="center">
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid xs={12} item>
            {/*Question Title*/}
            <Grid container direction="column">
              <Grid item>
                <QuestionTitle title={title} />
              </Grid>
              <Grid item>
                <Button className={difficultyButtonStyle(difficulty)} disabled>{difficulty}</Button>
              </Grid>
            </Grid>
            <GreenDivider orientation="Horizontal" />
          </Grid>
          <Grid xs={12} item>
            {/*Question Categories*/}
            <QuestionCategories categories={categories} />
          </Grid>
          <Grid xs={12} item>
            {/*Coding question*/}
            <Question question={content} />
          </Grid>
        </Grid>
      </Grid>
    </OutlinedContainer>
  );
}

export default QuestionBox;

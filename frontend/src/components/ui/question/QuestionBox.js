import { useEffect, useState } from "react";

import axios from "axios";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import GreenDivider from "../GreenDivider";
import OutlinedContainer from "../OutlinedContainer";
import QuestionCategories from "./QuestionCategories";
import QuestionTitle from "./QuestionTitle";
import Question from "./Question";

import { URL_QUES_SVC } from "../../../configs";
import styles from "./QuestionBox.module.css";

// Find out which difficulty user chose,
// obtain a Question of that difficulty from
// Question service and display it
function QuestionBox({ difficulty, roomId }) {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [questionNumber, setQuestionNumber] = useState();

  useEffect(() => {
    async function fetchData() {
      // Encoded roomId
      var questionEncoding = encode(roomId);
      setQuestionNumber(questionEncoding);

      await axios
        .get(URL_QUES_SVC + "/level/" + difficulty + "/" + questionNumber)
        .then((res) => {
          try {
            setTitle(res.data.title);
            setCategories(res.data.categories);
            setContent(res.data.content);
          } catch (err) {
            console.log(
              "Encountered error when fetching data from endpoint: " + err
            );
          }
        });
    }
    fetchData();
  }, [questionNumber, difficulty, roomId]);

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

  function encode(string) {
    var number = "";
    var length = string.length;

    // Encode the roomId into an integer so that the same interview question can be
    // retrieved for the pair of users in the same room.
    for (var i = 0; i < length; i++) {
      number += string.charCodeAt(i).toString(16);
    }
    return parseInt(number);
  }
  // [This function encodes a string into an integer]
  // (Adapted from https://stackoverflow.com/questions/14346829/is-there-a-way-to-convert-a-string-to-a-base-10-number-for-encryption)

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
              {difficulty ? (
                  <QuestionTitle title={title} />
                ) : (
                  <p>Unable to retrieve the title of the question!</p>
                )}
              </Grid>
              <Grid item>
                {difficulty ? (
                  <Button
                    className={difficultyButtonStyle(difficulty)}
                    disabled
                  >
                    {difficulty}
                  </Button>
                ) : (
                  <p>Difficulty level not selected!</p>
                )}
              </Grid>
            </Grid>
            <GreenDivider orientation="horizontal" />
          </Grid>
          <Grid xs={12} item>
            {/*Question Categories*/}
            {categories ? (
              <QuestionCategories categories={categories} />
            ) : (
              <p>Unable to retrieve the categories of the question!</p>
            )}
          </Grid>
          <Grid xs={12} item>
            {/*Coding question*/}
            {content ? (
              <Question question={content} />
            ) : (
              <p>Unable to retrieve the content of the question!</p>
            )}
          </Grid>
        </Grid>
      </Grid>
    </OutlinedContainer>
  );
}

export default QuestionBox;

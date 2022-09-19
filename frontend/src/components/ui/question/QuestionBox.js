import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import GreenDivider from "../GreenDivider";
import OutlinedContainer from "../OutlinedContainer";
import QuestionCategories from "./QuestionCategories";
import QuestionTitle from "./QuestionTitle";
import Question from "./Question";

function QuestionBox() {
  const DUMMY_DATA = [
    {
      text: "HashMap",
    },
    {
      text: "BackTracking",
    },
  ];

  const [state, setState] = useState({
    categories: DUMMY_DATA,
    title: "Question Title",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur est \naugue, sagittis nec mi et, finibus consequat ligula. Vivamus",
  });

  return (
    <OutlinedContainer>
      <Grid container direction="column">
        <Grid xs={12} item>
          {/*Question Title*/}
          <QuestionTitle title={state.title} />
          <GreenDivider orientation="Horizontal" />
        </Grid>
        <Grid item>
          {/*Question Categories*/}
          <QuestionCategories categories={state.categories} />
        </Grid>
        <Grid item>
          {/*Coding question*/}
          <Question question={state.question} />
        </Grid>
      </Grid>
    </OutlinedContainer>
  );
}

export default QuestionBox;

import { useEffect, useState } from "react";

import axios from 'axios';

import Grid from "@mui/material/Grid";

import GreenDivider from "../GreenDivider";
import OutlinedContainer from "../OutlinedContainer";
import QuestionCategories from "./QuestionCategories";
import QuestionTitle from "./QuestionTitle";
import Question from "./Question";

/* 
  Find out which difficulty user chose,
  obtain a Question of that difficulty from
  Question service and display it
*/

function QuestionBox() {
  const DUMMY_DATA = [
    {
      text: "HashMap",
    },
    {
      text: "BackTracking",
    },
  ];

  const [state] = useState({
    categories: DUMMY_DATA,
    title: "Question Title",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur est \naugue, sagittis nec mi et, finibus consequat ligula. Vivamus",
  });

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:8002/api/question/Medium")
        .then((res) => {
          try {
            console.log("Setting the data to array!");
            setContacts([...res.data.data]);
          } catch (err) {
            console.log(
              "Encountered error when fetching data from endpoint: " + err
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchData();
  })

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

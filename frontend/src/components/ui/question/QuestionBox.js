import { useEffect, useState } from 'react';

import axios from 'axios';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import GreenDivider from '../GreenDivider';
import QuestionCategories from './QuestionCategories';
import QuestionTitle from './QuestionTitle';
import Question from './Question';

import { URL_QUES_SVC } from '../../../configs';
import styles from './QuestionBox.module.css';

const DUMMY_CONTENT =
  "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus varius dui, at commodo tortor pulvinar sit amet. Donec id feugiat nisl, in gravida mauris. Fusce molestie magna quis velit blandit, non sagittis lorem scelerisque. Integer eget tempus neque. Sed condimentum et sem ut elementum. Proin ornare pulvinar augue molestie sollicitudin. Nam egestas vitae sapien quis vehicula. Nunc volutpat lacus sit amet mauris maximus efficitur. Cras vitae tellus sapien. Phasellus vehicula mi nec orci scelerisque vehicula. Maecenas urna dui, dignissim quis suscipit ut, hendrerit in quam.</p>"
  +
  "<p>Nunc molestie venenatis elit, et auctor nibh accumsan ac. Nunc neque turpis, placerat sed vestibulum vitae, ultrices sed massa. Donec eget erat justo. Nam sed posuere purus. Aliquam finibus suscipit ex, vitae sagittis eros blandit sed. Suspendisse varius lobortis fringilla. Quisque sit amet neque nisl. Vivamus et dapibus ante. Nunc id est tempor, vehicula nibh id, tincidunt nibh. Phasellus vel nulla fringilla, congue tellus eget, volutpat arcu.</p>"
  +
  "<p>Morbi ipsum mi, tincidunt a fringilla ac, varius nec purus. Praesent et nulla in neque porta mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec venenatis enim at velit ullamcorper blandit. Pellentesque dapibus ante a odio vestibulum suscipit. Nam rutrum ultrices metus in interdum. Cras vitae orci et risus tristique pretium. Aenean aliquet venenatis dui, sit amet imperdiet purus faucibus et. Suspendisse erat turpis, lacinia eleifend justo id, dignissim aliquet nibh. Vivamus fringilla magna ante, vitae auctor felis luctus id. Morbi congue vehicula risus sit amet bibendum. Quisque in auctor tellus, quis semper quam. Sed quis accumsan enim, vel mattis nisi. Duis et turpis at ipsum molestie rutrum id elementum justo. Vivamus pellentesque quam in nibh ultrices sollicitudin. Curabitur congue mi ut elit egestas lobortis.</p>"
  +
  "<p>Praesent magna dui, ullamcorper ut aliquam vel, feugiat et est. Vestibulum commodo mauris in enim rutrum accumsan. Quisque at ante consequat, fringilla tortor vel, egestas nibh. Fusce fringilla arcu a massa egestas sodales. Donec vel nulla nec diam sollicitudin lobortis. Morbi bibendum felis a egestas varius. Etiam fringilla nibh risus, nec fringilla nulla imperdiet faucibus. Nulla at mattis nibh. Curabitur id velit eu augue facilisis commodo.</p>"
  +
  "<p>Cras non lorem vitae nunc volutpat tempor nec sit amet arcu. Suspendisse feugiat massa est, id viverra sapien tempus sed. Nulla quis pretium dolor. Quisque eu est sit amet nibh faucibus tempor vitae tempus purus. Vestibulum in est ut purus dapibus vulputate quis at ex. Aliquam rutrum hendrerit velit sit amet vestibulum. Maecenas metus libero, gravida hendrerit facilisis et, venenatis et elit. Curabitur eget tincidunt mi. Nulla at tristique ante. Ut quis elit metus. Donec condimentum pharetra nunc, aliquet blandit leo eleifend id. Donec porttitor ligula rutrum bibendum bibendum. Vivamus vestibulum nec nulla at iaculis. Morbi eget consectetur ipsum, sit amet egestas arcu. Morbi accumsan urna sapien, non dictum lacus finibus ut.</p></div>";

// Find out which difficulty user chose,
// obtain a Question of that difficulty from
// Question service and display it
function QuestionBox({ difficulty, roomId }) {
  const [title, setTitle] = useState('This is a default title');
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState(DUMMY_CONTENT);
  const [questionNumber, setQuestionNumber] = useState();

  useEffect(() => {
    async function fetchData() {
      // Encoded roomId
      var questionEncoding = encode(roomId);
      setQuestionNumber(questionEncoding);

      await axios
        .get(URL_QUES_SVC + '/level/' + difficulty + '/' + questionNumber, {
          withCredentials: true,
        })
        .then((res) => {
          try {
            setTitle(res.data.title);
            setCategories(res.data.categories);
            setContent(res.data.content);
          } catch (err) {
            console.log(
              'Encountered error when fetching data from endpoint: ' + err
            );
          }
        });
    }
    fetchData();
  }, [questionNumber, difficulty, roomId]);

  function difficultyButtonStyle(difficulty) {
    switch (difficulty) {
      case 'Easy':
        return styles.btn_easy;
      case 'Medium':
        return styles.btn_medium;
      case 'Hard':
        return styles.btn_hard;
      default:
        break;
    }
  }

  function encode(string) {
    var number = '';
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
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{
        overflow: 'scroll',
        height: '80vh',
        width: '100%',
        p: '16px',
        backgroundColor: 'white',
      }}
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
                <Button className={difficultyButtonStyle(difficulty)} disabled>
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
  );
}

export default QuestionBox;

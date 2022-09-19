import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Editor from "react-monaco-editor";

import ChatBlock from "../../components/ui/chat/ChatBlock";
import QuestionBox from "../../components/ui/question/QuestionBox";
import style from "./Room.module.css";

function RoomPage() {
  return (
    <div>
      <Grid container>
        <Grid xs={2} item></Grid>
        <Grid xs={8} item>
          <Typography
            variant="h4"
            fontWeight="lighter"
            textAlign="center"
            sx={{ mb: "40px" }}
          >
            Your technical interview begins...
          </Typography>
        </Grid>
        <Grid xs={2} item justifyContent="flex-end">
          <div className={style.leave_session_button}>
            <Button variant="outlined" color="error">
              <b>Leave Session</b>
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {/* Question component */}
        <Grid xs={5} item>
          <QuestionBox />
        </Grid>
        <Grid xs={7} item container direction="column">
          {/* Chat component */}
          <Grid item>
            <ChatBlock />
          </Grid>
          {/* Code Editor component */}
          <Grid item>
            <div className={style.code_editor}>
              <Editor
                height="50vh"
                defaultLanguage="javascript"
                defaultValue="Start your coding here..."
              />
              <div className={style.code_editor_buttons}>
                <Button variant="outlined">Run code</Button>
                <Button variant="outlined">Submit</Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RoomPage;

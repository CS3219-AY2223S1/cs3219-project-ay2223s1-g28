import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import OutlinedContainer from "../../components/ui/OutlinedContainer";
import DifficultyButtonGroup from "../../components/ui/DifficultyButtonGroup";

function Home() {
  return (
    <>
      <Grid container>
        <Grid container direction="column" item xs={12} md={4} alignItems="center">
          <Grid item>
            <Typography
              variant="h2"
              fontWeight="lighter"
              textAlign="center"
              sx={{ mt: "32px" }}
              color="#3EA7A5"
            >
              Welcome to PeerPrep
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              fontWeight="lighter"
              textAlign="center"
              sx={{ mt: "32px" }}
              color="#A7C7C8"
            >
              Your one stop <br />
              solution to acing your <br />
              technical interviews
            </Typography>
          </Grid>
          <Grid item>
            <img
              src={require("../../assets/home_media.svg").default}
              alt="Code"
              height="90%"
              width="90%"
            />
          </Grid>
        </Grid>
        <Grid item xs container>
          <OutlinedContainer>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="h3"
                  fontWeight="lighter"
                  textAlign="center"
                  sx={{ mt: "32px" }}
                  color="#3EA7A5"
                >
                  Question Difficulty
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="lighter"
                  textAlign="center"
                  sx={{ mt: "150px" }}
                  color="#A7C7C8"
                >
                  Start by choosing <br />a{" "}
                  <Typography variant="h4" component="span" fontWeight="bold">
                    difficulty
                  </Typography>{" "}
                  level for <br />
                  your coding question.
                  <br />
                  Let PeerPrep handle the rest!
                </Typography>
                <Grid
                  item
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: "130px" }}
                >
                  <DifficultyButtonGroup />
                </Grid>
              </Grid>
            </Grid>
          </OutlinedContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;

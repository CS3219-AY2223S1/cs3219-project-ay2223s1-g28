import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import OutlinedContainer from "../../components/ui/OutlinedContainer";
import DifficultyButtonGroup from "../../components/ui/DifficultyButtonGroup";

function DifficultySelectionPage() {
  return (
    <>
      <img
        src={require("../../assets/difficultyselectionpage_media.svg").default}
        alt="Code"
        width="100%"
      />
      <OutlinedContainer>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography
              variant="h5"
              fontWeight="lighter"
              textAlign="center"
              sx={{ mt: "32px" }}
            >
              Question Difficulty
            </Typography>
            <Typography
              variant="h5"
              fontWeight="lighter"
              textAlign="center"
              sx={{ mt: "32px" }}
            >
              Start by choosing a difficulty level for your coding question. Let
              PeerPrep handle the rest!
            </Typography>
            <DifficultyButtonGroup />
          </Grid>
        </Grid>
      </OutlinedContainer>
    </>
  );
}

export default DifficultySelectionPage;

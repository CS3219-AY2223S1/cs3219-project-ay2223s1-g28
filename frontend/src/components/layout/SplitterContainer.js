import Grid from '@mui/material/Grid';

function SplitterContainer({ primaryChild, secondaryChild, textAlign="center", minHeight="100vh" }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      textAlign={textAlign}
      sx={{
        width: '100%',
        minHeight: {minHeight},
        pb: '50px',
      }}
      columnSpacing={10}
    >
      <Grid item xs={12} md={6}>
        {primaryChild}
      </Grid>
      <Grid item xs={12} md={6}>
        {secondaryChild}
      </Grid>
    </Grid>
  );
}

export default SplitterContainer;

import Grid from '@mui/material/Grid';

function SplitterContainer({ primaryChild, secondaryChild }) {
  return (
    <Grid
      container
      direction='row'
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
      columnSpacing={5}
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

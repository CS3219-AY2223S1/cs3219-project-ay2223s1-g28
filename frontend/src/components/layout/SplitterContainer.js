import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

function SplitterContainer({ primaryChild, secondaryChild }) {
  const isMobileView = useMediaQuery('(max-width:900px)');
  return (
    <Grid
      container
      direction={isMobileView ? 'column' : 'row'}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
      spacing={5}
    >
      <Grid item xs={6}>
        {primaryChild}
      </Grid>
      <Grid item xs={6}>
        {secondaryChild}
      </Grid>
    </Grid>
  );
}

export default SplitterContainer;

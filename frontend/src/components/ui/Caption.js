import Typography from '@mui/material/Typography';

function Caption({ text }) {
  return (
    <Typography variant="h5" color="primary">
      {text}
    </Typography>
  );
}

export default Caption;

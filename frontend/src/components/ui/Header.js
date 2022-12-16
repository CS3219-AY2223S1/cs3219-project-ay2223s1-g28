import Typography from '@mui/material/Typography';

function Header({ text }) {
  return (
    <Typography variant="h3" color="primary" fontWeight="bold">
      {text}
    </Typography>
  );
}

export default Header;

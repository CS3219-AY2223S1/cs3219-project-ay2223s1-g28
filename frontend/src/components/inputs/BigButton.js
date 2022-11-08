import Button from '@mui/material/Button';
import styles from './BigButton.module.css';

function BigButton({ children, buttonProps, onClick, sx }) {
  return (
    <Button
      className={styles.big_button}
      {...buttonProps}
      onClick={onClick}
      sx={sx}
    >
      {children}
    </Button>
  );
}

export default BigButton;

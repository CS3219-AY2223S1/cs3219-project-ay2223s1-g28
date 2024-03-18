import Typography from '@mui/material/Typography';

import styles from './TextWithBackgroundImage.module.css';

function TextWithBackgroundImage({ text, imageURL, sx }) {
  return (
    <Typography
      className={styles.textImage}
      sx={{
        ...sx,
        backgroundImage: `url(${imageURL})`,
      }}
    >
      {text}
    </Typography>
  );
}

export default TextWithBackgroundImage;

import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import BigButton from '../../components/inputs/BigButton';
import TextWithBackgroundImage from '../../components/ui/TextWithBackgroundImage';
import NotFoundTextImage from '../../assets/404textbg.svg';
import styles from './NotFound.module.css';

const NOTFOUND_HEADER_STYLE = {
  fontWeight: 'bolder',
  fontSize: 'clamp(5rem, 50vw, 18rem)',
  lineHeight: 'normal',
};

const NOTFOUND_SUBHEADER_STYLE = {
  color: '#3fa7a5',
  fontSize: 'clamp(1rem, 25vw, 2rem)',
  lineHeight: '2.5',
};

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <TextWithBackgroundImage
        text="404"
        imageURL={NotFoundTextImage}
        sx={NOTFOUND_HEADER_STYLE}
      />
      <Typography sx={NOTFOUND_SUBHEADER_STYLE}>PAGE NOT FOUND</Typography>
      <BigButton
        buttonProps={{
          variant: 'contained',
        }}
        onClick={() => navigate('/home')}
        sx={{ color: 'white' }}
      >
        Back to home
      </BigButton>
    </div>
  );
}

export default NotFoundPage;

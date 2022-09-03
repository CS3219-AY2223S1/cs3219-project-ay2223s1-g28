import Divider from '@mui/material/Divider';

import styles from './GreenDivider.module.css';

function GreenDivider({ orientation = 'vertical' }) {
  return (
    <Divider
      className={styles.green_divider}
      orientation={orientation}
      flexItem
    />
  );
}

export default GreenDivider;

import Grid from '@mui/material/Grid';

import NavBar from '../../components/surface/NavBar';
import Card from '../../components/surface/Card';
import Header from '../../components/ui/Header';
import Caption from '../../components/ui/Caption';

import EasyMedia from '../../assets/easy.png';
import MediumMedia from '../../assets/medium.png';
import HardMedia from '../../assets/hard.png';

function HomePage() {
  return (
    <Grid
      container
      justifyContent="flex-start"
      textAlign="center"
      columnSpacing={1}
      rowSpacing={2}
      rowGap={3}
      sx={{
        width: '100%',
        minHeight: '100vh',
        pb: '50px',
      }}
    >
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <Header text="Ready to ace your interview?" />
        <Caption text="pick a difficulty level" />
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        gap={{ xs: 2, md: 4 }}
        columns={{ xs: 3, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={3}>
          <Card
            level="Easy"
            imageUrl={EasyMedia}
            footer={
              <>
                Suitable for beginner
                <br /> ~15mins
              </>
            }
          />
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <Card
            level="Medium"
            imageUrl={MediumMedia}
            footer={
              <>
                Suitable for intermediate user
                <br /> ~45mins
              </>
            }
          />
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <Card
            level="Hard"
            imageUrl={HardMedia}
            footer={
              <>
                Suitable for expert
                <br /> ~1.5hrs
              </>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;

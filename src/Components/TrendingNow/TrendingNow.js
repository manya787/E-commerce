import React from 'react';
import image1 from '../../assets/images/finalbanner.jpg';
import image2 from '../../assets/images/finalbanner2.jpeg';
import image3 from '../../assets/images/finalbanner4.jpeg';
import styles from './TrendingNow.module.css';
import Grid from '@mui/material/Grid';

const TrendingNow = () => {
  const pictureData = [
    {
      id: 1,
      src: image1,
    },
    {
      id: 2,
      src: image3,
    },
    {
      id: 3,
      src: image2,
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Features</h1>
      <div className={styles.container}>
        <Grid container spacing={2} justifyContent="center">
          {pictureData.map((picture) => (
            <Grid item xs={12} sm={6} md={4} key={picture.id} sx={{ mb: 2 }}>
              <div className={styles.imageItem}>
                <img src={picture.src} alt={`Trending ${picture.id}`} className={styles.image} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default TrendingNow;

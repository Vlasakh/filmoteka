import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Layout, { LayoutTitles } from '../../Layout';
import favoritesActions from '../../actions/favoritesActions';
import FilmCard from '../../components/FilmCard/FilmCard';
import useSmartAction from '../../hooks/useSmartAction';

const Favorites = () => {
  const mapState = (state) => ({
    films: state.favorites,
  });
  const { films } = useSelector(mapState);
  const getFavorites = useSmartAction(favoritesActions.getFavorites);

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <Layout title={LayoutTitles.FAVORITES}>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {films?.map((film) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
              <FilmCard film={{ ...film, favorite: true }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Favorites;

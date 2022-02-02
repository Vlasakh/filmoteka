import React from "react";
import {useSelector} from "react-redux";
import {Outlet} from 'react-router-dom';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Layout from "../../Layout";
import Loader from "../../components/Loader";
import Film from "../../components/Film/Film";
import useActions from "../../hooks/useActions";
import AddFilmButton from "../../components/AddFilmButton";
import FilmActionCreator from "../../actions/filmsActions";

const Films = () => {
    const {films, isLoading} = useSelector(({films}) => films);
    const isAuth = useSelector(({auth}) => auth.isAuth);
    const {getFilms} = useActions(FilmActionCreator);

    React.useEffect(() => {
        getFilms();
    }, []);

    return (
        <Layout title={`Films`}>
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        isLoading && <Loader/>
                    }
                    {
                        films.map((film) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <Film film={film}/>
                            </Grid>
                        )
                    }
                    {
                        isAuth && (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <AddFilmButton/>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            <Outlet/>
        </Layout>);
}

export default Films;
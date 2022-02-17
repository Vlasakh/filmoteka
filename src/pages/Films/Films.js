import React from "react";
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import AddFilmButton from "./AddFilmButton";
import useActions from "../../hooks/useActions";
import Layout, {LayoutTitles} from "../../Layout";
import FilmCard from "../../components/FilmCard/FilmCard";
import {DIALOG_TYPES} from "../../components/Dialog";

const Films = () => {
    const navigate = useNavigate();
    const mapState = (state) => ({
        films: state.films.data,
        page: state.films.page,
        pages: state.films.pages,
        isAuth: state.auth.isAuth
    });
    const {
        films,
        page,
        pages,
        isAuth
    } = useSelector(mapState);

    const {getFilms, addToFavorites, openDialog} = useActions();

    const handleChangePage = (event, page = 1) => {
        getFilms({page});
    }

    const handleClickAddToFavorites = (film) => () => {
        addToFavorites(film);
    }

    const handleNavigateToRemove = (film) => () => {
        navigate(`remove/${film.id}`)
    }

    const handleClickEditFilm = (film) => () => {
        navigate(`edit/${film.id}`)
    }

    const handleClickAddFilm = () => {
        console.log('open')
        openDialog(DIALOG_TYPES.ADD_FILM)
    }

    React.useEffect(handleChangePage, []);

    return <Layout title={LayoutTitles.FILMS}>
        <Box sx={{width: '100%'}}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                {
                    films.map((film) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                            <FilmCard
                                film={film}
                                onEdit={handleClickEditFilm(film)}
                                actionsButtons={[
                                    isAuth &&
                                    <IconButton onClick={handleClickAddToFavorites(film)}>
                                        <FavoriteIcon/>
                                    </IconButton>,
                                    <IconButton onClick={handleNavigateToRemove(film)}>
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                ]}
                            />
                        </Grid>
                    )
                }
                {
                    isAuth &&
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <AddFilmButton onClick={handleClickAddFilm}/>
                    </Grid>
                }
            </Grid>
            {
                films.length > 0 &&
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '15px'
                }}>
                    <Pagination
                        count={pages}
                        page={+page}
                        size="large"
                        onChange={handleChangePage}
                    />
                </Box>
            }
        </Box>
        <Outlet/>
    </Layout>
}

export default Films;
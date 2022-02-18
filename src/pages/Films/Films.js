import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ActionCreators from "../../actions";
import AddFilmButton from "./AddFilmButton";
import useActions from "../../hooks/useActions";
import Layout, {LayoutTitles} from "../../Layout";
import useSmartAction from "../../hooks/useSmartAction";
import FilmCard from "../../components/FilmCard/FilmCard";
import {DIALOG_TYPES} from "../../components/DialogManager/Dialogs";



const Films = () => {
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

    const {addToFavorites, openDialog} = useActions();
    const getFilms = useSmartAction(ActionCreators.getFilms);

    const handleChangePage = (event, page = 1) => {
        getFilms({page});
    }

    const handleAddToFavorites = (film) => () => {
        addToFavorites(film);
    }

    const handleOpenDialog = (dialog, id) => () => {
        openDialog(dialog, {id})
    }

    useEffect(handleChangePage, []);

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
                                onEdit={handleOpenDialog(DIALOG_TYPES.EDIT_FILM, film.id)}
                                actionsButtons={
                                    isAuth &&
                                    <Box>
                                        <IconButton onClick={handleAddToFavorites(film)}>
                                            <FavoriteIcon/>
                                        </IconButton>
                                        <IconButton onClick={handleOpenDialog(DIALOG_TYPES.DELETE_FILM, film.id)}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Box>
                                }
                            />
                        </Grid>
                    )
                }
                {
                    isAuth &&
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <AddFilmButton onClick={handleOpenDialog(DIALOG_TYPES.ADD_FILM)}/>
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
    </Layout>
}

export default Films;
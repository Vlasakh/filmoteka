import {ACTION_TYPES} from "./index";
import {FilmService} from "../services";
import {request, success, failure} from "./loadingActions";
import {showNotice} from "./noticeActions";
import {SnackBarSeverities} from "../components/SnackStack";

const getFilmsSuccess = (films) => ({
    type: ACTION_TYPES.Films.FILMS_LOADED,
    payload: films
});

const getFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_LOADED,
    payload: film
});

const addFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_ADDED,
    payload: film
})
const updateFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_UPDATED,
    payload: film
})
const removeFilmSuccess = (film) => ({
    type: ACTION_TYPES.Films.FILM_REMOVED,
    payload: film
})

const getFilm = (id) => (dispatch) => {
    dispatch(request());
    FilmService
        .getOne(id)
        .then(({data}) => dispatch(getFilmSuccess(data)))
        .catch((error) => dispatch(showNotice(`Error loading films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const getFilms = (query) => (dispatch) => {
    dispatch(request());
    FilmService
        .getAll(query)
        .then(({data, size, limit, page}) => dispatch(getFilmsSuccess({
            data,
            page,
            pages: Math.ceil(size / limit)
        })))
        .catch((error) => dispatch(showNotice(`Error loading films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const addFilm = (film) => (dispatch, getState) => {
    const {films: {page}} = getState();
    dispatch(request());
    FilmService
        .addFilm(film)
        .then(() => dispatch(getFilms({page})))
        .then(() => dispatch(showNotice('Film added', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error adding films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const updateFilm = (film) => (dispatch, getState) => {
    const {films: {page}} = getState();
    dispatch(request());
    return FilmService
        .updateFilm(film)
        .then(() => dispatch(getFilms({page})))
        .then(() => dispatch(success()))
        .then(() => dispatch(showNotice('Film updated', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error updating films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

const removeFilm = (id) => (dispatch, getState) => {
    const {films: {page}} = getState();
    dispatch(request());
    FilmService
        .removeFilm(id)
        .then(() => dispatch(getFilms({page})))
        .then(() => dispatch(success()))
        .then(() => dispatch(showNotice('Film removed', SnackBarSeverities.success)))
        .catch((error) => dispatch(showNotice(`Error removing films: ${error.message}`, SnackBarSeverities.error)))
        .finally(() => dispatch(success()))
}

export default {
    getFilm,
    getFilms,
    addFilm,
    removeFilm,
    updateFilm
}
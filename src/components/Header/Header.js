import React from 'react';
import {useSelector} from "react-redux";
import {createSearchParams} from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AccountCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import SearchInput from "../SearchInput";
import {useRouter} from "../../hooks/useRouter";
import useActions from "../../hooks/useActions";

const Header = ({title, onOpenMenuBar}) => {
    const {navigate} = useRouter();
    const mapState = (state) => ({
        isAuth: state.auth.isAuth,
        isLoading: state.loading.isLoading,
        searchedFilms: state.search.results
    });
    const {isAuth, isLoading, searchedFilms} = useSelector(mapState);
    const {searchFilms} = useActions();

    const handleSearch = (text) => {
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({
                field: 'name',
                value: text,
                page: 1,
                limit: 10
            })}`
        });
    }

    const handleSubmit = (id) => {
        navigate(`/film/${id}`);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{mr: 2}}
                        onClick={onOpenMenuBar}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    <SearchInput
                        search={searchFilms}
                        options={searchedFilms}
                        onSearch={handleSearch}
                        onSubmit={handleSubmit}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                        >
                            {
                                isLoading
                                    ? <CircularProgress color="inherit" size={24}/>
                                    : isAuth && <AccountCircle/>
                            }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
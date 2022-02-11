import React, {useState} from 'react';
import {useSelector} from "react-redux";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {Assignment} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@mui/material/Drawer/Drawer";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";

import useActions from "../hooks/useActions";
import {useRouter} from "../hooks/useRouter";
import SnackBar from "../components/SnackBar";
import SearchInput from "../components/SearchInput";
import {createSearchParams} from "react-router-dom";


const Layout = ({title, children}) => {
    const {navigate, location} = useRouter();
    const mapState = (state) => ({
        isAuth: state.auth.isAuth,
        isLoading: state.loading.isLoading,
        error: state.loading.error,
        notice: state.notice,
        searchedFilms: state.search.results
    });
    const {isAuth, isLoading, notice, searchedFilms} = useSelector(mapState);
    const {signOut, hideNotice, searchFilms} = useActions();
    const [isOpenMenuBar, setIsOpenMenuBar] = useState(false);

    const handleSignOut = () => {
        signOut();
        setIsOpenMenuBar(false);
    }

    const handleSearch = (text) => {
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({
                field: 'name',
                value: text
            })}`
        });
    }

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{mr: 2}}
                            onClick={() => setIsOpenMenuBar(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {title}
                        </Typography>
                        <SearchInput searchFilms={searchFilms} films={searchedFilms} onSubmit={handleSearch}/>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                            >
                                {
                                    isLoading &&
                                    <CircularProgress color="inherit" size={24}/>
                                    || isAuth &&
                                    <AccountCircle/>
                                }
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor="left"
                open={isOpenMenuBar}
                onClose={() => setIsOpenMenuBar(false)}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 12
                }}>
                    <IconButton onClick={() => setIsOpenMenuBar(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <Box sx={{width: 240}}>
                    <List>
                        <ListItem
                            button
                            selected={location.pathname.split('/')[1] === 'home'}
                            onClick={() => navigate('/')}
                        >
                            <ListItemIcon>
                                <Assignment/>
                            </ListItemIcon>
                            <ListItemText primary='Home'/>
                        </ListItem>
                        <ListItem
                            button
                            selected={location.pathname.split('/')[1] === 'films'}
                            onClick={() => navigate('/films')}
                        >
                            <ListItemIcon>
                                <Assignment/>
                            </ListItemIcon>
                            <ListItemText primary='Films'/>
                        </ListItem>
                        <ListItem
                            button
                            selected={location.pathname.split('/')[1] === 'search'}
                            onClick={() => navigate('/search')}
                        >
                            <ListItemIcon>
                                <Assignment/>
                            </ListItemIcon>
                            <ListItemText primary='Search'/>
                        </ListItem>
                        {
                            isAuth &&
                            <ListItem
                                button
                                selected={location.pathname.split('/')[1] === 'fav'}
                                onClick={() => navigate('/fav')}
                            >
                                <ListItemIcon>
                                    <Assignment/>
                                </ListItemIcon>
                                <ListItemText primary='Favorites'/>
                            </ListItem>
                        }
                        <Divider/>
                        {isAuth
                            ? (
                                <ListItem
                                    button
                                    onClick={handleSignOut}
                                >
                                    <ListItemIcon>
                                        <Assignment/>
                                    </ListItemIcon>
                                    <ListItemText primary='Logout'/>
                                </ListItem>
                            )
                            : (
                                <ListItem
                                    button
                                    onClick={() => navigate("/signin")}
                                >
                                    <ListItemIcon>
                                        <Assignment/>
                                    </ListItemIcon>
                                    <ListItemText primary='Login'/>
                                </ListItem>
                            )
                        }
                    </List>
                </Box>
            </Drawer>
            <Box sx={{marginTop: '80px'}}>
                {children}
            </Box>
            <SnackBar
                open={notice.isShow}
                message={notice.message}
                onClose={hideNotice}
                severity={notice.severity}
            />
        </div>
    );
};

export default Layout;
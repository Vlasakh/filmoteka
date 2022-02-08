import * as React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Rating from "@mui/material/Rating";
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {CardActionArea, CardActions} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import useActions from "../../hooks/useActions";
import {SnackBarSeverities, useSnackBar} from "../../hooks/useSnackBar";

export default function Film({film}) {
    const navigate = useNavigate();
    const {isAuth} = useSelector(({auth}) => auth);
    const {addToFavorites} = useActions();
    const {showMessage} = useSnackBar();

    const handleRemove = () => {
        navigate(`remove/${film.id}`)
    }

    const handleEdit = () => {
        navigate(`edit/${film.id}`)
    }

    const handleAdd = () => {
        addToFavorites(film)
            .then(() => showMessage('Film added to favorites', SnackBarSeverities.info))
    }

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <CardActionArea onClick={handleEdit}>
                <CardMedia
                    component="img"
                    height="140"
                    image={film.img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {film.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {film.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{justifyContent: 'space-between'}}>
                <Rating readOnly value={film.rating} size="large"/>
                {
                    isAuth &&
                    <Box>
                        <IconButton onClick={handleAdd}>
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton onClick={handleRemove}>
                            <RemoveCircleIcon/>
                        </IconButton>
                    </Box>
                }
            </CardActions>
        </Card>
    );
}
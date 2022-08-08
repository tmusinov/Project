import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Container, Grid } from '@material-ui/core';
import UserContext from '../UserContext';

import Card from './Card';

import PostComments from './PostComment';
import Comment from "./Comment";

import postService from "../services/postService";
import PrimarySearchAppBar from './AppBar';


export default function RecipeReviewCard() {
    const context = useContext(UserContext)
    const [posts, setPosts] = useState([]);


    document.title = 'Carsocial'
    useEffect(() => {
        const fetchData = async () => {
            const data = await postService.getAll(context.user._id);
            console.log('card data', data);
            if (data.result) {
                setPosts(data.result);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            <PrimarySearchAppBar />
            {posts.map(post =>
                <Card key={post._id} post={post} />
            )}
        </ >
    );
}
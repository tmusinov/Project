import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import postService from '../services/postService';
import UserContext from '../UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

export default function BasicTextFields(props) {
    const classes = useStyles();
    const context = useContext(UserContext);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(props.comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = context.user._id;
        let postId = props.postId
        let data = { postId, comment, userId }

        //let res = await postService.addComment(data);
        //console.log(res);
        //setComments([comments, cm]);
        console.log('d', comments);
        //setComment('');
        test();
    };

    const test = () => {

        let cm = { _id: context.user._id, post: props.post._id, user: { _id: 'asdasd', username: context.user.username }, content: comment };
        props.onChange(cm)
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <TextField
                label="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{ endAdornment: <Button color="primary" type="submit">Post</Button> }}
            />
        </form>
    );
}
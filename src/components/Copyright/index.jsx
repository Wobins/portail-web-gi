import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
        <Link color="inherit" to="https://github.com/Wobins" target="_blank">
            Ange Wobinwo
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

export default Copyright;
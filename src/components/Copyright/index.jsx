import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import './styles.css';

const Copyright = (props) => {
    return (
        <footer className='footer mt-3'>
            <Typography variant="body2" color="text.secondary" align="center" className='m-0 py-3' {...props}>
                {'Copyright © '}
                <Link color="inherit" to="https://github.com/Wobins" target="_blank">
                    Ange Wobinwo
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    );
}

export default Copyright;
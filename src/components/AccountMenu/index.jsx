import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Logout, PersonAdd, Settings, Login } from '@mui/icons-material';

const AccountMenu = (props) => {
    const { anchorEl, isLoggedIn, opened, onClick, onClose } = props;

    return (
        <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorEl}
            id="account-menu"
            open={opened}
            onClose={onClose}
            onClick={onClick}
            // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
        >
            {
                isLoggedIn ? (
                    [{action: "Parametres", url: "/parametres"}, {action: "Se deconnecter", url: "/inscription"}].map((el, index) => (
                        <MenuItem onClick={onClose} key={index}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <Link to={el.url}>{el.action}</Link>
                        </MenuItem>
                    ))
                ) : (
                        [{action: "Se connecter", url: "/connexion"}, {action: "S'inscrire", url: "/inscription"}].map((el, index) => (
                            <MenuItem onClick={onClose} key={index}>
                                <ListItemIcon>
                                    <Login fontSize="small" />
                                </ListItemIcon>
                                <Link to={el.url}>{el.action}</Link>
                            </MenuItem>
                        ))
                )

            }
        </Menu>
    );
}

export default AccountMenu;
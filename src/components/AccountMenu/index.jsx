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
                    <>
                        <MenuItem onClick={onClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <Link to="/parametres">Parametres</Link>
                        </MenuItem>
                        <MenuItem onClick={onClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Se deconnecter
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem onClick={onClose}>
                            <ListItemIcon>
                                <Login fontSize="small" />
                            </ListItemIcon>
                            <Link to="/connexion">Se connecter</Link>
                        </MenuItem>
                        <MenuItem onClick={onClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            <Link to="/inscription">S'inscrire</Link>
                        </MenuItem>
                    </>
                )

            }
        </Menu>
    );
}

export default AccountMenu;
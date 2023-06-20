import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Avatar,
    Tooltip,
    Menu,
    MenuItem
} from '@mui/material';
import { Auth } from 'aws-amplify';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import SubscriptionDialog from '../../components/SubscriptionDialog';
import LoginDialog from '../../components/LoginDialog';
import { listItems } from '../../utils/listItems';
import drawer from '../../utils/Drawer';
import appBar from '../../utils/AppBar';

const loggedOutOptions = ['Connexion'];
const loggedInOptions = ['Parametres', 'Se deconnecter'];

const MainLayout = (props) => {
    const {component} = props; 
    const Drawer = drawer;
    const AppBar = appBar;
    const mdTheme = createTheme();
    const [open, setOpen] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [admin, setAdmin] = React.useState(null);

    // Function to check if a user is logged in
    const checkUserLoggedIn = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setAdmin(user);
        } catch (error) {
            console.log('No user logged in');
        }
    };

    // Function to log out user
    const signOut = async () => {
        try {
          await Auth.signOut();
        } catch (error) {
          console.log('error signing out: ', error);
        }
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleShowLoginForm = () => {
        setShowLogin(true);
        setAnchorElUser(null); 
    }

    React.useEffect(() => {
        checkUserLoggedIn();
    }, []);

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                            pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                <Link to={`/`} className='text-white'>Portail GI LOGO</Link>
                            </Typography>
                            <Tooltip title="Profil">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {
                                        admin ? 
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> 
                                            : <Avatar src="/broken-image.jpg" />
                                    }
                                    
                                </IconButton>
                            </Tooltip>
                            {
                                admin ? 
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {loggedInOptions.map((setting) => (
                                            <MenuItem key={setting} onClick={signOut}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                : 
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {loggedOutOptions.map((setting) => (
                                            <MenuItem key={setting} onClick={handleShowLoginForm}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>

                            }
                        </Toolbar>
                    </AppBar>

                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {listItems}
                        </List>
                    </Drawer>

                    <Box
                        component="main"
                        sx={{
                        //     backgroundColor: (theme) =>
                        //     theme.palette.mode === 'light'
                        //         ? theme.palette.grey[100]
                        //         : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} style={{flex: 1}}>
                            <SubscriptionDialog />
                            { component }
                            {showLogin && <LoginDialog isOpened={showLogin} />}
                        </Container>
                        <Copyright sx={{ pt: 4 }} />
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}

export default MainLayout;












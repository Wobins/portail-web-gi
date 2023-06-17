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
    Avatar
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import AccountMenu from '../../components/AccountMenu'
import SubscriptionDialog from '../../components/SubscriptionDialog';
import { listItems } from '../../utils/listItems';
import drawer from '../../utils/Drawer';
import appBar from '../../utils/AppBar';

const MainLayout = (props) => {
    const {component} = props; 
    const Drawer = drawer;
    const AppBar = appBar;
    const mdTheme = createTheme();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
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
                        <IconButton color="inherit"
                            onClick={handleOpenUserMenu}
                            size="large"
                            sx={{ ml: 2, p: 0 }}
                            aria-label="account of current user"
                            aria-controls={Boolean(anchorElUser) ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorElUser) ? 'true' : undefined}
                        >
                            {
                                true ? (
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                ) : (
                                    <AccountCircle sx={{ width: 32, height: 32 }} />
                                )
                            }
                            <AccountMenu 
                                anchorEl={anchorElUser}
                                isLoggedIn={true}
                                opened={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                onClick={handleCloseUserMenu}
                            />
                        </IconButton>
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
                    </Container>
                    <Copyright sx={{ pt: 4 }} />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default MainLayout;












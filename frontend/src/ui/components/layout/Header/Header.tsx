import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <AppBar position="sticky" elevation={0} className="header-app-bar">
            <Container maxWidth="lg">
                <Toolbar disableGutters className="header-toolbar">
                    <Box component={Link} to="/" className="header-brand">
                        <Box className="header-brand-icon">
                            <RestaurantMenuIcon fontSize="small" />
                        </Box>

                        <Typography variant="h6" component="div" className="header-title">
                            Recipe Manager
                        </Typography>
                    </Box>

                    <Box className="header-nav">
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>

                        <Button color="inherit" component={Link} to="/recipes">
                            Recipes
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
import CategoryIcon from '@mui/icons-material/Category';
import ChecklistIcon from '@mui/icons-material/Checklist';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Stack spacing={4}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 7 },
                    borderRadius: 5,
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    background:
                        'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(227,242,253,0.88))',
                    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
                }}
            >
                <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: 76,
                            height: 76,
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            boxShadow: '0 14px 32px rgba(25, 118, 210, 0.28)',
                        }}
                    >
                        <RestaurantMenuIcon sx={{ fontSize: 42 }} />
                    </Box>

                    <Box>
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 800 }}>
                            Recipe Manager
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ maxWidth: 760, mt: 1 }}
                        >
                            A full-stack application for managing recipes, categories,
                            ingredients, and cooking instructions.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/recipes"
                    >
                        Explore Recipes
                    </Button>
                </Stack>
            </Paper>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        backgroundColor: 'rgba(255,255,255,0.92)',
                    }}
                >
                    <Stack spacing={2}>
                        <RestaurantMenuIcon color="primary" />

                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Recipe CRUD
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Add, edit, view, and delete recipes through a clean user interface.
                        </Typography>
                    </Stack>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        backgroundColor: 'rgba(255,255,255,0.92)',
                    }}
                >
                    <Stack spacing={2}>
                        <CategoryIcon color="primary" />

                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Categories
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Recipes are organized by category for easier browsing and filtering.
                        </Typography>
                    </Stack>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        backgroundColor: 'rgba(255,255,255,0.92)',
                    }}
                >
                    <Stack spacing={2}>
                        <ChecklistIcon color="primary" />

                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Full-stack flow
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            React frontend communicates with a Spring Boot REST API and
                            PostgreSQL database.
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Stack>
    );
};

export default HomePage;
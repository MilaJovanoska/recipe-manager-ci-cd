import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import useRecipeDetails from '../../../../hooks/useRecipeDetails.ts';
import './RecipeDetailsPage.css';

const RecipeDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const recipeId = id ? Number(id) : undefined;
    const validRecipeId =
        recipeId !== undefined && !Number.isNaN(recipeId) ? recipeId : undefined;

    const { recipe, loading } = useRecipeDetails(validRecipeId);

    if (!validRecipeId) {
        return (
            <Paper elevation={1} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Invalid recipe id.
                </Typography>

                <Button component={Link} to="/recipes" startIcon={<ArrowBackIcon />}>
                    Back to Recipes
                </Button>
            </Paper>
        );
    }

    if (loading) {
        return (
            <Box className="recipe-details-loading">
                <CircularProgress />
            </Box>
        );
    }

    if (!recipe) {
        return (
            <Paper elevation={1} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Recipe was not found.
                </Typography>

                <Button component={Link} to="/recipes" startIcon={<ArrowBackIcon />}>
                    Back to Recipes
                </Button>
            </Paper>
        );
    }

    return (
        <Stack spacing={3}>
            <Button
                component={Link}
                to="/recipes"
                startIcon={<ArrowBackIcon />}
                sx={{ alignSelf: 'flex-start' }}
            >
                Back to Recipes
            </Button>

            <Paper elevation={2} className="recipe-details-page">
                {recipe.imageUrl ? (
                    <Box
                        component="img"
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="recipe-details-image"
                    />
                ) : (
                    <Box className="recipe-details-image-placeholder">
                        <RestaurantMenuIcon sx={{ fontSize: 80 }} />
                    </Box>
                )}

                <Box className="recipe-details-content">
                    <Typography variant="h3" component="h1" gutterBottom>
                        {recipe.name}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {recipe.description}
                    </Typography>

                    <Box className="recipe-details-chips">
                        <Chip label={recipe.category.name} color="primary" />
                        <Chip label={recipe.difficulty} />
                        <Chip label={`${recipe.preparationTime} min`} />
                        <Chip label={`${recipe.servings} servings`} />
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Ingredients
                        </Typography>

                        <Typography className="recipe-details-text">
                            {recipe.ingredients}
                        </Typography>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Instructions
                        </Typography>

                        <Typography className="recipe-details-text">
                            {recipe.instructions}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Stack>
    );
};

export default RecipeDetailsPage;
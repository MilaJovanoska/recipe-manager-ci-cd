import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import type { RecipeResponse } from '../../../../api/types/recipe.ts';
import './RecipeCard.css';

interface RecipeCardProps {
    recipe: RecipeResponse;
    categoryName: string;
    onEdit: (recipe: RecipeResponse) => void;
    onDelete: (recipe: RecipeResponse) => void;
}

const RecipeCard = ({
                        recipe,
                        categoryName,
                        onEdit,
                        onDelete,
                    }: RecipeCardProps) => {
    return (
        <Card elevation={0} className="recipe-card">
            {recipe.imageUrl ? (
                <CardMedia
                    component="img"
                    className="recipe-card-image"
                    image={recipe.imageUrl}
                    alt={recipe.name}
                />
            ) : (
                <Box className="recipe-card-image-placeholder">
                    <RestaurantMenuIcon sx={{ fontSize: 64 }} />
                </Box>
            )}

            <CardContent className="recipe-card-content">
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="h6" component="h2" className="recipe-card-title">
                            {recipe.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="recipe-card-description"
                        >
                            {recipe.description}
                        </Typography>
                    </Box>

                    <Box className="recipe-card-chips">
                        <Chip
                            label={categoryName}
                            size="small"
                            className="recipe-card-chip-category"
                        />

                        <Chip
                            label={recipe.difficulty}
                            size="small"
                            className="recipe-card-chip"
                        />

                        <Chip
                            label={`${recipe.preparationTime} min`}
                            size="small"
                            className="recipe-card-chip"
                        />

                        <Chip
                            label={`${recipe.servings} servings`}
                            size="small"
                            className="recipe-card-chip"
                        />
                    </Box>
                </Stack>
            </CardContent>

            <CardActions className="recipe-card-actions">
                <Button
                    size="small"
                    variant="contained"
                    component={Link}
                    to={`/recipes/${recipe.id}`}
                    className="recipe-card-button recipe-card-button-details"
                >
                    Details
                </Button>

                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(recipe)}
                    className="recipe-card-button recipe-card-button-edit"
                >
                    Edit
                </Button>

                <Button
                    size="small"
                    color="error"
                    onClick={() => onDelete(recipe)}
                    className="recipe-card-button recipe-card-button-delete"
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default RecipeCard;
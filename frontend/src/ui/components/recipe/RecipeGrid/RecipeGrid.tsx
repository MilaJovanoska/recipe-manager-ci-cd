import { Box, Paper, Typography } from '@mui/material';
import type { RecipeResponse } from '../../../../api/types/recipe.ts';
import RecipeCard from '../RecipeCard/RecipeCard.tsx';

interface RecipeGridProps {
    recipes: RecipeResponse[];
    categoryNamesById: Map<number, string>;
    onEdit: (recipe: RecipeResponse) => void;
    onDelete: (recipe: RecipeResponse) => void;
}

const RecipeGrid = ({
                        recipes,
                        categoryNamesById,
                        onEdit,
                        onDelete,
                    }: RecipeGridProps) => {
    if (recipes.length === 0) {
        return (
            <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
                <Typography variant="h6">No recipes found.</Typography>
                <Typography variant="body2" color="text.secondary">
                    Try changing the search term or category filter.
                </Typography>
            </Paper>
        );
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                },
                gap: 3,
                alignItems: 'stretch',
            }}
        >
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    categoryName={categoryNamesById.get(recipe.categoryId) ?? 'Category'}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    );
};

export default RecipeGrid;
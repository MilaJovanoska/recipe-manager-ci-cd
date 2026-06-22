import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import type {
    CreateOrUpdateRecipeRequest,
    RecipeResponse,
} from '../../../../api/types/recipe.ts';
import useCategories from '../../../../hooks/useCategories.ts';
import useRecipes from '../../../../hooks/useRecipes.ts';
import AddOrEditRecipeDialog from '../../../components/recipe/AddOrEditRecipeDialog/AddOrEditRecipeDialog.tsx';
import DeleteRecipeDialog from '../../../components/recipe/DeleteRecipeDialog/DeleteRecipeDialog.tsx';
import RecipeGrid from '../../../components/recipe/RecipeGrid/RecipeGrid.tsx';
import './RecipesPage.css';

const RecipesPage = () => {
    const { recipes, loading, fetchRecipes, onAdd, onEdit, onDelete } =
        useRecipes();

    const { categories } = useCategories();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

    const [addOrEditDialogOpen, setAddOrEditDialogOpen] =
        useState<boolean>(false);
    const [selectedRecipe, setSelectedRecipe] =
        useState<RecipeResponse | null>(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [recipeToDelete, setRecipeToDelete] =
        useState<RecipeResponse | null>(null);

    const categoryNamesById = useMemo<Map<number, string>>(() => {
        return new Map<number, string>(
            categories.map((category) => [category.id, category.name]),
        );
    }, [categories]);

    const filteredRecipes = useMemo<RecipeResponse[]>(() => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        return recipes.filter((recipe) => {
            const categoryName = categoryNamesById.get(recipe.categoryId) ?? '';

            const matchesSearch =
                normalizedSearchTerm.length === 0 ||
                recipe.name.toLowerCase().includes(normalizedSearchTerm) ||
                recipe.description.toLowerCase().includes(normalizedSearchTerm) ||
                recipe.difficulty.toLowerCase().includes(normalizedSearchTerm) ||
                categoryName.toLowerCase().includes(normalizedSearchTerm);

            const matchesCategory =
                selectedCategoryId === 0 || recipe.categoryId === selectedCategoryId;

            return matchesSearch && matchesCategory;
        });
    }, [recipes, searchTerm, selectedCategoryId, categoryNamesById]);

    const handleOpenAddDialog = () => {
        setSelectedRecipe(null);
        setAddOrEditDialogOpen(true);
    };

    const handleOpenEditDialog = (recipe: RecipeResponse) => {
        setSelectedRecipe(recipe);
        setAddOrEditDialogOpen(true);
    };

    const handleCloseAddOrEditDialog = () => {
        setAddOrEditDialogOpen(false);
        setSelectedRecipe(null);
    };

    const handleSubmitRecipe = async (recipe: CreateOrUpdateRecipeRequest) => {
        if (selectedRecipe) {
            await onEdit(selectedRecipe.id, recipe);
        } else {
            await onAdd(recipe);
        }

        handleCloseAddOrEditDialog();
    };

    const handleOpenDeleteDialog = (recipe: RecipeResponse) => {
        setRecipeToDelete(recipe);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setRecipeToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!recipeToDelete) {
            return;
        }

        await onDelete(recipeToDelete.id);
        handleCloseDeleteDialog();
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategoryId(0);
    };

    return (
        <>
            <Stack spacing={3}>
                <Paper elevation={0} className="recipes-page-hero">
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            className="recipes-page-title"
                        >
                            Recipes
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            className="recipes-page-subtitle"
                        >
                            View, add, edit, and delete recipes. Search by name, category, or
                            difficulty.
                        </Typography>

                        <Typography variant="body2" className="recipes-page-count-inline">
                            Showing {filteredRecipes.length} of {recipes.length} recipes
                        </Typography>
                    </Box>

                    <Box className="recipes-page-hero-actions">
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={() => void fetchRecipes()}
                        >
                            Refresh
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddDialog}
                        >
                            Add Recipe
                        </Button>
                    </Box>
                </Paper>

                <Paper elevation={0} className="recipes-page-filters">
                    <TextField
                        label="Search recipes"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        fullWidth
                        className="recipes-page-search"
                    />

                    <TextField
                        label="Category"
                        value={selectedCategoryId}
                        onChange={(event) =>
                            setSelectedCategoryId(Number(event.target.value))
                        }
                        select
                        fullWidth
                        className="recipes-page-category-filter"
                    >
                        <MenuItem value={0}>All categories</MenuItem>

                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="text" onClick={handleClearFilters}>
                        Clear
                    </Button>
                </Paper>

                {loading ? (
                    <Box className="recipes-page-loading">
                        <CircularProgress />
                    </Box>
                ) : (
                    <RecipeGrid
                        recipes={filteredRecipes}
                        categoryNamesById={categoryNamesById}
                        onEdit={handleOpenEditDialog}
                        onDelete={handleOpenDeleteDialog}
                    />
                )}
            </Stack>

            {addOrEditDialogOpen && (
                <AddOrEditRecipeDialog
                    key={selectedRecipe?.id ?? 'add'}
                    open={addOrEditDialogOpen}
                    recipe={selectedRecipe}
                    onClose={handleCloseAddOrEditDialog}
                    onSubmit={handleSubmitRecipe}
                />
            )}

            <DeleteRecipeDialog
                open={deleteDialogOpen}
                recipe={recipeToDelete}
                onClose={handleCloseDeleteDialog}
                onDelete={handleConfirmDelete}
            />
        </>
    );
};

export default RecipesPage;
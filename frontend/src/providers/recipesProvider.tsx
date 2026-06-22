import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import recipeApi from '../api/recipeApi.ts';
import type {
    CreateOrUpdateRecipeRequest,
    RecipeResponse,
} from '../api/types/recipe.ts';
import RecipesContext from '../contexts/recipesContext.ts';
import useSnackbar from '../hooks/useSnackbar.ts';

const RecipesProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { showSnackbar } = useSnackbar();

    const fetchRecipes = useCallback(async () => {
        setLoading(true);

        try {
            const response = await recipeApi.findAll();
            setRecipes(response.data);
        } catch {
            showSnackbar('Failed to load recipes.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    useEffect(() => {
        let active = true;

        const loadRecipes = async () => {
            try {
                const response = await recipeApi.findAll();

                if (active) {
                    setRecipes(response.data);
                }
            } catch {
                if (active) {
                    showSnackbar('Failed to load recipes.', 'error');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        void loadRecipes();

        return () => {
            active = false;
        };
    }, [showSnackbar]);

    const onAdd = useCallback(
        async (recipe: CreateOrUpdateRecipeRequest) => {
            try {
                await recipeApi.create(recipe);
                showSnackbar('Recipe added successfully.', 'success');
                await fetchRecipes();
            } catch {
                showSnackbar('Failed to add recipe.', 'error');
            }
        },
        [fetchRecipes, showSnackbar],
    );

    const onEdit = useCallback(
        async (id: number, recipe: CreateOrUpdateRecipeRequest) => {
            try {
                await recipeApi.update(id, recipe);
                showSnackbar('Recipe updated successfully.', 'success');
                await fetchRecipes();
            } catch {
                showSnackbar('Failed to update recipe.', 'error');
            }
        },
        [fetchRecipes, showSnackbar],
    );

    const onDelete = useCallback(
        async (id: number) => {
            try {
                await recipeApi.delete(id);
                showSnackbar('Recipe deleted successfully.', 'success');
                await fetchRecipes();
            } catch {
                showSnackbar('Failed to delete recipe.', 'error');
            }
        },
        [fetchRecipes, showSnackbar],
    );

    const value = useMemo(
        () => ({
            recipes,
            loading,
            fetchRecipes,
            onAdd,
            onEdit,
            onDelete,
        }),
        [recipes, loading, fetchRecipes, onAdd, onEdit, onDelete],
    );

    return (
        <RecipesContext.Provider value={value}>
            {children}
        </RecipesContext.Provider>
    );
};

export default RecipesProvider;
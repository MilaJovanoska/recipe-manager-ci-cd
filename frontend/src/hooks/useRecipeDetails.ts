import { useCallback, useEffect, useState } from 'react';
import recipeApi from '../api/recipeApi.ts';
import type { RecipeDetailsResponse } from '../api/types/recipe.ts';
import useSnackbar from './useSnackbar.ts';

interface UseRecipeDetailsResult {
    recipe: RecipeDetailsResponse | null;
    loading: boolean;
    fetchRecipe: () => Promise<void>;
}

const useRecipeDetails = (id: number | undefined): UseRecipeDetailsResult => {
    const [recipe, setRecipe] = useState<RecipeDetailsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(Boolean(id));

    const { showSnackbar } = useSnackbar();

    const fetchRecipe = useCallback(async () => {
        if (id === undefined) {
            return;
        }

        setLoading(true);

        try {
            const response = await recipeApi.findWithDetailsById(id);
            setRecipe(response.data);
        } catch {
            showSnackbar('Failed to load recipe details.', 'error');
        } finally {
            setLoading(false);
        }
    }, [id, showSnackbar]);

    useEffect(() => {
        if (id === undefined) {
            return;
        }

        let active = true;

        const loadRecipe = async () => {
            setLoading(true);

            try {
                const response = await recipeApi.findWithDetailsById(id);

                if (active) {
                    setRecipe(response.data);
                }
            } catch {
                if (active) {
                    showSnackbar('Failed to load recipe details.', 'error');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        void loadRecipe();

        return () => {
            active = false;
        };
    }, [id, showSnackbar]);

    return {
        recipe,
        loading,
        fetchRecipe,
    };
};

export default useRecipeDetails;
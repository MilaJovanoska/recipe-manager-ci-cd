import { createContext } from 'react';
import type {
    CreateOrUpdateRecipeRequest,
    RecipeResponse,
} from '../api/types/recipe.ts';

export interface RecipesContextType {
    recipes: RecipeResponse[];
    loading: boolean;
    fetchRecipes: () => Promise<void>;
    onAdd: (recipe: CreateOrUpdateRecipeRequest) => Promise<void>;
    onEdit: (id: number, recipe: CreateOrUpdateRecipeRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const RecipesContext = createContext<RecipesContextType>({} as RecipesContextType);

export default RecipesContext;
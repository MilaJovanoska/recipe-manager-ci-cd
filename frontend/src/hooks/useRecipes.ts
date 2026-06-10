import { useContext } from 'react';
import RecipesContext, { type RecipesContextType } from '../contexts/recipesContext.ts';

const useRecipes = () => useContext<RecipesContextType>(RecipesContext);

export default useRecipes;
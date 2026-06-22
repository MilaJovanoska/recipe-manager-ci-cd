import axiosInstance from '../axios/axios.ts';
import type {
    CreateOrUpdateRecipeRequest,
    RecipeDetailsResponse,
    RecipeResponse,
} from './types/recipe.ts';

const recipeApi = {
    findAll: async () => {
        return await axiosInstance.get<RecipeResponse[]>('/recipes');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<RecipeResponse>(`/recipes/${id}`);
    },

    findWithDetailsById: async (id: number) => {
        return await axiosInstance.get<RecipeDetailsResponse>(`/recipes/${id}/details`);
    },

    create: async (recipe: CreateOrUpdateRecipeRequest) => {
        return await axiosInstance.post<RecipeDetailsResponse>('/recipes', recipe);
    },

    update: async (id: number, recipe: CreateOrUpdateRecipeRequest) => {
        return await axiosInstance.put<RecipeDetailsResponse>(`/recipes/${id}`, recipe);
    },

    delete: async (id: number) => {
        return await axiosInstance.delete<RecipeDetailsResponse>(`/recipes/${id}`);
    },
};

export default recipeApi;
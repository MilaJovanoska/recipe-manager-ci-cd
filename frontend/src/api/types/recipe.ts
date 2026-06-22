import type { CategoryResponse } from './category.ts';

export type RecipeDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface RecipeResponse {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    preparationTime: number;
    difficulty: RecipeDifficulty;
    servings: number;
    imageUrl?: string;
}

export interface RecipeDetailsResponse {
    id: number;
    name: string;
    description: string;
    category: CategoryResponse;
    preparationTime: number;
    difficulty: RecipeDifficulty;
    servings: number;
    ingredients: string;
    instructions: string;
    imageUrl?: string;
}

export interface CreateOrUpdateRecipeRequest {
    name: string;
    description: string;
    categoryId: number;
    preparationTime: number;
    difficulty: RecipeDifficulty;
    servings: number;
    ingredients: string;
    instructions: string;
    imageUrl?: string;
}
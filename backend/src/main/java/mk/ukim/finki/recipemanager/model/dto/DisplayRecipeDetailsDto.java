package mk.ukim.finki.recipemanager.model.dto;

import mk.ukim.finki.recipemanager.model.domain.Recipe;
import mk.ukim.finki.recipemanager.model.enumerations.RecipeDifficulty;

public record DisplayRecipeDetailsDto(
        Long id,
        String name,
        String description,
        DisplayCategoryDto category,
        Integer preparationTime,
        RecipeDifficulty difficulty,
        Integer servings,
        String ingredients,
        String instructions,
        String imageUrl
) {

    public static DisplayRecipeDetailsDto from(Recipe recipe) {
        return new DisplayRecipeDetailsDto(
                recipe.getId(),
                recipe.getName(),
                recipe.getDescription(),
                DisplayCategoryDto.from(recipe.getCategory()),
                recipe.getPreparationTime(),
                recipe.getDifficulty(),
                recipe.getServings(),
                recipe.getIngredients(),
                recipe.getInstructions(),
                recipe.getImageUrl()
        );
    }
}
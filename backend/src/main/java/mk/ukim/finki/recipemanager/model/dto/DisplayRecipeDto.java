package mk.ukim.finki.recipemanager.model.dto;

import java.util.List;

import mk.ukim.finki.recipemanager.model.domain.Recipe;
import mk.ukim.finki.recipemanager.model.enumerations.RecipeDifficulty;

public record DisplayRecipeDto(
        Long id,
        String name,
        String description,
        Long categoryId,
        Integer preparationTime,
        RecipeDifficulty difficulty,
        Integer servings,
        String imageUrl
) {

    public static DisplayRecipeDto from(Recipe recipe) {
        return new DisplayRecipeDto(
                recipe.getId(),
                recipe.getName(),
                recipe.getDescription(),
                recipe.getCategory().getId(),
                recipe.getPreparationTime(),
                recipe.getDifficulty(),
                recipe.getServings(),
                recipe.getImageUrl()
        );
    }

    public static List<DisplayRecipeDto> from(List<Recipe> recipes) {
        return recipes.stream()
                .map(DisplayRecipeDto::from)
                .toList();
    }
}
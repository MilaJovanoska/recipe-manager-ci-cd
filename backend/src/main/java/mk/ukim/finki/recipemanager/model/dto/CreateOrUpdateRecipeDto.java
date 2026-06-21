package mk.ukim.finki.recipemanager.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import mk.ukim.finki.recipemanager.model.domain.Category;
import mk.ukim.finki.recipemanager.model.domain.Recipe;
import mk.ukim.finki.recipemanager.model.enumerations.RecipeDifficulty;

public record CreateOrUpdateRecipeDto(
        @NotBlank(message = "Recipe name is required.")
        @Size(min = 2, max = 100, message = "Recipe name must be between 2 and 100 characters.")
        String name,

        @NotBlank(message = "Recipe description is required.")
        @Size(min = 10, max = 500, message = "Recipe description must be between 10 and 500 characters.")
        String description,

        @NotNull(message = "Recipe category is required.")
        @Min(value = 1, message = "Recipe category id must be at least 1.")
        Long categoryId,

        @NotNull(message = "Preparation time is required.")
        @Min(value = 1, message = "Preparation time must be at least 1 minute.")
        @Max(value = 1440, message = "Preparation time must not exceed 1440 minutes.")
        Integer preparationTime,

        @NotNull(message = "Recipe difficulty is required.")
        RecipeDifficulty difficulty,

        @NotNull(message = "Number of servings is required.")
        @Min(value = 1, message = "Number of servings must be at least 1.")
        @Max(value = 100, message = "Number of servings must not exceed 100.")
        Integer servings,

        @NotBlank(message = "Ingredients are required.")
        @Size(min = 10, max = 5000, message = "Ingredients must be between 10 and 5000 characters.")
        String ingredients,

        @NotBlank(message = "Instructions are required.")
        @Size(min = 20, max = 10000, message = "Instructions must be between 20 and 10000 characters.")
        String instructions,

        @Size(max = 2048, message = "Image URL must not exceed 2048 characters.")
        String imageUrl
) {

        public Recipe toRecipe(Category category) {
                return new Recipe(
                        name,
                        description,
                        category,
                        preparationTime,
                        difficulty,
                        servings,
                        ingredients,
                        instructions,
                        imageUrl
                );
        }
}
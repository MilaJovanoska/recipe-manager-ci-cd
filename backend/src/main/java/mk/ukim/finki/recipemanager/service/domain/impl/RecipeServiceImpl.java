package mk.ukim.finki.recipemanager.service.domain.impl;

import mk.ukim.finki.recipemanager.model.domain.Recipe;
import mk.ukim.finki.recipemanager.repository.RecipeRepository;
import mk.ukim.finki.recipemanager.service.domain.RecipeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    public Optional<Recipe> findById(Long id) {
        return this.recipeRepository.findById(id);
    }

    @Override
    public List<Recipe> findAll() {
        return this.recipeRepository.findAll();
    }

    @Override
    public Recipe create(Recipe recipe) {
        return this.recipeRepository.save(recipe);
    }

    @Override
    public Optional<Recipe> update(Long id, Recipe recipe) {
        return this.recipeRepository.findById(id)
                .map(existingRecipe -> {
                    existingRecipe.setName(recipe.getName());
                    existingRecipe.setDescription(recipe.getDescription());
                    existingRecipe.setCategory(recipe.getCategory());
                    existingRecipe.setPreparationTime(recipe.getPreparationTime());
                    existingRecipe.setDifficulty(recipe.getDifficulty());
                    existingRecipe.setServings(recipe.getServings());
                    existingRecipe.setIngredients(recipe.getIngredients());
                    existingRecipe.setInstructions(recipe.getInstructions());
                    existingRecipe.setImageUrl(recipe.getImageUrl());

                    return this.recipeRepository.save(existingRecipe);
                });
    }

    @Override
    public Optional<Recipe> deleteById(Long id) {
        Optional<Recipe> recipe = this.recipeRepository.findById(id);
        recipe.ifPresent(this.recipeRepository::delete);
        return recipe;
    }
}
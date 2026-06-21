package mk.ukim.finki.recipemanager.service.domain;

import mk.ukim.finki.recipemanager.model.domain.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeService {

    Optional<Recipe> findById(Long id);

    List<Recipe> findAll();

    Recipe create(Recipe recipe);

    Optional<Recipe> update(Long id, Recipe recipe);

    Optional<Recipe> deleteById(Long id);
}
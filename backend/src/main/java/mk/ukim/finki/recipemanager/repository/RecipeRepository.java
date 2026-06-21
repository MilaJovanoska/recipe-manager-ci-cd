package mk.ukim.finki.recipemanager.repository;

import mk.ukim.finki.recipemanager.model.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
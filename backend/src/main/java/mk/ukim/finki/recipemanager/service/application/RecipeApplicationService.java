package mk.ukim.finki.recipemanager.service.application;

import java.util.List;
import java.util.Optional;

import mk.ukim.finki.recipemanager.model.dto.CreateOrUpdateRecipeDto;
import mk.ukim.finki.recipemanager.model.dto.DisplayRecipeDetailsDto;
import mk.ukim.finki.recipemanager.model.dto.DisplayRecipeDto;

public interface RecipeApplicationService {

    Optional<DisplayRecipeDto> findById(Long id);

    Optional<DisplayRecipeDetailsDto> findByIdWithDetails(Long id);

    List<DisplayRecipeDto> findAll();

    DisplayRecipeDetailsDto create(CreateOrUpdateRecipeDto recipeDto);

    Optional<DisplayRecipeDetailsDto> update(Long id, CreateOrUpdateRecipeDto recipeDto);

    Optional<DisplayRecipeDetailsDto> deleteById(Long id);
}
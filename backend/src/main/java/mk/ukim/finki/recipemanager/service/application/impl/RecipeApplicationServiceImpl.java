package mk.ukim.finki.recipemanager.service.application.impl;

import mk.ukim.finki.recipemanager.model.domain.Category;
import mk.ukim.finki.recipemanager.model.dto.CreateOrUpdateRecipeDto;
import mk.ukim.finki.recipemanager.model.dto.DisplayRecipeDetailsDto;
import mk.ukim.finki.recipemanager.model.dto.DisplayRecipeDto;
import mk.ukim.finki.recipemanager.model.exception.CategoryNotFoundException;
import mk.ukim.finki.recipemanager.service.application.RecipeApplicationService;
import mk.ukim.finki.recipemanager.service.domain.CategoryService;
import mk.ukim.finki.recipemanager.service.domain.RecipeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeApplicationServiceImpl implements RecipeApplicationService {

    private final RecipeService recipeService;
    private final CategoryService categoryService;

    public RecipeApplicationServiceImpl(RecipeService recipeService, CategoryService categoryService) {
        this.recipeService = recipeService;
        this.categoryService = categoryService;
    }

    @Override
    public Optional<DisplayRecipeDto> findById(Long id) {
        return this.recipeService.findById(id)
                .map(DisplayRecipeDto::from);
    }

    @Override
    public Optional<DisplayRecipeDetailsDto> findByIdWithDetails(Long id) {
        return this.recipeService.findById(id)
                .map(DisplayRecipeDetailsDto::from);
    }

    @Override
    public List<DisplayRecipeDto> findAll() {
        return DisplayRecipeDto.from(this.recipeService.findAll());
    }

    @Override
    public DisplayRecipeDetailsDto create(CreateOrUpdateRecipeDto recipeDto) {
        Category category = this.categoryService.findById(recipeDto.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(recipeDto.categoryId()));

        return DisplayRecipeDetailsDto.from(
                this.recipeService.create(recipeDto.toRecipe(category))
        );
    }

    @Override
    public Optional<DisplayRecipeDetailsDto> update(Long id, CreateOrUpdateRecipeDto recipeDto) {
        Category category = this.categoryService.findById(recipeDto.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(recipeDto.categoryId()));

        return this.recipeService.update(id, recipeDto.toRecipe(category))
                .map(DisplayRecipeDetailsDto::from);
    }

    @Override
    public Optional<DisplayRecipeDetailsDto> deleteById(Long id) {
        return this.recipeService.deleteById(id)
                .map(DisplayRecipeDetailsDto::from);
    }
}
package mk.ukim.finki.recipemanager.service.application.impl;

import mk.ukim.finki.recipemanager.model.dto.DisplayCategoryDto;
import mk.ukim.finki.recipemanager.service.application.CategoryApplicationService;
import mk.ukim.finki.recipemanager.service.domain.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryApplicationServiceImpl implements CategoryApplicationService {

    private final CategoryService categoryService;

    public CategoryApplicationServiceImpl(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public Optional<DisplayCategoryDto> findById(Long id) {
        return this.categoryService.findById(id)
                .map(DisplayCategoryDto::from);
    }

    @Override
    public List<DisplayCategoryDto> findAll() {
        return DisplayCategoryDto.from(this.categoryService.findAll());
    }
}
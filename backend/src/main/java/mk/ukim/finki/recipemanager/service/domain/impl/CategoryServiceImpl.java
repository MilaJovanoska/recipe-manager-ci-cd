package mk.ukim.finki.recipemanager.service.domain.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.recipemanager.model.domain.Category;
import mk.ukim.finki.recipemanager.repository.CategoryRepository;
import mk.ukim.finki.recipemanager.service.domain.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Optional<Category> findById(Long id) {
        return this.categoryRepository.findById(id);
    }

    @Override
    public List<Category> findAll() {
        return this.categoryRepository.findAll();
    }
}
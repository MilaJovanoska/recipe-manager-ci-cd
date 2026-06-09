package mk.ukim.finki.recipemanager.service.domain;

import mk.ukim.finki.recipemanager.model.domain.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    Optional<Category> findById(Long id);

    List<Category> findAll();
}
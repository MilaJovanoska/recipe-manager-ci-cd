package mk.ukim.finki.recipemanager.service.application;

import mk.ukim.finki.recipemanager.model.dto.DisplayCategoryDto;

import java.util.List;
import java.util.Optional;

public interface CategoryApplicationService {

    Optional<DisplayCategoryDto> findById(Long id);

    List<DisplayCategoryDto> findAll();
}
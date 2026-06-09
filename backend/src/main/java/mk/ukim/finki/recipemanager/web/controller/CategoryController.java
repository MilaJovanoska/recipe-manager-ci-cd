package mk.ukim.finki.recipemanager.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.recipemanager.model.dto.DisplayCategoryDto;
import mk.ukim.finki.recipemanager.service.application.CategoryApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryApplicationService categoryApplicationService;

    public CategoryController(CategoryApplicationService categoryApplicationService) {
        this.categoryApplicationService = categoryApplicationService;
    }

    @GetMapping
    public ResponseEntity<List<DisplayCategoryDto>> findAll() {
        return ResponseEntity.ok(this.categoryApplicationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayCategoryDto> findById(@PathVariable Long id) {
        return this.categoryApplicationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
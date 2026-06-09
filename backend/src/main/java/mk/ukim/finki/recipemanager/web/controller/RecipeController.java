package mk.ukim.finki.recipemanager.web.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.recipemanager.model.dto.CreateOrUpdateRecipeDto;
import mk.ukim.finki.recipemanager.model.dto.DisplayRecipeDetailsDto;
import mk.ukim.finki.recipemanager.model.dto.DisplayRecipeDto;
import mk.ukim.finki.recipemanager.service.application.RecipeApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeApplicationService recipeApplicationService;

    public RecipeController(RecipeApplicationService recipeApplicationService) {
        this.recipeApplicationService = recipeApplicationService;
    }

    @GetMapping
    public ResponseEntity<List<DisplayRecipeDto>> findAll() {
        return ResponseEntity.ok(this.recipeApplicationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayRecipeDto> findById(@PathVariable Long id) {
        return this.recipeApplicationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<DisplayRecipeDetailsDto> findByIdWithDetails(@PathVariable Long id) {
        return this.recipeApplicationService.findByIdWithDetails(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DisplayRecipeDetailsDto> create(@Valid @RequestBody CreateOrUpdateRecipeDto recipeDto) {
        return ResponseEntity.ok(this.recipeApplicationService.create(recipeDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DisplayRecipeDetailsDto> update(@PathVariable Long id,
                                                          @Valid @RequestBody CreateOrUpdateRecipeDto createOrUpdateRecipeDto) {
        return this.recipeApplicationService.update(id, createOrUpdateRecipeDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DisplayRecipeDetailsDto> deleteById(@PathVariable Long id) {
        return this.recipeApplicationService.deleteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
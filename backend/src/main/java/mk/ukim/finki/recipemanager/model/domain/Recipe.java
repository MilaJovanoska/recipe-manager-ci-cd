package mk.ukim.finki.recipemanager.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.recipemanager.model.enumerations.RecipeDifficulty;

@Entity
@Table(name = "recipes")
@Getter
@Setter
@NoArgsConstructor
public class Recipe extends BaseAuditableEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 500)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "preparation_time", nullable = false)
    private Integer preparationTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecipeDifficulty difficulty;

    @Column(nullable = false)
    private Integer servings;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String ingredients;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String instructions;

    @Column(name = "image_url", length = 2048)
    private String imageUrl;

    public Recipe(String name,
                  String description,
                  Category category,
                  Integer preparationTime,
                  RecipeDifficulty difficulty,
                  Integer servings,
                  String ingredients,
                  String instructions,
                  String imageUrl) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.preparationTime = preparationTime;
        this.difficulty = difficulty;
        this.servings = servings;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.imageUrl = imageUrl;
    }
}
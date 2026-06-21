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

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe extends BaseAuditableEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 2000)
    private String ingredients;

    @Column(nullable = false, length = 5000)
    private String instructions;

    @Column(nullable = false)
    private Integer preparationTime;

    @Column(nullable = false)
    private Integer servings;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RecipeDifficulty difficulty;

    @Column(length = 500)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public Recipe(
            String name,
            String ingredients,
            String instructions,
            Integer preparationTime,
            Integer servings,
            RecipeDifficulty difficulty,
            String imageUrl,
            Category category
    ) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.preparationTime = preparationTime;
        this.servings = servings;
        this.difficulty = difficulty;
        this.imageUrl = imageUrl;
        this.category = category;
    }
}
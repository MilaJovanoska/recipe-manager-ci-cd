package mk.ukim.finki.recipemanager.repository;

import mk.ukim.finki.recipemanager.model.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
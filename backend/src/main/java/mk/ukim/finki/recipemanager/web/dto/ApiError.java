package mk.ukim.finki.recipemanager.web.dto;

import org.springframework.http.HttpStatus;

public record ApiError(
        HttpStatus status,
        String message
) {

    public static ApiError of(HttpStatus status, String message) {
        return new ApiError(status, message);
    }
}
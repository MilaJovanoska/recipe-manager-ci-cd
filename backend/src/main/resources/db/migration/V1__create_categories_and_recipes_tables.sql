CREATE TABLE categories
(
    id          BIGSERIAL PRIMARY KEY,
    created_at  TIMESTAMP    NOT NULL,
    updated_at  TIMESTAMP,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500) NOT NULL
);

CREATE TABLE recipes
(
    id               BIGSERIAL PRIMARY KEY,
    created_at       TIMESTAMP     NOT NULL,
    updated_at       TIMESTAMP,
    name             VARCHAR(100)  NOT NULL,
    description      VARCHAR(500)  NOT NULL,
    category_id      BIGINT        NOT NULL,
    preparation_time INTEGER       NOT NULL,
    difficulty       VARCHAR(50)   NOT NULL,
    servings         INTEGER       NOT NULL,
    ingredients      TEXT          NOT NULL,
    instructions     TEXT          NOT NULL,
    image_url        VARCHAR(2048),

    CONSTRAINT fk_recipes_category
        FOREIGN KEY (category_id)
            REFERENCES categories (id),

    CONSTRAINT chk_recipes_preparation_time
        CHECK (preparation_time BETWEEN 1 AND 1440),

    CONSTRAINT chk_recipes_servings
        CHECK (servings BETWEEN 1 AND 100),

    CONSTRAINT chk_recipes_difficulty
        CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD'))
);
CREATE TABLE
        IF NOT EXISTS product(
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR (50) NOT NULL,
                price DECIMAL NOT NULL,
                brand VARCHAR (50) NOT NULL,
                status VARCHAR (20) NOT NULL,
                nicotin DECIMAL NOT NULL,
                is_deleted BOOLEAN DEFAULT false,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL
)
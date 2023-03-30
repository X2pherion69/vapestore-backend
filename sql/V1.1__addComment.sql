CREATE TABLE Comment
(
    id BIGSERIAL PRIMARY KEY,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    username VARCHAR(20) NOT NULL,
    comment VARCHAR(50) NOT NULL,
    product_id BIGSERIAL,
    CONSTRAINT fk_Comment_Product FOREIGN KEY(product_id) REFERENCES Product(id)
);
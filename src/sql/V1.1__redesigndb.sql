DROP TABLE product;
CREATE TABLE product
(
    product_id BIGSERIAL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL DEFAULT 0,
    comment JSON,
    type VARCHAR(20) NOT NULL,
    description VARCHAR(200),
    nicotine DECIMAL,
    volume DECIMAL,
    quantity INT NOT NULL DEFAULT 0,
    primary key (product_id)
);

CREATE TABLE users(
    user_id BIGSERIAL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name VARCHAR(50),
    phone VARCHAR(17),
    role VARCHAR(10),
    address VARCHAR(100),
    order_id JSON,
    primary key (user_id)
);

CREATE TABLE orders(
    order_id BIGSERIAL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    products JSON,
    status VARCHAR(20),
    user_id BIGSERIAL,
    total DECIMAL NOT NULL,
    primary key (order_id)
);

ALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id);

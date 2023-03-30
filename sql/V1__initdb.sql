CREATE TABLE Category
(
    id BIGSERIAL PRIMARY KEY,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Users
(
    id BIGSERIAL PRIMARY KEY,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name VARCHAR(50) UNIQUE,
    phone VARCHAR(17) UNIQUE,
    email VARCHAR(20) UNIQUE,
    address VARCHAR(100)
);

CREATE TABLE Orders
(
    id BIGSERIAL PRIMARY KEY,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    status VARCHAR(20),
    user_id BIGSERIAL,
    total DECIMAL NOT NULL,
    CONSTRAINT fk_Orders_Users FOREIGN KEY(user_id) REFERENCES Users(id)
);

CREATE TABLE Product
(
    id BIGSERIAL PRIMARY KEY,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    price DECIMAL NOT NULL DEFAULT 0,
    type VARCHAR(20),
    origin VARCHAR(20),
    description VARCHAR(200),
    nicotine DECIMAL,
    volume DECIMAL,
    quantity INT NOT NULL DEFAULT 0,
    category_id BIGSERIAL,
    order_id BIGSERIAL,
    CONSTRAINT fk_Product_Category FOREIGN KEY(category_id) REFERENCES Category(id)
);

CREATE TABLE Product_Orders
(
    id BIGSERIAL PRIMARY KEY,
    product_id BIGSERIAL NOT NULL,
    order_id BIGSERIAL NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_Product FOREIGN KEY(product_id) REFERENCES Product(id),
    CONSTRAINT fk_Orders FOREIGN KEY(order_id) REFERENCES Orders(id)
)



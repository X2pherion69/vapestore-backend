CREATE TABLE Image
(
    id BIGSERIAL PRIMARY KEY,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name VARCHAR(20) NOT NULL,
    image_content VARCHAR NOT NULL,
    product_id BIGSERIAL,
    CONSTRAINT fk_Image_Product FOREIGN KEY(product_id) REFERENCES Product(id)
);

-- Seed the Category initial data

INSERT INTO Category
    (is_deleted,created_at,updated_at,name)
VALUES
    (false, '2022-10-27 00:00:00', '2022-10-27 00:00:00', 'Juice'),
    (false, '2022-10-27 00:00:00', '2022-10-27 00:00:00', 'Vapekit'),
    (false, '2022-10-27 00:00:00', '2022-10-27 00:00:00', 'Podsystem'),
    (false, '2022-10-27 00:00:00', '2022-10-27 00:00:00', 'Coil');
CREATE DATABASE IF NOT EXISTS money_tracker;

USE mysql;

-- CREATE USER 'my_super_user'@'%' IDENTIFIED BY 'my_super_password';
-- GRANT ALL ON money_tracker.* TO 'my_super_user'@'%';

USE money_tracker;

CREATE TABLE categories (
    bi_id BIGINT NOT NULL AUTO_INCREMENT,
    vc_category VARCHAR(255) NOT NULL,
    vc_description VARCHAR(255),
    dt_timestamp_created TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    dt_timestamp_updated TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (bi_id),
    INDEX(vc_category)
);
ALTER TABLE categories ADD CONSTRAINT un_categories_vc_category UNIQUE (vc_category);


CREATE TABLE sub_categories (
    bi_id BIGINT NOT NULL AUTO_INCREMENT,
    vc_sub_category VARCHAR(255) NOT NULL,
    vc_description VARCHAR(255),
    dt_timestamp_created TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    dt_timestamp_updated TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    bi_category_id BIGINT NOT NULL,
    PRIMARY KEY (bi_id),
    INDEX(bi_category_id),
    INDEX(vc_sub_category)
);
ALTER TABLE sub_categories ADD CONSTRAINT sub_categories_ibfk_1 FOREIGN KEY (bi_category_id) REFERENCES categories(bi_id) ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE movements_type (
    in_id INT NOT NULL AUTO_INCREMENT,
    vc_movement_type VARCHAR(255) NOT NULL,
    vc_description VARCHAR(255),
    dt_timestamp_created TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    dt_timestamp_updated TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (in_id),
    INDEX(vc_movement_type)
);
ALTER TABLE movements_type ADD CONSTRAINT un_movements_type_vc_movement_type UNIQUE (vc_movement_type);


CREATE TABLE payments_type (
    in_id INT NOT NULL AUTO_INCREMENT,
    vc_payment_type VARCHAR(255) NOT NULL,
    vc_description VARCHAR(255),
    dt_timestamp_created TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    dt_timestamp_updated TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (in_id),
    INDEX(vc_payment_type)
);
ALTER TABLE payments_type ADD CONSTRAINT un_payments_type_vc_payment_type UNIQUE (vc_payment_type);


CREATE TABLE movements (
    bi_id BIGINT NOT NULL AUTO_INCREMENT,
    dt_date DATE NOT NULL,
    dc_price DECIMAL(10,2) NOT NULL,
    vc_description VARCHAR(255),
    bi_category_id BIGINT NOT NULL,
    bi_sub_category_id BIGINT NOT NULL,
    in_movement_type_id INT NOT NULL,
    in_payment_type_id INT NOT NULL,
    dt_timestamp_created TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    dt_timestamp_updated TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    bi_user_id_created BIGINT,
    bi_user_id_updated BIGINT,
    PRIMARY KEY (bi_id),
    INDEX(bi_category_id),
    INDEX(bi_sub_category_id),
    INDEX(in_movement_type_id),
    INDEX(in_payment_type_id),
    INDEX(dt_date)
);

ALTER TABLE movements ADD CONSTRAINT movements_ibfk_1 FOREIGN KEY (bi_category_id) REFERENCES categories(bi_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE movements ADD CONSTRAINT movements_ibfk_2 FOREIGN KEY (bi_sub_category_id) REFERENCES sub_categories(bi_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE movements ADD CONSTRAINT movements_ibfk_3 FOREIGN KEY (in_movement_type_id) REFERENCES movements_type(in_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE movements ADD CONSTRAINT movements_ibfk_4 FOREIGN KEY (in_payment_type_id) REFERENCES payments_type(in_id) ON UPDATE RESTRICT ON DELETE RESTRICT;




-- Seed
INSERT INTO categories (vc_category, vc_description)
VALUES
  ('Food', NULL),
  ('Transportation', NULL),
  ('Entertainment', NULL),
  ('Health', NULL),
  ('Clothing', NULL),
  ('Utilities', NULL),
  ('Education', NULL),
  ('Gifts', NULL),
  ('Other', NULL);


--
SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Food');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Fruits', NULL, @category_id),
  ('Breakfast', NULL , @category_id),
  ('Lunch', NULL, @category_id),
  ('Dinner', NULL, @category_id),
  ('Snacks', NULL, @category_id),
  ('Drinks', NULL, @category_id),
  ('Sweets', NULL, @category_id),
  ('Vegetables', NULL, @category_id),
  ('Other', NULL, @category_id);

SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Transportation');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('To office', NULL, @category_id),
  ('To Home', NULL, @category_id),
  ('To Supermarket', NULL, @category_id),
  ('Other', NULL, @category_id);


SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Entertainment');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Movies', NULL, @category_id),
  ('Music', NULL, @category_id),
  ('Books', NULL, @category_id),
  ('Play', NULL, @category_id),
  ('Other', NULL, @category_id);


SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Health');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Medicine', NULL, @category_id),
  ('Healthcare', NULL, @category_id),
  ('Other', NULL, @category_id);


SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Clothing');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Shoes', NULL, @category_id),
  ('Clothes', NULL, @category_id),
  ('Other', NULL, @category_id);

SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Utilities');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Electricity', NULL, @category_id),
  ('Water', NULL, @category_id),
  ('Gas', NULL, @category_id),
  ('Internet', NULL, @category_id),
  ('Telephone', NULL, @category_id),
  ('Laundry', NULL, @category_id),
  ('Other', NULL, @category_id);

SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Education');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Institute', NULL, @category_id),
  ('Courses', NULL, @category_id),
  ('University', NULL, @category_id),
  ('Other', NULL, @category_id);

SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Gifts');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Gifts', NULL, @category_id),
  ('Other', NULL, @category_id);

SET @category_id = (SELECT bi_id FROM categories WHERE vc_category = 'Other');
INSERT INTO sub_categories (vc_sub_category, vc_description, bi_category_id)
VALUES
  ('Other', NULL, @category_id);



--
INSERT INTO movements_type (vc_movement_type, vc_description)
VALUES
  ('Income', 'Income'),
  ('Expense', 'Expense');

--
INSERT INTO payments_type (vc_payment_type, vc_description)
VALUES
  ('Cash', NULL),
  ('Credit Card', NULL),
  ('Debit Card', NULL),
  ('Check', NULL),
  ('Other', NULL);

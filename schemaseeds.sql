CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id INT auto_increment NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(200) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    stock_quantity INTEGER(100),
    product_sales DECIMAL (10,2),
    PRIMARY KEY(id)

);

CREATE TABLE departments (
	id INT auto_increment NOT NULL,
    department_name VARCHAR(200) NOT NULL,
    over_head_costs DECIMAL(9,2) NOT NULL,
    total_sales DECIMAL (10,2),
    PRIMARY KEY(id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Headphones", "Electronics", 15.00, 100, 0.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Earphones", "Electronics", 10.00, 90, 50.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Xbox One", "Video Games", 250.00, 120, 2500.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("PS4", "Video Games", 300.00, 120, 5500.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Switch", "Video Games", 300.00, 150, 2500.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Iphone 7", "Cell Phone", 650.00, 100, 9500.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Iphone 7 Plus", "Cell Phone", 850.00, 220, 6500.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Apple Watch Sr3ies 2", "Smart Watch", 400.00, 200, 6500.00);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Fire Stick", "Electronics", 50.00, 220, 2500.00);

INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES ("Electronics" , 200.00, 200.00);
INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES ("Video Games" , 100.00, 400.00);
INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES ("Cell Phone" , 300.00, 8000.00);
INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES ("Smart Watch" , 140.00, 8000.00);



create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)

);


insert into user(name,contactNumber,email,password,status,role) values('Admin','125345654','admin@gmail.com','admin','true','admin');
-- {
--     "name":"Admin",
--     "contactNumber":"'125345654'",
--     "email":"siririx872@tenjb.com",
--     "password":"1234"


-- }


create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

-- USE cafenodejs; -- Select the database

-- CREATE TABLE category (
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id)
-- );

create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
)



create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(255) NOT NULL,
    primary key(id)
)



--  USE cafenodejs;

-- CREATE TABLE bill(
--     id INT NOT NULL AUTO_INCREMENT,
--     uuid VARCHAR(200) NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     contactNumber VARCHAR(20) NOT NULL,
--     paymentMethod VARCHAR(50) NOT NULL,
--     total INT NOT NULL,
--     productDetails JSON DEFAULT NULL,
--     createdBy VARCHAR(255) NOT NULL,
--     PRIMARY KEY(id)

--  )


-- USE cafenodejs;

-- CREATE TABLE product(
--     id INT NOT NULL AUTO_INCREMENT,
--    name VARCHAR(255) NOT NULL,
--     categoryId integer NOT NULL,
--     description varchar(255),
--     price integer,
--     status varchar(20),
--     PRIMARY KEY(id)

-- )
CREATE DATABASE soadweb;
USE soadweb;

CREATE TABLE usuarios(
	id int primary key not null auto_increment,
    nombre varchar(50),
    apellido varchar(50),
    email varchar(100) not null
);
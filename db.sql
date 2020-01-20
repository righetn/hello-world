ALTER USER postgres PASSWORD '123';
CREATE DATABASE "mydb";
\c "mydb";
CREATE TABLE "user" (
    id integer PRIMARY_KEY,
    name varchar(40)
);

ALTER USER postgres PASSWORD '123';
CREATE DATABASE "mydb";
\c "mydb";
CREATE TABLE "user" (
    id integer PRIMARY_KEY,
    name varchar(40)
);

CREATE FUNCTION postUser(IN userName text) returns void as 
$$
    INSERT INTO user(id, name) VALUES (default, userName);
$$
LANGUAGE SQL;

CREATE FUNCTION getUsers(OUT name varchar(40)) returns varchar as 
$$
    SELECT name FROM user;
$$
LANGUAGE SQL;
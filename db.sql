ALTER USER postgres PASSWORD '123';
CREATE DATABASE "mydb";
\c "mydb";
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name varchar(40) NOT NULL
);

CREATE FUNCTION postUser(IN userName text) returns void as 
$$
    INSERT INTO "user" (name) VALUES (userName);
$$
LANGUAGE SQL;

CREATE FUNCTION getUsers(OUT name varchar(40)) returns setof varchar(40) as 
$$
    SELECT name FROM "user";
$$
LANGUAGE SQL;
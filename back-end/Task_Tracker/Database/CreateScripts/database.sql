-- ------------------------------------------------
-- Tables for Task Tracker
-- ------------------------------------------------
DROP TABLE IF EXISTS task;
CREATE TABLE task (
id int4,
name varchar,
day varchar,
reminder boolean,
primary key(id)
);
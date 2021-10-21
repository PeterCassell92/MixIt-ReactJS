-- ------------------------------------------------
-- Tables for Task Tracker
-- ------------------------------------------------
DROP SEQUENCE IF EXISTS task_id_seq;
CREATE SEQUENCE task_id_seq
 INCREMENT 1
 MINVALUE 1
 START 1;

DROP TABLE IF EXISTS task;
CREATE TABLE task (
id int4 DEFAULT nextval('task_id_seq'::regclass),
name varchar,
day varchar,
reminder boolean,
primary key(id)
);
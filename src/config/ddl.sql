DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    sexe TEXT CHECK(sexe IN ('M', 'F')),
    birth_day DATE
);

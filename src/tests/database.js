import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDb () {
  return open({
    filename: '/home/toure/Documents/gestion_notes/gestion_notes/gestion_notes/src/db.sqlite',
    driver: sqlite3.Database
  })
}

const db =await openDb();


const ddl=`CREATE TABLE students (id integer PRIMARY KEY autoincrement,
                                firstname TEXT,
                                lastname TEXT,
                                sexe String,
                                brith_day DATE,
                                check(sexe in ('M','F'))
                        );`

const dml=`INSERT INTO students VALUES()`

const supp=`drop table students;`
await db.exec(supp);
await db.exec(ddl);
console.log(db);
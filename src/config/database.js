/*

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs/promises';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Correction de la gestion des chemins
const filename = fileURLToPath(import.meta.url);
const parent_dir = dirname(filename);
const base_dir = join(parent_dir, '..');
const file_path = join(base_dir, 'db.sqlite');

let createTable = join(parent_dir, 'ddl.sql');
let insertOnTable = join(parent_dir, 'dml.sql');

export default class Database {
    connection;
    static instance;
    static db_path = file_path;

    constructor() {}

    static async getDatabaseInstance() { // corrigé : "Insatance" → "Instance"
        if (Database.instance === undefined) {
            Database.instance = new Database();
            await Database.instance.openDb(Database.db_path);
        }
        return Database.instance;
    }

    async openDb(db_path) {
        this.connection = await open({
            filename: db_path,
            driver: sqlite3.Database
        });
        await this.initDb(); // ajouté "await" pour attendre la création des tables
    }

    async initDb() {
        console.log("Création de la base de données...");
        try {
            const ddl = await fs.readFile(createTable, 'utf-8');
            const dml = await fs.readFile(insertOnTable, 'utf-8');

            await this.connection.exec(ddl);
            console.log("Tables créées avec succès.");

            await this.connection.exec(dml);
            console.log("Données insérées avec succès.");
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la base :", error);
        }
    }
}


*/








import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs/promises' 
import {dirname, join} from 'node:path';

const url = new URL(import.meta.url);
const parent_dir = dirname(url.pathname);
const base_dir = join(parent_dir, '..');
const file_path=join(base_dir, "db.sqlite");

let createTable = join(parent_dir, 'ddl.sql');
let insertOnTable = join(parent_dir, 'dml.sql');

export default class Database{
    connection;
    static instence;
    static db_path=file_path;

    constructor(){
        
    }
    static async getDatabaseInsatance(){
        if (Database.instence===undefined){
            Database.instence=new Database()
            await Database.instence.openDb(Database.db_path);
        }
        return Database.instence;
    }

    async openDb (db_path) {
        this.connection= await open({
            filename: db_path,
            driver: sqlite3.Database
        });
        this.initDb();
    }


    async initDb() {
        console.log("création de la base de données ")
        try {
            
            const ddl = await fs.readFile(createTable, 'utf-8');
            const dml = await fs.readFile(insertOnTable, 'utf-8');


            await this.connection.exec(ddl);
            console.log("Tables créées avec succès.");

            
            await this.connection.exec(dml);
            console.log("Données insérées avec succès.");
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la base :", error);
        }
    }
}




//creer une methode qui s'appel initDb dans cette methode creer  les tables ddl.sql et Insérer des n-uplet dml.sql
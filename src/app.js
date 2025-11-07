import fs from 'node:fs';
import http from 'node:http';
import dotenv from "dotenv";
import { json } from 'node:stream/consumers';
import StudentController from './controllers/studentController.js';
// import { Database } from 'sqlite';
import Database from './config/database.js';

dotenv.config();

const db= await Database.getDatabaseInsatance()

console.log(db);


/*
 * GET /students -> Students list
 * GET /student/:id -> Stendent details
 * POST /students -> Student created
 * PUT | PATCH /student/:id -> Student updated
 * DELETE /student/:id -> Student Deleted
*/


const studentController = new StudentController();

const server = http.createServer((req, res)=>{
    const method =req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url);
    

    const endpoint =method+":"+url.pathname;
    
    res.setHeader('Content-Type', 'application/json');
    
    switch (endpoint) {
        case 'GET:/students':
            studentController.read(req, res);
                 
            break;
        case 'GET:/student':
            studentController.get(req, res);
                       
            break;
        case 'POST:/students':
            studentController.create(req,res);
                       
            break;
        case 'PUT:/student':
            studentController.update(req, res);
                        
            break;
        case 'DELETE:/student':
            studentController.delete(req, res);      
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({
                "message":"Page not Found !"
            }));
            break;
    }
    
});

server.listen(process.env.PORT || 3000, ()=>{
    console.log("Server Started.....")
});
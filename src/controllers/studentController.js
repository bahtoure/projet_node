import { json } from "node:stream/consumers";
import uuid from "../generation.js";
import StendentService from "../services/studentService.js";

export default class StudentController{
    students = [
        {
          'id': 1000,
            "firstname":"Abalo",
            "lastname":"Afi",
            "sexe": "F",
            "birth_day":"12/02/2000",
        },
    ];


    uuidGen;
    studentService;
    constructor(){
        this.studentService =  new StendentService;
        this.uuidGen=uuid(1000)
        
    }
    async read(req, res){
        res.writeHead(200);
        res.end(JSON.stringify(await this.studentService.getAll()));
    }
    async get(req, res){
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id=Number(url.searchParams.get("id"));

        const student= await this.studentService.find(id);

        if (id===undefined){
            res.writeHead(404);
            res.end(JSON.stringify({
                "message": 'Resource not-found!'
            }));
        }else{
            res.writeHead(200);
            res.end(JSON.stringify(student))
        }
        
    
        res.end("");
    }
    async create(req, res) {
    const {firstname, lastname, sexe, brith_day} = await json(req); 
    const student={
        "id":this.uuidGen.next().value,
        "firstname":firstname != undefined ? firstname: "",
        "lastname":lastname != undefined ? lastname: "",
        "sexe":sexe != undefined ? sexe: "",
        "brith_day": brith_day != undefined ? brith_day: "",
    }

    //if (student.firstname.length)

    this.studentService.create(student); 

    // res.writeHead(201);
    // res.end(JSON.stringify({
    //     message: "Étudiant ajouté avec succès",
    //     student: body
    // }));
    }

    async update(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id"));

        const {firstname, lastname, sexe, brith_day} = await json(req); 
        const student=[
            {
                "id":null,
                "firstname":firstname !== undefined ? firstname: "",
                "lastname":lastname !== undefined ? lastname: "",
                "sexe":sexe !== undefined ? sexe: "",
                "brith_day": brith_day !== undefined ? brith_day: "",
            }
        ]

        const update_student=this.studentService.update(id, student);

        if (update_student){
            res.writeHead(200);
            res.end(JSON.stringify(
                update_student
            ));
            return;
        }
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Étudiant non trouvé" }));
        return;
        
        
    }
    delete(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = Number(url.searchParams.get("id"));


    this.studentService.delete(id);
    res.writeHead(200);
    res.end("Students successfuly delete ....!")

    // if (!id) {
    //     res.writeHead(400);
    //     res.end(JSON.stringify({ message: "Vous n'avez pas mentionner l'ID dans l'url" }));
    //     return;
    // }
    // const etudiant = this.students.findIndex(s => s.id === id);
    // if (etudiant === -1) {
    //     res.writeHead(404);
    //     res.end(JSON.stringify({ message: "Étudiant non trouvé" }));
    //     return;
    // }
    // const deletedStudent = this.students.splice(etudiant, 1);
    // res.writeHead(200);
    // res.end(JSON.stringify({
    //     message: "Étudiant supprimé avec succès",
    //     student: deletedStudent[0]
    // }));
    }
}

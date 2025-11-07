import uuid from "../generation.js";
import Database from "../config/database.js";
import StudentRepository from "../repositorys/studentRepository.js";


export default class StudentService {
  students = [
    {
      id: 1000,
      firstname: "Ali",
      lastname: "Afi",
      sexe: "F",
      birth_day: "01/01/2002",
    },
  ];

  studentRepository;

  uuidGen;

  constructor() {
    this.uuidGen = uuid(1000);
    this.studentRepository = new StudentRepository();
  }

  async getAll() {
    /*
    const db = await Database.getDatabaseInsatance();
    return await db.connection.all("SELECT * FROM students");
    */

    this.studentRepository.findAll();

  }

  async get(id) {
    /*
    const db = await Database.getDatabaseInsatance();
    return await db.connection.get(
      "SELECT * FROM students WHERE id = :student_id",
      { ":student_id": id }
    );
    */

    return this.studentRepository.find(id);
  }

  async create(student_data) {
    /*const db = await Database.getDatabaseInsatance();
    const { firstname, lastname, sexe, birth_day } = student_data;
    const insert_sql = `
        INSERT INTO students(firstname, lastname, sexe, birth_day)
        VALUES(:firstname, :lastname, :sexe, :birth_day);
    `;
    const { lastID } = await db.connection.run(insert_sql, {
      ":firstname": firstname,
      ":lastname": lastname,
      ":sexe": sexe,
      ":birth_day": birth_day,
    });
    return lastID;*/

    this.studentRepository.save(student_data);
    return await this.get(student_data)
  }

  async find(id) {
    const db = await Database.getDatabaseInsatance();
    return await db.connection.get(
      "SELECT * FROM students WHERE id = :student_id;",
      {
        ":student_id": id,
      }
    );
  }

  async update(id, student_data) {
    /*
    const db = await Database.getDatabaseInsatance();

    const student = await this.find(id);
    if (!student) {
      throw new Error(`Aucun étudiant trouvé avec l'id ${id}`);
    }

    const { firstname, lastname, sexe, birth_day } = student_data;

    const update_sql = `
      UPDATE students
      SET firstname = :firstname,
          lastname = :lastname,
          sexe = :sexe,
          birth_day = :birth_day
      WHERE id = :id;
    `;

    const result = await db.connection.run(update_sql, {
      ":firstname": firstname,
      ":lastname": lastname,
      ":sexe": sexe,
      ":birth_day": birth_day,
      ":id": id,
    });

    return result.changes > 0
      ? await this.find(id)
      : { message: "Aucune modification effectuée" };
  }

  async delete(id) {
    const db = await Database.getDatabaseInsatance();

    const student = await this.find(id);
    if (!student) {
      throw new Error(`Aucun étudiant trouvé avec l'id ${id}`);
    }

    const delete_sql = `
      DELETE FROM students WHERE id = :id;
    `;

    const result = await db.connection.run(delete_sql, { ":id": id });

    return result.changes > 0
      ? { message: "Étudiant supprimé avec succès", deleted: student }
      : { message: "Aucune suppression effectuée" };
  }
      */

  this.studentRepository.update(id,student_data);
  return await this.get(student_data)
}








}
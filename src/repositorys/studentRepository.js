
import Repository from "./repository.js";
import Database from "../config/database.js";
export default class StudentRepository extends Repository {
    constructor(){
        super()
    }

    async save(student_data) {

        const db = await Database.getDatabaseInsatance();
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
        return lastID;
    }


    async update(id,student_data) {

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


    async findAll() {
        const db = await Database.getDatabaseInsatance();
        return await db.connection.all("SELECT * FROM students");
    }

    async find() {
        const db = await Database.getDatabaseInsatance();
        return await db.connection.get(
            "SELECT * FROM students WHERE id = :student_id;",
            {
                ":student_id": id,
            }
        );
    }












}

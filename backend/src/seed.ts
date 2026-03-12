import { db } from "./db";
import { Employee } from "../../types/Employee";

const employees: Employee[] = [
  {
    id: 1,
    name: "Алина Кузнецова",
    birthDate: new Date("1989-04-12"),
    passportData: "1234 567890",
    contact: "+7 (903) 761-09-54",
    adress: "Москва",
    job: "Developer",
    department: "IT",
    salary: 140000,
    hireDate: new Date("2022-05-16"),
    isFired: false
  },
  {
    id: 2,
    name: "Мария Смирнова",
    birthDate: new Date("1993-09-03"),
    passportData: "2345 678901",
    contact: "+7 (985) 234-88-12",
    adress: "Санкт-Петербург",
    job: "HR Manager",
    department: "HR",
    salary: 95000,
    hireDate: new Date("2021-11-02"),
    isFired: false
  },
  {
    id: 3,
    name: "Катя Иванова",
    birthDate: new Date("1996-01-18"),
    passportData: "3456 789012",
    contact: "+7 (926) 557-31-49",
    adress: "Казань",
    job: "Frontend Developer",
    department: "IT",
    salary: 130000,
    hireDate: new Date("2023-03-10"),
    isFired: false
  }
]

export async function seedDb() {
    await db.run(`DELETE FROM Employees`)
    const res = await db.get(
      `SELECT COUNT(*) as count FROM Employees`
    )
    if (res.count === 0){
          for (let emp of employees){
            await db.run(
            `INSERT INTO Employees
            (id, name, birth_date, passport_data, contact, adress, job, department, salary, hire_date, is_fired)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [   emp.id,  
                emp.name, 
                String(emp.birthDate ?  new Date(emp.birthDate).toISOString().split('T')[0] : null),
                emp.passportData,
                emp.contact, 
                emp.adress, 
                emp.job, 
                emp.department, 
                emp.salary,
                String(emp.hireDate ?  new Date(emp.hireDate).toISOString().split('T')[0] : null),
                emp.isFired]
        )
      }
    }   
    
}
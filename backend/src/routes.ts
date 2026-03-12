import { Router, Request, Response } from "express";
import {db} from './db'

import { Employee } from "../../types/Employee";
export const router = Router()
interface productQuery{
    search?: string,
    department?: string,
    job?: string
}
router.get("/", async(req: Request<{}, {}, {}, productQuery>, res)=>{
    let sql = `SELECT * FROM Employees`
    let Employees = await db.all(`SELECT * FROM Employees`)
    if (req.query.search){
        const search = String(req.query.search).toLowerCase()
        Employees = Employees.filter(emp => emp.name.toLowerCase().includes(search))
    }
    if (req.query.job){
        const job = String(req.query.job).toLowerCase()
        Employees = Employees.filter(emp => emp.job.toLowerCase() == job)
    }
    if (req.query.department){
        const department = String(req.query.department).toLowerCase()
        Employees = Employees.filter(emp => emp.department.toLowerCase() == department)
    }
    res.json(Employees)
})

router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const employee: Employee | undefined = await db.get(`SELECT * FROM Employees WHERE id=?`, [id])
    res.json(employee)
})

router.post('/', async(req, res)=>{
    const emp: Employee = req.body;
    const result = await db.run(
        `INSERT INTO Employees(birth_date, name, passport_data,contact, adress, job, department, salary, hire_date, is_fired) VALUES (?,?,?,?,?,?,?,?,?,?)`, 
        [String(emp.birthDate ?  new Date(emp.birthDate).toISOString() : null), emp.name, emp.passportData, emp.contact, 
        emp.adress, emp.job, emp.department, emp.salary,
         String(emp.hireDate ?  new Date(emp.hireDate).toISOString() : null), false]
    )
    res.json({id: result.lastID})
})

router.put('/:id', async (req, res)=>{
    const id = req.params.id;
    const emp: Employee = req.body;
    const result = await db.run(
        `UPDATE Employees SET birth_date=?, name=?, passport_data=?,contact=?, 
        adress=?, job=?, department=?, salary=?, hire_date=?, is_fired=? WHERE id=?`,
         [String(emp.birthDate ?  new Date(emp.birthDate).toISOString() : null), emp.name, emp.passportData, emp.contact, 
        emp.adress, emp.job, emp.department, emp.salary,
         String(emp.hireDate ?  new Date(emp.hireDate).toISOString() : null), emp.isFired, id]
    )
    res.json({success: true})
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    await db.run("DELETE FROM Employees WHERE id=?", [id])
    res.json({success: true})
})


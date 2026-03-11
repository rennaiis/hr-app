interface EmployeeDb {
  id: number
  name: string
  birth_date: string
  passport_data: string
  contact: string
  adress: string
  job: string
  department: string
  salary: number
  hire_date: string
  is_fired: boolean
}

export async function getEmployees() {
    const res = await fetch('http://localhost:3000')
    const data: EmployeeDb[] = await res.json()
    const emps = data.map(emp => ({
        id: emp.id,
        name: emp.name,
        birthDate: new Date(emp.birth_date),
        passportData: emp.passport_data,
        contact: emp.contact,
        adress: emp.adress,
        job: emp.job,
        department: emp.department,
        salary: emp.salary,
        hireDate: new Date(emp.hire_date),
        isFired: emp.is_fired
    }))
    return emps
}
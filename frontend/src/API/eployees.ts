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
import { type SearchParams } from "../../../types/SearchParams"
import { type Employee } from "../../../types/Employee"

export async function getEmployees(filters: SearchParams) {
    const params = new URLSearchParams()
    if (filters.filterDepartment !== ''){
        params.append('department', filters.filterDepartment)
    }
    if (filters.filterJob !== ''){
        params.append('job', filters.filterJob)
    }
    if (filters.search !== ''){
        params.append('search', filters.search)
    }
    const query = params.toString() 
    const fetchString = (query !=='')? 
        `http://localhost:3000/?${query}` : 
        'http://localhost:3000/'

    let res = await fetch(fetchString)
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

export async function addEmployee(emp: Employee){
    const res =  await fetch('http://localhost:3000/', {
        method: 'POST', 
        headers: {
            "Content-Type": 'application/json'
        }, 
        body: JSON.stringify(emp)
    })
    return await res.json()
}

export async function updateEmployee(emp: Employee) {
    const res =await fetch(`http://localhost:3000/${emp.id}`,{
        method: 'PUT',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(emp)
    }) 
    return await res.json()    
}

export async function deleteEmployee(emp: Employee) {
    const res = await fetch(`http://localhost:3000/${emp.id}`,{
        method: 'DELETE',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(emp)
    })
    return await res.json()
}

<script setup lang="ts">
    import { ref, onMounted} from 'vue';
    import departments from './data/departments.json'
    import jobs from './data/jobs.json'
    import { type Employee } from "../../types/Employee";
    import {type SearchParams} from "../../types/SearchParams"
    import { getEmployees, addEmployee, updateEmployee} from './API/eployees';
    import EditWindow from './EditWindow.vue';
    const employees = ref<Employee[]>([])
    onMounted( async()=>{
      employees.value = await getEmployees(searchParams.value)
    })
    async function editEmployee(emp: Employee | null) {
      if (emp){
        await updateEmployee(emp)
      }
      employees.value = await getEmployees(searchParams.value)
      isEditOpen.value = false
    }
    async function fireEmployee(emp: Employee) {
      emp.isFired = true
      await updateEmployee(emp)
      employees.value = await getEmployees(searchParams.value)
      isEditOpen.value = false      
    }
    async function submitAdd() {
      await addEmployee(newEmployee.value)
      employees.value = await getEmployees(searchParams.value)
    }
    function selectEmployee(emp: Employee){
      isEditOpen.value = true
      selectedEmployee.value = emp
    }
    const searchParams =ref<SearchParams>({
      filterDepartment: '',
      filterJob: '', 
      search: ''
    })
    const newEmployee = ref<Employee>({
      id: 0,
      name: '',
      birthDate: new Date(),
      passportData: '', 
      contact: '', 
      adress:'',
      job: '', 
      department: '', 
      salary: 0, 
      hireDate: new Date(), 
      isFired: false
    })
    const selectedEmployee = ref<Employee | null>(null)
    const isEditOpen = ref(false)
</script>

<template>
  <div>
    <h1>Сотрудники</h1>
    <div>
      <form >
        <input @change="" type="text" v-model="searchParams.search" id="search">
        <label for="search"><img src="" alt=""></label>
        <p>
        <label for="departmentFilter">Отдел</label>
        <select 
          id="departmentFilter"
          v-model="searchParams.filterDepartment">
          <option v-for="department in departments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </p>
      <p>
        <label for="jobFilter">Профессия</label>
        <select 
          v-model="searchParams.filterJob"
          id="jobFilter"
        >
        <option v-for="job in jobs" :key="job" :value="job">
          {{ job }}
        </option>
      </select>
      </p>
      <button type="submit">Найти</button>
      </form>
      <button>+</button>

    </div>
    <form @submit ="submitAdd">
      <h3>Новый сотрудник</h3>
      <p>
        <label for="name">ФИО</label>
        <input 
          v-model="newEmployee.name" 
          type="text" 
          id="name">
      </p>
      <p>
        <label for="birth_date">Дата рождения</label>
        <input 
          type="date" 
          id="birth_date"
          v-model="newEmployee.birthDate">
      </p>
      <p>
        <label for="passport_data">Серия и номер паспорта</label>
        <input 
          v-model="newEmployee.passportData"
          v-maska="'#### ######'"
          type="text"
          id="passport_data"
          placeholder="0000 000000"
          imputmode="numeric">
      </p>
      <p>
        <label for="contact">Телефон</label>
        <input 
          v-model="newEmployee.contact"
          v-maska="'+#(###)###-##-##'"
          type="tel"
          id="contact"
          placeholder="+7(000)000-00-00"
          imputmode="tel">
      </p>
      <p>
        <label for="adress">Адрес проживания</label>
        <input 
          v-model="newEmployee.adress" 
          type="text" 
          id="adress">
      </p>
      <p>
        <label for="department">Отдел</label>
        <select 
          id="department"
          v-model="newEmployee.department">
          <option v-for="department in departments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </p>
      <p>
        <label for="job">Профессия</label>
        <select 
          id="job"
          v-model="newEmployee.job"
        >
        <option v-for="job in jobs" :key="job" :value="job">
          {{ job }}
        </option>
      </select>
      </p>
      <p>
        <label for="salary">Зарплата</label>
        <input 
          v-model="newEmployee.salary" 
          type="number" 
          id="salary">
      </p>
      <p>
        <label for="hire_date">Дата приёма на работу</label>
        <input 
          v-model = "newEmployee.hireDate"
          type="date" 
          id="hire_date">
      </p>
      <button type="submit">Добавить</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Дата рождения</th>
          <th>Паспорт</th>
          <th>Телефон</th>
          <th>Адрес</th>
          <th>Отдел</th>
          <th>Должность</th>
          <th>Зарплата</th>
          <th>Дата приема</th>
          <th>Действия</th>
        </tr>
      </thead>
    <tbody>
      <tr v-for="employee in employees" :key="employee.id">
        <td>{{ employee.name }}</td>
        <td>{{ employee.birthDate.toDateString()}}</td>
        <td>{{ employee.passportData }}</td>
        <td>{{ employee.contact }}</td>
        <td>{{ employee.adress }}</td>
        <td>{{ employee.department }}</td>
        <td>{{ employee.job }}</td>
        <td>{{ employee.salary }}</td>
        <td>{{ employee.hireDate.toDateString()}}</td>
        <td>
          <button @click="selectEmployee(employee)">Редактировать</button>
          <button @click="fireEmployee(employee)">Уволить</button>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
  <EditWindow 
    :visible="isEditOpen"
    :editedEmployee="selectedEmployee"
    @close="isEditOpen = false"
    @save="editEmployee"/>
</template>

<style scoped>

</style>

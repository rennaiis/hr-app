<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import departments from './data/departments.json'
  import jobs from './data/jobs.json'
  import { type Employee } from "../../types/Employee";
  import { getEmployees, addEmployee} from './API/eployees';
  const employees = ref<Employee[]>([])
  onMounted( async()=>{
    employees.value = await getEmployees()
  })
  async function submitAdd() {
    await addEmployee(newEmployee.value)
    employees.value = await getEmployees()
  }
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
</script>

<template>
  <div>
    <h1>Сотрудники</h1>
    <div>
      <form >
        <input type="text" id="search">
        <label for="seatch"><img src="" alt=""></label>
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
          <button>Редактировать</button>
          <button>Уволить</button>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>

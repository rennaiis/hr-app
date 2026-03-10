<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import departments from './data/departments.json'
  import jobs from './data/jobs.json'
  import { type Employee } from "../../types/Employee";
  import { getEmployees } from './API/eployees';
  const employees = ref<Employee[]>([])
  onMounted( async()=>{
    employees.value = await getEmployees()
  })
  const name = ref('')
  const birth_date = ref(new Date())
  const passport_data = ref('')
  const contact = ref('')
  const adress = ref('')
  const departmentChosen = ref('')
  const jobChosen = ref('')
  const salary = ref(0)
  const hire_date = ref(new Date())

</script>

<template>
  <div>
    <h1>Сотрудники</h1>
    <div>
      <form action="">
        <input type="text" id="search">
        <label for="seatch"><img src="" alt=""></label>
        <button type="submit">Найти</button>
      </form>
      <button>+</button>
    </div>
    <form action="">
      <h3>Новый сотрудник</h3>
      <p>
        <label for="name">ФИО</label>
        <input 
          v-model="name" 
          type="text" 
          id="name">
      </p>
      <p>
        <label for="birth_date">Дата рождения</label>
        <input 
          type="date" 
          id="birth_date"
          v-model="birth_date">
      </p>
      <p>
        <label for="passport_data">Серия и номер паспорта</label>
        <input 
          v-model="passport_data"
          v-maska="'#### ######'"
          type="text"
          id="passport_data"
          placeholder="0000 000000"
          imputmode="numeric">
      </p>
      <p>
        <label for="contact">Телефон</label>
        <input 
          v-model="contact"
          v-maska="'+#(###)###-##-##'"
          type="tel"
          id="contact"
          placeholder="+7(000)000-00-00"
          imputmode="tel">
      </p>
      <p>
        <label for="adress">Адрес проживания</label>
        <input 
          v-model="adress" 
          type="text" 
          id="adress">
      </p>
      <p>
        <label for="department">Отдел</label>
        <select 
          id="department"
          v-model="departmentChosen">
          <option v-for="department in departments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </p>
      <p>
        <label for="job">Профессия</label>
        <select 
          id="job"
          v-model="jobChosen"
        >
        <option v-for="job in jobs" :key="job" :value="job">
          {{ job }}
        </option>
      </select>
      </p>
      <p>
        <label for="salary">Зарплата</label>
        <input 
          v-model="salary" 
          type="number" 
          id="salary">
      </p>
      <p>
        <label for="hire_date">Дата приёма на работу</label>
        <input 
          v-model = "hire_date"
          type="date" 
          id="hire_date">
      </p>
      <button>Добавить</button>
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
    </tr>
    <tbody>
    <tr v-for="employee in employees" :key="employee.id">
      <td>{{ employee.name }}</td>
      <td>{{ employee.birthDate }}</td>
      <td>{{ employee.passportData }}</td>
      <td>{{ employee.contact }}</td>
      <td>{{ employee.adress }}</td>
      <td>{{ employee.department }}</td>
      <td>{{ employee.job }}</td>
      <td>{{ employee.salary }}</td>
      <td>{{ employee.hireDate }}</td>
      <td>
        <button>Редактировать</button>
        <button>Уволить</button>
      </td>
    </tr>
    </tbody>
  </thead>
    </table>
  </div>
</template>

<style scoped>

</style>

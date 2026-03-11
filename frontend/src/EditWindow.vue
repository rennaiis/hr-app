<script setup lang="ts">
  import departments from './data/departments.json'
  import jobs from './data/jobs.json'
</script>
<template>
    <div>
    <form>
      <h3>Редактирование сотрудника</h3>
      <p>
        <label for="name">ФИО</label>
        <input 
          type="text" 
          id="name">
      </p>
      <p>
        <label for="birth_date">Дата рождения</label>
        <input 
          type="date" 
          id="birth_date">
      </p>
      <p>
        <label for="passport_data">Серия и номер паспорта</label>
        <input 
          v-maska="'#### ######'"
          type="text"
          id="passport_data"
          placeholder="0000 000000"
          imputmode="numeric">
      </p>
      <p>
        <label for="contact">Телефон</label>
        <input 
          v-maska="'+#(###)###-##-##'"
          type="tel"
          id="contact"
          placeholder="+7(000)000-00-00"
          imputmode="tel">
      </p>
      <p>
        <label for="adress">Адрес проживания</label>
        <input 
          type="text" 
          id="adress">
      </p>
      <p>
        <label for="department">Отдел</label>
        <select 
          id="department">
          <option v-for="department in departments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </p>
      <p>
        <label for="job">Профессия</label>
        <select 
          id="job"
        >
        <option v-for="job in jobs" :key="job" :value="job">
          {{ job }}
        </option>
      </select>
      </p>
      <p>
        <label for="salary">Зарплата</label>
        <input 
          type="number" 
          id="salary">
      </p>
      <p>
        <label for="hire_date">Дата приёма на работу</label>
        <input 
          type="date" 
          id="hire_date">
      </p>
      <button>Сохранить</button>
      <button>Отмена</button>
    </form>
    </div>
</template>
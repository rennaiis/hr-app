<script setup lang="ts">
  import { ref, watch} from 'vue';
  import departments from './data/departments.json'
  import jobs from './data/jobs.json' 
  import { type Employee } from '../../types/Employee';
  import {type EditWindowProps} from '../../types/Props'
  const props = defineProps<EditWindowProps>()
  const copyChosenEmployee = ref<Employee | null>(props.editedEmployee)
  watch(()=>props.editedEmployee, 
  (newVal: Employee | null )=>{
    if (newVal){
        copyChosenEmployee.value = {...newVal}
    }else{
        copyChosenEmployee.value = null
    }
  })
</script>
<template>
    <div v-if="visible && copyChosenEmployee">
        <form>
            <h3>Редактирование сотрудника</h3>
            <p>
                <label for="name">ФИО</label>
                <input 
                    v-model="copyChosenEmployee.name"
                    type="text" 
                    id="name">
            </p>
            <p>
                <label for="birth_date">Дата рождения</label>
                <input 
                    v-model="copyChosenEmployee.birthDate"
                    type="date" 
                    id="birth_date">
            </p>
            <p>
                <label for="passport_data">Серия и номер паспорта</label>
                <input 
                    v-model="copyChosenEmployee.passportData"
                    v-maska="'#### ######'"
                    type="text"
                    id="passport_data"
                    placeholder="0000 000000"
                    imputmode="numeric">
            </p>
            <p>
                <label for="contact">Телефон</label>
                <input 
                    v-model="copyChosenEmployee.contact"
                    v-maska="'+#(###)###-##-##'"
                    type="tel"
                    id="contact"
                    placeholder="+7(000)000-00-00"
                    imputmode="tel">
            </p>
            <p>
                <label for="adress">Адрес проживания</label>
                <input 
                    v-model="copyChosenEmployee.adress"
                    type="text" 
                    id="adress">
            </p>
            <p>
                <label for="department">Отдел</label>
                <select 
                    v-model="copyChosenEmployee.department"
                    id="department">
                    <option v-for="department in departments" :key="department" :value="department">
                        {{ department }}
                    </option>
                </select>
            </p>
            <p>
                <label for="job">Профессия</label>
                <select 
                    v-model="copyChosenEmployee.job"
                    id="job">
                <option v-for="job in jobs" :key="job" :value="job">
                    {{ job }}
                </option>
            </select>
            </p>
            <p>
                <label for="salary">Зарплата</label>
                <input 
                    v-model="copyChosenEmployee.salary"
                    type="number" 
                    id="salary">
            </p>
            <p>
                <label for="hire_date">Дата приёма на работу</label>
                <input 
                    v-model="copyChosenEmployee.hireDate"
                    type="date" 
                    id="hire_date">
            </p>
            <button>Сохранить</button>
            <button>Отмена</button>
        </form>
    </div>
</template>
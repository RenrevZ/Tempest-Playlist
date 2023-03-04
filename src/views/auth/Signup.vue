<template>
    <form @submit.prevent="submitForm">
      <h3>Signup</h3>

      <input type="text" 
             placeholder="username"
             v-model="username">

      <input type="email" 
             placeholder="email"
             v-model="email">
  
      <input type="password" 
             placeholder="password"
             v-model="password">
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isLoading">Signup</button>
      <button v-if="isLoading" disabled>Loading...</button>
    </form>
  </template>

  <script>
import { ref } from '@vue/reactivity'
import Signup from '@/composables/Signup'
  export default{
    setup() {
        const {error, signup ,isLoading} = Signup()
        const email = ref('')
        const password = ref('')
        const username = ref('')

        const submitForm = async () => {
            const res = await signup(email.value,password.value,username.value)
            if(!error.value){
                console.log('userSignedup')
            }
        }

        return {email,password,username,isLoading, error,submitForm}
    }
  }
  </script>
  
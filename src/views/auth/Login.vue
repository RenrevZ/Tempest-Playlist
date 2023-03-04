<template>
  <form @submit.prevent="submitForm">
    <h3>Login</h3>
    <input type="email" 
           placeholder="email"
           v-model="email">

    <input type="password" 
           placeholder="password"
           v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isLoading">Login</button>
    <button v-if="isLoading" disabled>Loading...</button>
  </form>
</template>

<script>
    import Login from '@/composables/Login'
    import { ref } from '@vue/reactivity'
export default{
    setup(){
        const {error,login,isLoading} = Login()
        const email = ref('')
        const password = ref('')

        const submitForm = async () =>  {
            const response = await login(email.value,password.value)
            if(!error.value){
                console.log('user logged in');
            }
        }
        console.log(email.value)

        return { email,password,error,submitForm,isLoading}
    }
}
</script>

<style>

</style>
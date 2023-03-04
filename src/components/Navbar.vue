<template>
  <div class="navbar">
    <nav>
        <img src="@/assets/img/de11579517e467cd83793e0ec8c358e1.png" alt="">
        <h1><router-link :to="{name:'home'}">Rimiru Playlist</router-link></h1>
        <div class="links">
           <button @click="userLogout" v-if="user">Logout</button>
           <router-link class="btn" :to="{name:'signup'}" v-if="!user">Signup</router-link>
           <router-link class="btn" :to="{name:'login'}" v-if="!user">Login</router-link>
        </div>
    </nav>
  </div>
</template>

<script>
import Logout from '@/composables/Logout'
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser';
export default {
  setup(){
     const {error, logout,isLoading} = Logout()
     const router = useRouter()
     const {user} = getUser()

     const userLogout = async () => {
          await  logout()
          router.push({ name: 'home'}); 
     }

     return {userLogout,error,isLoading,user}
  }
}
</script>

<style scoped>
.navbar{
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav{
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}

nav .links a,button {
  margin-left: 16px ;
  font-size: 14px;
}

nav img{
  max-height: 80px;
}
</style>
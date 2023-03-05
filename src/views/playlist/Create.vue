<template>
  <form @submit.prevent="CreatePlaylist">
    <h4>Create New Playlist</h4>
    <input type="text" 
            required 
            placeholder="Playlist Title"
            v-model="title">

    <textarea placeholder="Playlist Description ..." 
              required
              v-model="description">
    </textarea>

    <label>Upload Cover Image</label>
    <input type="file" @change="UploadCover">
    <div class="error">{{ fileError }}</div>
    
    <small class="error"></small>
    <button v-if="!isLoading">Create Playlist</button>
    <button v-else disabled>Creating...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import Storage from '@/composables/Storage'
import useData from '@/composables/useData'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const {url,filePath,uploadImage} = Storage()
        const {error,addDoc} = useData('playlist')
        const { user } = getUser()
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isLoading = ref(false)

        const CreatePlaylist = async () => {
            if(file.value){
                isLoading.value = true
               await uploadImage(file.value)
               await addDoc({
                 title: title.value,
                 description: description.value,
                 userId:user.value.uid,
                 userName: user.value.displayName,
                 coverUrl:url.value,
                 filePath: filePath.value,
                 songs:[],
                 createdAt: timestamp()
               })

               isLoading.value = false

               if(!error.value){
                 console.log('playlist added')
                 router.push({name:'Index'})
               }
            }
        }

        const filetype = ['image/png','image/jpeg']

        const UploadCover = (e) => {
            const cover = e.target.files[0]
            
            if(cover && filetype.includes(cover.type)){
                file.value = cover
                fileError.value = null
            }else{
                file.value = null
                fileError.value = 'Please select an image file (png/jpg)'
            }
        } 

        return {
                title,
                description,
                CreatePlaylist,
                UploadCover,
                fileError,
                isLoading
            }
    }
}
</script>

<style>

input[type="file"]{
    border:0;
    padding:0;
}

label{
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button{
    margin-top: 20px;
}
</style>
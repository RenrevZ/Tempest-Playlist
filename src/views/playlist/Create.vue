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
    <button>Create Playlist</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)

        const CreatePlaylist = () => {
            if(file.value){
                console.log(title.value,description.value)
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

        return {title,description,CreatePlaylist,UploadCover,fileError}
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
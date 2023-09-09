<template>
    <div class="add-song">
        <button v-if="!showform" @click="showform = true">Add Songs</button>
        <form v-if="showform" @submit.prevent="submitForm">
            <h4>Create a New Song</h4>

            <input type="text" 
                   placeholder="Song Title"
                   v-model="title"
                   required>

            <input type="text" 
                   placeholder="Artist"
                   v-model="artist"
                   required>

            <button>Create</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'
export default {
    props:['playlist'],
    setup(props){
        const title = ref('')
        const artist = ref('')
        const showform = ref(false)
        const {updateDoc} = useDocument('playlist',props.playlist.id)

        const submitForm = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 1000000000)
            }

            await updateDoc({
                songs: [...props.playlist.songs,newSong]
            })

            title.value = ''
            artist.value = ''
        }

        return {title,artist,showform,submitForm}
    }
}
</script>

<style scoped>
.add-song{
    text-align: center;
    margin-top: 40px;
}

form{
    max-width: 100%;
    text-align: left;
}
</style>
<template>
 <small v-if="error" class="error">{{ error }}</small>
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl">
            </div>
            <h2>{{ playlist.title }}</h2>
            <small>Created by {{ playlist.userName }}</small>
            <p>{{ playlist.description }}</p>
            <button v-if="ownership" @click="deletePlaylist" class="deletebtn">Delete Playlist</button>
        </div>

         <div class="song-list">
           <div v-if="!playlist.songs.length">No songs has been added in this playlist yet</div>
              <div v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="song-title">
                  <small>Title</small>
                  <h3>{{ song.title }}</h3>
                </div>
                  
                  <small>{{ song.artist }}</small>
                  
                  <button v-if="ownership" @click="deleteSong(song.id)">Delete</button>
              </div>
            <CreateSong v-if="ownership" :playlist="playlist"/>
         </div>
 </div>
</template>

<script>
import getRealtimeData from '@/composables/getRealtimeData'
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import CreateSong from '@/components/CreateSong.vue'
import Storage from '@/composables/Storage'
import { useRouter } from 'vue-router'

export default {
    props:['id'],
    components: {CreateSong},
    setup(props){
        const {error, document: playlist} = getRealtimeData('playlist',props.id)
        const { user } = getUser()
        const { deleteDoc,updateDoc } = useDocument('playlist',props.id)
        const { deleteImage } = Storage()
        const router = useRouter()

        const ownership = computed(() => {
            return playlist.value && user.value && user.value.uid == playlist.value.userId
        })

        const deletePlaylist = async () => {
            await deleteDoc()
            await deleteImage(playlist.value.filePath)
            router.push({name:'Index'})
        }

        
        const deleteSong = async (id) => {
            const songs = playlist.value.songs.filter((song) => song.id != id)
            await updateDoc({ songs })
        }

        return {error, playlist,ownership,deletePlaylist,deleteSong}
    }
}
</script>

<style>
@media screen and (max-width: 620px) {
  .playlist-details{
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
 .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }

  .single-song{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #333;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.05);
    margin-bottom: 20px;
  }
</style>
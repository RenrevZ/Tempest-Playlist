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
            <button v-if="ownership">Delete Playlist</button>
        </div>

         <div class="song-list">
           <div v-if="!playlist.songs.length">No songs has been added in this playlist yet</div>
              <div v-for="song in playlist.songs" :key="song.id" class="single-song">
                  <h3>{{ song.title }}</h3>
                  <small>{{ song.artist }}</small>
                  <button v-if="ownership">Delete</button>
              </div>
            <CreateSong v-if="ownership" :playlist="playlist"/>
         </div>
 </div>
</template>

<script>
import getRealtimeData from '@/composables/getRealtimeData'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import CreateSong from '@/components/CreateSong.vue'
export default {
    props:['id'],
    components: {CreateSong},
    setup(props){
        const {error, document: playlist} = getRealtimeData('playlist',props.id)
        const { user } = getUser()
        console.log(user)
        const ownership = computed(() => {
            return playlist.value && user.value && user.value.uid == playlist.value.userId
        })

        return {error, playlist,ownership}
    }
}
</script>

<style>
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
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>
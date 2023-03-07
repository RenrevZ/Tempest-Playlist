<template>
  <div class="user-playlist">
    <h3>Hello, {{ user.displayName }}</h3>
    <div v-if="playlist">
      <SinglePlaylist :playlists="playlist"/>
    </div>
  </div>
  <router-link :to="{name:'Createplaylist'}" class="btn">Create new Playlist</router-link>
</template>

<script>
import getUser from '@/composables/getUser';
import getData from '@/composables/getData';
import SinglePlaylist from '@/components/SinglePlaylist';

export default {
  components:{SinglePlaylist},
  setup(){
    const { user } = getUser()
     const {error,documents:playlist} = getData(
      'playlist',
      ['userId','==',user.value.uid ]
      )
    
     return {error,playlist,user}
  }
}
</script>

<style>

</style>
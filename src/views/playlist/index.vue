<template>
  <small class="error" v-if="error">Could not get the data</small>
  <div v-if="documents">
       <SinglePlaylist :playlists="documents"/>
  </div>
</template>

<script>
import getData from '@/composables/getData'
import SinglePlaylist from '@/components/SinglePlaylist.vue'
export default {
 components: { SinglePlaylist},
 setup(){
     const {error, documents} = getData('playlist')

    return {error,documents}
  }
}
</script>

<style>

</style>
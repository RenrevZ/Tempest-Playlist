<template>
  <div class="home">
    <img src="@/assets/img/rimiru.jpg" class="cover">
    <div>
       <h1>A simple Playlist Creator</h1>
       <p>build and create your favorite playlist like rimiru build his own nation</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
@media screen and (max-width: 620px) {
  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }
}
.cover{
  max-height: 500px;
}

.home{
  display: flex;
  align-items: center;
  justify-items: space-around;
}
</style>
 
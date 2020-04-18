<template>
  <div class="container">
    <main>
      <profile-info />
    </main>
  </div>
</template>

<script>
import profileInfo from '../profile/profileInfo.vue'

export default {
  components: {
    profileInfo
  }
};
</script>

<style lang="scss">
  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
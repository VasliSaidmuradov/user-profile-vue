<template>
  <div id="app">
    <base-layout />
  </div>
</template>

<script>
import baseLayout from './components/layouts/baseLayout.vue'

export default {
  name: 'App',
  components: {
    baseLayout
  }
}
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>

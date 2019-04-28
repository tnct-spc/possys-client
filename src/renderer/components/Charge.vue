<template>
  <div id="wrapper">
   <h1>Charge page</h1> 
   <router-link to="/">Index</router-link>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
</style>

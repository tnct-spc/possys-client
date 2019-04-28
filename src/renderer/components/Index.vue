<template>
  <div id="wrapper">
   <h1>Index Page</h1> 
   <router-link to="/Charge">Charge</router-link>
   <router-link to="/AddCard">AddCard</router-link>
   <router-link to="/Buy">buy</router-link>
  </div>
</template>

<script>
  export default {
    name: 'index-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
</style>

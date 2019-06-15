<template>
  <div id="wrapper">
   <h1>AddCard page</h1> 
   <router-link to="/">Back</router-link>
      <GetNfc ref="nfcsensor" v-on:stop="touch"/>
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

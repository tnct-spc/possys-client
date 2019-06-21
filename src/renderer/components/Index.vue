<template>
  <div id="wrapper">
   <h1>Index Page</h1> 
   <AddCard />
   <Charge />
   <Buy />
  </div>
</template>

<script>
  import Buy from './Buy'
  import Charge from './Charge'
  import AddCard from './AddCard'
  export default {
    name: 'index-page',
    components: {
      Buy,
      Charge,
      AddCard
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
</style>

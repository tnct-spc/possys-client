<template>
  <div id="wrapper">
   <b-navbar type="light" variant="dark">
      <b-navbar-bland>possys-client</b-navbar-bland>
   </b-navbar>
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

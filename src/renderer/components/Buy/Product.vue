<template>
  <div class="float-left">
    <b-card
      style="width: 300px; height: 200px;"
      class="mb-2 mx-2"
      >
      <h1 class=""> {{ title }} </h1>
      <h4 class="">{{ price }} 円</h4>
      <b-button class="buy"  v-on:click="$emit('buy', id)" variant="primary">
        <h3 class="my-auto">購入</h3>
      </b-button>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    props: ['title', 'price', 'id'],
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  .buy {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
</style>

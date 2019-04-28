<template>
  <b-card>
    <h3>カードをタッチしてください</h3>
    <b-progress class="my-2" :value="counter" :max="max" animated></b-progress>
  </b-card>
</template>

<script>
  import Product from './Buy/Product'
  import { setInterval } from 'timers'

  export default {
    name: 'landing-page',
    components: { Product },
    data: function () {
      return {
        counter: 10,
        max: 10,
        timer: Object
      }
    },
    watch: {
      counter: function (val) {
        if (val > 10) {
          this.$emit('stop', 'faild')
        }
      }
    },
    mounted: function () {
      this.timer = setInterval(() => {
        this.counter += 0.1
        console.log(this.counter)
      }, 100)
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      startCount () {
        console.log('started')
        this.counter = 0
      }
    }
  }
</script>

<style>
</style>

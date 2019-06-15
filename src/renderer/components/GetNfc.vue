<template>
  <b-card v-if="isWaiting">
    <h3>カードをタッチしてください</h3>
      <div class="d-flex justify-content-center mb-3">
        <b-spinner v-if="isWaiting" variant="primary" style="width: 5rem; height: 5rem;"></b-spinner>
      </div>
  </b-card>
</template>

<script>
  import Product from './Buy/Product'
  const exec = require('child_process').exec

  export default {
    name: 'landing-page',
    components: { Product },
    data: function () {
      return {
        isWaiting: false
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      startWaitingTouch () {
        this.isWaiting = true
        exec('readidmsudo', (err, stdout, stderr) => {
          this.isWaiting = false
          if (err || stdout.includes('faild') || stdout.includes('timeout')) {
            console.log(err)
            this.$emit('stop', 'failed')
          } else {
            this.$emit('stop', stdout)
            console.log(stdout)
          }
        })
      }
    }
  }
</script>

<style>
</style>


<template>
  <div id="wrapper">
   <h1>AddCard page</h1> 
   <router-link to="/">Back</router-link>
      <b-button @click="addCard">カードを追加する</b-button>
      <GetNfc ref="nfcsensor" v-on:stop="touch"/>
      <b-modal
        ref="qr-modal"
        hide-footer
        hide-header
        size="xl">
        <svg v-html="svgtext" height="500px" width="500px"></svg>
      </b-modal>
  </div>
</template>

<script>
  import GetNfc from './GetNfc'
  import axios from 'axios'
  import QRCode from 'qrcode'
  export default {
    name: 'landing-page',
    components: {
      GetNfc
    },
    data: () => {
      return {
        svgtext: '',
        count: 60
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      addCard () {
        this.$refs.nfcsensor.startWaitingTouch()
      },
      touch (idm) {
        if (idm === 'failed') return
        axios.get('https://localhost/accounts/api/add_idm/' + idm + '/', {headers: {Authorization: 'token 12ce74fac36274cf49a13e408b73d19025e637ef'}}).then(data => {
          this.$refs['qr-modal'].show()
          this.setQr('https://localhost/accounts/add_card/' + data.data)
        })
      },
      setQr (text) {
        QRCode.toString(text, {type: 'svg', console: {light: '#0000'}}, (error, text) => {
          if (error) console.log(error)
          this.svgtext = text
          setTimeout(() => {
            this.$refs['qr-modal'].hide()
            this.svgtext = ''
          }, 30 * 1000)
        })
      }

    }
  }
</script>

<style>
</style>

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
        console.log(window.process.env)
        axios.get(process.env.djangohost + '/accounts/api/add_idm/' + idm + '/', {headers: {Authorization: 'token ' + process.env.djangotoken}}).then(data => {
          this.$refs['qr-modal'].show()
          this.setQr(process.env.djangohost + '/accounts/add_card/' + data.data)
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

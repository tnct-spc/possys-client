<template>
  <div id="wrapper">
   <b-button @click="addCard">カードを追加する</b-button>
   <b-modal
      ref="addcard-modal"
      hide-footer
      hide-header
      size="xl"
      @hidden="resetModalData">
      <GetNfc ref="nfcsensor" v-on:stop="touch"/>
      <div v-show="showQr">
        <h3>QRコードを読み取ってください</h3>
        <svg v-html="svgtext" height="400px" width="400px"></svg>
      </div>
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
        showQr: false,
        timer: Object
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      addCard () {
        this.$refs.nfcsensor.startWaitingTouch()
        this.$refs['addcard-modal'].show()
      },
      touch (idm) {
        if (idm === 'failed') return
        console.log(window.process.env)
        axios.get(process.env.djangohost + '/accounts/api/add_idm/' + idm + '/', {headers: {Authorization: 'token ' + process.env.djangotoken}}).then(data => {
          this.showQr = true
          this.setQr(process.env.djangohost + '/accounts/add_card/' + data.data)
        })
      },
      setQr (text) {
        QRCode.toString(text, {type: 'svg', console: {light: '#0000'}}, (error, text) => {
          if (error) console.log(error)
          this.svgtext = text
          this.timer = setTimeout(() => {
            this.$refs['addcard-modal'].hide()
          }, 10 * 1000)
        })
      },
      resetModalData () {
        this.svgtext = ''
        this.showQr = false
        this.timer = false
      }

    }
  }
</script>

<style>
</style>

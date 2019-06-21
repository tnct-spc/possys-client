<template>
  <section>
    <b-button @click="charge">チャージ</b-button>
    <b-modal
      ref="charge-modal"
      hide-footer
      title="チャージ"
      size="xl"
      @hidden="resetModalData">
      <GetNfc ref="nfcsensor" v-on:stop="touch"/>
      <div v-show="showAlert">
        <b-alert show :variant="alertColor">
          {{ message }}
        </b-alert>
      </div>
    </b-modal>
  </section>
</template>

<script>
  import axios from 'axios'
  import GetNfc from './GetNfc'
  export default {
    name: 'landing-page',
    components: {
      GetNfc
    },
    data: () => {
      return {
        alertColor: 'success',
        showAlert: false,
        message: '',
        timer: Object
      }
    },
    methods: {
      charge () {
        this.$refs['charge-modal'].show()
        console.log(this.$refs['nfcsensor'])
        this.$refs.nfcsensor.startWaitingTouch()
      },
      touch (idm) {
        if (idm === 'failed') {
          this.showAlert = true
          this.alertColor = 'danger'
          this.message = 'IDmの取得に失敗しました'
          this.timer = setTimeout(() => {
            this.$refs['charge-modal'].hide()
          }, 2000)
          return
        }
        axios.get(process.env.djangohost + '/possys/api/charge/' + idm + '/' + 1000 + '/', {headers: {Authorization: 'token ' + process.env.djangotoken}}).then(data => {
          this.showAlert = true
          this.message = data.data.split(',')[1]
          const success = data.data.split(',')[0]
          if (success === 'False') {
            this.alertColor = 'danger'
          }
          this.timer = setTimeout(() => {
            this.$refs['charge-modal'].hide()
          }, 3000)
        })
      },
      resetModalData () {
        console.log('test')
        this.alertColor = 'success'
        this.showAlert = false
        this.message = ''
        this.timer = null
      }
    }
  }
</script>

<style>
</style>

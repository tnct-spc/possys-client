<template>
  <section>
    <b-button @click="charge">チャージ</b-button>
    <b-modal
      ref="charge-modal"
      hide-footer
      title="チャージ"
      size="xl">
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
        message: ''
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
          setTimeout(() => {
            this.$refs['charge-modal'].hide()
            this.showAlert = false
            this.message = ''
            this.alertColor = 'primary'
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
          setTimeout(() => {
            this.$refs['charge-modal'].hide()
            this.message = ''
            this.showAlert = false
            this.alertColor = 'primary'
          }, 3000)
        })
      }
    //   https://localhost/possys/api/add_transaction_directory/010102123e1a5526/1000/
    }
  }
</script>

<style>
</style>

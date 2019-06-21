<template>
  <div>
   <div v-for="product of Products" :key="product.id">
     <Product
       :title='product.name'
       :price='product.price'
       :id='product.id'
       v-on:buy="onBuy"
     />
   </div>
    <b-modal
      ref="buy-modal"
      hide-footer
      title="購入"
      size="xl"
      @hidden="resetModalData">
      <h2>購入物: {{ cart.name }}</h2>
      <h4>価格: {{cart.price}}円</h4>
      <GetNfc ref="nfcsensor" v-on:stop="touch"/>
      <div v-show="showAlert">
        <b-alert show :variant="alertColor">
          {{ message }}
        </b-alert>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import Product from './Buy/Product'
  import GetNfc from './GetNfc'
  import axios from 'axios'
  import { setTimeout } from 'timers'

  export default {
    name: 'landing-page',
    components: {
      Product,
      GetNfc
    },
    data: () => {
      return {
        cart: {},
        Products: [],
        alertColor: 'success',
        showAlert: false,
        message: '',
        timer: Object
      }
    },
    mounted: function () {
      this.fetchProducts()
    },
    methods: {
      fetchProducts () {
        console.log()
        axios.get(process.env.djangohost + '/api/possys/products/', {headers: {Authorization: 'token ' + process.env.djangotoken}}).then(data => {
          console.log(data.data)
          data.data.forEach((p, i) => {
            console.log(p)
            this.Products.push(p)
          })
        })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onBuy (productId) {
        this.$refs['buy-modal'].show()
        this.$refs.nfcsensor.startWaitingTouch()
        this.cart = this.Products.find((product) => {
          return product.id === productId
        })
      },
      touch (idm) {
        if (!idm || idm === 'failed') {
          this.showAlert = true
          this.alertColor = 'danger'
          this.message = 'IDmの取得に失敗しました'
          this.timer = setTimeout(() => {
            this.$refs['buy-modal'].hide()
          }, 2000)
          return
        }
        axios.get(process.env.djangohost + '/possys/api/add_transaction/' + idm + '/' + this.cart.id + '/', {headers: {Authorization: 'token ' + process.env.djangotoken}}).then(data => {
          this.showAlert = true
          this.message = data.data.split(',')[1]
          const success = data.data.split(',')[0]
          if (success === 'False') {
            this.alertColor = 'danger'
          }
          this.timer = setTimeout(() => {
            this.$refs['buy-modal'].hide()
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

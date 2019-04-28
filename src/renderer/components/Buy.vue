<template>
  <div>
   <h1>Buy page</h1> 
   <router-link to="/">Back</router-link>
   <div v-for="product of Products" :key="product.id">
     <Product
       :title='product.name'
       :price='product.price'
       :id='product.id'
       v-on:buy="onBuy"
     />
   </div>
    <b-modal
      id="buy-modal"
      hide-footer
      title="購入"
      size="xl">
      <h2>購入物: {{ cart.name }}</h2>
      <h4>価格: {{cart.price}}円</h4>
      <GetNfc ref="nfcsensor" v-on:stop="touch"/>
    </b-modal>
  </div>
</template>

<script>
  import Product from './Buy/Product'
  import GetNfc from './GetNfc'

  export default {
    name: 'landing-page',
    components: {
      Product,
      GetNfc
    },
    data: () => {
      return {
        cart: {},
        Products: [
          {
            id: 2,
            name: 'ポテチ',
            price: 100
          },
          {
            id: 3,
            name: 'ペッドボトルジュース',
            price: 60
          },
          {
            id: 4,
            name: '炭酸水',
            price: 40
          },
          {
            id: 5,
            name: 'モンスターエナジー',
            price: 160
          },
          {
            id: 6,
            name: 'チョコ',
            price: 100
          },
          {
            id: 7,
            name: 'カップラーメン',
            price: 100
          },
          {
            id: 8,
            name: 'ペヤング(大)',
            price: 200
          },
          {
            id: 9,
            name: 'コアラのマーチ',
            price: 100
          },
          {
            id: 10,
            name: '春雨スープ',
            price: 10
          },
          {
            id: 11,
            name: 'チャルメラ',
            price: 30
          }
        ]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onBuy (productId) {
        console.log(productId)
        this.$refs.nfcsensor.startCount()
        this.$bvModal.show('buy-modal')
        this.cart = this.Products.find((product) => {
          return product.id === productId
        })
      },
      touch (Idm) {
        console.log(Idm)
        // axios.post ....(購入処理を書く)
        this.$bvModal.hide('buy-modal')
      }
    }
  }
</script>

<style>
</style>

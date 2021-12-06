<template>
  <div>
    <div class="q-mx-none">
      <h3 class="text-center text-bold ">היסטוריית הזמנות </h3>
      <q-circular-progress v-if="!loadingState"
        indeterminate
        size="50px"
        color="lime"
        class="q-ma-md"
      />
      <div class="orders_container">
        <div class="ord_con" v-if="myOrders.length">
          <q-card class="order_card" v-for="order of myOrders" @click="order.isOpen=!order.isOpen">
            <q-dialog v-model="order.isOpen" persistent>
              <order-details @closeDialog="order.isOpen=!order.isOpen" :order="order"/>
            </q-dialog>
            <q-card-section horizontal>
              <q-card-section class="col-1 flex flex-center">
                <q-img
                  class="rounded-borders order_cover"
                  :src="order.yardCover"
                />
              </q-card-section>
              <q-card-section class="q-pt-xs">
                <div class="text-h4 q-mt-sm q-mb-xs">{{ order.yardName }}</div>
                <div class="text-h6 text-grey-6">
                  {{order.yardLocation}}
                </div>
                <div class=" text-h5  ">
                  {{ order.date }}
                </div>
              </q-card-section>
              <q-space/>
              <q-card-section class="q-pt-xs">
                <div class="text-h4  q-mt-sm q-mb-xs">{{ order.totalPrice }} ₪</div>
              </q-card-section>
            </q-card-section>
          </q-card>

        </div>
        <div v-if="orderFlag===false">
          <h2 class=" text-center bg-green-6">לא קיימות הזמנות </h2>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import OrderDetails from 'components/MyProfile/OrderDetails'

export default {
  name: "HistoryOrders",
  data() {
    return {
      userId: '',
      myOrders: [],
      loadingState:false,
      orderFlag:true

    }
  },
  computed: {
    ...mapState('order', ['allOrders'])
  },
  components: {
    OrderDetails
  },
  methods: {
    ...mapActions('yards', ['setEditedYardById']),
    ...mapActions('order', ['getOrdersByUserId']),
    ...mapMutations('yards', ['setEditedYardId']),

    async getOrders() {
      this.myOrders = await this.getOrdersByUserId(this.userId)
      this.loadingState=true
      if(this.myOrders.length===0)
      {
        this.orderFlag=false
      }
      this.myOrders = this.myOrders.map(order => {
        order.isOpen = false
        return order
      })
      console.log(this.myOrders)
    },
    convertTime(time) {
      const d = new Date(time * 1000)

      return `${d.getHours()}:${d.getMinutes()}  ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    },
    goToYard(id) {

      this.setEditedYardId(id)
      this.setEditedYardById()
      this.$router.push(`/YardPage${id}`)
    },
  },
  async created() {
    if (localStorage.getItem('uid')) {
      this.userId = localStorage.getItem('uid')
      await this.getOrders()
    }

  }
}
</script>

<style scoped>

.order_card {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 1px 8px 0 rgb(0, 0, 0), 0 2px 3px -1px rgb(0, 0, 0);
  transition: box-shadow 1s;

}
.order_cover{
  height: 136px;
}
.order_card:hover {
  box-shadow: 0 1px 8px 0 rgb(135, 206, 235), 0 2px 3px -1px rgb(135, 206, 235);
}

.ord_con {
  display: flex;
  flex-direction: column;
}
</style>

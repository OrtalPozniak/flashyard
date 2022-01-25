<template>
  <div style="background: #fff;width: 80vw;min-height: 50vh;">
    <div class="q-mx-none">
      <h3 class="text-center text-bold headline labelll" style="width: 100%">היסטוריית הזמנות </h3>
      <q-circular-progress v-if="!loadingState"
                           indeterminate
                           size="50px"
                           color="lime"
                           class="q-ma-md"
      />
      <div class="orders_container">
        <div id="orderDetails" class="ord_con fontWeb" v-if="myOrders.length">
          <q-card class="everyCard" v-for="order of myOrders" @click="order.isOpen=!order.isOpen">
            <q-dialog v-model="order.isOpen" persistent>
              <order-details @closeDialog="order.isOpen=!order.isOpen" :order="order"/>
            </q-dialog>
            <q-card-section horizontal class="cardText">
              <q-card-section class="col-4 flex flex-center">
                <q-img
                  class="imgSizes"
                  :src="order.yardCover"
                  style="border-radius: 50%;"
                />
              </q-card-section>
              <q-card-section class="q-pt-xs col-5">
                <div class=" q-mt-sm q-mb-xs">{{ order.yardName }}</div>
                <div class="text-h6 text-grey-6">
                  {{order.yardLocation}}
                </div>
                <div class=" text-grey">
                  {{ order.date }}
                </div>
              </q-card-section>
              <q-space/>
              <q-card-section class="q-pt-xs col-4">
                <div class=" q-mt-sm q-mb-xs">{{ order.totalPrice }} ₪</div>
              </q-card-section>
            </q-card-section>
          </q-card>

        </div>
        <div v-if="orderFlag===false">
          <h6 class=" text-center  headline" style="color: #403e3e">לא קיימות הזמנות </h6>
        </div>
      </div>
      <div style="justify-content: center;display: flex;">
        <q-btn flat label="צא" style="font-weight: bold;" color="red-10" v-close-popup/>
      </div>
    </div>


  </div>
</template>

<script>
import FBI from 'src/middleware/firebase/'
import {mapActions, mapMutations, mapState} from 'vuex'
import OrderDetails from 'components/MyProfile/OrderDetails'

export default {
  name: "HistoryOrders",
  data() {
    return {
      userId: '',
      myOrders: [],
      loadingState: false,
      orderFlag: true

    }
  },
  computed: {
    ...mapState('order', ['allOrders'])
  },
  components: {
    OrderDetails
  },
  methods: {
    ...mapActions('yards', ['setEditedYardById', 'reset']),
    ...mapActions('order', ['getOrdersByUserId']),
    ...mapMutations('yards', ['setEditedYardId']),

    async getOrders() {
      this.myOrders = await this.getOrdersByUserId(this.userId)
      this.loadingState = true
      if (this.myOrders.length === 0) {
        this.orderFlag = false
      }
      this.myOrders = this.myOrders.map(order => {
        order.isOpen = false
        return order
      })
      console.log(this.myOrders)
    },
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
  aa(order)
  {
    console.log(order.isOpen)
  },
  async created() {
    this.reset()
    if (localStorage.getItem('uid')) {
      this.userId = localStorage.getItem('uid')
      await this.getOrders()
    }
  }
}
</script>

<style scoped>

#orderDetails {
  font-size: large;
  color: #403e3e;
}

.order_card {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.ord_con {
  display: flex;
  flex-direction: column;
}

.labelll {
  font-size: xx-large;
  color: #FFFAF0;
  background: linear-gradient(45deg, transparent, #DA0018, transparent);
  box-shadow: rgba(3, 8, 20, 0.1) 0 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0 0.075rem 0.175rem;
}

.imgSizes{
  height: 100px;
  width: 100px;
  margin-left: 1vw;
}

.everyCard {
  margin: 0.5vw 0vw;
  box-shadow: 0 3px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #e6e6e6;
  background-color: #fff;
}

.everyCard :hover {
  background: rgba(241, 240, 240, 1);
}

.everyCard .q-img :hover {
  background: transparent;
}

.cardText {
  display: flex;
  justify-content: center;
  align-items: center;
}

.orders_container {
  margin: 1vw;
}
</style>


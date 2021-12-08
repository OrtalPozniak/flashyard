<template>
  <div style="background: #fff;">
    <div class="q-mx-none">
      <h3 class="text-center text-bold headline labelll" style="width: 100%">היסטוריית הזמנות </h3>
      <div class="orders_container">
        <div id="orderDetails" class="ord_con fontWeb" v-if="myOrders.length">
          <q-card  class="everyCard" v-for="order in myOrders"  @click="aa(order)" >
            <q-card-section horizontal class="cardText">
              <q-card-section class="col-4 flex flex-center" >
                <q-img
                  class="imgHeight"
                  :src="order.yardCover"
                  style="border-radius: 50%;"
                />
              </q-card-section>
              <q-card-section class="q-pt-xs col-5" >
                <div class=" q-mt-sm q-mb-xs">{{ order.yardName }}</div>
                <div class=" text-grey" >
                  {{ order.date }}
                </div>
              </q-card-section>
              <q-space/>
              <q-card-section class="q-pt-xs col-4">
                <div class=" q-mt-sm q-mb-xs">{{ order.totalPrice }} ₪ </div>
              </q-card-section>
            </q-card-section>


            <q-card-section v-show="flag" class="bg-red-6">
              <!--              <p>קוד הזמנה :{{ order.id }}</p>-->
              <p>תאריך ביצוע הזמנה: {{ order.creationTime }}</p>
              <p>כמות סועדים: {{ order.numOfPeople }}</p>
              <p>מחיר לסועד: {{ order.pricePerHead }} ש"ח</p>
              <p class="text-weight-bold" @click="goToYard(order.uidYard)">עבור לחצר</p>
              <h6>הערות להזמנה</h6>
              <q-list>
                <q-item v-for="note in order.notes">
                  <q-item-section>{{ note }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>

        </div>
        <div v-else>
          <h2 class=" text-center bg-red-6 headline">לא קיימות הזמנות </h2>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import FBI from 'src/middleware/firebase/'
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: "HistoryOrders",
  data() {
    return {
      userId: '',
      myOrders: [],
      flag:false

    }
  },
  computed: {
    ...mapState('order', ['allOrders'])
  },
  methods: {
    ...mapActions('yards', ['setEditedYardById']),
    ...mapActions('order', ['getOrdersByUserId']),
    ...mapMutations('yards', ['setEditedYardId']),

    async getOrders() {
      this.myOrders = await this.getOrdersByUserId(this.userId)
      this.myOrders=this.myOrders.map(order=>{
        order.isOpen=false
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
    aa(order)
    {
      console.log(order.isOpen)
    }
  },
  async created() {
    if (localStorage.getItem('uid')) {
      debugger
      this.userId = localStorage.getItem('uid')
      await this.getOrders()
    }

  }
}
</script>

<style scoped>
.aa {
  color: #262626;
  direction: rtl;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: small;
  line-height: 20px;
  list-style: none;
  position: relative;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0 3px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
}

#orderDetails{
  font-size: large;
  color: #403e3e;
}
.order_card{
  margin-top:10px;
  margin-left:10px;
  margin-right: 10px;
}
.ord_con{
  display: flex;
  flex-direction: column;
}
.labelll{
  font-size: xx-large;
  color: #FFFAF0;
  background: linear-gradient(45deg,transparent,#DA0018,transparent);
  box-shadow: rgba(3, 8, 20, 0.1) 0 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0 0.075rem 0.175rem;
}
.imgHeight{
  height: 100px;
  width: 100px;
}
.everyCard{
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
.cardText{
  display: flex;
  justify-content: center;
  align-items: center;
}
.orders_container{
  margin:1vw;
}
</style>

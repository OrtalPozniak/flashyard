<template>
    <div class="payInputs">
      <div class="h1">
        <h1> סיכום עסקה</h1>
      </div>
      <div class="q-pa-md row flex items-baseline">
        <P>תאריך האירוע :&nbsp </P>
        <q-field :dense="true" outlined>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              <q-icon name="event"/>
              {{ dateToShortString }}
            </div>
          </template>
        </q-field>
      </div>
      <div class="q-pa-md row flex items-baseline">
        <P>כמות משתתפים :&nbsp </P>
        <q-field :dense="true" outlined>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ orderDetails.numOfPeople }}</div>
          </template>
        </q-field>
      </div>
      <div class="q-pa-md row flex items-baseline">
        <P>עלות משתתף :&nbsp </P>
        <q-field :dense="true" outlined suffix="₪">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ orderDetails.pricePerHead }}</div>
          </template>
        </q-field>
      </div>
      <div class="q-pa-md row flex items-baseline">
        <P>עלות כוללת :&nbsp </P>
        <q-field :dense="true" outlined suffix="₪">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ orderDetails.pricePerHead * orderDetails.numOfPeople }}
            </div>
          </template>
        </q-field>
      </div>
      <q-btn class="confirm-btn" label="אישור ומעבר לתשלום" @click="SendToPayment()"></q-btn>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  name: "sum-order",
  data() {
    return {}
  },
  computed: {
    ...mapState('payment', ['allPayments', 'payDetails']),
    ...mapState('order', ['orderDetails']),
    dateToShortString() {
      return this.orderDetails.date.toLocaleString('he-IL', {dateStyle: 'short'})},
  },
  methods: {
    ...mapActions('order', ['CheckingOrderWithDB']),
    async SendToPayment() {
      await this.CheckingOrderWithDB()
      this.$router.push('/payment')
    }
  }
}
</script>

<style scoped>
.payInputs {
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  display: grid;
  grid-template-rows:repeat(auto-fill, auto);
  grid-gap: 7px
}

.confirm-btn {
  color: #ffffff;
  background: #DA0018;
}

h1 {
  margin: 2rem;
  font-size: 3rem;
  font-weight: bold;
  line-height: 0rem;
  letter-spacing: 0.01em;
}
</style>

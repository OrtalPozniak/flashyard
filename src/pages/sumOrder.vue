<template>
  <div>
    <div class="CountDown">
      <CountDown @timerStop="timerStop()"/>
    </div>
    <div class="component">
      <sum-order></sum-order>
    </div>
  </div>

</template>

<script>
import PaySummary from "components/payment/pay-summary";
import PayCard from "components/payment/payment-inputs";
import SumOrder from "components/payment/sumOrder-inputs";
import CountDown from "components/order/CountDown";

export default {
  name: "paymentPage",
  components: {SumOrder, PayCard, PaySummary, CountDown},
  data() {
    return {}
  },
  methods: {
    timerStop(){
      this.$router.push('/feed')
    },
  }
}
</script>

<style scoped>
* {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.CountDown {
  height: 100%;
  width: 100%;
  margin-top:2px ;
}

.component {
  height: 100%;
  width: 100%;

}
</style>

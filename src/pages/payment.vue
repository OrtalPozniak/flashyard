<template>
  <div>
    <div class="CountDown">
<!--      <CountDown @timerStop="timerStop()"/>-->
    </div>
    <div class="component">
      <payment-inputs></payment-inputs>
    </div>
  </div>
</template>

<script>
import PaymentInputs from "components/payment/payment-inputs";
import CountDown from "components/order/CountDown";

export default {
  name: "payment",
  components: {PaymentInputs, CountDown},
  data() {
    return {}
  },
  methods: {
    timerStop() {
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
  margin: 0;
  padding: 0;
}

.CountDown {
  height: 100%;
  width: 100%;
  margin-top: 2px;
}

.component {
  height: 100%;
  width: 100%;
  padding: 0;

}
</style>

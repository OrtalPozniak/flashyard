<template>

  <div id="clock">
    <p class="time">
      {{ minutes }}:{{ seconds }}
    </p>
  </div>

</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: "CountDown",
  data: () => {
    return {
      countDown:0,
      time:0,
      total: '',
      minutes: '--',
      seconds: '--',
      interval: 0
    }
  },
  computed: {
    ...mapState('order', ['orderDetails']),
  },
  mounted: function () {
    this.total = parseInt(this.time, 10)
    this.interval = setInterval(() => {
      this.tick()
    }, 1000)
  },
  methods: {
    str_pad_left: function (string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length)
    },
    tick: function () {
      var minutes = Math.floor(this.total / 60)
      var seconds = this.total - minutes * 60
      this.minutes = this.str_pad_left(minutes, '0', 2)
      this.seconds = this.str_pad_left(seconds, '0', 2)

      if (this.total <= 0) {
        clearInterval(this.interval)
        this.$emit('timerStop')
      }

      this.total -= 1
    },
    addMinutes(date, minutes) {
      // return new Date(date.getTime() + minutes*60000);
      this.countDown = new Date(date.getTime() + minutes * 60000);
    },
    updateTime(){
      this.time=(this.countDown-new Date())/1000
    }
  },
  created() {
    this.addMinutes(this.orderDetails.creationTime, 7)
    this.updateTime()
  }
}
</script>

<style scoped>
* {
  background: white;
  background-size: 100%;
}
p {
  margin: 0;
  padding: 0;
}
#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #fff;
  text-align: center;
  color: #e73746;
  text-shadow: 10px 0 8px rgb(138, 9, 20), 0 0 20px rgba(10, 175, 230, 0);
}
#clock .time {
  letter-spacing: 0.05em;
  font-size: 80px;
}
</style>

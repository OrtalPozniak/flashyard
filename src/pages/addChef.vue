<template>
  <div class="page pageBG" style="flex-direction: column">
    <div class="centerBoxPos">
<!--      <p class="hafirot text-center">פה יהיו מלא חפירות ונשאל אם אתם מסכימים לתנאי השימוש ולהירשם לכאן כשפים,<br>-->
<!--      כמובן שנבטיח לכם שלא נעשה שימוש לרעה בפרטים שלכם וזה יהיה שקר גס כי נמכור את זה לכל דורש</p>-->

      <p class="hafirot text-center">
        אני מאשר בזאת ל-FlashYard לעשות שימוש בפרטי העסק ולהציגם לציבור תוך הבטחה כי לא ייעשה כל שימוש לרעה בפרטיי האישיים. <br>
        למען הסר ספק, יובהר כי השימוש במערכת ההזדהות לצורך קבלת שירותים מזוהים הוא אישי, ושימוש בשירותים מזוהים על ידי אדם אחר בשמו של המשתמש,
        מפרה את תנאי השימוש של אתר זה ועשויה להיחשב בנסיבות מסוימות כעבירה פלילית.<br>
      </p>
      <div class="q-pa-md q-gutter-sm">
        <div>
          <q-toggle
            v-model="second"
            color="blue"
            icon="mail"
            label="אני מאשר/ת שליחת מיילים"
          />
        </div>
        <div >
          <q-toggle
            v-model="fourth"
            checked-icon="check"
            color="red"
            label="קראתי ואני מאשר/ת את תנאי השימוש "
            unchecked-icon="clear"
          />
        </div>
      </div>
      <div class="text-center btnBox" style="justify-content: center;">
        <q-btn @click="createTheChef()" class="btnSize myColor btnSquare btnFont" :disabled="fourth!=true" label="אישור" ></q-btn>
        <q-btn v-go-back="'/feed'" class="btnSize btnSquare oppositeColor btnFont cancelBtn" label="ביטול"></q-btn>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: "addChef",

  data() {
    return {
      userAgreed:false,
      fourth: false,
      second:false,
      disable: true
    }
  },
  computed:{
    ...mapState('yards',['yards','editedYard','editedYardId']),
    ...mapState('users',['users','newUser']),
  },


  methods: {
    ...mapActions('users',['createChef']),
    // 'PjW374abUwebiT1LwExdRB0cDvF2'
    async createTheChef(){
      // const userId = window.user.uid
      while(this.fourth==true) {
        await this.createChef()
        this.$emit('xx')
        await this.$router.push('/addYard')
      }
    }
  }
}
</script>

<style scoped>
.myColor{
  background:linear-gradient(to right,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);
}

.btnFont{
  font-family: 'Rubik', sans-serif;
}
.btnBox{
  position: relative;
  display: flex;
}
</style>

<template>
  <div class="order_container">
    <q-card class="order_details" :style="{backgroundImage:`linear-gradient(rgba(250,250,250,0.5),rgba(24,12,12,0.9)), url(${order.yardCover || defaultImage})`}">
      <q-card-section>
        <h5 class="order_title text-center">פרטי הזמנה</h5>
      </q-card-section>
      <q-card-section class="order_details_body">
        <!--        <p>קוד הזמנה:{{order.id}}</p>-->
        <p>תאריך ביצוע הזמנה: {{ order.orderTime }}</p>
        <p>כמות סועדים: {{ order.numOfPeople }}</p>
        <p>מחיר לסועד: {{ order.pricePerHead }} ש"ח</p>
        <p>מחיר כולל:  {{order.totalPrice}} ש"ח</p>
        <p dir="rtl">
          סטטוס הזמנה:
          <span  v-if="order.payment" class="bg-green">שולם
        </span>
          <span  v-else class="bg-red">לא שולם
        </span></p>
      </q-card-section>

      <!--      <p class="text-weight-bold" @click="goToYard(order.uidYard)">עבור לחצר</p>-->
      <q-card-section class="order_details_notes">
        <h6 class="text-center">הערות להזמנה</h6>
        <q-list v-if="order.notes.length>0">
          <q-item v-for="note in order.notes">
            <q-item-section>*{{ note }}</q-item-section>
          </q-item>
        </q-list>
        <p v-else>אין הערות להזמנה</p>
      </q-card-section>
      <q-card-actions class="order_actions">
        <q-btn class="bg-orange" @click="$router.push(`/YardPage${order.uidYard}`)" label="עבור לחצר"/>
        <q-btn class="bg-red" label="סגירה" @click="$emit('closeDialog')"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "order",
  props: ['order'],

  data() {
    return {
      defaultImage: 'https://firebasestorage.googleapis.com/v0/b/flashyard2.appspot.com/o/yardsImages%2Fhaim%2FWrVuYKAs5vVX3soCVh9h%2FWrVuYKAs5vVX3soCVh9h_458.59621776990434?alt=media&token=77832530-0d80-4d23-8aa3-776dfb593206'
    }
  }
}
</script>

<style scoped>
.order_title {
  margin: 0;
  padding: 10px;
  text-decoration: underline;
}
.order_container{
  color:#fff;
  border-radius: 25px;
  font-family: 'Rubik', sans-serif;
}
.order_details_body
{
  text-align: center;
}
.order_details{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

}
.order_details_notes h6{
  margin:0;
  text-decoration: underline;
}
.order_actions{
  display: block;
  margin-left: 45px;

}
</style>

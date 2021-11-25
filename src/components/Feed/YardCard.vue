<template>
    <div>
      <div class="card" :style="{backgroundImage:`linear-gradient(rgba(19, 10, 10, 0.7), rgba(231, 37, 37, 0.3)), url(${yard.cover || defaultImage})`}">
        <div class="card-headers">
          <h4 class="card-title">{{ yard.yardName }}</h4>
        </div>
        <div class="card-headers">
          <h4 class="card-category">קטגוריה:
            <span   v-for="(category,index) of yard.foodCategory"> {{ category }}
              <span v-if="yard.foodCategory.length>1 && index!==yard.foodCategory.length-1">,</span>
            </span>
          </h4>
        </div>
        <div class="card-details">
          <q-list class="-horizontal">
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon" color="grey-9" text-color="white" icon="room" />
              </q-item-section>

              <q-item-section class="icon-text">{{yard.location}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon"  color="grey-9" text-color="white" icon="fas fa-user-alt icon " />
              </q-item-section>

              <q-item-section class="icon-text"> {{yard.peopleRange.min}}-{{yard.peopleRange.max}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon" color="grey-9" text-color="white" icon="fas fa-shekel-sign icon" />
              </q-item-section>

              <q-item-section class="icon-text">{{yard.pricePerHead}} ש"ח </q-item-section>
            </q-item>
          </q-list>

        </div>
        <button class="btn-circSquare myColor card-btn " @click="goToItem(yard.id)">לפרטים</button>
        </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  props:['yard'],
  name: "YardCard",
  components: {},
  data() {
    return {
      bgImage:'',
      defaultImage: 'https://firebasestorage.googleapis.com/v0/b/flashyard2.appspot.com/o/yardsImages%2Fhaim%2FWrVuYKAs5vVX3soCVh9h%2FWrVuYKAs5vVX3soCVh9h_458.59621776990434?alt=media&token=77832530-0d80-4d23-8aa3-776dfb593206'
    }
  },
  computed: {

  },
  methods: {
    ...mapActions('yards', ['setEditedYardById']),
    ...mapMutations('yards',['setEditedYardId']),

    /***********************goToItem****************
     *     open yard in singlePage                 *
     ***********************************************/
    goToItem(id) {
      debugger
      this.setEditedYardId(id)
      this.setEditedYardById()
      this.$router.push(`/YardPage${id}`)
    },
  },
  created() {
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.card {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 3rem 3rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  width: 100%;
  min-height: 450px;
  padding: 1.5vw;
  border-radius: 8px;
  transition: all 500ms;
  overflow: hidden;
  /*background-image: linear-gradient(rgba(19, 10, 10, 0.3), rgba(231, 37, 37, 0.8));*/
  /*background-image: linear-gradient(rgba(19, 10, 10, 0.3), rgba(231, 37, 37, 0.8));*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}


.card-details{
  text-align: left;
  display: flex;
  justify-content: center;
  color: #FFFAF0;

  /*color:rgb(75,69,69);*/
}


.icon {
  font-size: 3vh;
  margin-right: 10px;
}

.icon-text {
  font-size: 18px;
  letter-spacing: 1px;
  margin-right: 10PX;
}

.card-headers {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

.card-title {
  margin-bottom: 0.5vw;
  font-family: Rubik;
  font-weight: bold;
  font-size: x-large;
  text-align: center;
  letter-spacing: 0.05rem;
  color: #FFFAF0;
  /*color: rgb(75,69,69);*/
  height: 2vw;
}

.card-category {
  font-size: medium;
  text-align: center;
  font-weight: bold;
  color: #FFFAF0;
  /*color: rgb(75,69,69);*/
  margin: 1vw;
  height: 2vw;

}

.card-btn {
  cursor: pointer;
  width: 70%;
  height: 40px;
  margin-top: 2vw;
  font-size: medium;
  font-family: Rubik;
  color: #FFFAF0;
  background: none;
  box-shadow: rgba(3, 8, 20, 0.1) 0 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0 0.075rem 0.175rem;
}
.q-item {
  min-height: 35px !important;
}
.card:hover{
  box-shadow: 0 0 18px 0 rgb(0 0 0 / 65%);
}
.card-btn:hover{
  box-shadow: 0 0 18px 0 rgb(0 0 0 / 65%);
}
</style>

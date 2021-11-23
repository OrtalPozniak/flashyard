<template >
  <div class="page">
    <div class="q-pa-md centerBoxPos text-center" style="width: 40vw;">
      <P class="textHeader text-center">באיזה יום תרצו להגיע ? </P>
      <div>
        <DatePicker class="myColor" locale="he" is-dark color="#FFFAF0"
                    :disabled-dates='AllDisableDays'
                    v-model="localOrder.date" :min-date='new Date()'
                    :model-config="{type: 'string', mask: 'YYYY/MM/DD'}"/>
        <div class="q-pa-md row flex items-baseline">
          <P>תאריך האירוע&nbsp:&nbsp </P>
          <q-field :dense="true">
            <template v-slot:prepend>
              <q-icon name="event"/>
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ localOrder.date }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="text-center" style="width: 100%;display: flex;align-content:center;justify-content: space-between;">
          <div style="display: inline-flex;" class="items-baseline">
            <P>כמות משתתפים :&nbsp&nbsp </P>
            <q-input outlined
                     v-model.number="localOrder.numOfPeople"
                     type="number" :min="this.editedYard.peopleRange.min" :max="this.editedYard.peopleRange.max"
                     style="min-width: 5vw;"
                     color="deep-orange-5"
                     :rules="[val => val!=='' && val >= this.editedYard.peopleRange.min && val <= this.editedYard.peopleRange.max]"
            />
          </div>

          <div style="display: inline-flex" class="items-baseline">
          <P>עלות משתתף :&nbsp </P>
          <q-field outlined suffix="₪" style="min-width: 5vw;">
            <template v-slot:control>
              <div class="self-center full-width no-outline window-width=" tabindex="0">{{ editedYard.pricePerHead }}</div>
            </template>
          </q-field>
          </div>

          <div style="display: inline-flex;" class="items-baseline">
          <P>עלות כוללת : &nbsp;</P>
          <q-field outlined suffix="₪" style="min-width: 5vw;">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ editedYard.pricePerHead * localOrder.numOfPeople }}
              </div>
            </template>
          </q-field>
          </div>

        </div>
      </div>
      <q-input bottom-slots v-model="noteText" color="deep-orange-5" style="max-width: 90%" label="הערות">
        <template v-slot:before>
          <q-icon name="note"/>
        </template>
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="addNote"/>
        </template>
      </q-input>
      <q-list v-if="localOrder.notes.length > 0" light bordered separator style="max-width: 318px; ">
        <q-item clickable v-ripple :key="note" v-for="note in localOrder.notes">
          <q-item-section>
            <p>
              <q-icon left size="12px" name="done"/>
              {{ note }}
            </p>
          </q-item-section>
        </q-item>
      </q-list>
        <q-btn @click="goToSummary" class="myColor" glossy label="מעבר לתשלום"/>
      <!--      <p> editedYard: {{ editedYard }} </p>-->
      <!--      <p> editedYardId: {{ editedYardId }} </p>-->
      <!--      <p> createAllDisableDays: {{ AllDisableDays }} </p>-->
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import {mapActions, mapState, mapMutations, mapGetters} from "vuex";


export default {
  name: "OrderComp",
  components: {
    DatePicker,
  },
  data() {
    return {
      localOrder: {
        notes: [],
        numOfPeople: 0,
        date: this.dateToString(new Date())
      },
      noteText: ''
    }
  },
  computed: {
    ...mapState("test", ['disableWeekdays', 'disableDays', 'orderedEvents']),
    ...mapState('yards', ['yards', 'editedYard', 'editedYardId']),

    dateToShortString() {
      return this.localOrder.date.toLocaleString('he-IL', {dateStyle: 'short'})
    },
    AllDisableDays() {
      return [
        ...this.disableDays.map(disableDay => (disableDay.date)),
        ...this.orderedEvents.map(orderedEvent => (orderedEvent.date)),
        this.disableWeekdays]
    },
  },
  methods: {
    ...mapActions("test", ["setDisableWeekdays", 'setDisableWeekdaysChefInBD', 'getDisableWeekdaysChefFromBD', 'setDisableDaysChefInBD',
      'getDisableDaysChefFromBD', 'getYardOrdersFromBD', 'snapDisableWeekdaysChef', 'snapDisableDaysChefFromDB', 'snapYardOrdersFromBD']),
    ...mapActions('order', ['createOrder', 'CheckingOrderWithDB', "createOrderInDB"]),
    addNote() {
      this.localOrder.notes.push(this.noteText)
      this.noteText = ''
    },
    //createAllDisableDays() {
    //this.allDisableDays = this.disableWeekdays.concat(this.disableDays, this.orderedEvents)
    //},
    updateMinPeopleInCreate() {
      this.localOrder.numOfPeople = this.editedYard.peopleRange.min
    },
    async goToSummary() {
      await this.createOrder(this.localOrder)
      const check = await this.CheckingOrderWithDB()
      console.log(check, 'check')
      if (check) {
        const idOrder = await this.createOrderInDB()
        console.log(idOrder, 'idOrder')
        await this.$router.push('/sumOrder')
      } else {
        window.alert('פרטי הזמנה אינם תקינים, יש לבדוק האם התאריך פנוי או כמות המוזמנים תקינה')
      }
    },
    dateToString(date) {
      const YYYY = date.getFullYear()
      const MM = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))
      const DD = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
      return YYYY + '/' + MM + '/' + DD
    },

  },
  async created() {
    // console.log(this.editedYard)
    this.updateMinPeopleInCreate()
    await this.snapDisableWeekdaysChef(this.editedYard.uidChef)
    await this.snapDisableDaysChefFromDB(this.editedYard.uidChef)
    await this.snapYardOrdersFromBD(this.editedYardId)
  }
}
</script>

<style scoped>
.textHeader {
  /*  text-align: center;*/
  font-size: 1.3rem;
}
</style>

<template>
  <div class="menuChanger centerBoxPos">
    <q-expansion-item style="font-family: Charter;color: #c01039;font-weight: 900;" expand-separator v-model="expanded" label="ימים קבועים שבהם אני לא עובד">
      <div class="q-gutter-sm">
        <q-checkbox size="1.5rem" v-for="day in days" v-model="nonWorkDays" :val="day.num" :label="day.string"
                    color="negative"/>
      </div>
    </q-expansion-item>
    <DatePicker
      class="calendar myColor"
      locale="he"
      :min-date='new Date()'
      :model-config="{type: 'string', mask: 'YYYY/MM/DD'}"
      :value="null"
      color="#FFFAF0"
      v-model="day"
      is-dark
      style="font-family: 'Rubik', sans-serif"
      @dayclick="dialog=true"
      :attributes='attributes'
    />
    <q-dialog v-model="dialog" transition-show="rotate" transition-hide="rotate">
      <component v-if="dialog" :is="checkWhichComponentToOpen(trueDay)" v-bind="{day:trueDay}"
                 @closeDialog="falseDialog"></component>
    </q-dialog>
    <div>
      <q-btn  class="myColor shadowBtn" style="margin-left: 0.25em;border: 1px solid #e02a19" label="שמור  שינויים" @click="saveChanges()"/>
      <q-btn class="transparentColor coverBtn shadowBtn" style="margin-right: 0.25em" label="צא ללא שמירה" @click="exitUnsaved()"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import DialogCalendarEvent from "components/MyProfile/DialogCalendarEvent";
import DialogCalendarOpen from "components/MyProfile/DialogCalendarOpen";
import DialogCalendarPersonal from "components/MyProfile/DialogCalendarPersonal";
import DialogCalendarDisableWeekDay from "components/MyProfile/DialogCalendarDisableWeekDay";
import { QSpinnerGears } from 'quasar'

export default {
  name: "Calendar",
  components: {
    DialogCalendarEvent,
    DialogCalendarOpen,
    DialogCalendarPersonal,
    DialogCalendarDisableWeekDay,
    DatePicker,
  },
  data() {
    return {
      day: this.dateToString(new Date()),
      trueDayString: this.dateToString(new Date()),
      expanded: true,
      days: [{num: 1, string: 'ראשון'}, {num: 2, string: 'שני'}, {num: 3, string: 'שלישי'},
        {num: 4, string: 'רביעי'}, {num: 5, string: 'חמישי'}, {num: 6, string: 'שישי'}, {num: 7, string: 'שבת'}],
      dialog: false,
    }
  },
  computed: {
    ...mapState("test", ['disableWeekdays', 'disableDays', 'orderedEvents']),
    nonWorkDays: {
      get() {
        return this.disableWeekdays.weekdays
      },
      set(value) {
        this.setDisableWeekdays({weekdays: value})
      }
    },
    trueDay() {
      this.day !== '' ? this.trueDayString = this.day : null
      return this.trueDayString
    },
    attributes() {
      return [
        ...this.disableDays.map(disableDay => ({ dates: [disableDay.date], bar: 'gray'})),
        ...this.orderedEvents.map(orderedEvent => ({dates: [orderedEvent.date], bar: 'orange'})),
        {dates: this.disableWeekdays, bar: 'blue'},
      ];
    }
  },
  methods: {
    ...mapActions("test", ["setDisableWeekdays", 'setDisableWeekdaysChefInBD', 'getDisableWeekdaysChefFromBD', 'setDisableDaysChefInBD',
      'getDisableDaysChefFromBD', 'getYardOrdersFromBD', 'snapDisableWeekdaysChef', 'snapDisableDaysChefFromDB', 'snapYardOrdersFromBD']),
    ...mapActions("users", ['getIdYardByIdChef']),
    ...mapMutations("test", ["resetDisableWeekdays", "resetDisableDays", "resetOrderedEvents"]),
    falseDialog() {
      this.dialog = false
    },
    stringToDate(string) {
      let day = parseInt(string.split("/")[2])
      let month = parseInt(string.split("/")[1]) - 1
      let year = parseInt(string.split("/")[0])
      return new Date(year, month, day)
    },
    dateToString(date) {
      const YYYY = date.getFullYear()
      const MM = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))
      const DD = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
      return YYYY + '/' + MM + '/' + DD
    },
    isTheStringDateInTheArray(stringDate, arr) {
      let inArr = false
      if (arr !== []) for (const element of arr) (element.date === stringDate) ? inArr = true : null
      return inArr
    },
    isTheNumDayInDisableWeekdays(numDay, arr) {
      let inArr = false
      if (arr !== []) for (const element of arr) (element === numDay) ? inArr = true : null
      return inArr
    },
    stringDateToNumDay(stringDate) {
      return this.stringToDate(stringDate).getDay() + 1
    },
    checkWhichComponentToOpen(day) {
      if (this.isTheStringDateInTheArray(day, this.disableDays)) return 'DialogCalendarPersonal'
      if (this.isTheStringDateInTheArray(day, this.orderedEvents)) return 'DialogCalendarEvent'
      if (this.isTheNumDayInDisableWeekdays(this.stringDateToNumDay(day), this.disableWeekdays.weekdays)) return 'DialogCalendarDisableWeekDay'
      return 'DialogCalendarOpen'
    },
    exitUnsaved() {
      this.resetDisableWeekdays()
      this.resetDisableDays()
      this.resetOrderedEvents()
      this.$router.push('/feed')
    },
    async saveChanges() {
      await this.setDisableWeekdaysChefInBD()
      await this.setDisableDaysChefInBD()
      this.showCustom()
    },
    showCustom () {
      const dialog = this.$q.dialog({
        title: 'מעדכן.....',
        dark: false,
        message: '0%',
        progress: {
          spinner: QSpinnerGears,
          color: 'negative'
        },
        persistent: true, // we want the user to not be able to close it
        ok: false // we want the user to not be able to close it
      })

      // we simulate some progress here...
      let percentage = 0
      const interval = setInterval(() => {
        percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

        // we update the dialog
        dialog.update({
          message: `${percentage}%`
        })

        // if we are done...
        if (percentage === 100) {
          clearInterval(interval)

          dialog.update({
            title: 'הושלם!',
            message: `העדכון בוצע בהצלחה`,
            progress: false,
            ok: true , color:'negative'
          })
        }
      }, 500)
    }
  },
  async created() {
    // await this.getDisableWeekdaysChefFromBD(window.user.uid)
    // await this.getDisableDaysChefFromBD(window.user.uid)
    // await this.getYardOrdersFromBD(await this.getIdYardByIdChef(window.user.uid))
    await this.snapDisableWeekdaysChef( window.user.uid)
    await this.snapDisableDaysChefFromDB( window.user.uid)
    await this.snapYardOrdersFromBD( await this.getIdYardByIdChef(window.user.uid))
  }
}
</script>

<style scoped>

.calendar{
  margin: 2vw;
  background: #fff;
}


</style>

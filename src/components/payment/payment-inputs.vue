<!--<template>-->
<!--  <div class="payment-card">-->
<!--    <q-card flat borderedclass="card">-->
<!--      <q-card-section>-->
<!--        <div class="text-h5">פרטי לקוח</div>-->
<!--      </q-card-section>-->

<!--      <q-card-section class="inputs">-->
<!--        <input :placeholder="newUser.firstName||'שם פרטי'   " v-model="firstName" class="text-center fieldInput"/>-->
<!--        <input :placeholder="newUser.lastName||'שם משפחה'   " v-model="lastName" class="text-center fieldInput"/>-->
<!--        <input placeholder=" מספר ת.ז של בעל הכרטיס" v-model="idOfUser" class="text-center fieldInput"/>-->
<!--        <input placeholder="טלפון לבירורים" v-model="phone" class="text-center fieldInput"/>-->
<!--      </q-card-section>-->

<!--      <q-separator color="red" size="0.5px"/>-->

<!--      <q-card-section>-->
<!--        <div class="text-h5">פרטי תשלום</div>-->
<!--      </q-card-section>-->

<!--      <q-card-section class="inputs">-->
<!--        <input placeholder="אנא הזן פרטי כרטיס אשראי" v-model="creditCard" class="text-center fieldInput"/>-->
<!--        <input placeholder="תוקף" v-model="validity" class="text-center fieldInput"/>-->
<!--        <input placeholder="CVV" v-model="CVV" class="text-center fieldInput" maxlength="3"/>-->
<!--        <input placeholder="תשלומים" v-model="numOfPay" class="text-center fieldInput"/>-->
<!--      </q-card-section>-->

<!--      <q-separator color="red" size="0.5px"/>-->

<!--      <q-card-section>-->
<!--        <div class="text-h5">השלמת עסקה</div>-->
<!--      </q-card-section>-->

<!--      <q-card-section class="inputs">-->
<!--        <input placeholder="סכום עסקה:" v-model="sumOrder" type="number" class="text-center fieldInput"/>-->
<!--        <div>-->
<!--          <q-btn class="btn-circSquare myColor"-->
<!--                 style="align-items: center; justify-items: center;justify-content: center;" label="אישור ומעבר לתשלום"-->
<!--                 @click="slockOti()"></q-btn>-->
<!--        </div>-->
<!--      </q-card-section>-->

<!--    </q-card>-->
<!--  </div>-->
<!--</template>-->


<template>
  <div class="q-pa-md">
<!--    <q-btn label="Reset" push color="white" text-color="negative" @click="step = 1" class="q-mb-md"/>-->

    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      active-color="negative"
      done-color="negative"
      animated
    >
      <q-step
        :name="1"
        title="פרטי לקוח"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <div class="floating" v-for="input of inputsStep1">
          <input :id="input.id" class="floating__input" :type="input.type" :placeholder="input.placeholder" v-model="input.vModel"/>
          <label :for="input.id" class="floating__label" :data-content="input.dataContent">
            <span class="hidden--visually">input.id</span></label>
        </div>

        <q-stepper-navigation>
          <q-btn @click="() => { done1 = true; step = 2 }" color="negative" label="Continue"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="פרטי כרטיס אשראי"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <div class="floating" v-for="input of inputsStep2">
          <input :id="input.id" class="floating__input" :type="input.type" :placeholder="input.placeholder" v-model="input.vModel"/>
          <label :for="input.id" class="floating__label" :data-content="input.dataContent">
            <span class="hidden--visually">input.id</span></label>
        </div>


        <q-stepper-navigation>
          <q-btn @click="() => { done2 = true; step = 3 }" color="negative" label="Continue"/>
          <q-btn flat @click="step = 1" color="negative" label="Back" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="סיכום עסקה"
        icon="add_comment"
        :header-nav="step > 3"
      >
        <div class="floating" v-for="input of inputsStep3">
          <input :id="input.id" class="floating__input" :type="input.type" :placeholder="input.placeholder "v-model="input.vModel" readonly="readonly"  disabled="disabled"/>
          <label :for="input.id" class="floating__label" :data-content="input.dataContent">
            <span class="hidden--visually">input.id</span></label>
        </div>

        <q-stepper-navigation>
          <q-btn color="negative" @click="done3 = true" label="Finish"/>
          <q-btn flat @click="step = 2" color="negative" label="Back" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>


<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {QSpinnerGears} from "quasar";

export default {
  name: "payment-inputs",
  computed: {
    ...mapState('users', ['users', 'newUser']),
    ...mapState('order', ['orderId']),
    inputsStep3(){
      return [...this.inputsStep1,...this.inputsStep2]
    }
  },
  data() {
    return {
      inputsStep1: [{id: 'firstName', placeholder: 'firstName',vModel:"", dataContent: 'שם פרטי', type: 'text'},
        {id: 'lastName', placeholder: 'lastName',vModel:"", dataContent: 'שם משפחה', type: 'text'},
        {id: 'phone', placeholder: 'phone',vModel:"", dataContent: 'טלפון לבירורים', type: 'tel'},
      ],
      inputsStep2: [{id: 'idOfUser', placeholder: 'idOfUser',vModel:"", dataContent:'מספר ת.ז של בעל הכרטיס', type: 'number'},
        {id: 'creditCard', placeholder: 'creditCard',vModel:"", dataContent: 'אנא הזן פרטי כרטיס אשראי', type: 'number'},
        {id: 'validity', placeholder: 'validity',vModel:"", dataContent: 'תוקף', type: 'text'},
        {id: 'CVV', placeholder: 'CVV',vModel:"", dataContent: 'CVV', type: 'number'},
        {id: 'numOfPay', placeholder: 'numOfPay',vModel:"", dataContent: 'מספר תשלומים', type: 'number'},
        {id: 'sumOrder', placeholder: 'sumOrder',vModel:"", dataContent: 'סכום עסקה', type: 'number'},
      ],
      step: 1,
      firstName: null,
      lastName: '',
      idOfUser: '',
      phone: '',
      creditCard: '',
      validity: '',
      CVV: '',
      numOfPay: '',
      sumOrder: '',
    }
  },
  methods: {
    ...mapActions("order", ["updatePaymentToTrue"]),
    showCustom() {
      const dialog = this.$q.dialog({
        title: 'ממתין לאישור מחברת האשראי',
        dark: false,
        message: '0%',
        progress: {
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
            title: 'מצויין!',
            message: `התשלום בוצע בהצלחה`,
            progress: false,
            ok: true, color: 'negative'

          }).onOk(() => {
            this.$router.push('/feed')
          })
        }
      }, 500)
    },
    async slockOti() {
      debugger
      await this.updatePaymentToTrue(this.orderId)
      this.showCustom()
    }
  }
}
</script>

<style scoped>


.floating {
  /*margin-bottom: 2rem;*/
  margin: 20px 0;
  /*padding: 15px 15px;*/
  border-radius: 15px;
  border: none;
  background: #F6F7F9;
  color: #403e3e;
  align-items: center;
}

.floating:focus-within {
  outline: none;
  border: 2px solid #c01039;
}


.floating__input {
  padding: 1.8rem 1rem 0.6rem;
  font-size: 1rem;
  /*transition: border-color 0.2s ease;*/
  caret-color: #c01039;
}

.floating:hover .floating__input {
  border-color: rgba(0, 0, 0, 0.62);
}

.floating__input::placeholder {
  color: rgba(0, 0, 0, 0);
}

.floating__label {
  display: block;
  position: relative;
  max-height: 0;
  font-weight: 500;
  pointer-events: none;

}

.floating__label::before {
  color: #222;
  content: attr(data-content);
  display: inline-block;
  filter: blur(0);
  backface-visibility: hidden;
  transform-origin: left top;
  transition: transform 0.2s ease;
  left: 1rem;
  position: relative;
}

.floating__label::after {
  bottom: 1rem;
  content: "";
  height: 0.1rem;
  position: absolute;
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
  opacity 180ms cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
  opacity: 0;
  left: 0;
  top: 100%;
  margin-top: -0.1rem;
  transform: scale3d(0, 1, 1);
  width: 100%;
  background-color: #c01039;
}

.floating__input:placeholder-shown + .floating__label::before {
  transform: translate3d(0, -2.2rem, 0) scale3d(1, 1, 1);
}

.floating__label::before,
.floating__input:focus + .floating__label::before {
  transform: translate3d(0, -3.12rem, 0) scale3d(0.82, 0.82, 1);
}

.floating__input:focus + .floating__label::before {
  color: #c01039;

}

/* ---------------------------------------------- */
/* --  Codepen styles & resets - not required  -- */
/* ---------------------------------------------- */


input {
  background: none;
  border-width: 0;
  display: block;
  width: 100%;
}

fieldset {
  padding: 3rem 2rem 1.5rem;
}

legend {
  padding: 0 0.5rem;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.hidden--visually {
  border: 0;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}


/**{*/
/*  margin: 0;*/
/*  padding: 0;*/
/*}*/
.text-h5 {
  font-weight: bold;
}

q-page-container {
  padding-right: 0 !important;
}

.payment-card {
  height: 100%;
  width: 100%;
}

.inputs {
  display: flex;
  flex-direction: column;
}

.payment-card * {
  padding: 8px;
}

.pay-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-button * {
  /*background: linear-gradient(to left, #c01039, #dc1223 67%, #de1e1e 84%, #e02a19);*/
  font-weight: bold;
  color: #ffffff;
}


</style>

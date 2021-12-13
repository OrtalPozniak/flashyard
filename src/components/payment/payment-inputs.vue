<template>
  <div class=" q-pa-md" style="margin: 3vw;">
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
          <input :id="input.id" class="floating__input" :type="input.type" :placeholder="input.placeholder"
                 v-model="input.vModel" :readonly="input.readonly" :disabled="input.disabled"/>
          <label :for="input.id" class="floating__label" :data-content="input.dataContent">
            <span class="hidden--visually">input.id</span></label>
        </div>

        <q-stepper-navigation>
          <q-btn @click="() => { done1 = true; step = 2 }" color="negative" label="הבא" class="q-ma-md absolute-bottom-right"/>
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
          <input :id="input.id" class="floating__input" :type="input.type" :placeholder="input.placeholder"
                 v-model="input.vModel" :readonly="input.readonly" :disabled="input.disabled"/>
          <label :for="input.id" class="floating__label" :data-content="input.dataContent">
            <span class="hidden--visually">input.id</span></label>
        </div>
        <q-stepper-navigation>
          <q-btn @click="() => { done2 = true; step = 3 }" color="negative" label="הבא" class="q-ma-md absolute-bottom-right"/>
          <q-btn flat @click="step = 1" color="negative" label="חזור" class="q-ma-md absolute-bottom-left"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="סיכום עסקה"
        icon="add_comment"
        :header-nav="step > 3"
      >
        <div class="floating" v-for="input of inputsStep3">
          <input :id="input.id" class="floating__input" :type="input.type" :placeholder="input.placeholder "
                 v-model="input.vModel" :readonly="true" :disabled="true"/>
          <label :for="input.id" class="floating__label" :data-content="input.dataContent">
            <span class="hidden--visually">input.id</span></label>
        </div>

        <q-stepper-navigation>
          <q-btn color="negative" @click="finishPay" label="אשר עסקה" class="q-ma-md absolute-bottom-right"/>
          <q-btn flat @click="step = 2" color="negative" label="חזור" class="q-ma-md absolute-bottom-left"/>
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
    ...mapState('order', ['orderId', 'orderDetails']),
    inputsStep3() {
      return [...this.inputsStep1, ...this.inputsStep2]
    },
  },
  data() {
    return {
      sumDeal: 0,
      inputsStep1: [{
        id: 'firstName',
        placeholder: 'firstName',
        vModel: "",
        dataContent: 'שם פרטי',
        type: 'text',
        readonly: false,
        disabled: false
      },
        {
          id: 'lastName',
          placeholder: 'lastName',
          vModel: "",
          dataContent: 'שם משפחה',
          type: 'text',
          readonly: false,
          disabled: false
        },
        {
          id: 'phone',
          placeholder: 'phone',
          vModel: "",
          dataContent: 'טלפון לבירורים',
          type: 'tel',
          readonly: false,
          disabled: false
        },
      ],
      inputsStep2: [{
        id: 'idOfUser',
        placeholder: 'idOfUser',
        vModel: "",
        dataContent: 'מספר ת.ז של בעל הכרטיס',
        type: 'number',
        readonly: false,
        disabled: false
      },
        {
          id: 'creditCard',
          placeholder: 'creditCard',
          vModel: "",
          dataContent: 'אנא הזן פרטי כרטיס אשראי',
          type: 'number',
          readonly: false,
          disabled: false
        },
        {
          id: 'validity',
          placeholder: 'validity',
          vModel: "",
          dataContent: 'תוקף',
          type: 'text',
          readonly: false,
          disabled: false
        },
        {
          id: 'CVV',
          placeholder: 'CVV',
          vModel: "",
          dataContent: 'CVV',
          type: 'number',
          readonly: false,
          disabled: false
        },
        {
          id: 'numOfPay',
          placeholder: 'numOfPay',
          vModel: "",
          dataContent: 'מספר תשלומים',
          type: 'number',
          readonly: false,
          disabled: false
        },
      ],
      step: 1,
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
    async finishPay() {
      debugger
      await this.updatePaymentToTrue(this.orderId)
      this.showCustom()
    }
  },
  created() {
    this.sumDeal = this.orderDetails.totalPrice
    let sumOrder = {
      id: 'sumOrder',
      placeholder: 'sumOrder',
      vModel: `${this.sumDeal}`,
      dataContent: 'סכום עסקה',
      type: 'text',
      readonly: true,
      disabled: true
    }
    this.inputsStep2.push(sumOrder)
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

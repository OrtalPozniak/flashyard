<template>
  <div class=" page row items-start q-gutter-md " >
    <q-card class="centerBoxPos shadowBox boxWidth" >
      <q-card-section class="text-white" style="background:linear-gradient(to right,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);
">
        <q-resize-observer @resize="setAtr()"/>
        <div align="center" class="text-h6">הרשמה</div>
      </q-card-section>

      <q-separator/>
      <div style="width: 90%" align="center">
      <div class="q-pa-md" style="padding-top: 5vh;" align="left">

        <q-form
          class="q-gutter-md topSpaceForm"
        >
          <div >
            <q-avatar icon="person" size="75px"/>
            <q-input
              filled
              required
              style=" display:inline-grid; width:70%"
              v-model="email"
              label='דוא"ל'
              lazy-rules
              :rules="[ val => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val) || 'אנא מלא/י דואר אלקטרוני']"
            />
          </div>

          <div >
            <q-avatar icon="vpn_key" size="75px"/>
            <q-input
              filled
              required
              style=" display:inline-grid; width:70%"
              type="Password"
              v-model="password"
              label="סיסמה"
              lazy-rules
              :rules="[
            val => val !== null && val.length > 5 || 'הקש/י סיסמה']"
            />
          </div>
          <div >
            <q-input
              filled
              required
              style=" display:inline-grid; width:70%"
              type="firstName"
              v-model="firstName"
              label="שם פרטי"
              lazy-rules
              :rules="[ val => val.length >= 2 || 'מלא/י שם פרטי']"
            />
          </div>
          <div >
            <q-input
              filled
              required
              style=" display:inline-grid; width:70%"
              type="lastName"
              v-model="lastName"
              label="שם משפחה"
              lazy-rules
              :rules="[ val => val.length >= 2 || 'מלא/י שם משפחה']"
            />
          </div>

          <div>
            <q-separator style="display: inline-grid; width:90%"/>
          </div>

          <q-card-actions align="center">
            <q-btn @click="createUserWithEmailAndPassword(email,password,firstName,lastName,isAChef,imgUrl)" class="text-white btnAction" label="הירשם"/>
          </q-card-actions>

        </q-form>

      </div>
</div>

    </q-card>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "SignUp",

  data(){
    return{
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      isAChef:false,
      imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg44qs6kg-JW8XJHY46oh18JFtuKUGHDr_x-NkhZAnFs0eFBZ0ytygPLXfYDHJj5XuzhE&usqp=CAU'
    }
  },

  methods: {
    ...mapActions('users',['createUserWithEmail','setUserDataToLocal']),
    ...mapMutations('users',['changeSignUp']),

    async createUserWithEmailAndPassword(email, password, firstName, lastName,isAChef,imgUrl) {
      await this.createUserWithEmail({email, password, firstName, lastName,isAChef,imgUrl})
      await this.setUserDataToLocal()
      await this.$router.push('/about')
    },
    /*****************setNavToTop****************
     *setAtr() is responsive to place the nav on top*
     ***********************************************/
    setAtr(){
      const navPos = document.querySelector('.text-white');
      if (window.innerWidth <= 1000) navPos.classList.add('fixed-top');
      else navPos.classList.remove('fixed-top');
    }
  }

}
</script>


<style scoped>
.topSpaceForm{
  margin-top: 5vh;
}



</style>

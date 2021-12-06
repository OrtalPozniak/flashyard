<template>
  <div>
    <div class="text-center allPage" style="flex-direction: column;">
      <div class="topDiv">
        <div>
          <div style=" padding-top: 5vw;">
            <q-avatar size="100px" class="avatarProfile">
              <img style="width: 100%;" :src="newUser.imgUrl" alt="profile avatar picture">
            </q-avatar>
          </div>
          <div class="text-center txt">
            שלום {{this.newUser.firstName}}
          </div>
        </div>
      </div>
      <div id="frame">
        <div :class="getMenuCSS()">
          <div @click="show()" class="circle">
            <i class="fa fa-bars hamburg"></i>
          </div>
          <template  v-for="n in numOfCircles">
            <transition :name="'fade-' + n">
              <div v-show="active" :class="'circle circle-' + n">
                  <i :class="getIconCSS(n)" @click="passTo(n)"></i>
              </div>
            </transition>
          </template>
        </div>
      </div>
      <div class="boxAfter"></div>
    </div>
    <div class="text-center">
      <component v-show="showComp" :is="compToShow"></component>
    </div>
  </div>

</template>

<script>
import Calendar from "components/MyProfile/Calendar";
import historyOrders from "components/MyProfile/HistoryOrders";
import personalSettings from "components/MyProfile/PersonalSettings";
import customerService from "components/MyProfile/CustomerService";
import {mapActions, mapMutations, mapState} from "vuex";
import FS from "src/middleware/firestore";

import HistoryOrders from "components/MyProfile/HistoryOrders";
export default {
  name: "MyProfile",
  components: {Calendar,historyOrders,personalSettings,customerService},
  data: function () {
    return {
      active: false,
      compToShow:'',
      showComp:false,
      numOfCircles: 3,
      imageUrl:''
    };
  },
  computed:{
    ...mapState('users',['users','newUser']),
  },
  methods:{
    ...mapMutations('users',['pushPhoto']),
    ...mapActions('users',['createProfile','updateProfile']),
    getMenuCSS: function () {
      return "menu circle " + (this.active ? "active" : "");
    },
    getIconCSS: function (n) {
      let icon = "";
      switch (n) {
        case 1:
          icon = "fa-user";
          break;
        case 2:
          icon = "fa-cog";
          break;
        case 3:
          icon = "fa-shopping-cart";
          break;
        case 4:
          icon = "fa-calendar";
      }
      return "fa " + icon;
    },
    passTo: function(btnPressed){
      switch (btnPressed) {
        case 1:
          this.compToShow = 'customerService'
          this.showThis()
          break;
        case 2:
          this.compToShow = 'personalSettings'
          this.showThis();
          break;
        case 3:
          this.compToShow = 'historyOrders'
          this.showThis();
          break;
        case 4:
          this.compToShow = 'Calendar'
          this.showThis();
          break;
      }
    },
    showThis: function (){
      this.showComp = !this.showComp
    },
    show: function () {
      if (this.showComp){
        this.showComp = false;
      }
      this.active = !this.active;

    },
    circlesToShow: async function(){
      let businessClient = localStorage.getItem('isAChef');
      if (businessClient=="true"){
         this.numOfCircles = 4;
      }else {
        this.numOfCircles = 3;
      }
    },
    initProfile:async function (){
      const idU = localStorage.getItem('uid')
      console.log(idU)
      let profileData = await FS.users.getUserById(idU)
      // this.imageUrl = this.newUser.imgUrl
      this.imageUrl = profileData.imgUrl
      if (profileData.imgUrl) {
        await this.pushPhoto(profileData.imgUrl)
        // await this.createProfile(profileData.imgUrl)
      }
    }
  },

  created() {
    this.circlesToShow();
    this.initProfile();
  }
}
</script>

<style scoped>


.topDiv{
  background: linear-gradient(to left, #4C0305FF,#7d0b15 30%,#de1e1e 84%,#e02a19);
}
.boxAfter:after{
  height:100px;
  width:100%;
  left:0;
  top:-35px;
  transform: skewY(-3deg);
  background: linear-gradient(to left,#4C0305FF,#7d0b15 30%,#de1e1e 84%,#e02a19);
  z-index:1;
  content: "";
  margin-top: -70px;
  display: inline-block;
  position: relative;
}
.txt{
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  color: #fff;
  margin-top: 2vw;
  padding-bottom: 4vw;
}
.allPage .boxAfter{
  background-color: #fff;
  min-height: 150px;
  margin-bottom: 3%;
  z-index: 1;
  position: relative;
  color: #222;
  padding-top: 0px;
}

</style>

<style lang="scss">
//menu button
// Trigonometry helper functions!
@function pi() {
  @return 3.14159265359;
}

@function fact($number) {
  $value: 1;
  @if $number > 0 {
    @for $i from 1 through $number {
      $value: $value * $i;
    }
  }
  @return $value;
}

@function rad($angle) {
  $unit: unit($angle);
  $unitLess: $angle / ($angle * 0 + 1);
  @if $unit == deg {
    $unitLess: $unitLess / 180 * pi();
  }
  @return $unitLess;
}

@function pow($number, $exp) {
  $value: 1;
  @if $exp > 0 {
    @for $i from 1 through $exp {
      $value: $value * $number;
    }
  } @else if $exp < 0 {
    @for $i from 1 through -$exp {
      $value: $value / $number;
    }
  }
  @return $value;
}

@function sin($angle) {
  $sin: 0;
  $angle: rad($angle);
  @for $i from 0 through 10 {
    $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
  }
  @return $sin;
}

@function cos($angle) {
  $cos: 0;
  $angle: rad($angle);
  @for $i from 0 through 10 {
    $cos: $cos + pow(-1, $i) * pow($angle, 2 * $i) / fact(2 * $i);
  }
  @return $cos;
}

@function tan($angle) {
  @return sin($angle) / cos($angle);
}

@mixin shadow($prop) {
  -moz-box-shadow: $prop;
  -webkit-box-shadow: $prop;
  box-shadow: $prop;
}

// Styles!
:root {
  --font: white;
  --bg: white;
  --circle: #990e1a;
  --circle-main: #990e1a;
}

html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  overflow-x: hidden;
  .fa {
    color: var(--font);
  }

  .title {
    position: absolute;
    top: 7.5%;
    width: 100%;
    text-transform: uppercase;
  }
}

#frame {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-left: 70%;
}

$circle-count: 4;
$circle-size: 2.5rem;
$circle-margin: $circle-size * 2;

.circle {
  position: absolute;
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  background: var(--circle);
  opacity: 1;
  @include shadow(0px 0px 10px 0px rgba(0, 0, 0, 0.25));

  > i {
    position: relative;
    display: block;
    font-size: inherit;
    line-height: $circle-size;
    margin: 0;
    text-align: center;
  }
}

.hamburg{
  margin: -8px !important;
}
.menu {
  position: relative;
  width: $circle-size;
  height: $circle-size;

  > .circle {
    font-size: $circle-size / 2 - 0.25;
    z-index: 900;
    cursor: pointer;
  }

  > .circle:first-child {
    position: relative;
    font-size: 25px;
    width: 100%;
    height: 100%;
    $button-size: ($circle-size / 6);
    cursor: pointer;
    z-index: 9999;
    border: $button-size solid #990e1a;
    background: #990e1a;
    transition: all 0.25s ease-in;

  }
}

.menu.active {
  > .circle:first-child {
    background: var(--circle-main);
    border-color: var(--circle-main);
  }
}

@for $n from 1 through $circle-count {
  .circle-#{$n} {
    $angle: $n * (pi() * 1.1 / $circle-count);
    top: $circle-margin * sin($angle);
    left: $circle-margin * cos($angle)-0.5;
  }

  // VUE Transitions!
  $transition-time: 0.15s;
  .fade-#{$n}-enter-active {
    transition: all ($n * $transition-time) cubic-bezier(0.5, 1.5, 0.5, 1);
  }

  .fade-#{$n}-leave-active {
    transition: all
    (($circle-count - $n) % $circle-count + 1) *
      $transition-time
    cubic-bezier(0.5, -1, 0.5, 1);
  }

  .fade-#{$n}-enter,
  .fade-#{$n}-leave-to {
    top: 0 !important;
    left: 0 !important;

    $angle: $n * (pi() * 1.1 / $circle-count);
    transform: scale(0),
    translate(
        ($circle-margin) * sin(-$angle),
        ($circle-margin) * cos(-$angle)
    );
  }
}
</style>


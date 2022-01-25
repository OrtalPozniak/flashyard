<template>
  <div class=" menuChanger shadowBox fontWeb BGContact" >
    <div >
      <h6 class="headline" style="color: #fff;margin: 2vw 0;">נשמח לעמוד לשירותכם בכל עת</h6>
    </div>
    <div class="socialIcon text-center" >
      <ul >
        <li><a href="mailto:ortalp@post.bgu.ac.il" target="blank"> <img src="../../../src/assets/emailAndPhone.png" alt="email logo" width="35px;">
        </a>
        </li>
        <li><a href="https://www.google.com/maps/place/FLASHDEV/@32.0875211,34.8057788,17z/data=!3m1!4b1!4m5!3m4!1s0x151d4b2b3de81f67:0x85732a75f1e756c9!8m2!3d32.0875166!4d34.8035901" target="blank">
          <img src="../../../src/assets/location.png" alt="location logo" width="45px;">
        </a>
        </li>
        <li><a href="tel:+972544713332" target="blank"> <img src="../../../src/assets/phone.png" alt="phone logo" width="35px;">
        </a>
        </li>
      </ul>
        <q-btn flat label="צא" color="red-10" v-close-popup/>
    </div>
  </div>

</template>

<script>
export default {
  name: "CustomerService"
}
</script>

<style scoped>
ul>li{
  display: inline-block;
  list-style: unset;
  margin-right: 1vw;
}
.BGContact{
  background-size:cover;
  background-image: linear-gradient(to right top, rgba(250, 250, 250, 0.7),rgba(24, 12, 12, 0.5)),url('https://i.pinimg.com/564x/ec/d4/d3/ecd4d30be14e19642678d640d6772139.jpg');
  background-repeat: no-repeat;
  background-position:center;
}
a > img:hover{
  transform: translate(0  , -7px) ;
  opacity: 1;
  transition: 1s , 1s;
  animation-iteration-count: 3;
}
</style>

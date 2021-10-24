<template>
  <div class="text-center allPage" style="flex-direction: column;">
    <div class="topDiv">
      <div>
          <div style=" padding-top: 5vw;">
            <q-avatar size="100px" class="avatarProfile">
              <img style="width: 100%;" src="https://scontent.ftlv2-1.fna.fbcdn.net/v/t1.6435-9/117889553_10157682616116304_2645793394153247633_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=f5acFWlp6fMAX9SLrVS&_nc_ht=scontent.ftlv2-1.fna&oh=3e2885ac6b8520a13be4eb8d8c91493a&oe=6194A40C">
            </q-avatar>
          </div>
        <div class="text-center txt" style="margin-top: 2vw;padding-bottom: 4vw;">
          שלום {{this.newUser.firstName}}
        </div>
      </div>
    </div>

    <div class="boxAfter"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "About",
  computed:{
    ...mapState('users',['users','newUser'])
  }
}
</script>

<style scoped>
.avatarProfile{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.avatarProfile:hover img {
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  -webkit-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
}
.avatarProfile span:hover img {
  -webkit-transform: scale(1);
  transform: scale(1);
}
.topDiv{
  background: linear-gradient(to left,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);
}
.boxAfter:after{
  height:100px;
  width:100%;
  left:0;
  top:25px;
  transform: skewY(-3deg);
  background: linear-gradient(to left,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);;
  z-index:100;
  content: "";
  margin-top: -70px;
  display: inline-block;
  position: relative;
}
.txt{
  font-family: 'Rubik', sans-serif;
}
  .allPage .boxAfter{
    background-color: #fff;
    min-height: 303px;
    z-index: 1;
    position: relative;
    color: #222;
    padding-top: 0px;
  }

</style>

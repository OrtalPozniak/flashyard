<template >
  <div class="page">
    <div style=" position: relative;display: flex;
        flex-direction: column;width: 100vw;height: 100vh;">
      <div class= "aboutSectionTop ">
      </div>
      <div class="aboutSectionMid " >
        <h5 class="text-center headline" style="color: #FFFAF0;">קצת עלינו</h5>
        <p class="blockText text-center fontWeb">
          גרים בבית פרטי עם שטח לא מנוצל? מחפשים חצר נחמדה וגדולה לאירוע חברתי כלשהו?<br>
          כאן ב-FlashYard אנו דואגים לקשר ביניכם בקליק.<br>
          הפלטפורמה מעניקה לשף יכולת לפרסם את החוויה הקולינרית שהוא מארח אצלו בחצר.<br>
          אז מי אנחנו? "FlashYard" זהו סטארטאפ מבית התוכנה ״FlashDev״<br>
          הפרוייקט נבנה כחלק מסטאז׳ לאחר ההכשרה ע״י צוות של 3 מתכנתים רעבים.<br>
          אנחנו מתרגשים לפשט את תהליך החיפוש עבורכם בעזרת התוכנה שלנו ולהפוך אותו לנגיש יותר.
        </p>
      </div>
      <div class="aboutSectionDown">
        <h5 class="text-center headline" style="color: rgb(71,29,31);font-family: Rubik;">הצוות שלנו</h5>

        <div class="meetTeam">
          <li>
            <div class="ch-item">
              <div class="ch-info">
                <div class="ch-info-front ch-img-1"></div>
                <div class="ch-info-back">
                  <h6>Ortal Pozniak</h6>
                  <div class="socialIcon">
                    <ul>
                      <li>
                        <a href="https://github.com/OrtalPozniak" target="blank">
                          <img src="../assets/github.png" alt="GitHub logo">
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/in/ortal-pozniak/" target="blank">
                          <img src="../assets/linkedin.png" alt="Linkedin logo">
                        </a>
                      </li>
<!--                      <li>-->
<!--                       <a href="http://www.pozniakltd.com/ortalPozniak/" target="_blank">View on my portfolio</a>-->
<!--                      </li>-->
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </li>
          <li>
            <div class="ch-item">
              <div class="ch-info">
                <div class="ch-info-front ch-img-2"></div>
                <div class="ch-info-back">
                  <h6>David Levy</h6>
                  <p><a href="https://www.google.com">Ask the Rabi</a></p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="ch-item">
              <div class="ch-info">
                <div class="ch-info-front ch-img-3 shadowPic"></div>
                <div class="ch-info-back">
                  <h6>Haim Karva</h6>
                  <div class="socialIcon">
                    <ul>
                      <li>
                        <a href="https://www.linkedin.com/in/haim-karva-572549aa/" target="blank">
                          <img src="../assets/linkedin.png" alt="Linkedin logo">
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/OrtalPozniak" target="blank">
                          <img src="../assets/github.png" alt="GitHub logo">
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "About",

}
</script>

<style scoped>
*{;
  padding: 0;
  margin: 0;
  /*overflow-x: hidden;*/
}
.aboutSectionTop{
  background: linear-gradient(to left,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);
}
.meetTeam{
  display: flex;
  justify-content: center;
  align-items: center;
  /*padding: 2vw;*/
  margin-bottom: 10vw;
}
.aboutSectionMid{
  height: 55vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image:  linear-gradient( rgba(234, 11, 11, 0.5),rgba(24, 12, 12, 0.9)),url("https://cf.ltkcdn.net/garden/images/orig/257825-2121x1414-family_back_yard.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
p{
  color: #FFFAF0;
  font-family: 'Palanquin Dark',sans-serif;
  letter-spacing: 1px;
}
p.blockText{
  /*margin-left: auto;*/
  /*margin-right: auto;*/
  margin: 3vw;
  padding-bottom: 5vw;
  width: 60vw;
  font-size:medium;
  font-weight: bold;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.aboutSectionDown{
  height: 55vh;
  background: white;
  color: #FFFAF0;
}
.shadowPic{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 20px 0 rgba(0, 0, 0, 0.7);
}
h5{
  /*padding-top: 3vw;*/
  margin:3vw 0 0 3vw;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.4);
}

/*avatar effect picture*/
li>.ch-item{
  width: 160px;
  height: 160px;
  margin: 1vw;
}
.ch-item {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  cursor: default;
  perspective: 900px;
}
.ch-info{
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.ch-info > div {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-position: center center;
  transition: all 0.4s linear;
  transform-origin: 50% 0%;
}
.ch-info .ch-info-front {
  box-shadow: inset 0 0 0 3px rgba(0,0,0,0.3);
}
.ch-info .ch-info-back {
  transform: translate3d(0,0,-220px) rotate3d(1,0,0,90deg);
  background-image:  linear-gradient( rgba(234, 11, 11, 0.5),rgba(24, 12, 12, 0.9)),url("https://cf.ltkcdn.net/garden/images/orig/257825-2121x1414-family_back_yard.jpg");
  opacity: 0;
}
.ch-img-1 {
background-image: url(../assets/ortal.jpg);
background-size: cover;
}

.ch-img-2 {
  background-image: url(../assets/david.jpeg);
  background-size: cover;
}

.ch-img-3 {
  background-image: url(../assets/haim.jpeg);
  background-size: cover;
}

.ch-info h6 {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: medium;
  margin: 0 0;
  padding: 15px 20% 0 20%;
  height: 110px;
  font-family: 'Open Sans', Arial, sans-serif;
  text-shadow:
    0 0 1px #fff,
    0 1px 2px rgba(0,0,0,0.3);
}

.ch-info p {
  color: #fff;
  padding: 10px 5px;
  font-style: italic;
  margin: 0 30px;
  font-size: 12px;
  border-top: 1px solid rgba(255,255,255,0.5);
}

.ch-info p a {
  display: block;
  color: rgba(255,255,255,0.7);
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 1px;
  padding-top: 4px;
  font-family: 'Open Sans', Arial, sans-serif;
}

.ch-info p a:hover {
  transform: scale(1.3);
}

.ch-item:hover .ch-info-front {
  transform: translate3d(0,280px,0) rotate3d(1,0,0,-90deg);
  opacity: 0;
}
.ch-item:hover .ch-info-back {
  transform: rotate3d(1,0,0,0deg);
  opacity: 1;
}

.socialIcon{
  /*display: inline-block;*/
  margin-left: 30%;
}
ul > li{
  display: inline-block;
}
li{
  margin-left: 0.5vw;
}
a > img{
  height: 1rem;
  width:1rem;
}

</style>

<template >
  <div class="page">
    <div style=" position: relative;display: flex;
        flex-direction: column;width: 100vw;height: 100vh;">
      <div class= "aboutSectionTop ">
      </div>
      <div class="aboutSectionMid " >
        <h5 class="text-center" style="color: #FFFAF0;font-family: Rubik;">קצת עלינו</h5>
        <p class="blockText text-center">
          גרים בבית פרטי עם שטח לא מנוצל? מחפשים חצר נחמדה וגדולה לאירוע חברתי כלשהו?<br>
          כאן ב-FlashYard אנו דואגים לקשר ביניכם בקליק.<br>
          הפלטפורמה מעניקה לשף יכולת לפרסם את החוויה הקולינרית שהוא מארח אצלו בחצר.<br>
          אז מי אנחנו? "FlashYard" זהו סטארטאפ מבית התוכנה ״FLASHDEV״<br>
          הפרוייקט נבנה כחלק מסטאז׳ לאחר ההכשרה ע״י צוות של 3 מתכנתים רעבים.<br>
          אנחנו מתרגשים לפשט את תהליך החיפוש עבורכם בעזרת התוכנה שלנו ולהפוך אותו לנגיש יותר.
<!--          לורם איפסום הוא כינוי לטקסט חסר משמעות לחלוטין - הנקרא לפעמים גם דמי טקסט או ג'יבריש - ומיועד להיות ממוקם בסקיצות עיצוביות - של עלונים, מגזינים, מודעות, אתרי אינטרנט וכו' - במקום הטקסט האמיתי הסופי - עד שיהיה טקסט אמיתי.-->
<!--          אם בשלב הסקיצה העיצובית עדיין לא קיים הטקסט הרלוונטי, לא מומלץ למקם טקסט אמיתי אחר. הסיבה היא, כי בעת הצגת סקיצה עם טקסט אמיתי קריא, יתחיל הצופה לקרוא אוטומטית את הטקסט, ואם תוכן הטקסט לא רלוונטי לעבודה המוצגת - הדבר יסיח את דעתו מהעיצוב.-->
        </p>
      </div>
      <div class="aboutSectionDown">
        <h5 class="text-center"  style="color: #683a5d;font-family: Rubik;">הצוות שלנו</h5>

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
*{
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
.aboutSectionTop{
  background: linear-gradient(to left,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);
}
.meetTeam{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  margin-bottom: 10vw;
}
.aboutSectionMid{
  height: 55vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image:  linear-gradient(rgba(147, 4, 4, 0.6), rgba(116, 33, 33, 0.6)),url("https://dd6zdpp5d7qwx.cloudfront.net/wp-content/uploads/2018/09/10102455/39316783_l-1024x510.jpg");
  background-size: cover;
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
  width: 60vw;
  font-size:small;
  font-weight: bold;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.aboutSectionDown{
  height: 55vh;
  background: #FFFAF0;
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
  background-image: linear-gradient(rgba(147, 4, 4, 0.6), rgba(116, 33, 33, 0.6)),url("https://dd6zdpp5d7qwx.cloudfront.net/wp-content/uploads/2018/09/10102455/39316783_l-1024x510.jpg");
  opacity: 0;
}
.ch-img-1 {
  background-image: url("https://scontent.fsdv3-1.fna.fbcdn.net/v/t31.18172-8/21731706_10154909619666304_4633877268999875945_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_ohc=H3gpKcGcqncAX-UZgR8&_nc_ht=scontent.fsdv3-1.fna&oh=93eaa71b826aa64deb830461bb152e0d&oe=61BAA17B");
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
  display: inline-block;
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

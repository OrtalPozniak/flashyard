<template>
  <div class="container">
    <div class="q-gutter-md text-center" style="max-width: 400px">
      <h1 v-if="!newUser.yardId">הוסף חצר</h1>
      <h1 v-else> החצר שלי </h1>
      <q-dialog v-model="uploading">
        <img src="../../assets/image_upload.gif"/>
      </q-dialog>
      <div>
        <input
          name="yardName"
          v-model="localEditedYard.yardName"
          type="text"
          class="fieldInput"
          placeholder="שם החצר"
          pattern="[A-Za-z]"/>
        <input name="location"
               v-model="localEditedYard.location"
               type="text" class="fieldInput"
               placeholder="מיקום"
               pattern="[A-Za-z]"
               required
        />
        <div class="rangeField">כמות סועדים
          <q-range
            color="negative"
            v-model="localEditedYard.peopleRange"
            :min="10"
            :max="250"
            :step="1"
            label-always
            localEditedYard.peopleRange
          />
        </div>

        <div class="space">
          <q-select
            class="rangeField "
            multiple
            emit-value
            map-options
            v-model="localEditedYard.foodCategory"
            :options="foodCatOpt"
            use-chips
            stack-label
            label="קטגוריות אוכל"
            rounded
            borderless
            lazy-rules
            :rules="[selectionRules]"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
                color="white"
                text-color="negative"
                class="q-ma-none"
              >
                <q-avatar color="negative" text-color="white" :icon="scope.opt.icon"/>
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
        <q-file borderless multiple class="rangeField"
                @input="uploadImg($event)"
                v-model="images"
                label="תמונות של המקום">
          <template v-slot:prepend>
            <q-icon name="cloud_upload"/>
          </template>
        </q-file>
        <div class="images_section">
          <ul class="imagesScroll">
            <li class="item" v-for="(image,index) in localEditedYard.imagesUrl">
              <q-img class="img shadowBox" :src="image" style="border-radius: 8px;">
                <div class="img_action_container">
                  <q-avatar class="image_actions" color="red" icon="delete" @click="deleteImg(index)">
                    <q-tooltip>
                      מחק תמונה
                    </q-tooltip>
                  </q-avatar>
                  <q-avatar class="image_actions" color="green" icon="image" @click="makeCover(index)">
                    <q-tooltip>
                      הגדר כפרופיל
                    </q-tooltip>
                  </q-avatar>
                </div>
              </q-img>
            </li>
          </ul>
        </div>
        <div class="img_cover">
          <q-img class="img shadowBox" :src="localEditedYard.cover" style="border-radius: 8px;">
            <div class="absolute-bottom text-subtitle1 text-center">
              תמונת פרופיל
            </div>
          </q-img>
        </div>
        <input name="price" v-model="localEditedYard.pricePerHead" type="number" placeholder=" מחיר פר סועד (בשקלים)"
               class="fieldInput"
               min="10" max="100"/>
        <textarea v-model="localEditedYard.placeDesc" class="fieldInput" placeholder="פרטים על המקום"/>
        <div>
          <button :disabled="btn_status" v-if="!newUser.yardId" class="btn myColor btn-circSquare" @click="createYard">הוסף חצר
          </button>
          <button v-else :disabled="btn_status" class="btn myColor btn-circSquare" @click="updatedYard">עדכן חצר</button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";
import FS from "../../middleware/firestore"

export default {
  name: "addYardForm",
  computed: {
    ...mapState('yards', ['yards','editedYard', 'foodCatOpt']),
    ...mapState('users',['newUser'])
  },
  data() {
    return {
      uploading:false,
      localEditedYard: {
        uidChef: '',
        yardName: '',
        peopleRange: {
          min: 10,
          max: 250
        },
        location: '',
        pricePerHead: '',
        foodCategory: [],
        placeDesc: '',
        cover: '',
        imagesUrl: []
      },
      uploadStatus: 0,
      uploadImage:'' ,
      btn_status: false,
      images: [],
      clicked:false
    }
  },
  methods: {
    ...mapActions('users',["setUserDataToLocal"]),
    ...mapActions('yards', ["insertYard", "createYardId", "reset", "setEditedYardById", "updateYard", 'getFoodCategory']),
    ...mapMutations('yards', ['setEditedYardId', 'setEditedYard']),
    selectionRules(val) {
      if (val.length <= 0)
        return 'עליך לבחור קטגוריה אחת לפחות'
    },
    async uploadImg(event) {
      this.uploadStatus = 0;
      this.uploading=true;
      this.localEditedYard.imagesUrl=await FS.yards.uploadYardsImages({
        images: event,
        yardId: this.localEditedYard.id
      })
      console.log(this.localEditedYard.imagesUrl)
      setTimeout(()=>{
        this.uploading=false
      },1500)
    },
    async deleteImg(index) {
      try{
        if(this.localEditedYard.imagesUrl[index]===this.localEditedYard.cover)
        {
          this.localEditedYard.cover='https://firebasestorage.googleapis.com/v0/b/flashyard2.appspot.com/o/yardsImages%2Fhaim%2FWrVuYKAs5vVX3soCVh9h%2FWrVuYKAs5vVX3soCVh9h_458.59621776990434?alt=media&token=77832530-0d80-4d23-8aa3-776dfb593206'
        }
        this.localEditedYard.imagesUrl= await FS.yards.deleteYardsImages(this.localEditedYard.imagesUrl[index])
      }
      catch (ex)
      {
        console.log('error',ex)
      }
    },
    makeCover(index) {
      this.localEditedYard.cover =this.localEditedYard.imagesUrl[index]

    },

    async createYard() {
      this.clicked = true
      this.localEditedYard.uidChef = window.user.uid
      this.setEditedYard(this.localEditedYard)
      await this.insertYard()
      await this.setUserDataToLocal()
      await this.$parent.$emit('xx')
      await this.$router.push('/Feed')
    },
    async updatedYard() {
      debugger
      this.setEditedYard(this.localEditedYard)
      await this.updateYard().then(() => {
        this.$router.push('/feed')
      })
    },
    async init_page() {
      if(!this.foodCatOpt.length){
        await this.getFoodCategory()
      }
      if(this.$route.params.id)
      {
        const id=this.$route.params.id;
        this.setEditedYardId(id)
        await this.setEditedYardById()
        Object.assign(this.localEditedYard,this.editedYard)
      }
      else{
        this.localEditedYard.id=await this.createYardId()
      }
    },
  },
  created() {
    this.init_page()
  },
  destroyed() {
    this.reset()
  }
}
</script>

<style scoped>
* {

}

h1 {
  font-weight: bold;
  font-size: xx-large;
  font-family: Rubik;
  /*padding: 10px;*/
  color: #403e3e;

}

.image_actions {
  margin-left: 20px;
  margin-right: 20px;
}

.container {
  margin: 15px 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 15px 15px 15px 15px;
}

.space {
  margin-top: 20px;
  margin-bottom: 20px;
}

.fieldInput {
  font-weight: bold;
  font-size: medium;
  width: 100%;
  max-width: 100%;
  margin: 20px 0;
  height: 50px;
  padding: 15px 15px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #F6F7F9;
  color: #757575;
}

.rangeField {
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  margin: 15px 0;
  height: 75px;
  padding: 10px 10px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #F6F7F9;
  color: #757575;
}

::placeholder {
  padding-right: 50px;
}


.btn {
  font-weight: bold;
  width: 230px;
  margin: 0 35px 20px;
  height: 45px;
  padding: 6px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #111111;
  color: white;
  font-size: 14px;
}

.images_section {
  max-width: 100%;
  width: calc(100% - 20px);
  margin-left: 30px;
  margin-right: 30px;
}

.imagesScroll {
  display: flex;
  padding: 20px;
  overflow-x: scroll;
  list-style: none;
  border: 5px solid #fff;
  /*background-color: #181818;*/
  padding: 20px;
  border-radius: 12px;
}



.item {
  display: block;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  border-radius: 8px;
  font-size: 32px;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 1);
  height: 150px;
  max-width: 125px;
  /*/ / width: 125 px;*/
  flex-shrink: 0;
  flex: 1 0 45%;
  margin: 5%;
}

.img:hover .img_action_container {
  display: block;
}

.img_action_container {
  display: none;
  height: 100%;
}

.img_cover {
  align-items: center;
  color: #fff;
  border-radius: 8px;
  font-size: 32px;
  height: 150px;
  max-width: 364px;
  flex-shrink: 0;
  flex: 1 0 45%;
  margin: 5%;
}

.img {
  width: 100%;
  height: 100%;
}
</style>

<!--<template>
  <div class="container">
    <div class="q-gutter-md text-center" style="max-width: 400px">
      <h1 v-if="!newUser.yardId">הוסף חצר</h1>
      <h1 v-else> החצר שלי </h1>
      <div>
        <input
          name="yardName"
          v-model="localEditedYard.yardName"
          type="text"
          class="fieldInput"
          placeholder="שם החצר"
          pattern="[A-Za-z]"/>
        <input name="location"
               v-model="localEditedYard.location"
               type="text" class="fieldInput"
               placeholder="מיקום"
               pattern="[A-Za-z]"
               required
        />
        <div class="rangeField">כמות סועדים
          <q-range
            color="negative"
            v-model="localEditedYard.peopleRange"
            :min="10"
            :max="250"
            :step="1"
            label-always
            localEditedYard.peopleRange
          />
        </div>

        <div class="space">
          <q-select
            class="rangeField "
            multiple
            emit-value
            map-options
            v-model="localEditedYard.foodCategory"
            :options="foodCatOpt"
            use-chips
            stack-label
            label="קטגוריות אוכל"
            rounded
            borderless
            lazy-rules
            :rules="[selectionRules]"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
                color="white"
                text-color="negative"
                class="q-ma-none"
              >
                <q-avatar color="negative" text-color="white" :icon="scope.opt.icon"/>
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
        <q-file borderless multiple class="rangeField "
                @input="uploadImg($event)"
                v-model="images"
                label="תמונות של המקום">
          <template v-slot:prepend>
            <q-icon name="cloud_upload"/>
          </template>
        </q-file>
        <div class="images_section">


          <ul class="imagesScroll">
            <li class="item" v-for="(image,index) in imagesToAdd">
              <q-img class="img shadowBox" :src="image" style="border-radius: 8px;">

                <div class="img_action_container">
                  <q-avatar class="image_actions" color="red" icon="delete" @click="deleteImg(index)">
                    <q-tooltip>
                      מחק תמונה
                    </q-tooltip>
                  </q-avatar>
                  <q-avatar class="image_actions" color="green" icon="image" @click="makeCover(index)">
                    <q-tooltip>
                      הגדר כפרופיל
                    </q-tooltip>
                  </q-avatar>
                </div>
              </q-img>
            </li>
          </ul>
        </div>
        <div class="img_cover">
          <q-img class="img shadowBox" :src="localEditedYard.cover" style="border-radius: 8px;">
            <div class="absolute-bottom text-subtitle1 text-center">
              תמונת פרופיל
            </div>
          </q-img>
        </div>


        <input name="price" v-model="localEditedYard.pricePerHead" type="number" placeholder=" מחיר פר סועד (בשקלים)"
               class="fieldInput "
               min="10" max="100"/>
        <textarea v-model="localEditedYard.placeDesc" class="fieldInput " placeholder="פרטים על המקום"/>
        <div>
          <button :disabled="btn_status" v-if="!newUser.yardId" class="btn myColor btn-circSquare" @click="createYard">הוסף חצר
          </button>
          <button v-else :disabled="btn_status" class="btn myColor btn-circSquare" @click="updatedYard">עדכן חצר</button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";
import FS from "../../middleware/firestore"

export default {
  name: "addYardForm",
  computed: {
    ...mapState('yards', ['yards','editedYard', 'foodCatOpt']),
    ...mapState('users',['newUser'])
  },
  data() {
    return {
      localEditedYard: {
        uidChef: '',
        yardName: '',
        peopleRange: {
          min: 10,
          max: 250
        },
        location: '',
        pricePerHead: '',
        foodCategory: [],
        placeDesc: '',
        cover: '',
        imagesUrl: []
      },
      uploadStatus: 0,
      btn_status: false,
      images: [],
      imagesToAdd: [],
      clicked:false
    }
  },
  methods: {
    ...mapActions('users',["setUserDataToLocal"]),
    ...mapActions('yards', ["insertYard", "createYardId", "reset", "setEditedYardById", "updateYard", 'getFoodCategory']),
    ...mapMutations('yards', ['setEditedYardId', 'setEditedYard']),
    selectionRules(val) {
      if (val.length <= 0)
        return 'עליך לבחור קטגוריה אחת לפחות'
    },
    async uploadImg(event) {
      this.uploadStatus = 0;
      this.imagesToAdd = this.imagesToAdd.concat((await FS.yards.uploadYardsImages({
        images: event,
        yardId: this.localEditedYard.id
      })))
    },
    deleteImg(index) {
      try{
        FS.deleteYardsImages(this.imagesToAdd[index])
      }
      catch (ex)
      {
        console.log('error',ex)
      }

      if(this.localEditedYard.cover===this.imagesToAdd[index])
        this.localEditedYard.cover='https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
      this.imagesToAdd.splice(index, 1)
      this.localEditedYard.imagesUrl=[...this.imagesToAdd]
    },
    makeCover(index) {
      this.localEditedYard.cover = this.imagesToAdd[index]

    },

    async createYard() {
      this.clicked = true
      this.localEditedYard.imagesUrl = [...this.imagesToAdd]
      this.localEditedYard.uidChef = window.user.uid
      this.setEditedYard(this.localEditedYard)
      await this.insertYard()
      await this.setUserDataToLocal()
      await this.$parent.$emit('xx')
      await this.$router.push('/Feed')
    },
    async updatedYard() {
      debugger
      this.setEditedYard(this.localEditedYard)
      this.setEditedYardId(this.$route.params.id)
      await this.updateYard().then(() => {
        this.$router.push('/feed')
      })
    },
    async init_page() {
      if(!this.foodCatOpt.length){
        await this.getFoodCategory()
      }
      console.log(this.$route.params)
      if(this.$route.params.id)
      {
        const id=this.$route.params.id;
        this.setEditedYardId(id)
        await this.setEditedYardById()
        Object.assign(this.localEditedYard,this.editedYard)
        this.imagesToAdd = [...this.localEditedYard.imagesUrl]
      }
      else{
        this.localEditedYard.id=await this.createYardId()
      }
    },
  },
  created() {
    this.init_page()
  },
  destroyed() {
    this.reset()
  }
}
</script>

<style scoped>
* {

}

h1 {
  font-weight: bold;
  font-size: xx-large;
  font-family: Rubik;
  /*padding: 10px;*/
  color: #403e3e;

}

.image_actions {
  margin-left: 20px;
  margin-right: 20px;
}

.container {
  margin: 15px 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 15px 15px 15px 15px;
}

.space {
  margin-top: 20px;
  margin-bottom: 20px;
}

.fieldInput {
  font-weight: bold;
  font-size: medium;
  width: 100%;
  max-width: 100%;
  margin: 20px 0;
  height: 50px;
  padding: 15px 15px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #F6F7F9;
  color: #757575;
}

.rangeField {
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  margin: 15px 0;
  height: 75px;
  padding: 10px 10px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #F6F7F9;
  color: #757575;
}

::placeholder {
  padding-right: 50px;
}


.btn {
  font-weight: bold;
  width: 230px;
  margin: 0 35px 20px;
  height: 45px;
  padding: 6px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #111111;
  color: white;
  font-size: 14px;
}

.images_section {
  max-width: 100%;
  width: calc(100% - 20px);
  margin-left: 30px;
  margin-right: 30px;
}

.imagesScroll {
  display: flex;
  padding: 20px;
  overflow-x: scroll;
  list-style: none;
  border: 5px solid #fff;
  /*background-color: #181818;*/
  padding: 20px;
  border-radius: 12px;
}



.item {
  display: block;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  border-radius: 8px;
  font-size: 32px;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 1);
  height: 150px;
  max-width: 125px;
  /*/ / width: 125 px;*/
  flex-shrink: 0;
  flex: 1 0 45%;
  margin: 5%;
}

.img:hover .img_action_container {
  display: block;
}

.img_action_container {
  display: none;
  height: 100%;
}

.img_cover {
  align-items: center;
  color: #fff;
  border-radius: 8px;
  font-size: 32px;
  height: 150px;
  max-width: 364px;
  flex-shrink: 0;
  flex: 1 0 45%;
  margin: 5%;
}

.img {
  width: 100%;
  height: 100%;
}
</style>
-->

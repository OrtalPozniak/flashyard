<template class="page">
  <div class="profileChanger centerBoxPos text-center">
    <div style="display:flex;flex-direction: column;"  class="text-center">
      <label class="lbl" >ערוך פרופיל</label>
      <div class="text-center">
        <img :src="imageUrl" height="150" width="150" style="border-radius: 50%;">
      </div>
      <div class="centerWidth text-center">
        <div class="text-center" >
          <input type="text" v-model="fname" class="text-center fieldInput" alt="first name" :placeholder="newUser.firstName">
        </div>
        <div class="text-center">
          <input type="text" v-model="lname" class="text-center fieldInput" alt="last name" :placeholder="newUser.lastName">
        </div>
      </div>
      <div class="text-center centerWidth">
      <button class=" btn-circSquare btnSize myColor text-center" @click="onPickFile" >החלף תמונת פרופיל</button>
      <input type="file" style="display: none;" ref="fileInput" accept="image/*" @change="previewImage" >
      <button class="btn-circSquare text-center btnSize coverBtn oppositeColor" :disabled="!formIsValid" type="submit" icon="save" @click="onUpload">עדכן פרופיל</button>
      </div>
    </div>
  </div>
</template>

<script>
import FBI from "src/middleware/firebase";
import {mapActions, mapMutations, mapState} from "vuex";
import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';

export default {
  name: "PersonalSettings",
  data() {
    return {
      imageUrl: '',
      selectedFile: null,
      image: null,
      imageData:null,
      fname:'',
      lname:''
    }
  },
  computed: {
    ...mapState('users',['users','newUser']),
    formIsValid() {
      return this.imageUrl !== ""
    }
  },
  methods: {
    ...mapMutations('users',['pushPhoto']),
    ...mapActions('users',['createProfile','updateProfile']),

    previewImage(event){
      this.imageData = event.target.files[0];
      this.imageUrl = this.imageData;
      if (this.imageData) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl= e.target.result;
        }
        reader.readAsDataURL(this.imageData);
      }

    },
    async onUpload(){

      this.imageUrl = '';
      const storageRef = await firebase.storage().ref()
      const idUser = window.user.uid
      await FBI.DB().collection("users").doc(`${window.user.uid}`).update({
        "firstName": this.fname,
        "lastName": this.lname
      });
      if (this.imageData!==null){
        const uploadTask =  storageRef.child(`profileUsers/${idUser}/${this.imageData.name}`).put(this.imageData);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot)=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.then((snapshot) => {
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.imageUrl = downloadURL
                this.createProfile(this.imageUrl)
                // do something with url here
              });
            });
          }
        );
      }
      else this.imageUrl = this.newUser.imgUrl
      await this.updateProfile({firstName:this.fname,lastName:this.lname,imageUrl:this.imageUrl})
      console.log(this.newUser.imgUrl)

    },
    onPickFile(){
      //responsible for the reference between the button and the input
      this.$refs.fileInput.click()
    },
  },
  created() {
    this.imageUrl = this.newUser.imgUrl
    this.fname = this.newUser.firstName
    this.lname = this.newUser.lastName
  }
}

</script>

<style scoped>

.coverBtn{
  background: none !important;
}

.coverBtn:hover{
  opacity: 0.8;
}
.centerWidth{
  width: 400px;
}

.btnSize{
  width: 60%;
}
.lbl{
  font-family:'Rubik', sans-serif;
  font-size: large;
  color: gray;
  margin-bottom: 5%
}
</style>

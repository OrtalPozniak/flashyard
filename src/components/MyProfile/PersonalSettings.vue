<template class="page">
  <div class="menuChanger text-center menuWidth" style="flex-direction: column;position: relative;">
    <label class="lbl" >ערוך פרופיל</label>
    <img :src="imageUrl" class="profilePic">
    <input type="file" style="display: none;" ref="fileInput" accept="image/*" @change="previewImage" >
    <input type="text" v-model="fname" class="text-center fieldInput" alt="first name" :placeholder="this.newUser.firstName">
    <input type="text" v-model="lname" class="text-center fieldInput" alt="last name" :placeholder="this.newUser.lastName">
    <button class=" btn-circSquare btnSize myColor" @click="onPickFile" style="margin-top: 1vw;">החלף תמונת פרופיל</button>
    <button class="btn-circSquare btnSize coverBtn oppositeColor" :disabled="!formIsValid" type="submit" icon="save" @click="onUpload">עדכן פרופיל</button>
    <q-btn flat label="צא" color="red-10" v-close-popup/>

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
      }else{
        this.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg44qs6kg-JW8XJHY46oh18JFtuKUGHDr_x-NkhZAnFs0eFBZ0ytygPLXfYDHJj5XuzhE&usqp=CAU'
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
      // console.log(this.newUser.imgUrl)

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
.menuWidth{
  width:40vw;
}

.btnSize{
  width: 50%;
}
.lbl{
  font-family:'Rubik', sans-serif;
  font-size: large;
  color: gray;
  margin-bottom: 3%
}
.profilePic{
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-bottom: 1vw;
}
</style>

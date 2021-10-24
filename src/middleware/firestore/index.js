import FBI from '../../middleware/firebase'
import firebaseInstance from "src/middleware/firebase";
import {log} from "@quasar/app/lib/helpers/logger";
// import firestore from "firebase";


//FBI.DB() point to => firebase.firestore()

function getUserById(currentUserId){
  return FBI.DB().collection('users').doc(currentUserId).get()
    .then(res=>{
      return res.data()
    })
}

async function createNewChef(){
  debugger
  return await FBI.DB().collection('users').doc(`${window.user.uid}`).update({
    isAChef: true,
    yardId: null
  })
}

function createUser(data) {
  return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
}

async function uploadYardsImages(options) {
  console.log("option from upload", options)
  const yardRef = FBI.firebase.storage().ref(`yardsImages/haim/${options.yardId}`);
  const urlArray=[]
  for(let img of options.images){
    urlArray.push(await insertImageFile(yardRef,img,options.yardId));
  }
  return urlArray
}

async function deleteYardsImages(options) {
  console.log("images to delete - firestore")
  await deleteImageFile(options).then(() => {
    console.log('123')
  })

}

async function getImagesUrls(yardId) {
  let urlArray = [];
  const obj = await FBI.firebase.storage().ref(`yardsImages/haim/${yardId}`).listAll()
  for(let imgRef of obj.items) {
    urlArray.push( await imgRef.getDownloadURL())
  }
  return urlArray;
}

async function insertImageFile(yardRef, image, yardId) {
  const yardFolder = yardRef.child(`${yardId}_${Math.random() * 1000}`);
  let res = await yardFolder.put(image)
  return  await res.ref.getDownloadURL()

  // let url = await res.ref.getDownloadURL()
  // return url
}

async function deleteImageFile(image) {
  const storage = FBI.firebase.storage()
  const imageRef = await storage.refFromURL(image)
  const a= await imageRef.delete()
  console.log('123')
}


export default {
  createUser,
  uploadYardsImages,
  deleteYardsImages,
  getImagesUrls,
  getUserById,
  createNewChef
}


/*
import FBI from '../../middleware/firebase'
// import firestore from "firebase";


//FBI.DB() point to => firebase.firestore()

function getUserById(currentUserId){
  return FBI.DB().collection('users').doc(currentUserId).get()
    .then(res=>{
      return res.data()
      //console.log(res.data())
    })
}

async function createNewChef(){
  debugger
  return await FBI.DB().collection('users').doc(`${window.user.uid}`).update({
    isAChef: true,
    yardId: null
  })
}

function createUser(data) {
  return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
}

async function uploadYardsImages(options) {
  console.log("option from upload", options)
  const storage = FBI.firebase.storage()
  const yardRef = storage.ref(`yardsImages/ ${options.yardId}`);
  const urlArr = await Promise.all(options.images.map(img => insertImageFile(yardRef, img)))
  return urlArr;

  async function uploadYardsImages(option) {
    // console.log("option from upload", option)
    const storage = FBI.firebase.storage()
    // const yardsRef = storage.ref(`yardsImages/ ${user.uid}`);
    const yardsRef = storage.ref(`yardsImages/ ${Math.random()}`);
    const urlArr = []
    for (const image of option.images) {
      const yardFolder = yardsRef.child(`${Math.random()}`);
      // console.log(`image`, image)
      let res = await yardFolder.put(image)
      let url = await res.ref.getDownloadURL()
      urlArr.push(url)
    }
    return urlArr;
  }
  async function insertImageFile(yardRef,image)
  {
    const yardFolder = yardRef.child(`${image.name}`);
    let res= await yardFolder.put(image)
    let url = await res.ref.getDownloadURL()
    return url
  }
}


export default {
  createUser,
  uploadYardsImages,
  createNewChef,
  getUserById,
}

 */

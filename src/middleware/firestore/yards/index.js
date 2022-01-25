import FBI from '../../../middleware/firebase'
import {error} from "firebase-functions/lib/logger";

let lastDoc = null

async function getYards() {
  let db = await FBI.DB().collection('yards').limit(3)
  if (lastDoc) {
    db = db.startAfter(lastDoc)
  }
  const yardsSnap = await db.get()
  lastDoc = yardsSnap.docs[yardsSnap.docs.length - 1]
  return yardsSnap.docs.map(doc => {
    const obj = doc.data()
    obj.id = doc.id
    return obj
  })
}

function createYardId(){
  return   FBI.DB().collection('yards').doc().id
}

function getYardById(Id) {
  return FBI.DB().collection('yards').doc(Id).get()
    .then(response => response.data())
    .catch(err => console.error(err))
}
async function createYard(yard,id) {
  await FBI.DB().collection('yards').doc(id).set(yard)
  return FBI.DB().collection('users').doc(window.user.uid).update('yardId',id)
}

function updateYard(yard,id)
{
  return FBI.DB().collection('yards').doc(id).update(yard)
    .then(res=>console.log(res))
    .catch(err=> console.log(err))
}
function getFoodCat()
{
  return FBI.DB().collection('food_categories').get()
    .then(res=>{
      return res.docs.map(doc=>doc.data())
    })
}
function addIdOrderToYardOrders(option) {
  const ref = FBI.DB().collection("yards").doc(option.idYard).collection('yardOrders').doc(`yardOrders-${option.idYard}`)
  ref.get()
    .then((response) => {
      if (response.exists) ref.update({orders: FBI.firebase.firestore.FieldValue.arrayUnion(option.data)})
      else ref.set({orders: [option.data]}).then(()=>{
        console.log('dsfsdffs')
      })
    })
    .catch((err) => console.error(err))
}

async function getIdOrderFromYardOrders(id) {
  const docRef = FBI.DB().collection("yards").doc(id).collection('yardOrders').doc(`yardOrders-${id}`)
  const doc = await docRef.get()
  const data = doc.data()
  return data.orders
}
async function uploadYardsImages(options) {
  // console.log("option from upload", options)
  const yardRef = FBI.firebase.storage().ref(`yardsImages/haim/${options.yardId}`);
  let urlArray=[]
  for(let img of options.images){
    await _insertImageFile(yardRef,img,options.yardId);
  }
  urlArray = await _getAllImagesURL(yardRef)
  debugger
  return urlArray
}

async function deleteYardsImages(options) {
  const yardRef = await _deleteImageFile(options)
  const urlArray = await _getAllImagesURL(yardRef)
  return urlArray

}

async function _getAllImagesURL(yardRef) {
  const images = await yardRef.listAll()
  return Promise.all(images.items.map(async image => {
    return await image.getDownloadURL()
  }))
}

async function _insertImageFile(yardRef, image, yardId) {
  await FBI.firebase.storage().ref(`${yardRef.fullPath}/${yardId}_${Math.random() * 1000}`).put(image);
}

async function _deleteImageFile(image) {
  const storage = FBI.firebase.storage()
  debugger
  const imageRef = await storage.refFromURL(image)
  const yardRef = imageRef.parent
  await imageRef.delete()
  return yardRef
}

export default {
  getYards,
  getYardById,
  createYard,
  createYardId,
  updateYard,
  getFoodCat,
  addIdOrderToYardOrders,
  getIdOrderFromYardOrders,
  uploadYardsImages,
  deleteYardsImages,
}

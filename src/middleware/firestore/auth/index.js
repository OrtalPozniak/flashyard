import fbi from "src/middleware/firebase";
// import firebase from "firebase";

function createUser(data) {
  return fbi.DB().collection('users').doc(`${window.user.uid}`).set(data)
}

function createWithEmail(Email,Password){
  try {
    return fbi.firebase.auth().createUserWithEmailAndPassword(Email,Password)
  }catch {
    (error.message)
  }
}

function loginWithEmail(Email,Password){
 try {
   return fbi.firebase.auth().signInWithEmailAndPassword(Email, Password)
 }catch(ex){
   console.error(ex)
 }
}

function logOutFB(){
  return fbi.firebase.auth().signOut()
}


export default {
  createUser,
 createWithEmail,
  loginWithEmail,
  logOutFB
}

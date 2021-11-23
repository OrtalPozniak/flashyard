import FBI from "src/middleware/firebase";


  function createUser (data){
    return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
  }

  async function createNewChef() {
    return await FBI.DB().collection('users').doc(`${window.user.uid}`).update({
      isAChef: true,
      yardId: null
    })
  }

  function getUserById(Id) {
    return FBI.DB().collection('users').doc(Id).get()
      .then((response) => response.data())
      .catch(err => console.error("getUserById"))
  }

  function setDisableWeekdaysChef(option){
    return FBI.DB().collection("users").doc(option.id).collection('days').doc(`DisableWeekdays-${option.id}`).set(option.item)
  }

  async function getDisableWeekdaysChef(id) {
    const docRef = await FBI.DB().collection("users").doc(id).collection('days').doc(`DisableWeekdays-${id}`);
    const doc = await docRef.get()
    const data = doc.data()
    return data
  }

  function setDisableDaysChef(option){
    return FBI.DB().collection("users").doc(option.id).collection('days').doc(`DisableDays-${option.id}`).set(option.item)
  }

  async function getDisableDaysChef (id){
    const docRef = await FBI.DB().collection("users").doc(id).collection('days').doc(`DisableDays-${id}`);
    const doc = await docRef.get()
    const data =doc.data()
    return data.disableDays
  }
  async function snapDisableDaysChef (id) {
    FBI.DB().collection("users").doc(id).collection('days').doc(`DisableDays-${id}`).onSnapshot((snapshot) => {
      console.log(snapshot.data(), 'snapshot.data()')
      return snapshot.data()
    }, (error) => {
      console.error(error)
    });
  }

  async function uploadProfilePic (url){
    let picUrl = ''
    picUrl = url
    debugger;
   return await FBI.DB().collection('users').doc(window.user.uid).update({imgUrl:picUrl});
  }


export default {
  createUser,
  createNewChef,
  getUserById,
  uploadProfilePic,
  getDisableDaysChef,
  setDisableDaysChef,
  setDisableWeekdaysChef,
  getDisableWeekdaysChef,
  snapDisableDaysChef
}

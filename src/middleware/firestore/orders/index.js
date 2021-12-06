import FBI from "src/middleware/firebase";
import firestore from "firebase";

export default {
  createOrder: ((data) => {
    return FBI.DB().collection('orders').add(data)
      .then(response =>{
        console.log(response.id)
        return response.id
      } )
      .catch(err => console.error(err))
  }),
  getOrderById:((Id) =>{
  return FBI.DB().collection('orders').doc(Id).get()
    .then(response => response.data())
    .catch(err => console.error(err))
}),

  getOrdersByUserId:((userId)=>{
    return FBI.DB().collection('orders')
      .where('uidClient', '==', `${userId}`)
      .get()
      .then(response=>{
        return response.docs.map(doc=>doc.data())
      })
      .catch(err => console.error(err))
  })

}

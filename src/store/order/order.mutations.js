export default {
    setOrderDetails: ((state, order) => {
    state.orderDetails = {...order}
    console.log(state.orderDetails)
  }),
  setOrderId:((state , id)=> state.orderId = id),

  resetOrderDetails: ((state) => {
    for (const key in state.orderDetails) state.orderDetails[key] = '';
    if (state.orderDetails.id !== undefined) delete state.orderDetails.id;
  }),
  updateStatePayment:((state , bool)=> state.orderDetails.payment = bool),

}

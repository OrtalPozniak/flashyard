export default {

  changeSignUp: ((state,val) => {
    state.signUp = val
  }),

  changePass: ((state,val) => {
    state.forgetPass = val
  }),

  changeChefPermission: ((state,val) => {
    state.newUser.isAChef = val
  }),

  addYardId: ((state,val) => {
    state.newUser.yardId = val
  }),

  setEditedUser: ((state,userObj) =>{state.newUser = {...userObj}
  }),

  insertUser: ((state, userObj) => {
    return state.users.push(userObj)
  }),

  pushPhoto: ((state,val)=>{
    state.newUser.imgUrl = val
  }),

  updatePro: ((state, obj)=>{
    debugger
    state.newUser.imgUrl = obj.imageUrl
    state.newUser.firstName = obj.firstName
    state.newUser.lastName = obj.lastName
  })
}

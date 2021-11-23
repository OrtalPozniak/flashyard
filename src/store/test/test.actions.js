import state from "./test.state"
import FS from '../../middleware/firestore'
import FBI from "src/middleware/firebase";

export default {
  setDisableWeekdays: async ({commit}, objDays) => {
    commit('setStateDisableWeekdays', objDays)
  },
  setDisableDays: async ({commit}, arr) => {
    commit('setStateDisableDays', arr)
  },
  setDayToDisableDays: async ({commit}, dayObj) => {
    commit('setDayToStateDisableDays', dayObj)
  },
  removeDayFromDisableDays: async ({commit}, day) => {
    commit('removeDayFromStateDisableDays', day)
  },
  setDisableWeekdaysChefInBD: (async ({state, commit}) => {
    const option = {
      id: window.user.uid,
      item: {weekdays: state.disableWeekdays.weekdays}
    }
    await FS.users.setDisableWeekdaysChef(option)
  }),
  getDisableWeekdaysChefFromBD: async ({state, commit}, id) => {
    const disableWeekdays = await FS.users.getDisableWeekdaysChef(id)
      if (disableWeekdays != null) commit('setStateDisableWeekdays', disableWeekdays)
  },
  setDisableDaysChefInBD: (async ({state, commit}) => {
    const option = {
      id: window.user.uid,
      item: {disableDays: state.disableDays}
    }
    await FS.users.setDisableDaysChef(option)
  }),
  getDisableDaysChefFromBD: async ({state, commit}, id) => {
    const disableDays = await FS.users.getDisableDaysChef(id)
    if (disableDays != null) commit('setStateDisableDays', disableDays)
  },
  getYardOrdersFromBD: async ({state, commit}, id) => {
    const orderedEvents = await FS.yards.getIdOrderFromYardOrders(id);
    console.log(orderedEvents, 'orderedEvents')
    if (orderedEvents != null) commit('setStateOrderedEvents', orderedEvents)
  },
  snapDisableDaysChefFromDB: async ({state, commit},id) => {
    FBI.DB().collection("users").doc(id).collection('days').doc(`DisableDays-${id}`).onSnapshot((snapshot) => {
      console.log(snapshot.data(),'snapshot.data()','DisableDays')
      commit('setStateDisableDays', snapshot.data().disableDays)
      console.log(state.disableDays,'DisableDays')
    }, (error) => {
      console.error(error)
    });
  },
  snapDisableWeekdaysChef: ({state, commit},id) => {
    FBI.DB().collection("users").doc(id).collection('days').doc(`DisableWeekdays-${id}`).onSnapshot((snapshot) => {
      console.log(snapshot.data(),'snapshot.data()','DisableWeekdays')
      commit('setStateDisableWeekdays', snapshot.data())
      console.log(state.disableWeekdays,'DisableWeekdays')
    }, (error) => {
      console.error(error)
    });
  },
  snapYardOrdersFromBD: ({state, commit},id) => {
    FBI.DB().collection("yards").doc(id).collection('yardOrders').doc(`yardOrders-${id}`).onSnapshot((snapshot) => {
        console.log(snapshot.data(),'snapshot.data()','orderedEvents')
      commit('setStateOrderedEvents',snapshot.data().orders)
        console.log(state.orderedEvents,'orderedEvents')
      }, (error) => {
        console.error(error)
      });

  },
}



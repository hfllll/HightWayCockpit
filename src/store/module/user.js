export default {
  state: {
    serialNumber:'',
    channelNumber:'',
    accessToken:'',
  },
  mutations: {
    setSerialNumber(state, value) {
      state.serialNumber = value
    },
    setChannelNumber(state,value){
      state.channelNumber = value
    },
    setAccessToken(state,value){
      state.accessToken = value
    },
  },
  getters: {},
  actions: {
    
  }
}

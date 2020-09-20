

export default  {

  setToken(state,payload){
    state.token = payload
  },
  setInfo(state,payload){
    state.fromInfo = payload
  },
  setParamsList(state,payload){
    state.paramsList = payload
  }
}
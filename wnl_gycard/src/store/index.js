import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    userName: '',
    deviceId: '',
    orderId: '',
    cardId: "",
    questionId: "",
    cardText: "",
    base64Img: "",
    androidFileData: "",
    clientInfo: {
        userId: '',
        deviceId: '',
        pushToken: '',
        pToken: '',
        mac: '',
        imei: '',
        boundId: '',
        posId: '',
        couponId: '',
        payresult: '',
        isShare: false
    },
    orderInfo: {}
}

const mutations = {
    setUserName(state, str){
        state.userName = str;
    },
    setDeviceId(state, str){
        state.deviceId = str;
    },
    setOrderId(state, str){
        state.orderId = str;
    },
    setShareName(state, str){
        state.shareName = str;
    },
    setCardId(state, str){
        state.cardId = str;
    },
    setQuestionId(state, str){
        state.questionId = str;
    },
    changeCardText(state, str){
        state.cardText = str;
    },
    changeBase64Img(state, str){
        state.base64Img = str;
    },
    setAndroidFileData(state, data) {
        state.androidFileData = data;
    },
    setOrderInfo(state, payload){
      state.orderInfo = payload;
    },
    //获取客户端相关信息
    setClientInfo(state, payload) {
        state.clientInfo.userId = payload.userId;
        state.clientInfo.deviceId = payload.deviceId;
        state.clientInfo.pToken = payload.pToken;
        state.clientInfo.mac = payload.mac;
        state.clientInfo.imei = payload.imei;
        state.clientInfo.posId = payload.posId;
        state.clientInfo.boundId = payload.boundId;
        state.clientInfo.couponId = payload.couponId;
        state.clientInfo.isShare = payload.isShare;
        state.clientInfo.payresult = payload.payresult;

    }
}

const store = new Vuex.Store({
    state: state,
    mutations: mutations
})

export default store;

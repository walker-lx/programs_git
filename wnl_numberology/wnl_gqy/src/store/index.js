import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    isLogin: false,
    user: {
        name: null,
        birthday: null,
        cardCode: ''
    },
    clientInfo: {
        userId: '',
        deviceId: '',
        pushToken: '',
        pToken: '',
        mac: '',
        imei: '',
        boundid: '',
        posId: '',
        couponId: ''
    },
    CardCodeList: [],
    shareRedPackage: false,
    orderInfo: {
        orderId: '',
        goodsId: '99202A2DB12742B58CE38B8C7108D63F',
        parterId: 'TarotLove',
        orderPrice: 9.9
    }
}

const mutations = {
    //设置登录状态
    login(state) {
        state.isLogin = true;
    },
    setUserId(state, payload) {
        state.clientInfo.userId = payload;
        state.clientInfo.deviceId = payload;
    },
    //设置用户名和生日
    setUserInfo(state, payload) {
        state.user.name = payload.name;
        state.user.birthday = payload.birthday;
    },
    //设置感情状态
    setStatus(state, payload) {
        state.CardCodeList[2] = payload;
    },
    //设置牌面和卡牌编号
    setCardNumber(state, payload) {
        state.CardCodeList[0] = payload.num1;
        state.CardCodeList[1] = payload.num2;
        state.user.cardCode = state.CardCodeList.join('');
    },
    setId(state, payload) {
        if (!state.isLogin) {
            state.clientInfo.userId = payload.userId;
            state.clientInfo.deviceId = payload.deviceId;
            state.isLogin = true;
        }
    },
    //获取客户端相关信息
    setClientInfo(state, payload) {
        state.clientInfo.userId = payload.userId;
        state.clientInfo.deviceId = payload.deviceId;
        state.clientInfo.pToken = payload.pToken;
        state.clientInfo.mac = payload.mac;
        state.clientInfo.imei = payload.imei;
        state.clientInfo.posId = payload.posId;
        state.clientInfo.boundid = payload.boundid;
        state.clientInfo.couponId = payload.couponId;

    },
    //创建订单编号
    createOrder(state, payload) {
        state.orderInfo.orderId = payload;
    },
    clearUserInfo(state) {
        state.user.name = '';
    }
}

export default new Vuex.Store({
    state,
    mutations
})

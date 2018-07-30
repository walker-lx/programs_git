import axios from 'axios';
import device from '../utils/device';
import store from '../store/index';
const appVersion = '1.0.0';
const GoodsID = "5D76DB2FFD904D86B0A244DA77E65C0C";

//创建订单
function createOrder(params) {
    return axios({
        url: '//coco70.51wnl.com/numberologynew/SXFortune/CreateOrder',
        method: 'post',
        data: {
            GoodsID,
            parterID: 'dongyiqi',
            appVersion: appVersion,
            channel: 'mini Program',
            clientType: `Youloft_${device.ios ? 'ios' : 'android'}`,
            DeviceID: store.state.userInfo.deviceId,
            UserID: store.state.userInfo.userId || '',
            LsDetail: [
                {
                    LockMonth: params.LockMonth,
                    SXName: params.sxName
                }
            ],
            HomePageUrl: '//mobile.51wnl.com/numberology/sxys/#/?userId=[WNLUSERID]&deviceId=[OPENUDID]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&boundId=[BUNDLE]&pushToken=[PTOKEN]&pToken=[PTOKEN]&posId=[posId]&DONTURLENCODE=[DONTURLENCODE]',
            DetailsUrl: window.location.href,
            unpayurl: window.location.href,
            IsSyncUrl: true
        }
    });
}

/**
 * 获取订单详情
 * 
 * @param {UserInfo} userInfo
 * @param {string} sxName 
 * @returns 
 */
function getOrderDetail(userInfo, sxName) {
    return axios({
        url: '//coco70.51wnl.com/numberologynew/SXFortune/GetOrderDetail',
        method: 'post',
        data: {
            UserID: userInfo.userId,
            deviceId: userInfo.deviceId,
            sxName: sxName
        }
    })
}
/**
 * 创建guid
 * 
 * @returns 
 */
function createGUID() {
    return axios.get('//coco70.51wnl.com/numberologynew/UniqueID/NewGuid');
}

export default {
    createOrder,
    createGUID,
    getOrderDetail
};
import root from './root'
import store from '../store'
import { base64 } from 'vux'
import axios from 'axios'

root.userinfocallback = function (result) {
    var originalString = base64.decode(result);
    var originalAllObj = JSON.parse(originalString);
    console.log(originalAllObj);
    store.commit('setId', {
        userId: originalAllObj.native_score.userId,
        deviceId: originalAllObj.native_score.deviceId
    });
    if (originalAllObj.native_usercenter != undefined || originalAllObj.native_usercenter != null) {
        store.commit('setUserInfo', {
            name: originalAllObj.native_usercenter.name,
            birthday: originalAllObj.native_usercenter.date
        });
    }
}

root.appCallback_share = function () {
    let url = location.href.replace(/payresult=1/ig, '');
    let title = '是劫是缘，一测便知！';
    let text = '直击矛盾根源，让迷茫感情拨云见日！';
    let imageURL = 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg';

    window.textObj = {
        title: title,
        text: text,
        image: '0',
        imageURL: imageURL,
        url: url,
        pureText: text,
        prefix: ''
    };
    window.textObj1 = {
        title: title,
        text: text,
        image: '0',
        imageURL: imageURL,
        targetUrl: url,
        perfix: ''
    };
    try {
        if (window.ylwindow) {
            ylwindow.reportHasShare(true);
            location.href = 'protocol://share:' + encodeURI(JSON.stringify(window.textObj1));
        }
        else {
            location.href = 'protocol://share#' + encodeURI(JSON.stringify(window.textObj));
        }
    }
    catch (e) { }
    return 1;
}

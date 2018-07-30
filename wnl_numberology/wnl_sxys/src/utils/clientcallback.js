import store from '../store';
import types from '../store/types';
import base64 from './base64';
import shareIcon from '../assets/img/share-200x200.jpg';

window.userinfocallback = function (result) {
    var originalString = base64.decode(result);
    var originalAllObj = JSON.parse(originalString);
    store.commit(types.SET_USERINFO, {
        userId: originalAllObj.native_score.userId,
        deviceId: originalAllObj.native_score.deviceId
    });
}

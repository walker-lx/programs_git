<template>
    <div class="savePage">
        <p class="saveTip">长按图片保存至本地</p>
        <img :src="resultSrc?resultSrc:base64Img">
    </div>
</template>

<script>
import 'babel-polyfill';
import util from "../plugin/util";
import { toast, pageloading, wnlShare, wxShare } from '../plugin/wnlui';
export default {
  name: 'Result',
  data () {
    return {
        resultSrc: ''
    }
  },
  computed: {
        base64Img() {
            return this.$store.state.base64Img;
        },
        resultImg() {
            return 'https://qiniu.image.cq-wnl.com/' + util.getQiNiuTk(this.base64Img);
        },
        clientInfo() {
            return JSON.parse(localStorage.getItem('clientInfo'));
        }
    },
  mounted: function() {
    document.querySelector('.wnl_history_btn').style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.wnlShare.setShareData({
      title: '一张能帮你解决98%问题的观音卡',
      text: '》》》点击立刻占卜',
      image: location.origin + '/numberology/gycard/static/img/share.jpg',
      url: location.origin + '/numberology/gycard/index.html?posId=' + this.clientInfo.posId
    });
    wxShare({
        title: '一张能帮你解决98%问题的观音卡',
        text: '》》》点击立刻占卜',
        imgUrl: location.origin + '/numberology/gycard/static/img/share.jpg',
        imageUrl: location.origin + '/numberology/gycard/static/img/share.jpg',
        url: location.origin + '/numberology/gycard/index.html?posId=' + this.clientInfo.posId,
        callback: function(){
            _czc.push(['_trackEvent', 'Shengyucard_shared', 'share']);
        }
    });
    var _this = this;
    var imgdata = this.base64Img;
    imgdata = imgdata.substring(23);
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            console.log(xmlhttp.responseText);
            var res = JSON.parse(xmlhttp.responseText);
            var url = "//upload.qiniu.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if (xhr.readyState==4){
                    console.log(xhr.responseText);
                    var resData = JSON.parse(xhr.responseText);

                    var resultImg = new Image();
                    resultImg.src = 'https://qiniu.image.cq-wnl.com/' + resData.key;
                    resultImg.onload = function() {
                        _this.resultSrc = 'https://qiniu.image.cq-wnl.com/' + resData.key;
                        // console.log(_this.resultSrc);
                        // window.wnlShare.setShareData({
                        //     image: _this.resultSrc,
                        // });
                    }
                }
            }
            xhr.open("POST", url, false);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", 'UpToken '+res.token);
            xhr.send(imgdata);
        }
    }
    xmlhttp.open("GET","https://msg.51wnl.com/api/Active/qintoken",false);
    xmlhttp.send();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

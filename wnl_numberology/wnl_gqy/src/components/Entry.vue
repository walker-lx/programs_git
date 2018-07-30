<template>
    <div class="entry">
        <div class="enter-title-wrap clearfix">
            <div class="entry-title"></div>
        </div>
        <div class="entry-content-bg">
            <div class="entry-content">
                <div class="entry-content-info entry-content-userinfo">
                    <div class="entry-content-tips entry-content-tips1">
                        <div class="entry-content-tips1">你离感情顺遂仅有动动手指的距离！</div>
                        <div class="entry-content-tips2">古老神秘的塔罗牌预知所有你想要的答案！</div>
                    </div>
                    <div class="userinfo-wrap userinfo-wrap1 clearfix"
                         @click="view1">
                        <div class="userinfo-name-title">您的姓名</div>
                        <input class="userinfo-name"
                               placeholder="请输入姓名(汉字)"
                               v-model="name"
                               @click="view1">
                    </div>
                    <div class="userinfo-wrap clearfix"
                         @click="setBirthday">
                        <div class="userinfo-birthday-title">出生日期</div>
                        <div class="userinfo-birthday">{{formatBirthday}}</div>
                    </div>
                    <div class="btn btn-big"
                         @click="toShuffle">立即查看</div>
                </div>
                <div class="entry-content-flow"></div>
                <div class="entry-content-info entry-content-info1">
                </div>
                <div class="entry-content-info entry-content-info2">
                    <div class="entry-content-info2-text">
                        <div class="entry-content-info2-feedback-wrap">
                            <div class="entry-content-info2-feedbackList">
                                <div class="entry-content-info2-feedback"
                                     v-for="(v,index) in feedback"
                                     :key="v">{{v}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="entry-content-info entry-content-userinfo">
                    <div class="entry-content-tips entry-content-tips2">
                        <div class="entry-content-tips1">你离感情顺遂仅有动动手指的距离！</div>
                        <div class="entry-content-tips2">古老神秘的塔罗牌预知所有你想要的答案！</div>
                    </div>
                    <div class="userinfo-wrap userinfo-wrap2 clearfix"
                         @click="view2">
                        <div class="userinfo-name-title">您的姓名</div>
                        <input class="userinfo-name"
                               placeholder="请输入姓名(汉字)"
                               v-model="name">
                    </div>
                    <div class="userinfo-wrap clearfix"
                         @click="setBirthday">
                        <div class="userinfo-birthday-title">出生日期</div>
                        <div class="userinfo-birthday">{{formatBirthday}}</div>
                    </div>
                    <div class="btn btn-big"
                         @click="toShuffle">立即查看</div>
                </div>
            </div>
        </div>
        <toast v-model="showToast"
               type="text">{{toastText}}</toast>
        <wnlBanner></wnlBanner>
        <datePicker v-model="pickerVisible"
                    :viewDate="viewDate"
                    :onCancel="selectCancel"
                    :onConfirm="selectConfirm"
                    v-on:onClose="cancel">
        </datePicker>
    </div>
</template>
<script>
import { Toast } from 'vux'
import wnlBanner from './wnlbanner'
import getQueryStringArgs from '../util/parseurl.js'
import feedback from '../util/feedback.js'
import datePicker from '../plugins/datePicker'
import device from '../util/device.js'

export default {
    data() {
        return {
            isLogin: this.$store.state.isLogin,
            name: '',
            toastText: '',
            showToast: false,
            feedback: feedback,
            birthday: '',
            viewDate: new Date(631152000000),
            formatBirthday: '公历 1990年1月1日',
            pickerVisible: false,
            scrollTop: '',
            clientInfo: [],
            urlParams: {},
        }
    },
    created() {
        document.querySelector('.wnl_history_btn').style.display = 'block';
        let url = window.location.href;
        console.log(decodeURIComponent(url));
        if (decodeURIComponent(url).indexOf('?') > -1) {
            this.clientInfo = getQueryStringArgs(decodeURIComponent(url));
            this.$store.commit('setClientInfo', this.clientInfo);
        }
        console.log(this.clientInfo);
    },
    mounted() {
        wnlui.wxShare({
            title: '塔罗感情运',
            text: '我在万年历看【塔罗感情运】，分享给你，一起看吧！',
            imgUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            imageUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            url: location.href
        });
        var wnl_tlp_local = JSON.parse(localStorage.getItem('wnl_tlp_local'));
        if (!wnl_tlp_local && device.weixin) {
            document.querySelector('.wnl_history_btn').style.display = 'none';
        } else {
            document.querySelector('.wnl_history_btn').style.display = 'block';
        }
        setTimeout(() => {
            this.name = this.$store.state.user.name;

            if (!this.isLogin) {
                if (this.$store.state.user.birthday != null) {
                    let dateArray = this.$store.state.user.birthday.split('-');
                    let year = dateArray[0];
                    let month = parseInt(dateArray[1]);
                    let day = parseInt(dateArray[2]);
                    this.formatBirthday = '公历 ' + year + '年' + month + '月' + day + '日';
                    this.birthday = this.$store.state.user.birthday;
                    if (device.ios) {
                        this.viewDate = new Date(dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2]);
                    } else {
                        this.viewDate = new Date(dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2]);
                    }
                } else {
                    this.birthday = '1990-01-01';
                    this.$store.commit('setUserInfo', {
                        name: this.name,
                        birthday: this.birthday
                    });
                }
            } else {
                this.birthday = this.$store.state.user.birthday;
                let dateArray = this.birthday.split('-');
                let year = dateArray[0];
                let month = parseInt(dateArray[1]);
                let day = parseInt(dateArray[2]);
                this.formatBirthday = '公历 ' + year + '年' + month + '月' + day + '日';
                if (device.ios) {
                    this.viewDate = new Date(dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2]);
                } else {
                    this.viewDate = new Date(dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2]);
                }
            }

        }, 300);
        this.showFeedback();
    },
    methods: {
        cancel() {
            this.beforeClose();
            this.pickerVisible = false;
        },
        setBirthday() {
            // this.afterOpen();
            document.querySelector('.entry').addEventListener('touchmove', this.movehandler)
            this.pickerVisible = true;
        },
        selectCancel() {
            // this.beforeClose();
            document.querySelector('.entry').removeEventListener('touchmove', this.movehandler);
        },
        movehandler(e) {
            e.preventDefault();
        },
        selectConfirm(selectedArray) {
            // this.beforeClose();
            document.querySelector('.entry').removeEventListener('touchmove', this.movehandler);
            let year = selectedArray.dateObj.cYear;
            let month = selectedArray.dateObj.cMonth < 10 ? '0' + selectedArray.dateObj.cMonth : selectedArray.dateObj.cMonth;
            let day = selectedArray.dateObj.cDay < 10 ? '0' + selectedArray.dateObj.cDay : selectedArray.dateObj.cDay;
            this.birthday = year + '-' + month + '-' + day;

            this.formatBirthday = '公历 ' + selectedArray.dateObj.cYear + '年' + selectedArray.dateObj.cMonth + '月' + selectedArray.dateObj.cDay + '日';
        },
        view1() {
            document.querySelector('.userinfo-wrap1 .userinfo-name').focus();
            document.querySelector('.entry-content-tips1').scrollIntoView(true);
        },
        view2() {
            document.querySelector('.userinfo-wrap2 .userinfo-name').focus();
        },
        toShuffle() {
            if (this.name === '' || this.name === undefined || this.name === null) {
                this.toastText = '请输入姓名';
                this.showToast = true;
            } else if (this.name.length > 10) {
                this.toastText = '输入姓名过长';
                this.showToast = true;
            } else {
                this.$store.commit('setUserInfo', {
                    name: this.name,
                    birthday: this.birthday
                });
                this.setParams();
                console.log(this.urlParams);
                this.$router.push({ path: 'status', query: this.urlParams });
            }
        },
        setParams() {
            this.urlParams = {
                userId: this.clientInfo.userId,
                deviceId: this.clientInfo.deviceId,
                pushToken: this.pushToken,
                pToken: this.clientInfo.pToken,
                mac: this.clientInfo.mac,
                imei: this.clientInfo.imei,
                boundid: this.clientInfo.boundid,
                posId: this.clientInfo.posId,
                couponId: this.clientInfo.couponId
            }
        },
        showFeedback() {
            (function () {
                var marquee = document.querySelector('.entry-content-info2-feedbackList');
                var offset = 0;
                var scrollheight = marquee.offsetHeight;
                var firstNode = marquee.children[0].cloneNode(true);
                marquee.appendChild(firstNode);
                setInterval(function () {
                    if (offset == scrollheight) {
                        offset = 0;
                    }
                    marquee.style.marginTop = "-" + offset + "px";
                    offset += 1;
                }, 60);
            })();

        },
        androidInputBugFix() {
            if (/Android/gi.test(navigator.userAgent)) {
                window.addEventListener('resize', function () {
                    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                        window.setTimeout(function () {
                            document.activeElement.scrollIntoViewIfNeeded();
                        }, 0);
                    }
                })
            }
        },
        afterOpen() {
            let rootElement = document.scrollingElement || document.body;
            this.scrollTop = rootElement.scrollTop;
            document.body.classList.add('modal-open');
            document.body.style.top = -this.scrollTop + 'px';
        },
        beforeClose() {
            let rootElement = document.scrollingElement || document.body;
            document.body.classList.remove('modal-open');
            rootElement.scrollTop = this.scrollTop;
        }
    },
    components: {
        Toast,
        wnlBanner,
        datePicker
    }
}

</script>
<style scoped>

</style>

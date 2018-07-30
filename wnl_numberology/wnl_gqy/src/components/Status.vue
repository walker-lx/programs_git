<template>
    <div class="status">
        <div class="dialog-mask"
             v-show="showDialog"
             @click="toggleDialog">
            <div class="dialog">
                <div class="dialog-text"
                     :key="v"
                     v-for="v in dialogText">{{v}}
                </div>
            </div>
        </div>
        <div class="status-tips"
             @click="toggleDialog">
            <div class="status-tips-icon">i</div>
        </div>
        <div class="status-title"></div>
        <div class="status-optionList clearfix"
             :class="{active:active}">
            <div class="status-option"
                 :key="n"
                 v-for="n in [1,2,3,4]"
                 @click="selectStatus(n)">
            </div>
        </div>
    </div>
</template>
<script>
import getQueryStringArgs from '../util/parseurl.js'
import device from '../util/device.js'
import axios from 'axios'
import Velocity from 'velocity-animate'

export default {
    data() {
        return {
            showDialog: false,
            flag: true,
            active: false,
            dialogText: [
                '有疑问？',
                '单身求桃花：您现目前为单身，且无暗恋对象。',
                '暧昧难自处：您有暗恋或暧昧对象，展望未来发展。',
                '恋爱有困扰：您目前有恋爱对象，想要升华感情。',
                '婚姻何处去：您已结婚，想要稳定夫妻感情。'
            ],
            clientInfo: this.$store.state.clientInfo,
            urlParams: {}
        }
    },
    created() {
        let url = decodeURIComponent(window.location.href);
        if (url.indexOf('?') > -1) {
            // console.log(url);
            if (device.weixin) {
                let name = this.$store.state.user.name;
                let birthday = this.$store.state.user.birthday;
                this.clientInfo = getQueryStringArgs(url);
                console.log('clientInfo:', this.$store.state.clientInfo);
                //本地存在微信token
                var wnl_tlp_local = JSON.parse(localStorage.getItem('wnl_tlp_local'));
                if (wnl_tlp_local && wnl_tlp_local.wnlUserId && wnl_tlp_local.gender) {
                    console.log(wnl_tlp_local);
                    this.clientInfo.userId = wnl_tlp_local.wnlUserId;
                    this.clientInfo.deviceId = wnl_tlp_local.unionid;
                    this.$store.commit('setClientInfo', this.clientInfo);
                } else {
                    let openid = this.clientInfo.openid;
                    if (openid) {
                        this.getWnlUserInfo(this.clientInfo).then(result => {
                            var wnl_tlp_local = {}
                            wnl_tlp_local.openid = this.clientInfo.openid;
                            wnl_tlp_local.unionid = this.clientInfo.unionid;
                            wnl_tlp_local.gender = this.clientInfo.sex;
                            wnl_tlp_local.openName = this.clientInfo.nickname;
                            wnl_tlp_local.wnlUserId = result.data.data.wnlUserId;
                            localStorage.setItem('wnl_tlp_local', JSON.stringify(wnl_tlp_local));
                            this.clientInfo.userId = wnl_tlp_local.wnlUserId;
                            this.clientInfo.deviceId = wnl_tlp_local.unionid;
                            this.$store.commit('setClientInfo', this.clientInfo);
                            this.$store.commit('setUserInfo', {
                                name: this.clientInfo.name,
                                birthday: this.clientInfo.birthday
                            });
                        });
                    } else {
                        location.href = 'https://b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href + '&name=' + name + '&birthday=' + birthday);
                    }
                }
            }
        }
        if (!device.wnl && !device.weixin) {
            var localUserId = localStorage.getItem('wnl_tlp_guid');
            this.$store.commit('setUserId', localUserId);
        }
    },
    mounted() {
        document.querySelector('.wnl_history_btn').style.display = 'none';
        setTimeout(() => {
            this.active = true;
        }, 200);
        wnlui.wxShare({
            title: '塔罗感情运',
            text: '我在万年历看【塔罗感情运】，分享给你，一起看吧！',
            imgUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            imageUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            url: location.origin + '/numberology/gqy/#/?posId=[posId]'
        });
    },
    methods: {
        getWnlUserInfo(info) {
            var param = {
                OpenId: info.openid,
                UnionId: info.unionid,
                Gender: info.sex,
                Platform: '2',
                OpenName: info.nickname,
                Desc: '',
                AppId: 'ServiceAccount',
            };
            var data = {
                DataString: JSON.stringify(param)
            }
            return axios({
                url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
                dataType: 'json',
                method: 'POST',
                data: data
            });
        },
        toggleDialog() {
            this.showDialog = this.showDialog ? false : true;
        },
        selectStatus(n) {
            if (this.flag) {
                this.flag = false;
                this.$store.commit('setStatus', n);
                this.setParams();
                var options = document.querySelectorAll('.status-option');
                var card = document.querySelectorAll('.status-option')[n - 1];
                Velocity(options, { opacity: 0 }, {
                    duration: 500, complete: () => {
                        card.classList.add('active');
                        Velocity(card, { opacity: 1, scale: 1.4 }, {
                            duration: 600, complete: () => {
                                setTimeout(() => {
                                    this.$router.push({ path: 'select', query: this.urlParams });
                                }, 300);
                            }
                        });
                    }
                });
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
        }
    },
    components: {
    }
}

</script>
<style scoped>

</style>

import { device, parseURL } from './tool';
var config = {};
var params = parseURL(window.location.href).params
console.log(params)
config.payInfo = {
    ParterID: 'TarotWorkTool',//支付商户id	
    GoodsID: '9D6EC7C2F7E4456FB9AED022994D8B9F',//产品ID
    //GoodsID: 'BD30E9F7083A4FFAAAC8E825C5447D03',//产品测试ID	
    ordername: '塔罗工作小工具',//订单名称	
    Question: '',//问题	
    price: '2',//价格

    ClientType: device.android ? 'Youloft_Android' : 'Youloft_IOS',//平台名称 选填
    Channel: device.android ? 'wnl_android' : 'wnl_ios',//渠道码 选填
    PToken: params.pushToken || '[PTOKEN]',//android推送token 选填
    Token: params.pToken || '[PTOKEN]',//ios推送token 选填
    UserID: params.userId || params.userId == '[WNLUSERID]' ? '' : '',//用户id 选填
    DeviceID: params.deviceId || '[OPENUDID]',//设备id
    posId: params.posId || '[posId]',//广告标识符
    Idfa: params.Idfa || '[IDFA]',
    DeviceMac: params.mac || '[MAC]',//mac
    ImeiNumber: params.imei || '[IMEI]',//imei
    boundid: params.boundid || '[BUNDLE]',
    couponId: params.couponId || '',
    imei: params.imei || '',
    sign: '',
    appVersion: device.appVersion,
    sysVersion: device.sysVersion
};

var link = location.href.replace(/(select\.html|result\.html)/ig, 'index.html');
function removeParam(name, url) {
    if (typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    var urlparts = url.split('?');
    var prefix = encodeURIComponent(name + '=');
    var pars = urlparts[1].split(/[&;]/g);
    var i = 0, len = pars.length;

    for (; i < len; i++) {
        if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
        }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');

    return url;
}

function removeParams(names, url) {
    var result = url || '';
    var names = names.split(' ');
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;

    for (; i < len; i++) {
        result = removeParam(names[i], result);
    }
    return result;
}

link = removeParams('payresult workToolOrderId', link);
config.share = {
    title: '塔罗工作小工具',
    friendTitle: '你最想知道的职场问题都在这里。',
    link: link,
    imgUrl: 'https://coco70.51wnl.com/numberologynew/worktool/img/share.jpg',
    text: '你最想知道的职场问题都在这里。'
}

config.feedbackInfo = [
    { name: '陈女士', content: '最近项目压力好大，看一看，还是有很大的帮助，没有之前那么迷茫了' },
    { name: '赵女士', content: '确实很准！也很有道理！' },
    { name: '张先生', content: '按着测试结果的方式来工作，果然工作运好了不少！' },
    { name: '王女士', content: '哈哈，看来职场小人我还真的得注意了' },
    { name: '赵女士', content: '这个测算还真的挺详细的，职场方面都面面俱到，说得很准！应该多出类似的测试工具。' },
    { name: '李先生', content: '给儿子算了一下，他说挺准的。' },
    { name: '谢先生', content: '事业方面的一直都很重视，看来坚持是会有回报的！' },
    { name: '陈女士', content: '帮老公算了一下，他最近的财运会很不错！' },
    { name: '吴女士', content: '本命年真的不顺，现在终于找到了心仪的工作，赞！' },
    { name: '江先生', content: '谢谢你给我的希望！！！' },
    { name: '潘女士', content: '还想看看关于感情方面的测试，谢谢 ' },
    { name: '龙先生', content: '说得挺准的，自己的确顾虑太多，结果什么都没有干成。' },
    { name: '黄先生', content: '之前的工作觉得太压抑了，果然不适合我长期的发展。' },
    { name: '倪先生', content: '句句在理，我知道怎么选择了。' },
    { name: '孟女士', content: '说得太对了，我早就该另谋高就了。' },
    { name: '田女士', content: '我终于知道我上司为什么这么针对我了？' },
    { name: '王女士', content: '原来不漂亮也是上司不喜欢的理由啊！' },
    { name: '马女士', content: '好贴心的建议！谢谢！' },
    { name: '侯先生', content: '难怪我最近财运这么好，哈哈哈~~' },
    { name: '郑先生', content: '好迷茫，最近找工作好难' },
    { name: '邓先生', content: '明天让我兄弟来转个运，抽一个！' },
    { name: '彭女士', content: '最近猎头找上门来啦！good luck!' },
    { name: '顾女士', content: '明天也让同事试试' },
    { name: '陈女士', content: '这是万年历独家的产品吗？目前确实没有看到别家有' },
    { name: '李先生', content: '忍无可忍，无须再忍！' },
    { name: '朱先生', content: '我要直接开除我老板了。' },
    { name: '钱女士', content: '最近上司找各种理由嫌弃我，我要来寻求解决之道，哈哈哈！' },
    { name: '沈女士', content: '看来西方的塔罗工作运也蛮准的，至少给了我许多不错的建议。' },
    { name: '杨先生', content: '棒！说得很精准！' },
    { name: '黄先生', content: '原来是他一直给我下套，真没想到。' },
    { name: '温女士', content: '上司把我调到其他部门了，这下日子不好过了。' },
    { name: '何女士', content: '好准，最后这句直接真相了。' },
    { name: '刘女士', content: '看来，离开这家单位的日子不远了。' }
];
export default config
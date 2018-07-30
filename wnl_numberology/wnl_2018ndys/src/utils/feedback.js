var feedback = {};
var list = [
  { name: '李先生', phone: '	182****4682', text: '	这个年运很准，给我很多启示。' },
  { name: '左小姐', phone: '	186****4412	', text: '	期待了好久的年运，终于出来了，太感谢了！' },
  { name: '李女士', phone: '	131****6221', text: '		爆准的年运，我收获了很多，知道了明年的该怎么做了。' },
  { name: '刘女士', phone: '	133****9654	', text: '	我们一家大小全部都看了各自的，真的太好了，感谢万年历！' },
  { name: '赵先生', phone: '	181****2789	', text: '	今年我的状况不太好，一直期待明年的好运，现在看了年运，明年会更好！' },
  { name: '韩女士', phone: '	130****9656', text: '		这个年运我很满意，说得很详细，而且都是纯干货。' },
  { name: '谢女士', phone: '	134****9772', text: '		看了2018年年运，我心中有数了，谢谢！' },
  { name: '胡先生', phone: '	188****9641', text: '		最近运势不是很好，急需解惑，谢谢万年历，这个年运太及时了。' },
  { name: '蒋先生', phone: '	182****9877	', text: '	今年运气不好，现在看到了2018年的年运，对我的指导很大，每句话都值得我好好研究。' },
  { name: '罗先生', phone: '	130****1524', text: '		不光有文字还有趋势图，真的好细心！' },
  { name: '钱女士', phone: '	138****2894', text: '		我的婚事是家人的一块心病，现在好了，年运已经详细讲了我明年的婚运，谢谢万年历，我会加油的！' },
  { name: '马先生', phone: '	180****5210', text: '		其实今年一直很茫然，但也不想再这样下去了，现在看了年运，我知道该怎么发展了。' },
  { name: '文女士', phone: '	132****1463	', text: '	真是精品，好准啊！感谢了！' },
  { name: '陈女士', phone: '	188****6969', text: '		好准，这个钱花得很值得，内容真的好多，非常满意。' },
  { name: '郑女士', phone: '	186****3513	', text: '	分析的非常详细，每个建议都说得好好，我会仔细思考明年的安排的。' },
  { name: '陈女士', phone: '	185****9877	', text: '	确实是最强年运，去年也是看的这个，好多都说准了，每次回看的时候还会大吃一惊。' },
  { name: '龙先生', phone: '	177****5645', text: '		提前看有个准备，内容很详细，各方面都有。' },
  { name: '李女士', phone: '	186****1135	', text: '	明年可能会结婚，我想看一看明年是否能够一切顺利。' },
  { name: '赵女士', phone: '	135****9969	', text: '	职场、情感都有讲，还包括房屋、出行等，很全面。' },
  { name: '谢先生', phone: '	171****5252', text: '		祝自己明年好运不断！' },
  { name: '方女士', phone: '	135****1479	', text: '	看来我得注意一下周围的烂桃花，不然会影响整个感情运势。' },
  { name: '曹女士', phone: '	131****6531	', text: '	糟糕的17年，希望快点过去，等待18年转运。' },
  { name: '赵先生', phone: '	136****3540', text: '		哈哈，看来明年中彩票的几率很高，只不过健康方面得注意一下。' },
  { name: '彭女士', phone: '	130****6351	', text: '	明年会遇到真爱，终于不用做单身狗了。' },
  { name: '钟先生', phone: '	151****6800	', text: '	点赞，测算写得很用心，已经秒杀其他网站的产品，而且看起来不累，讲得很清楚。' },
  { name: '钱女士', phone: '	181****1100', text: '		明年会有贵人运，看来我周围的小人是要退散了。' },
  { name: '王先生', phone: '	138****9125', text: '		提前准备能做到趋利避凶，凡事都有个预知，才能有福气啊。' },
  { name: '孟女士', phone: '	138****9999', text: '		明年我一定会万事如意、生意兴隆！' },
  { name: '吴先生', phone: '	134****6363	', text: '	老婆专门叫我来测算，因为去年就是因为测算过，很准，而且一年都很平安顺利，所以今年叫我肯定要测一测。' },
  { name: '郑先生', phone: '	178****2286	', text: '	看完觉得值了，而且价格不贵，没事还可以翻出来看一看，提醒下自己。' }
]
feedback.list = list.concat(list);
feedback.showFeedback = function (freq = 30) {
  var feedback = document.querySelector('.feedback');
  var list = document.querySelector('.feedback .feedback-list');
  var item = document.querySelector('.feedback .feedback-list .item');
  var feedbackHeight = feedback.getBoundingClientRect().height;
  var listHeight = list.getBoundingClientRect().height;
  var y = 0;
  setInterval(() => {
    y < listHeight / 2 ? y += 1 : y = 0;
    list.style.transform = 'translateY(-' + y + 'px)';
    list.style.webkitTransform = 'translateY(-' + y + 'px)';
  }, freq);
}
export default feedback

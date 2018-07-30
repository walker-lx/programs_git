function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}
//获取url地址中的参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

//时间戳转换
function getDateDiff(dateTimeStamp){
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
	// var diffValue = now - 1502164549123;    
	if(diffValue < 0){return;}
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
	var minC =diffValue/minute;
	if(monthC>=1){
		result="" + parseInt(monthC) + "月前";
	}
	// else if(weekC>=1){
	// 	result="" + parseInt(weekC) + "周前";
	// }
	else if(dayC>=1){
		result=""+ parseInt(dayC) +"天前";
	}
	else if(hourC>=1){
		result=""+ parseInt(hourC) +"小时前";
	}
	else if(minC>=1){
		result=""+ parseInt(minC) +"分钟前";
	}else
	result="刚刚";
	return result;
}

//标准时间转换为时间戳
function getDateTimeStamp(dateStr){
 return Date.parse(dateStr.replace(/-/gi,"/")); 
}

$(function() {
    // FastClick.attach(document.body);
    _czc.push(['_trackEvent','Topicshare.C', 'click']); 
    document.getElementById('llsBanner').onclick = function() {
        loadSchema('https://qiniu.image.cq-wnl.com/lilith/download/android.apk?v=201708161443');        
    }
    
    var jl = $('.v').width() - 140,tid = getQueryString('tid');
    
    //请求观点详情数据
    $.ajax({
        url:'//lilith.51wnl.com/GetTopicsInfo?tid='+tid+'&uid='+getQueryString('uid')+'&cid='+getQueryString('cid')+'&tkn='+getQueryString('tkn'),
        // url:'http://lilith.51wnl.com/GetTopicsInfo?tid=10009&uid=10009&skip=0&cid=Youloft_IOS&tkn=6480F2A608958030D190E9E62590174A',
        type:'get',
        success: function(respond) {
            var text1 = respond.data.option[0].title,text2 = respond.data.option[1].title;
            var sum1 = respond.data.option[0].vote,sum2 = respond.data.option[1].vote;
            var problem = $('.problem');
            $('.xs').html(respond.data.option[0].shortTitle);
            $('.hb').html(respond.data.option[1].shortTitle);
            console.log(respond.data.backImg);
            // problem.css('flter','blur(10px)');          
            // problem.css('background','url(' +respond.data.backImg+')');
            problem.find('img').attr('src',respond.data.backImg);
            // problem.find('p').html('#爱情，应该是互补还是相似的两个人在一起呢?');
            problem.find('p').html(respond.data.title); 
            // sessionStorage.setItem('title',respond.data.title);         
            $('.change .right1, .change .right').css('width',sum2*jl/(sum1 + sum2));
            
            //投票比例显示动画
            $('.left').animate({
                width: sum1*jl/(sum1 + sum2) + 'px'
            },1000);
            $('.right1').animate({
                width: 0
            },1000);
            console.log(text1);
            console.log(text2);            
            sessionStorage.setItem('t1',text1);
            sessionStorage.setItem('t2',text2);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
        },
        async:false
    })


    //请求用户观点列表数据
    $.ajax({
        url:'//lilith.51wnl.com/GetVoteList?tid='+tid+'&cid='+getQueryString('cid')+'&uid='+getQueryString('uid')+'&tkn='+getQueryString('tkn'),
        // url:'http://lilith.51wnl.com/GetVoteList?tid=10009&skip=0&uid=10009&cid=Youloft_IOS&tkn=6480F2A608958030D190E9E62590174A',
        type:'get',
        success:function(respond) {
            var html = '',xb = '',xz='',hf = '',hf_more = '',dzclass = '',dzimg = '',option = '',headimg = '';
            for (var i = 0; i < respond.data.length; i ++) {
                if(respond.data[i].topicOptionId%2 == 0) {
                    option = '<div class="tp_blue">投票给：'+sessionStorage.getItem('t1')+'</div>';  //支持观点
                } else {
                    option = '<div class="tp">投票给：'+sessionStorage.getItem('t2')+'</div>'; //反对观点
                };                
                if(respond.data[i].sex == '1') {
                    xb = 'fe'   //女性
                } else {
                    xb = ''  //男性
                };
                function getXz(n) {
                    switch (n) {
                        case 0:
                            xz = ''
                            break;
                        case 1:
                            xz = '水瓶座'
                            break;
                        case 2:
                            xz = '双鱼座'
                            break;
                        case 3:
                            xz = '白羊座'
                            break;
                        case 4:
                            xz = '金牛座'
                            break;
                        case 5:
                            xz = '双子座'
                            break;
                        case 6:
                            xz = '巨蟹座'
                            break;
                        case 7:
                            xz = '狮子座'
                            break;
                        case 8:
                            xz = '处女座'
                            break;
                        case 9:
                            xz = '天秤座'
                            break;
                        case 10:
                            xz = '天蝎座'
                            break;
                        case 11:
                            xz = '射手座'
                            break;
                        case 12:
                            xz = '摩羯座'
                            break;
                    }
                        return xz;
                }
                // console.log(respond.data)
                if(respond.data[i].replyList.length === 0) {
                    hf = '回复';
                    hf_more = '';
                } else if (respond.data[i].replyList.length === 1) {
                    hf = 1;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName + ':'+respond.data[i].replyList[0].contents + '</p></div>';
                } else if (respond.data[i].replyList.length === 2) {
                    hf = 2;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p></div>';
                } else if (respond.data[i].replyList.length === 3) {
                    hf = 3;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p>' + '<p>' + respond.data[i].replyList[2].nickName+':'+respond.data[i].replyList[2].contents + '</p></div>';
                } else{
                    hf = respond.data[i].replyList.length;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p>' + '<p>' + respond.data[i].replyList[2].nickName+':'+respond.data[i].replyList[2].contents + '</p>' + '<p>查看全部评论' + respond.data[i].reply + '条</p></div>';
                }
                if(respond.data[i].isclick == '1') {
                    dzclass = 'dzchange';
                    dzimg = 'img/topic-liking-icon@2x.png';
                } else {
                    dzclass = '';
                    dzimg = 'img/topic-like-icon@2x.png';                                        
                }
                // console.log(getDateDiff(getDateTimeStamp(respond.data[i].buildDate)))
                if(respond.data[i].headImg == '') {
                    headimg = './img/morentouxiang-icon@2x.png';
                } else {
                    headimg = respond.data[i].headImg;
                }
                html += '<div class="person"><div class="user_head"><img src="'+headimg+'"></div><div class="zl"><div class="xq"><p class="username">'+respond.data[i].nickName+'</p><p class="xz"><img src="img/topic-'+xb+'male-icon@2x.png" alt=""><span class="user_xz">'+getXz(respond.data[i].signs)+'</span></p></div><div class="time"><span>'+getDateDiff(getDateTimeStamp(respond.data[i].buildDate))+'</span></div><div class="none"></div>'+option+'<div class="gd">'+respond.data[i].viewpoint+'</div><div class="dz"><img src="'+dzimg+'" alt="" class="dz_icon"><span class="dz_count '+dzclass+'">'+respond.data[i].zan+'</span></div><div class="hf"><img src="img/topic-talking-icon@2x.png" alt="" class="hf_icon"><span class="hf_count">'+hf+'</span></div>'+hf_more+'</div></div><hr size="1" style="opacity:0.3"/>'
            };
            $('.content').append(html); 
            $('.content').find('hr').eq($('.person').length - 1).remove();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    })
    
    
})    
   
   
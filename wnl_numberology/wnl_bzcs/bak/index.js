$(function () {
    if(document.addEventListener){
        document.addEventListener("touchstart", function(){}, false);
    }
    if(FastClick!=undefined){
        FastClick.attach(document.body);
    }
    var wnl=getQueryString("wnl"),share=getQueryString("share");


    var loadIconWidth=153*$(".loadIcon").height()/499;
    $("#percent-container").css("bottom",$(".loadIcon").height()*80/499+"px");
    $(".loadIcon").width(loadIconWidth);
    $(".loadIcon").css("margin-left",-loadIconWidth/2+"px");


    var dataObj=null;
    var router=new Router();
    //todo
    var name="", sex=-1,bornDate="";
    //分享图片链接
    var imgUrl='http://www.51wnl.com/activitynew/smzs/img/weixin.jpg';
    var month="",day="";
    var title="生命之书";
    //发送朋友标题
    var fTitle="生命之书";
    //分享描述
    var desc="你一生的秘密都藏在这里";
    //分享链接
    var link="http://www.51wnl.com/activitynew/smzs/index.html";
    textObj = {
        text: title,
        image: "1",
        url:link,
        pureText:title,
        prefix:""
    };
    textObj1={
        text: title,
        image: "1",
        targetUrl:link,
        perfix:""
    };
    var trueIdentity="";
    var identityList=[
        {
            beginDate:"2014-1-3",endDate:"2014-1-9",trueIdentity:"有决心的佼佼者",name:"赵煦",identity:"北宋哲宗皇帝",bornDate:"1076年1月4日",picImg:"img/people/p01.jpg"
        },
        {
            beginDate:"2014-1-10",endDate:"2014-1-16",trueIdentity:"强势坦率的支配者",name:"蔡元培",identity:"教育家",bornDate:"1868年1月11日",picImg:"img/people/p02.jpg"
        },
        {
            beginDate:"2014-1-17",endDate:"2014-1-22",trueIdentity:"神秘幻想的思考者",name:"霍元甲",identity:"爱国武术家",bornDate:"1868年1月18日",picImg:"img/people/p03.jpg"
        },
        {
            beginDate:"2014-1-23",endDate:"2014-1-30",trueIdentity:"敏感急躁的天才",name:"邓丽君",identity:"歌唱家",bornDate:"1953年1月29日",picImg:"img/people/p04.jpg"
        },
        {
            beginDate:"2014-1-31",endDate:"2014-2-7",trueIdentity:"青春自在的顽童",name:"老舍",identity:"作家",bornDate:"1899年2月3日",picImg:"img/people/p05.jpg"
        },
        {
            beginDate:"2014-2-8",endDate:"2014-2-15",trueIdentity:"接纳宽容的天使",name:"聂耳",identity:"音乐家",bornDate:"1912年2月14日",picImg:"img/people/p06.jpg"
        },
        {
            beginDate:"2014-2-16",endDate:"2014-2-22",trueIdentity:"敏感进取的事业狂",name:"武则天",identity:"女皇帝",bornDate:"624年2月17日",picImg:"img/people/p07.jpg"
        },
        {
            beginDate:"2014-2-23",endDate:"2014-3-2",trueIdentity:"活力十足的超脱者",name:"白居易",identity:"唐代诗人",bornDate:"772年2月28日",picImg:"img/people/p08.jpg"
        },
        {
            beginDate:"2014-3-3",endDate:"2014-3-10",trueIdentity:"情感丰富的独行侠",name:"宋美龄",identity:"民国第一夫人",bornDate:" 1897年3月5日",picImg:"img/people/p09.jpg"
        },
        {
            beginDate:"2014-3-11",endDate:"2014-3-18",trueIdentity:"沉思的舞者与梦想家",name:"田汉",identity:"音乐家",bornDate:"1898年3月12日",picImg:"img/people/p10.jpg"
        },
        {
            beginDate:"2014-3-19",endDate:"2014-3-24",trueIdentity:"直率热情的新青年",name:"赵匡胤",identity:"宋朝太祖皇帝",bornDate:"927年3月21日",picImg:"img/people/p11.jpg"
        },
        {
            beginDate:"2014-3-25",endDate:"2014-4-2",trueIdentity:"精力旺盛的求知者",name:"三毛",identity:"台湾女作家",bornDate:"1943年3月26日",picImg:"img/people/p12.jpg"
        },
        {
            beginDate:"2014-4-3",endDate:"2014-4-10",trueIdentity:"目标导向的工作狂",name:"宋教仁",identity:"革命家",bornDate:"1882年4月5日",picImg:"img/people/p13.jpg"
        },
        {
            beginDate:"2014-4-11",endDate:"2014-4-18",trueIdentity:"积极慷慨的社交先锋",name:"周汝昌",identity:"学者",bornDate:"1918年4月14日",picImg:"img/people/p14.jpg"
        },
        {
            beginDate:"2014-4-19",endDate:"2014-4-24",trueIdentity:"热衷权力的实干家",name:"祖冲之",identity:"科学家",bornDate:"429年4月20日",picImg:"img/people/p15.jpg"
        },
        {
            beginDate:"2014-4-25",endDate:"2014-5-2",trueIdentity:"善于表现的组织者",name:"朱棣",identity:"明朝永乐皇帝",bornDate:"1360年5月2日",picImg:"img/people/p16.jpg"
        },
        {
            beginDate:"2014-5-3",endDate:"2014-5-10",trueIdentity:"乐于分享的老师",name:"爱新觉罗?玄烨",identity:"清朝圣祖皇帝",bornDate:"1654年5月4日",picImg:"img/people/p17.jpg"
        },
        {
            beginDate:"2014-5-11",endDate:"2014-5-18",trueIdentity:"桀骜不驯的挑战者",name:"蔡畅",identity:"革命家",bornDate:"1900年5月14日",picImg:"img/people/p18.jpg"
        },
        {
            beginDate:"2014-5-19",endDate:"2014-5-24",trueIdentity:"才华横溢的探险家",name:"陈景润",identity:"数学家",bornDate:"1933年5月22日",picImg:"img/people/p19.jpg"
        },
        {
            beginDate:"2014-5-25",endDate:"2014-6-2",trueIdentity:"魅力非凡的独裁者",name:"辛弃疾",identity:"北宋爱国词人",bornDate:"1140年5月28日",picImg:"img/people/p20.jpg"
        },
        {
            beginDate:"2014-6-3",endDate:"2014-6-10",trueIdentity:"创意十足的语言大师",name:"林徽因",identity:"建筑学家",bornDate:"1904年6月10日",picImg:"img/people/p21.jpg"
        },
        {
            beginDate:"2014-6-11",endDate:"2014-6-18",trueIdentity:"善意理财的忙碌者",name:"冼星海",identity:"音乐家",bornDate:"1905年6月13日",picImg:"img/people/p22.jpg"
        },
        {
            beginDate:"2014-6-19",endDate:"2014-6-24",trueIdentity:"专一严苛的管理者",name:"马寅初",identity:"教育学家",bornDate:"1882年6月24日",picImg:"img/people/p23.jpg"
        },
        {
            beginDate:"2014-6-25",endDate:"2014-7-2",trueIdentity:"技术精湛的高手",name:"邓稼先",identity:"科学家",bornDate:"1924年6月25日",picImg:"img/people/p24.jpg"
        },
        {
            beginDate:"2014-7-3",endDate:"2014-7-10",trueIdentity:"传统温情的持家者",name:"矛盾",identity:"作家",bornDate:"1896年7月4日",picImg:"img/people/p25.jpg"
        },
        {
            beginDate:"2014-7-11",endDate:"2014-7-18",trueIdentity:"出谋划策军师",name:"李时珍",identity:"医学家",bornDate:"1518年7月13日",picImg:"img/people/p26.jpg"
        },
        {
            beginDate:"2014-7-19",endDate:"2014-7-25",trueIdentity:"大胆无畏的奉献者",name:"徐悲鸿",identity:"画家",bornDate:"1895年7月19日",picImg:"img/people/p27.jpg"
        },
        {
            beginDate:"2014-7-26",endDate:"2014-8-2",trueIdentity:"热情洋溢的领导者",name:"纪晓岚",identity:"文学家",bornDate:"1724年7月26日",picImg:"img/people/p28.jpg"
        },
        {
            beginDate:"2014-8-3",endDate:"2014-8-10",trueIdentity:"忠诚自信的能力者",name:"季羡林",identity:"古文字学家",bornDate:"1911年8月6日",picImg:"img/people/p29.jpg"
        },
        {
            beginDate:"2014-8-11",endDate:"2014-8-18",trueIdentity:"英勇干练的能力者",name:"李宗仁",identity:"军事家",bornDate:"1891年8月13日",picImg:"img/people/p30.jpg"
        },
        {
            beginDate:"2014-8-19",endDate:"2014-8-25",trueIdentity:"自给自足的矛盾体",name:"邓小平",identity:"政治家",bornDate:"1904年8月22日",picImg:"img/people/p31.jpg"
        },
        {
            beginDate:"2014-8-26",endDate:"2014-9-2",trueIdentity:"乐于奉献的服务者",name:"林则徐",identity:"名族英雄",bornDate:"1785年8月30日",picImg:"img/people/p32.jpg"
        },
        {
            beginDate:"2014-9-3",endDate:"2014-9-10",trueIdentity:"深思熟虑的理性者",name:"朱翊钧",identity:"明朝万历皇帝",bornDate:"1563年9月4日",picImg:"img/people/p33.jpg"
        },
        {
            beginDate:"2014-9-11",endDate:"2014-9-18",trueIdentity:"冷静能干的保卫者",name:"张国荣",identity:"艺人",bornDate:"1956年9月12日",picImg:"img/people/p34.jpg"
        },
        {
            beginDate:"2014-9-19",endDate:"2014-9-24",trueIdentity:"美感和谐的活力分子",name:"李自成",identity:"农民领袖",bornDate:"1606年9月22日",picImg:"img/people/p35.jpg"
        },
        {
            beginDate:"2014-9-25",endDate:"2014-10-2",trueIdentity:"完美主义的冷酷者",name:"鲁迅",identity:"文学家",bornDate:"1881年9月25日",picImg:"img/people/p36.jpg"
        },
        {
            beginDate:"2014-10-3",endDate:"2014-10-10",trueIdentity:"公正随和的洞察者",name:"林语堂",identity:"作家",bornDate:"1895年10月10日",picImg:"img/people/p37.jpg"
        },
        {
            beginDate:"2014-10-11",endDate:"2014-10-18",trueIdentity:"野心勃勃的学者",name:"席慕蓉",identity:"台湾诗人",bornDate:"1943年10月15日",picImg:"img/people/p38.jpg"
        },
        {
            beginDate:"2014-10-19",endDate:"2014-10-25",trueIdentity:"感受力强的艺术家",name:"余光中",identity:"台湾诗人",bornDate:"1928年10月21日",picImg:"img/people/p39.jpg"
        },
        {
            beginDate:"2014-10-26",endDate:"2014-11-2",trueIdentity:"注意细节的好强者",name:"李四光",identity:"地质学家",bornDate:"1889年10月26日",picImg:"img/people/p40.jpg"
        },
        {
            beginDate:"2014-11-3",endDate:"2014-11-11",trueIdentity:"性感的深度思考者",name:"赵朴初",identity:"佛教领袖",bornDate:"1907年11月5日",picImg:"img/people/p41.jpg"
        },
        {
            beginDate:"2014-11-12",endDate:"2014-11-18",trueIdentity:"合群迷人的好伙伴",name:"孙中山",identity:"革命家",bornDate:"1866年11月12日",picImg:"img/people/p42.jpg"
        },
        {
            beginDate:"2014-11-19",endDate:"2014-11-24",trueIdentity:"乐观的理想主义者",name:"赵光义",identity:"北宋太宗皇帝",bornDate:"939年11月20日",picImg:"img/people/p43.jpg"
        },
        {
            beginDate:"2014-11-25",endDate:"2014-12-2",trueIdentity:"受人尊敬的独立者",name:"曾国藩",identity:"晚清名臣",bornDate:"1811年11月26日",picImg:"img/people/p44.jpg"
        },
        {
            beginDate:"2014-12-3",endDate:"2014-12-10",trueIdentity:"与众不同的原创派",name:"冯友兰",identity:"哲学家",bornDate:"1895年12月4日",picImg:"img/people/p45.jpg"
        },
        {
            beginDate:"2014-12-11",endDate:"2014-12-18",trueIdentity:"专注自信的野心家",name:"钱学森",identity:"科学家",bornDate:"1911年12月11日",picImg:"img/people/p46.jpg"
        },
        {
            beginDate:"2014-12-19",endDate:"2014-12-25",trueIdentity:"富有神秘感的先知",name:"林巧稚",identity:"医学家",bornDate:"1901年12月23日",picImg:"img/people/p47.jpg"
        },
        {
            beginDate:"2014-12-26",endDate:"2015-1-2",trueIdentity:"威武霸气的王者",name:"沈从文",identity:"作家",bornDate:"1902年12月28日",picImg:"img/people/p48.jpg"
        }
    ];

    var circle = new ProgressBar.Circle('#percent-container', {
        trailColor: "#F1F1F1",
        color: '#EFA143',
        strokeWidth: 4,
        trailWidth: 4,
        duration: 1000,
        text: {
            value: '0'
        },
        step: function(state, bar) {
            bar.setText((bar.value() * 100).toFixed(0)+"%");
        }
    });
    var loader = new resLoader({
        resources : ["share-book.png","nr-bg.jpg","smzs-nr-ss02@3x.png","smzs-nr-ss07@3x.png","smzs-nr-ss03@3x.png","smzs-nr-ss01@3x.png","smzs-fm@3x.png","load_bg@3x.png","smzs-nr-ss04@3x.png",
            "share-bg@3x.jpg","smzs-nr-ss06@3x.png","smzs-nr-ss07@2x.png","smzs-nr-ss05@3x.png","smzs-title-img@3x.png","smzs-nr-ss04@2x.png","smzs-lotus-img@3x.png"
            ,"tj-bg.png","smzs-word-youknow@3x.png","main-bg@3x.png","smzs-share-cr@3x.png","smzs-menu-word01a@3x.png","smzs-menu-word02a@3x.png","smzs-menu-word03a@3x.png","smzs-menu-word04a@3x.png",
            "smzs-menu-word05a@3x.png","smzs-menu-word06a@3x.png","smzs-menu-word07a@3x.png","smzs-menu-word08a@3x.png","smzs-menu-word01b@3x.png","smzs-menu-word02b@3x.png","smzs-menu-word03b@3x.png","smzs-menu-word04b@3x.png",
            "smzs-menu-word05b@3x.png","smzs-menu-word06b@3x.png","smzs-menu-word07b@3x.png","smzs-menu-word08b@3x.png","smzs-menu-arrow-icon@3x.png"],
        baseUrl:"img/",
        onStart : function(total){
            circle.set(0);
        },
        onProgress : function(current, total){
            var percent = current/total;
            circle.animate(percent);
        },
        onComplete : function(total){
            circle.animate(1, function() {
                setTimeout(function () {
                    $(".loadContent").remove();
                    $(".page").css("display","none");
                    if(share){
                        name=getQueryString("name");
                        bornDate=getQueryString("date");
                        $.ajax({
                            url:"http://act.51wnl.com/lifetree/getdatabydate?dt="+bornDate,
                            type:"get",
                            dataType:"jsonp",
                            success: function (result) {
                                dataObj=result;
                                getIdentity();
                                if(name.length>4){
                                    $(".nameDescTxt").html(name.substr(0,4)+"...的生命之书");
                                }
                                else{
                                    $(".nameDescTxt").html(name+"的生命之书");
                                }
                                var dateList=bornDate.split("-");
                                month=str2Int(dateList[1]);
                                day=str2Int(dateList[2]);
                                title=name+"的生命之书——"+month+"月"+day+"日："+trueIdentity;
                                //发送朋友标题
                                fTitle=name+"的生命之书";
                                //分享描述
                                desc=month+"月"+day+"日："+trueIdentity;
                                //分享链接
                                link="http://www.51wnl.com/activitynew/smzs/index.html?share=1&name="+name+"&date="+bornDate;
                                if(wnl){
                                    _hmt.push(['_trackEvent','smzs_wnl_share_click', 'click', 'smzs_wnl_share_click', 'smzs_wnl_share_click']);
                                    textObj = {
                                        text: title,
                                        image: "1",
                                        url:link,
                                        pureText:title,
                                        prefix:""
                                    };
                                    textObj1={
                                        text: title,
                                        image: "1",
                                        targetUrl:link,
                                        perfix:""
                                    };
                                }
                                else{
                                    setShareInfo();
                                }
                                $(".userTryBtn").removeClass("hidden");
                                $(".detailUerTryBtn").css("display","block");
                                $(".shareLink").html("我也测测");
                                $(".indexPage").css("display","block");
                            }
                        });
                    }
                    else{
                        $(".inputPage").css("display","block");
                    }
                    $("body").addClass("index");
                    $(".shareImgContent").addClass("img");
                    $(".lianhuaImg").addClass("img");
                },1000);
            });
        }
    });
    loader.start();


    $('#appDate').mobiscroll().datePicker({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh",
        //minDate: new Date(2014, 8, 15),
        //maxDate: new Date(2014, 9, 20),
        isSolar: 1,
        enableSolarLunar:1,
        showSolarLunar: 0,
        enableIgnore: 0,
        onSelect: function(r, t) {}
    });
    $('#appDate').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);


    $(".ajaxPage").height($(window).height());
    $(".pageCenterContent>div").css("max-height",($(window).height()-50-50-1-1)+"px");
    $(".pageCenterContent>div").height($(window).height()-50-50-1-1);


    $(".maleContent").click(function () {
        sex=1;
        $(".boxRightContent div").removeClass("active");
        $(this).addClass("active");
    });
    $(".femaleContent").click(function () {
        sex=0;
        $(".boxRightContent div").removeClass("active");
        $(this).addClass("active");
    });
    var userClick=0;
    $(".confirmBtn").click(function () {
        name=$(".nameTxt").val().trim();
        if(name.length===0){
            $("#tipModal").modal({"showString":"请输入姓名"});
            return false;
        }
        // 出生日期
        bornDate=$("#appDate").val().substr(3).trim();
        if(bornDate.length===0){
            $("#tipModal").modal({"showString":"请选择出生日期"});
            return false;
        }
        if(sex===-1){
            $("#tipModal").modal({"showString":"请选择性别"});
            return false;
        }
        $(".page").css("display","none");
        rotateTJ();
        $(".ajaxPage").css("display","block");
        var dateList=bornDate.split("-");
        month=str2Int(dateList[1]);
        day=str2Int(dateList[2]);
        title=name+"的生命之书——"+month+"月"+day+"日："+trueIdentity;
        //发送朋友标题
        fTitle=name+"的生命之书";
        //分享描述
        desc=month+"月"+day+"日："+trueIdentity;
        //分享链接
        link="http://www.51wnl.com/activitynew/smzs/index.html?share=1&name="+name+"&date="+bornDate;
        if(wnl){
            _hmt.push(['_trackEvent','smzs_wnl_share_click', 'click', 'smzs_wnl_share_click', 'smzs_wnl_share_click']);
            textObj = {
                text: title,
                image: "1",
                url:link,
                pureText:title,
                prefix:""
            };
            textObj1={
                text: title,
                image: "1",
                targetUrl:link,
                perfix:""
            };
        }
        else{
            setShareInfo();
        }
        var beginTime=(new Date()).getTime();
        $.ajax({
            url:"http://act.51wnl.com/lifetree/getdatabydate?dt="+bornDate,
            type:"get",
            dataType:"jsonp",
            success: function (result) {
                dataObj=result;
                getIdentity();
                share=0;
                isUserTry=0;
                userClick=1;
                var finishTime=(new Date()).getTime();
                setTimeout(function () {
                    $(".userTryBtn").addClass("hidden");
                    router.redirect("#/index");
                    clearInterval(rotateTimer);
                },3000-finishTime+beginTime);
            }
        });
    });
    function getIdentity() {
        var dateList=bornDate.split("-");
        var month=str2Int(dateList[1])- 1,day=str2Int(dateList[2]);
        var userDateObj=new Date(2014,month,day);
        if(month===0&&day<3){
            userDateObj=new Date(2015,month,day);
        }
        var identityObj=null;
        for(var i=0;i<identityList.length;i++){
            var dateList1=identityList[i].beginDate.split("-");
            var year1=str2Int(dateList1[0]),month1=str2Int(dateList1[1])- 1,day1=str2Int(dateList1[2]);
            var beginDateObj=new Date(year1,month1,day1);
            var dateList2=identityList[i].endDate.split("-");
            var year2=str2Int(dateList2[0]),month2=str2Int(dateList2[1])- 1,day2=str2Int(dateList2[2]);
            var endDateObj=new Date(year2,month2,day2);
            if(userDateObj>=beginDateObj&&userDateObj<=endDateObj){
                identityObj=identityList[i];
                trueIdentity=identityObj.trueIdentity;
                $(".trueIdentity").html(trueIdentity);
                $(".identityName").html(identityObj.identity+identityObj.name);
                $(".bornDate").html(identityObj.bornDate);
                $(".identityPeople").attr("src",identityObj.picImg);
                break;
            }
        }
    }
    router.route("#/",function(req,next){
        //$(".page").css("display","none");
        $(".page").fadeOut();
        if(share){
            $(".indexPage").fadeIn();
        }
        else{
            $(".inputPage").fadeIn();
        }
    });
    var rotateTimer;
    function rotateTJ(){
        var rotate1= 0,rotate2=0;
        rotateTimer=setInterval(function () {
            $(".tjImg").css("-webkit-transform","rotateZ("+rotate1+"deg)");
            rotate1+=6;
            if(rotate1>=360){
                rotate1=0;
            }
            $(".tj_zx").css("-webkit-transform","rotateZ("+rotate2+"deg)");
            rotate2+=3;
            if(rotate2>=360){
                rotate2=0;
            }
        },100);
    }
    router.route("#/ajax",function(req,next){
        $(".page").fadeOut();
        rotateTJ();
        $(".ajaxPage").fadeIn();
    });
    router.route("#/index",function(req,next){
        if(share){
            name=getQueryString("name");
        }
        if(name.length>4){
            $(".nameDescTxt").html(name.substr(0,4)+"...的生命之书");
        }
        else{
            $(".nameDescTxt").html(name+"的生命之书");
        }
        $(".page").fadeOut();
        $(".indexPage").fadeIn();
    });
    var isUserTry=0;
    $(".userTryBtn").click(function () {
        isUserTry=1;
       router.redirect("#/");
        $(".page").fadeOut();
        $(".inputPage").fadeIn();
    });
    $(".detailUerTryBtn").click(function () {
        $(".userTryBtn").trigger("click");
    });
    $(".identityBtn").click(function () {
       router.redirect("#/identity");
    });
    $(".characterBtn").click(function () {
       router.redirect("#/character");
    });
    $(".careerBtn").click(function () {
        router.redirect("#/career");
    });
    $(".fateBtn").click(function () {
        router.redirect("#/fate");
    });
    $(".examineBtn").click(function () {
        router.redirect("#/examine");
    });
    $(".healthyBtn").click(function () {
        router.redirect("#/healthy");
    });
    $(".huazaiBtn").click(function () {
        router.redirect("#/huazai");
    });
    $(".kaiyunBtn").click(function () {
        router.redirect("#/kaiyun");
    });

    router.route("#/identity",function(req,next){
        $(".page").fadeOut();
        $(".identityPage").fadeIn();
    });
    $(".identityNextLink").click(function () {
        router.redirect("#/character");
    });
    $(".identityLink").click(function () {
        router.redirect("#/identity");
    });
    $(".characterLink").click(function () {
        router.redirect("#/character");
    });
    $(".careerLink").click(function () {
        router.redirect("#/career");
    });
    $(".fateLink").click(function () {
        router.redirect("#/fate");
    });
    $(".examineLink").click(function () {
        router.redirect("#/examine");
    });
    $(".healthyLink").click(function () {
        router.redirect("#/healthy");
    });
    $(".huazaiLink").click(function () {
        router.redirect("#/huazai");
    });
    $(".kaiyunLink").click(function () {
        router.redirect("#/kaiyun");
    });
    $(".shareLink").click(function () {
        if(share){
            $(".userTryBtn").trigger("click");
        }
        else{
            router.redirect("#/share");
        }
    });
    router.route("#/character",function(req,next){
        $(".characterRightCenterTxt").html(dataObj.data[0].xingGeFenXi);
        setTimeout(function () {
            if($(".characterRightCenterTxt").height()+75+$(".smzs-nr-ss01").height()<$(".rightCenterContent").height()){
                $(".smzs-nr-ss01").css("position","absolute");
            }
        },0);
        $(".page").fadeOut();
        $(".characterPage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    router.route("#/career",function(req,next){
        $(".careerRightCenterTxt").html(dataObj.data[0].shiYeZhuLi.replace(/\\r\\n/g,"<br/>"));
        setTimeout(function () {
            if($(".careerRightCenterTxt").height()+75+$(".smzs-nr-ss02").height()<$(".rightCenterContent").height()){
                $(".smzs-nr-ss02").css("position","absolute");
            }
        },0);
        $(".page").fadeOut();
        $(".careerPage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    router.route("#/fate",function(req,next){
        $(".fateRightCenterTxt").html(dataObj.data[0].taoHuaYuan.replace(/\\r\\n/g,"<br/>"));
        setTimeout(function () {
            if($(".fateRightCenterTxt").height()+75+$(".smzs-nr-ss03").height()<$(".rightCenterContent").height()){
                $(".smzs-nr-ss03").css("position","absolute");
            }
        },0);
        $(".page").fadeOut();
        $(".fatePage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    router.route("#/examine",function(req,next){
        var thisYearKaoShi=dataObj.data[0].thisYearKaoShi.replace(/\\r\\n/g,"<br/>");
        var kaoShiYun=dataObj.data[0].kaoShiYun.replace(/\\r\\n/g,"<br/>");
        $(".examineRightCenterTxt").html(kaoShiYun+"<br/"+thisYearKaoShi);
        setTimeout(function () {
            if($(".examineRightCenterTxt").height()+75+$(".smzs-nr-ss04").height()<$(".rightCenterContent").height()){
                $(".smzs-nr-ss04").css("position","absolute");
            }
        },0);
        $(".page").fadeOut();
        $(".examinePage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    router.route("#/healthy",function(req,next){
        $(".healthyRightCenterTxt").html(dataObj.data[0].jianKangFenXi.replace(/\\r\\n/g,"<br/>"));
        setTimeout(function () {
            if($(".healthyRightCenterTxt").height()+75+$(".smzs-nr-ss05").height()<$(".rightCenterContent").height()){
                $(".smzs-nr-ss05").css("position","absolute");
            }
        },0);
        $(".page").fadeOut();
        $(".healthyPage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    router.route("#/huazai",function(req,next){
        $(".huazaiRightCenterTxt").html(dataObj.data[0].zaiHuoHuaJie.replace(/\\r\\n/g,"<br/>"));
        setTimeout(function () {
            if($(".huazaiRightCenterTxt").height()+75+$(".smzs-nr-ss06").height()<$(".rightCenterContent").height()){
                $(".smzs-nr-ss06").css("position","absolute");
            }
        },0);
        $(".page").fadeOut();
        $(".huazaiPage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    router.route("#/kaiyun",function(req,next){
        var jiXiangShuZi=dataObj.data[0].jiXiangShuZi.replace(/\\r\\n/g,"<br/>");
        var jiXiangYanSe=dataObj.data[0].jiXiangYanSe.replace(/\\r\\n/g,"<br/>");
        var jiXiangCaiWu=dataObj.data[0].jiXiangCaiWu.replace(/\\r\\n/g,"<br/>");
        $(".kaiyunRightCenterTxt").html(jiXiangShuZi+"<br/>"+jiXiangYanSe+"<br/>"+jiXiangCaiWu);
        setTimeout(function () {
            if($(".kaiyunRightCenterTxt").height()+75+$(".smzs-nr-ss07").height()<$(".rightCenterContent").height()){
                $(".smzs-nr-ss07").css("position","absolute");
            }
        },0);
        $(".page").fadeOut();
        $(".kaiyunPage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    router.route("#/share",function(req,next){
        $("body").addClass("share");
        $(".page").fadeOut();
        $(".sharePage").fadeIn();
        $(".rightCenterContent").scrollTop(0);
    });
    $(".reviewBtn").click(function () {
        $("body").addClass("index");
        router.redirect("#/index");
    });


    $(".shareBookBtn").click(function () {
        if(wnl){
            _hmt.push(['_trackEvent','smzs_wnl_share_click', 'click', 'smzs_wnl_share_click', 'smzs_wnl_share_click']);
            if(window.ylwindow){
                ylwindow.reportHasShare(true);
                location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
            }
            else{
                location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
            }
        }
        else{
            _hmt.push(['_trackEvent','smzs_share_click', 'click', 'smzs_share_click', 'smzs_share_click']);
            $(".mask").removeClass("hidden");
            return false;
        }
    });
    $(".mask").click(function(){
        $(this).addClass("hidden");
    });
    wx.ready(function(){
        setShareInfo();
    });
    wx.error(function(res){
        alert(JSON.stringify(res));
    });
    function setShareInfo(){
        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: fTitle, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            //type: '', // 分享类型,music、video或link，不填默认为link
            //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    function str2Int(str){
        str = str.replace(/^0+/g, '');
        if(str.length == 0){
            return 0;
        }
        return parseInt(str);
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
});
var textObj1,textObj;
function appCallback_share(){
    _hmt.push(['_trackEvent','smzs_wnl_share_click', 'click', 'smzs_wnl_share_click', 'smzs_wnl_share_click']);
    try{
        if(window.ylwindow){
            ylwindow.reportHasShare(true);
            location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
        }
        else{
            location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e){
        alert(e)
    }
    return 1;
}
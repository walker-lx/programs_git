window.onload = function () {
        var ua = window.navigator.userAgent;
        var isAndroid = (/Android|HTC/i.test(ua) || (window.navigator.platform + '').match(/Linux/i));
        var isIPad = !isAndroid && /iPad/i.test(ua);
        var isIPhone = !isAndroid && /iPod|iPhone/i.test(ua);
        var isIOS = isIPad || isIPhone;
        if ($(document).width() < 420) {
                $(".cooperate-img").attr("src", "./img/mb-partner-img@2x.jpg");
                $(".productBtn").html("下载");
                $(".starProductBtn").html("下载");
        }
        var location = window.location.href;
        if (location.indexOf("calendar") != -1 || location.indexOf("youqi") != -1 || location.indexOf("jiudun") != -1 || location.indexOf("other") != -1) {
                $(".company").find(".navText").css("color", "#1928d2");
                $(".company .navMenu").removeClass("hidden");
                $(".navMask").removeClass("hidden");
                // 联系我们
                $(".joinus.navMenuMask").hover(function () {
                        $(".company .navMenu").addClass("hidden");
                        $(".joinus .navMenu").removeClass("hidden");
                        $(".navMask").removeClass("hidden");
                        $(".joinus").find(".navText").css("color", "#1928d2");
                }, function () {
                        $(".company .navMenu").removeClass("hidden");
                        $(".joinus .navMenu").addClass("hidden");
                        $(".joinus").find(".navText").css("color", "#000000");
                });
        } else if (location.indexOf("callus") != -1 || location.indexOf("joinus") != -1 || location.indexOf("jobdetail") != -1) {
                $(".joinus .navMenu").removeClass("hidden");
                // 产业布局
                $(".company.navMenuMask").hover(function () {
                        $(".company .navMenu").removeClass("hidden");
                        $(".joinus .navMenu").addClass("hidden");
                        $(".company").find(".navText").css("color", "#1928d2");
                }, function () {
                        $(".company .navMenu").addClass("hidden");
                        $(".joinus .navMenu").removeClass("hidden");
                        $(".company").find(".navText").css("color", "#000000");
                });
        } else {
                $(".navMenu").addClass("hidden");
                $(".navMask").addClass("hidden");
                $(".joinus").find(".navText").css("color", "#000000");
                // 产业布局
                $(".company.navMenuMask").hover(function () {
                        $(".company .navMenu").removeClass("hidden");
                        $(".navMask").removeClass("hidden");
                        $(".company").find(".navText").css("color", "#1928d2");
                }, function () {
                        $(".company .navMenu").addClass("hidden");
                        $(".navMask").addClass("hidden");
                        $(".company").find(".navText").css("color", "#000000");
                });
                // 联系我们
                $(".joinus.navMenuMask").hover(function () {
                        $(".joinus .navMenu").removeClass("hidden");
                        $(".navMask").removeClass("hidden");
                        $(".joinus").find(".navText").css("color", "#1928d2");
                }, function () {
                        $(".joinus .navMenu").addClass("hidden");
                        $(".navMask").addClass("hidden");
                        $(".joinus").find(".navText").css("color", "#000000");
                });
        }

        // 加入我们-招聘页面
        if (location.indexOf("joinus") != -1 || location.indexOf("jobdetail") != -1) {
                getRecruitmentList();
        }

        function getRecruitmentList() {
                $.getJSON('//www.51wnl.com/Official/api/site/getnews?code=000').done(function (res) {
                        splitRecruitmentInfo(res.data.items);
                });
        }

        function splitRecruitmentInfo(data) {
                var calendarRecruitment;
                var youqiRecruitment;
                var jiudunRecruitment;
                calendarRecruitment = $.grep(data, function (item) {
                        return item.categoryCode === '000001'
                });
                youqiRecruitment = $.grep(data, function (item) {
                        return item.categoryCode === '000002'
                });
                jiudunRecruitment = $.grep(data, function (item) {
                        return item.categoryCode === '000003'
                });
                // alert(calendarRecruitment);
                if (location.indexOf("jobdetail") != -1) {
                        var company = parseInt(getQueryString('company'));
                        var nowIndex = parseInt(getQueryString('index'));
                        var detailData = [];
                        if (company === 1) {
                                detailData = calendarRecruitment;
                        } else if (company === 2) {
                                detailData = youqiRecruitment;
                        } else if (company === 3) {
                                detailData = jiudunRecruitment;
                        }
                        setRecruitmentDetail(detailData, nowIndex);
                        return;
                }
                // setRecruitment('calendarRecruitment', calendarRecruitment, 1);
                // setRecruitment('youqiRecruitment', youqiRecruitment, 2);
                // setRecruitment('jiudunRecruitment', jiudunRecruitment, 3);
                setTimeout(function () {
                        setRecruitment('calendarRecruitment', calendarRecruitment, 1);
                }, 0)
                setTimeout(function () {
                        setRecruitment('youqiRecruitment', youqiRecruitment, 2);
                }, 0)
                setTimeout(function () {
                        setRecruitment('jiudunRecruitment', jiudunRecruitment, 3);
                }, 0);
                setTimeout(function () {
                        // 设置背景颜色
                        var num = $('.job_list').children().length;
                        if (num === 2 || num === 3) {
                                $('.out_block:nth-child(2)').addClass('middle_block');
                        }

                }, 0);

        }

        function setRecruitmentDetail(data, index) {
                $('.detail_job_name').html(data[index].title);
                $('.detail_salary, .detail_salary_mobile').html(data[index].salary);
                $('.detail_request').html(data[index].subTitle);
                $('.detail_content').html(data[index].content);
                $('.detail_time').html(data[index].pubDate.split('T')[0] + '发布');

                // 移动
                if (!IsPC()) {
                        setTimeout(function () {
                                if ($(".main").height() < $(window).innerHeight()) {
                                        setTimeout(function () {
                                                $('.footer-mobile').css({
                                                        'bottom': '0px',
                                                        'position': 'absolute'

                                                });
                                                $('.detail_method_wrapper').css({
                                                        'width': '100%',
                                                        'bottom': '228px',
                                                        'position': 'absolute'
                                                });
                                        }, 0);
                                }
                        }, 100);

                        setTimeout(function () {
                                $('.footer-mobile').removeClass("unvisible");
                        }, 100);
                } else {
                        setTimeout(function () {
                                if ($(".main").height() <= $(window).innerHeight()) {
                                        setTimeout(function () {
                                                $('.footer_index').css({
                                                        'bottom': '0px',
                                                        'position': 'absolute'
                                                });
                                                $('.detail_method_wrapper').css({
                                                        'width': '100%',
                                                        'bottom': '132px',
                                                        'position': 'absolute'
                                                });
                                        }, 0);
                                }
                        }, 100);

                        setTimeout(function () {
                                $('.footer_index').removeClass("unvisible");
                        }, 100);
                }
        }

        function setRecruitment(name, recruitment, company) {
                if (recruitment.length < 1) {
                        $('.' + name).parent().remove();
                        return
                }
                $('.' + name).removeClass('hidden');
                for (var i = 0; i < recruitment.length; i++) {
                        var link = recruitment[i].link ? recruitment[i].link : './jobdetail_youloft.html?company=' + company + '&index=' + i;
                        $('.' + name).append('<a class="job_item" href="' + link + '" target="_blank">' +
                                '<div class="job_index">' + (i + 1) + '</div>' +
                                '<div class="job_name">' + recruitment[i].title + '</div>' +
                                '<div class="job_detail">查看详情</div>' +
                                '</a>');
                }
        }

        function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r !== null) {
                        return decodeURIComponent(r[2]);
                }
                return null;
        }
        $(".mobile-nav").click(function () {
                if ($(".firstLine").hasClass("rotate")) {
                        setTimeout(function () {
                                $(".mobile-navList").addClass("hidden");
                                $(".firstLine").removeClass("rotate");
                                $(".secondLine").removeClass("rotate");
                                $(".thirdLine").removeClass("hidden");
                        }, 100);
                        // $("html").removeClass("noscroll");
                } else {
                        // $("html").addClass("noscroll");
                        setTimeout(function () {
                                $(".mobile-navList").removeClass("hidden");
                                $(".firstLine").addClass("rotate");
                                $(".secondLine").addClass("rotate");
                                $(".thirdLine").addClass("hidden");
                        }, 100);
                }
        });
        $('.mobile-navList').bind("touchmove", function (e) {
                e.preventDefault();
        });

        $('.mb-transform a').click(function () {
                document.querySelector('.mobile-nav').click();
        })

        function IsPC() {
                var userAgentInfo = window.navigator.userAgent;
                var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"
                ];
                var flag = true;
                for (var v = 0; v < Agents.length; v++) {
                        if (userAgentInfo.indexOf(Agents[v]) > 0) {
                                flag = false;
                                break;
                        }
                }
                return flag;
        }
        if (IsPC()) {

                $(".left-btn").hover(function () {
                        $(this).find(".apk_QR").removeClass("hidden");
                }, function () {
                        $(this).find(".apk_QR").addClass("hidden");
                });
                $(".productBtn").hover(function () {
                        $(this).find(".apk_QR_product").removeClass("hidden");
                }, function () {
                        $(this).find(".apk_QR_product").addClass("hidden");
                });

                $(".starProductBtn").hover(function () {
                        $(this).find(".apk_QR").removeClass("hidden");
                }, function () {
                        $(this).find(".apk_QR").addClass("hidden");
                });
                $(".wnl-kefu").hover(function () {
                        $(this).find(".kefu").removeClass("hidden");
                }, function () {
                        $(this).find(".kefu").addClass("hidden");
                });

        } else {
                if (isAndroid) {
                        $(".jiudun_weather").attr("href", "https://mobile.baidu.com/item?docid=23032137&source=s1001");
                        $(".jiudun_weishang").attr("href", "https://mobile.baidu.com/item?docid=22316500&source=s1001");
                        $(".jiudun_kuaihua").attr("href", "https://mobile.baidu.com/item?type=soft&docid=23035064");
                        $(".jiudun_huilv").attr("href", "https://mobile.baidu.com/item?type=soft&docid=11381335");
                        $(".jiudun_qianming").attr("href", "https://mobile.baidu.com/item?type=soft&docid=22933413");
                        $(".youqi_shuxiang").attr("href", "http://android.myapp.com/myapp/detail.htm?apkName=com.ireadercity&ADTAG=mobile");

                        $(".jiudun_liaoxingqiu").attr("href", "http://www.liaoxingqiu.com/");
                        $(".wnl").attr("href", "http://sj.qq.com/myapp/detail.htm?apkName=com.youloft.calendar");
                        $(".wnl_huangli").attr("href", "http://shouji.baidu.com/software/22714643.html");
                        $(".wnl_diandi").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendarpro");
                        $(".wnl_lilisi").attr("href", "http://sj.qq.com/myapp/detail.htm?apkName=com.youloft.lilith");
                        $(".wnl_car").attr("href", "http://www.carapk.com/apk/229.html");
                        $(".wnl_hd").attr("href", "http://www.wandoujia.com/apps/com.youloft.calendar.pad");
                        $(".wnl_tv").attr("href", "http://app.shafa.com/apk/wannianli.html");
                        $(".wnl_fast").attr("href", "http://sj.qq.com/myapp/detail.htm?apkName=com.youloft.wnl");
                } else if (isIOS) {
                        $(".jiudun_weather").attr("href", "https://itunes.apple.com/cn/app/id455611831?mt=8");
                        $(".jiudun_weishang").attr("href", "https://itunes.apple.com/cn/app/id1147639986?mt=8");
                        $(".jiudun_kuaihua").attr("href", "https://itunes.apple.com/cn/app/id1283001486?mt=8");
                        $(".jiudun_huilv").attr("href", "https://itunes.apple.com/cn/app/id1131990095?mt=8");
                        $(".jiudun_qianming").attr("href", "https://itunes.apple.com/cn/app/id1191241339?mt=8");
                        $(".jiudun_liaoxingqiu").attr("href", "http://dsp.cqqwzx.com/liaodownt");
                        $(".jiudun_lanmao").attr("href", "http://www.cattry.com");
                        $(".youqi_shuxiang").attr("href", "https://itunes.apple.com/cn/app/%E4%B9%A6%E9%A6%99%E4%BA%91%E9%9B%86-%E6%B5%B7%E9%87%8F%E5%B0%8F%E8%AF%B4%E9%98%85%E8%AF%BB%E7%94%B5%E5%AD%90%E4%B9%A6%E8%BF%BD%E4%B9%A6%E7%A5%9E%E5%99%A8/id535742398?mt=8")
                        $(".wnl").attr("href", "https://itunes.apple.com/cn/app/%E4%B8%87%E5%B9%B4%E5%8E%86-%E5%80%BC%E5%BE%97%E4%BF%A1%E8%B5%96%E7%9A%84%E6%97%A5%E5%8E%86%E9%BB%84%E5%8E%86%E6%9F%A5%E8%AF%A2%E5%B7%A5%E5%85%B7/id419805549?mt=8")
                        $(".wnl_huangli").attr("href", "https://itunes.apple.com/cn/app/%E4%B8%87%E5%B9%B4%E5%8E%86%E9%BB%84%E5%8E%86%E6%97%A5%E5%8E%86/id527092746?mt=8");
                        $(".wnl_diandi").attr("href", "https://itunes.apple.com/cn/app/id1311377191?l=zh&ls=1&mt=8");
                        $(".wnl_lilisi").attr("href", "https://itunes.apple.com/cn/app/%E8%8E%89%E8%8E%89%E6%96%AF%E6%98%9F%E5%BA%A7/id1261255522?mt=8");
                        $(".wnl_car").attr("href", "http://www.carapk.com/apk/229.html");
                        $(".wnl_hd").attr("href", "http://www.wandoujia.com/apps/com.youloft.calendar.pad");
                        $(".wnl_tv").attr("href", "http://app.shafa.com/apk/wannianli.html");
                        $(".wnl_fast").attr("href", "https://itunes.apple.com/cn/app/%E4%B8%87%E5%B9%B4%E5%8E%86%E6%9E%81%E9%80%9F%E7%89%88/id1149263047?mt=8");
                }

        }

        function testHtml() {
                var location = window.location.href;
                var Agents = ["calendar", "youqi",
                        "jiudun", "other",
                        "callus", "joinus", "jobdetail"
                ];
                var flag = false;
                for (var v = 0; v < Agents.length; v++) {
                        if (location.indexOf(Agents[v]) > 0) {
                                flag = true;
                                break;
                        }
                }
                return flag;
        }
        //页面顶部导航栏滑动效果
        // 判断支不支持transtion
        function testAttr(cssStr) {
                if ($('.topBanner').css(cssStr)) {
                        return false;
                } else {
                        return true;
                }
        }
        var test = testAttr("transition");
        var prevTop = 0,
                currTop = 0,
                bottomflag = false;
        $('.topBanner').removeClass('p-header-hide').addClass('p-header-show');
        $('.navMask,.navMenu,.navMenu-mobile').removeClass('p-subnav-hide').addClass('p-subnav-show');
        // $('.mobile-nav').removeClass('lines-hide').addClass('lines-show');
        if (test) {
                $('.topBanner').css('top', 0);
                $('.navMask').css('top', '95px');
                $('.navMenu').css('top', '55px');
        }
        var scrollHeight = $(document.body).height();　
        setTimeout(function () {
                scrollHeight = $(document.body).height();　
        }, 150);
        // console.log(scrollHeight);　
        var windowHeight = $(window).height();　
        var footerheight = $('.footer-mobile').height();
        // console.log(scrollHeight + '------------------------' + windowHeight);
        $(window).scroll(function () {
                currTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (currTop < prevTop) { //判断小于则为向上滚动
                        setTimeout(function () {
                                if (testHtml()) {
                                        $('.topBanner').removeClass('p-header-hide').addClass('p-header-show');
                                        $('.navMask,.navMenu,.navMenu-mobile').removeClass('p-subnav-hide').addClass('p-subnav-show');
                                } else {
                                        $('.topBanner').removeClass('p-mbheader-hide').addClass('p-mbheader-show');
                                }

                                if (test) {
                                        if (IsPC()) {
                                                $('.topBanner').css('top', 0);
                                                $('.navMask').css('top', '95px');
                                                $('.navMenu').css('top', '55px');
                                        } else {
                                                $('.topBanner').css('top', 0);
                                                $('.navMenu-mobile').css('top', '56px');
                                        }

                                }
                        }, 0);

                } else {
                        if ($(window).scrollTop() < 42) {
                                setTimeout(function () {
                                        if (testHtml()) {
                                                $('.topBanner').removeClass('p-header-hide').addClass('p-header-show');
                                                $('.navMask,.navMenu,.navMenu-mobile').removeClass('p-subnav-hide').addClass('p-subnav-show');
                                        } else {
                                                $('.topBanner').removeClass('p-mbheader-hide').addClass('p-mbheader-show');
                                        }
                                        if (test) {
                                                if (IsPC()) {
                                                        $('.topBanner').css('top', '-96px');
                                                        $('.navMask,.navMenu').css('top', '-50px');
                                                } else {
                                                        $('.topBanner').css('top', '-56px');
                                                        $('.navMenu-mobile').css('top', '-96px');
                                                }
                                        }
                                }, 0);

                        }
                        if ($(window).scrollTop() >= 130) {
                                setTimeout(function () {
                                        if (testHtml()) {
                                                $('.topBanner').removeClass('p-header-show').addClass('p-header-hide');
                                                $('.navMask,.navMenu,.navMenu-mobile').removeClass('p-subnav-show').addClass('p-subnav-hide');
                                        } else {
                                                $('.topBanner').removeClass('p-mbheader-show').addClass('p-mbheader-hide');
                                        }

                                        if (test) {
                                                if (IsPC()) {
                                                        $('.topBanner').css('top', '-96px');
                                                        $('.navMask,.navMenu').css('top', '-50px');
                                                } else {
                                                        $('.topBanner').css('top', '-56px');
                                                        $('.navMenu-mobile').css('top', '-96px');
                                                }
                                        }
                                }, 0);
                        }
                }
                if (IsPC()) {
                        if (currTop + windowHeight >= scrollHeight) {　
                                setTimeout(function () {
                                        if (testHtml()) {
                                                $('.topBanner').removeClass('p-header-hide').addClass('p-header-show');
                                                $('.navMask,.navMenu,.navMenu-mobile').removeClass('p-subnav-hide').addClass('p-subnav-show');
                                        } else {
                                                $('.topBanner').removeClass('p-mbheader-hide').addClass('p-mbheader-show');
                                        }
                                        if (test) {
                                                if (IsPC()) {
                                                        $('.topBanner').css('top', 0);
                                                        $('.navMask').css('top', '95px');
                                                        $('.navMenu').css('top', '55px');
                                                } else {
                                                        $('.topBanner').css('top', 0);
                                                        $('.navMenu-mobile').css('top', '56px');
                                                }
                                        }
                                }, 0);
                        }
                } else {
                        if (currTop + windowHeight + 120 >= scrollHeight) {　
                                setTimeout(function () {
                                        if (testHtml()) {
                                                $('.topBanner').removeClass('p-header-hide').addClass('p-header-show');
                                                $('.navMask,.navMenu,.navMenu-mobile').removeClass('p-subnav-hide').addClass('p-subnav-show');
                                        } else {
                                                $('.topBanner').removeClass('p-mbheader-hide').addClass('p-mbheader-show');
                                        }
                                        if (test) {
                                                if (IsPC()) {
                                                        $('.topBanner').css('top', 0);
                                                        $('.navMask').css('top', '95px');
                                                        $('.navMenu').css('top', '55px');
                                                } else {
                                                        $('.topBanner').css('top', 0);
                                                        $('.navMenu-mobile').css('top', '56px');
                                                }
                                        }
                                }, 0);
                        }
                }
                setTimeout(function () {
                        prevTop = currTop
                }, 0);
        });
}
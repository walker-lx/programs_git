   var code = getQueryValue('code');
   var pageIndex = getQueryValue('page') === '' ? 0 : parseInt(getQueryValue('page'));
   var nowpage = getQueryValue('page') === '' ? 0 : parseInt(getQueryValue('page'));
   //    if (pageIndex + 1 == totalPage) {
   //        $(".newsShowMore").addClass("hidden");
   //        alert(1);
   //    }
   //    alert(pageIndex);
   var pageArr = [];
   var data;
   var bigData;

   function IsPC() {
       var userAgentInfo = window.navigator.userAgent;
       var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone ", "iPad ", "iPod "];
       var flag = true;
       for (var v = 0; v < Agents.length; v++) {
           if (userAgentInfo.indexOf(Agents[v]) > 0) {
               flag = false;
               break;
           }
       }
       return flag;
   }
   var num;

   if (IsPC()) {
       num = parseInt(630 / 24) * 2;

   } else {
       var length = $(window).width() - 165;
       num = parseInt(length / 16) * 2;
   }

   var isfit = window.localStorage.getItem("JF_cn");
   $.ajax({
       url: '//www.51wnl.com/Official/api/site/GetCategories',
       dataType: 'JSON',
       type: 'GET',
       success: function (result) {
           // console.log(result);
           var response = result.data.categories;
           //    console.log(1);
           $(".news-nav").empty();
           for (var i = 0; i < response.length; i++) {
               if (response[i].cat === "Youloft_All") {
                   var code = response[i].subCats[0].code;
                   $(".news-nav").append('<div class="newsNavMenu"><a class="newsNavTitle" href="news_youloft.html?code=' + code + '&page=0">' +
                       response[i].title + '</a><span class="newsNavTitle-border"></span></div>');
               }
           }
           var obj = $(".news-nav")[0];
           StranBody(obj, isfit);
       },
       error: function (result) {
           //    console.log("error");
       }
   })
   $.ajax({
       url: '//www.51wnl.com/Official/api/site/getnews?code=' + code,
       dataType: 'JSON',
       type: 'GET',
       success: function (result) {
           // data = dataA;
           // bigData = dataA;
           //    console.log(1111);
           // console.log(JSON.parse(result));
           data = result.data.items;
           bigData = result.data.items;

           //    console.log(result.data.items);
           pageChange(data, pageIndex);
       }
   })
   // 中间件

   function pageTo(pageIndex) {
       var totalPage = parseInt(bigData.length / 10) + (parseInt(bigData.length % 10) === 0 ? 0 : 1);
       pageIndex = parseInt(pageIndex);
       pageChange(bigData, pageIndex);
       //    page=pageIndex+1;
       //    console.log(pageIndex);
       var str = window.location.href;
       window.location.href = str.substring(0, str.indexOf("&")) + "&page=" + pageIndex;

   }

   // 切换页面

   function pageChange(bigData, pageIndex) {
       if (bigData.length === 0) {
           return;
       }
       //计算总页数
       var totalPage = parseInt(bigData.length / 10) + (parseInt(bigData.length % 10) === 0 ? 0 : 1);
       if (pageIndex === -1) {
           //点击尾页更新pageIndex
           pageIndex = totalPage - 1;
       }

       var data = [];
       data.length = 0;
       for (var i = 10 * pageIndex; i < bigData.length && i < 10 * (pageIndex + 1); i++) {
           data.push(bigData[i]);
       }
       newsReset(data);
       pageReset(pageIndex, totalPage);
   }

   //更新pagination显示
   function pageReset(pageIndex, totalPage) {
       if (totalPage > 1) {
           $('.newsBtn').removeClass('hidden');
       }
       if (pageIndex > 4) {
           $('.newsBtn').find('.first').removeClass('hidden');
       } else {
           if (!$('.newsBtn').find('.first').hasClass('hidden')) {
               $('.newsBtn').find('.first').addClass('hidden');
           }
       }
       if (totalPage - pageIndex > 5) {
           $('.newsBtn').find('.last').removeClass('hidden');
       } else {
           if (!$('.newsBtn').find('.last').hasClass('hidden')) {
               $('.newsBtn').find('.last').addClass('hidden');
           }
       }
       if (page == totalPage) {
           $(".newsShowMore").addClass("hidden");
       }

       getPageNum(pageIndex, totalPage);

       $('.pages').empty();
       for (var i = 0; i < pageArr.length; i++) {
           if (parseInt(pageArr[i]) === parseInt(pageIndex)) {
               var item = '<div class="page activePage" onclick="pageTo(' + parseInt(pageArr[i]) + ')">' + (parseInt(
                   pageArr[i]) + 1) + '</div>';
               $('.newsBtn').find('.pages').append(item);
           } else {
               var item = '<div class="page" onclick="pageTo(' + parseInt(pageArr[i]) + ')">' + (parseInt(pageArr[i]) +
                   1) + '</div>';
               $('.newsBtn').find('.pages').append(item);
           }
       }
   }

   // page数据数组
   function getPageNum(pageIndex, totalPage) {
       pageArr = [pageIndex];
       //    alert( pageArr);
       var i = 0;
       while (1) {
           i++;
           if (pageArr.length >= 5) {
               return pageArr;
           }
           if (pageIndex + i > totalPage - 1 && pageIndex - i < 0) {
               return pageArr;
           }
           if (pageIndex - i >= 0) {
               pageArr.unshift(pageIndex - i);
           }
           if (pageIndex + i <= totalPage - 1) {
               pageArr.push(pageIndex + i);
           }
       }
   }

   function newsReset(data) {
       $('.news-content').empty();
       for (var i = 0; i < data.length; i++) {
           if (data[i].subTitle.length > 99) {
               var subTitle = data[i].subTitle.slice(0, 99) + "...";
           } else {
               var subTitle = data[i].subTitle;
           }
           if (!data[i].image||data[i].image=='') {
               var image = "http://qiniu.image.cq-wnl.com/content/20171226ea63ba20e1c844029b109d4c7b05b756.png";
           } else {
               var image = data[i].image;
           }

           if (data[i].title.length > num) {
               var title = data[i].title.slice(0, num - 1) + "...";
           } else {
               var title = data[i].title;
           }

           if (data[i].content == "" || data[i].content.length == 0) {
               var item = '<a class="news-item" target="_blank"  href=' + data[i].link + '>';
           } else {
               var item = '<a class="news-item" target="_blank" href="newsdetail_youloft.html?id=' + data[i].id + "&page=" + nowpage + "&code=" + code + '">';
           }
           item += '  <div class="item-img"> <img src="' + image + '"/>' + '</div>';
           item += '  <div class="item-content">';
           item += '    <div class="item-title">' + title + '</div>';
           item += '    <div class="item-text">' + subTitle + '</div>';
           item += '    <div class="item-time">' + data[i].pubDate.split('T')[0] + '</div>';
           item += '  <span>阅读全文</span>';
           item += '  </div>';
           item += '</a>';
           $('.news-content').append(item);
       }
       var obj = $(".news-content")[0];
       StranBody(obj, isfit);
       $(".footer_index").removeClass("hidden");
       $(".footer-mobile").removeClass("hidden");

   }

   function getQueryValue(name) {
       var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
       var r = window.location.search.substr(1).match(reg);
       if (r != null) {
           return decodeURIComponent(r[2]);
       }
       return null;
   }
   var page = pageIndex + 1;
   $(".newsShowMore").click(function () {
       var totalPage = parseInt(bigData.length / 10) + (parseInt(bigData.length % 10) === 0 ? 0 : 1);
       if (page < totalPage) {
           var content = new Array();

           for (var i = 10 * page; i < bigData.length && i < 10 * (page + 1); i++) {
               content.push(bigData[i]);
               //    console.log(111111111111111111111);
               //    console.log(bigData[i]);
           }
           for (var i = 0; i < content.length; i++) {
               if (content[i].subTitle.length > 99) {
                   var subTitle = content[i].subTitle.slice(0, 99) + "...";
               } else {
                   var subTitle = content[i].subTitle;
               }
               if (content[i].image == "") {
                   var image = "https://qiniu.image.cq-wnl.com/content/20171226ea63ba20e1c844029b109d4c7b05b756.png";
               } else {
                   var image = content[i].image;
               }

               if (content[i].title.length > num) {
                   var title = content[i].title.slice(0, num - 1) + "...";
               } else {
                   var title = content[i].title;
               }
               //    console.log(content[i]);
               if (content[i].content == "" || content[i].content.length == 0) {
                   var item = '<a class="news-item" target="_blank"  href=' + content[i].link + '>';
               } else {
                   var item = '<a class="news-item" target="_blank" href="newsdetail_youloft.html?id=' + content[i].id + "&page=" + nowpage + "&code=" + code + '">';
               }
               item += '  <div class="item-img"> <img src="' + image + '"/>' + '</div>';
               item += '  <div class="item-content">';
               item += '    <div class="item-title">' + title + '</div>';
               item += '    <div class="item-text">' + subTitle + '</div>';
               item += '    <div class="item-time">' + content[i].pubDate.split('T')[0] + '</div>';
               item += '  <span>阅读全文</span>';
               item += '  </div>';
               item += '</a>';
               $('.news-content').append(item);
           }
           var obj = $(".news-content")[0];
           StranBody(obj, isfit);
           page++;
           //    console.log("page:------" + page);
           if (page == totalPage) {
               $(".newsShowMore").addClass("hidden");
           }
       }

   })
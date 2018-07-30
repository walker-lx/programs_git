$(function() {
  var code1 = getQueryValue('code1');
  var code2 = getQueryValue('code2');
  var pageIndex = getQueryValue('page') === '' ? 0 : parseInt(getQueryValue('page'));
  var pageArr = [];
  var data;
  var bigData;
  $.ajax({
    url: 'https://www.51wnl.com/Official/api/site/GetCategories',
    dataType: 'JSON',
    type: 'GET',
    success: function(result) {
      data = result.data.categories;
      var i;
      for (i = 0; i < data.length; i++) {
        var html =
          '<a class="redirectLink" href="blogs_calandar.html?code1=' +
          data[i].code +
          '&code2=' +
          data[i].code +
          '001&page=0">' +
          data[i].title +
          '</a>';
        $('.dynamics')
          .find('.cooMenu')
          .append(html);
        if (code1 == data[i].code) {
          html =
            '<a class="redirectLink activeLi" href="blogs_calandar.html?code1=' +
            data[i].code +
            '&code2=' +
            data[i].code +
            '001&page=0">' +
            data[i].title +
            '</a>';
        }
        $('.secondNav').append(html);
        if (code1 === data[i].code.toString()) {
          var j;
          for (j = 0; j < data[i].subCats.length; j++) {
            var item;
            if (code2 == data[i].subCats[j].code) {
              item =
                '<a class="tab activeblognav" href="blogs_calandar.html?code1=' +
                data[i].code +
                '&code2=' +
                data[i].subCats[j].code +
                '&page=0">' +
                data[i].subCats[j].title +
                '</a>';
            } else {
              item =
                '<a class="tab " href="blogs_calandar.html?code1=' +
                data[i].code +
                '&code2=' +
                data[i].subCats[j].code +
                '&page=0">' +
                data[i].subCats[j].title +
                '</a>';
            }
            $('.chooseTab').append(item);
          }
        }
      }
    }
  });

  $.ajax({
    url: 'https://www.51wnl.com/Official/api/site/getnews?code=' + code2,
    dataType: 'JSON',
    type: 'GET',
    success: function(result) {
      // data = dataA;
      // bigData = dataA;
      data = result.data.items;
      bigData = result.data.items;
      console.log(result.data.items);
      pageChange(data, pageIndex);
    }
  });

  // 中间件
  function pageTo(pageIndex) {
    pageIndex = parseInt(pageIndex);
    pageChange(bigData, pageIndex);
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
      $('.paginationContent').removeClass('hidden');
    }
    if (pageIndex > 4) {
      $('.pagination')
        .find('.first')
        .removeClass('hidden');
    } else {
      if (
        !$('.pagination')
          .find('.first')
          .hasClass('hidden')
      ) {
        $('.pagination')
          .find('.first')
          .addClass('hidden');
      }
    }
    if (totalPage - pageIndex > 5) {
      $('.pagination')
        .find('.last')
        .removeClass('hidden');
    } else {
      if (
        !$('.pagination')
          .find('.last')
          .hasClass('hidden')
      ) {
        $('.pagination')
          .find('.last')
          .addClass('hidden');
      }
    }
    getPageNum(pageIndex, totalPage);
    $('.btns').empty();
    for (var i = 0; i < pageArr.length; i++) {
      if (parseInt(pageArr[i]) === parseInt(pageIndex)) {
        var item =
          '<div class="btn active" onclick="pageTo(' +
          parseInt(pageArr[i]) +
          ')">' +
          (parseInt(pageArr[i]) + 1) +
          '</div>';
        $('.pagination')
          .find('.btns')
          .append(item);
      } else {
        var item =
          '<div class="btn" onclick="pageTo(' + parseInt(pageArr[i]) + ')">' + (parseInt(pageArr[i]) + 1) + '</div>';
        $('.pagination')
          .find('.btns')
          .append(item);
      }
    }
  }

  // page数据数组
  function getPageNum(pageIndex, totalPage) {
    pageArr = [pageIndex];
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

  // 新闻刷新
  function newsReset(data) {
    $('.newsItems').empty();
    for (var i = 0; i < data.length; i++) {
      var item = '<div class="dynamicsContent" onclick="newsTo(' + data[i].id + ')">';
      item +=
        '  <div class="dyImg" style="border: none;background-size: cover;background-image:url(' +
        data[i].image +
        ')"></div>';
      item += '  <div class="dyDetails">';
      item += '    <div class="dyTitle">' + data[i].title + '</div>';
      item += '    <div class="dyText">' + setStyle(data[i].subTitle) + '</div>';
      item += '    <div class="dyTime">' + data[i].pubDate.split('T')[0] + '</div>';
      item += '  </div>';
      item += '  <div class="tabBtn"></div>';
      item += '</div>';
      $('.newsItems').append(item);
    }
  }

  // 中间跳转
  function newsTo(newsId) {
    location.href = '/newsPage.html?id=' + newsId;
  }
  function getQueryValue(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }
  // 描述控制在两行
  function setStyle(text) {
    var num = parseInt(627 / 16);
    if (text.length > num * 2) {
      text = text.substring(0, num * 2 - 4) + ' ......';
    }
    return text;
  }
});

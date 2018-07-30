function getQueryValue(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
$(function() {
  var url;
  $('.navList .cooperate').click(function() {
    window.location.href = 'document_calandar.html';
  });
  $('.navList .dynamics').click(function() {
    window.location.href = url;
  });

  function getMenu() {
    $.ajax({
      url: 'https://www.51wnl.com/Official/api/site/GetCategories',
      dataType: 'JSON',
      type: 'GET',
      success: function(result) {
        var array = new Array();
        console.log(result);
        data = result.data.categories;
        for (var i = 0; i < data.length; i++) {
          if (data[i].cat == 'Youloft_Calendar') {
            array.push(data[i]);
          }
        }
        if (!!array) {
          url = ' blogs_calandar.html?code1=' + array[0].code + '&code2=' + array[0].subCats[0].code + '&page=0';
        }
        $('.dynamics')
          .find('.cooMenu')
          .empty();
        for (var i = 0; i < array.length; i++) {
          var html =
            '<a class="redirectLink" href="blogs_calandar.html?code1=' +
            array[i].code +
            '&code2=' +
            array[i].code +
            '001&page=0">' +
            array[i].title +
            '</a>';
          $('.dynamics')
            .find('.cooMenu')
            .append(html);
        }
      }
    });
  }
  setTimeout(getMenu(), 0);
  // setTimeout(addUrl(), 0);
  // $(".lDetail a").click(function () {
  //   $(".lDetail").find("a").removeClass("activeApi");
  //   $(this).addClass("activeApi");
  // })
  // if (window.location.href.indexOf("apicon") == -1) {
  //   $(".lDetail a").first().addClass("activeApi");
  // } else {
  //   var api = getQueryValue("apicon");
  //   $(".lDetail a").eq(api).addClass("activeApi");
  // }
  // $(window).scroll(function () {
  //   alert(1);
  //   if ($(window).scrollTop() >= 200) {
  //     $(".lDetail").addClass("navFix");
  //   } else {
  //     $(".lDetail").removeClass("navFix");
  //   }
  // });
});

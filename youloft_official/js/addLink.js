   $(document).ready(function () {
    //    jQuery.support.cors = true;
       var array = new Array();
       // $.ajax({
       //     url: '//www.51wnl.com/Official/api/site/GetCategories',
       //     type: 'GET',
       //     dataType: "json",
       //     async: false,
       //     //  crossDomain: true,
       //     cache: false,
       //     success: function (result) {
       //         var data = result.data.categories;
       //         console.log(1);
       //         for (var i = 0; i < data.length; i++) {
       //             if (data[i].cat === "Youloft_All") {
       //                 array.push(data[i]);
       //             }
       //         }
       //         console.log(array[0].subCats[0].code);
       //         $(".industry").attr("href", "news_youloft.html?code=" + array[0].subCats[0].code + "&page=0");
       //     },
       //     error: function (result) {
       //         alert(result.status + "---------");
       //         console.log("error");
       //     }
       // })
       $.getJSON('//www.51wnl.com/Official/api/site/GetCategories').done(function (data) {
        //    alert(data.data.categories);
           var data = data.data.categories;

           for (var i = 0; i < data.length; i++) {
               if (data[i].cat === "Youloft_All") {
                   array.push(data[i]);
            //   alert(2);
               }
           }
           $(".industry").attr("href", "news_youloft.html?code=" + array[0].subCats[0].code + "&page=0");

       });
   })
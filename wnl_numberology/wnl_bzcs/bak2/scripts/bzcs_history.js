$(function () {
    FastClick.attach(document.body);
    var prm = {
        userId: getQueryString("userId"),
        deviceId: getQueryString("deviceId"),
        mac: getQueryString("mac"),
        imei: getQueryString("imei")
    };
    loadHistory();
    function loadHistory(){
        $.ajax({
            cache: false,
            type: "POST",
            dataType: "json",
            url: "../nrlorder/GetJPOrderList?" + $.param(prm)+"&random="+Math.random(),
            success: function (result) {
                $(".historyItem").remove();
                if (result.status == 0) {
                    if(result.data.length===0){
                        $(".noneItem").removeClass("hidden");
                        $(".fixedEditContent").addClass("hidden");
                        return false;
                    }
                    $(".historyItem").remove();
                    var itemTemplate = '<div class="historyItem">\
								<div class="deleteItemContent" data-orderId="<%- orderId %>"></div>\
								<a class="itemLink" href="<%- resultPage %>">\
								    <div class="corner top-left"></div>\
                                    <div class="corner top-right"></div>\
                                    <div class="corner bottom-left"></div>\
                                    <div class="corner bottom-right"></div>\
                                    <div class="textContent">\
									    <div class="leftInfoContent">\
									        <div class="itemInfoContent">\
                                                    <div class="nameContent">\
                                                        <span class="key">姓名：</span>\
                                                        <span id="name" class="value"><%- name %></span>\
                                                    </div>\
                                                    <div class="sexContent1">\
                                                        <span class="key">姓别：</span>\
                                                        <span id="name" class="value"><%- sex %></span>\
                                                    </div>\
									        </div>\
									        <div class="gongliContent">\
									            <span class="key">公历：</span>\
									            <span id="name" class="value"><%- birth %></span>\
									        </div>\
									    </div>\
									    <div class="rightArrowIcon"></div>\
								    </div>\
								</a>\
							</div>';
                    $.each(result.data, function () {
                        var year=this.birth.substring(0,4),month=this.birth.substring(5,7),day=this.birth.substring(8,10),hour=this.birth.substring(11,13);
                        var isUnkown=this.birth.substring(14)==="59:59";
                        var mkpItem = _.template(itemTemplate)({
                            name: this.name,
                            sex: this.sex,
                            birth:isUnkown? year+"年"+month+"月"+day+"日": year+"年"+month+"月"+day+"日"+hour+"时",
                            orderId: this.orderId,
                            resultPage: "../tools/bzcs_result.html?orderId=" + this.orderId
                        });
                        $("#dvHistory").append(mkpItem);
                    });
                    $(".nameContent").width($(".leftInfoContent").width()/2+15);
                    $(".itemLink").width($(".infoContainer").width()-2);
                }
                else {
                    alert("获取测算数据错误,错误信息为" + result.msg);
                }
            },
            error: function (xhr, ajaxOperation, throwErr) {
                return false;
            }
        });
    }
    $(".editBtn").click(function () {
        $(".deleteItemContent").width(25);
        $(".deleteItemContent").css("margin-right","15px");
       $(".editContent").addClass("hidden");
       $(".operateContent").removeClass("hidden");
    });
    $(".cancelBtn").click(function () {
        $(".deleteItemContent").width(0);
        $(".deleteItemContent").css("margin-right","0");
        $(".deleteItemContent").removeClass("active");
       $(".operateContent").addClass("hidden");
       $(".editContent").removeClass("hidden");
    });
    $(".allBtn").click(function(){
        if($(".deleteItemContent").hasClass("active")){
            $(".deleteItemContent").removeClass("active");
        }
        else{
            $(".deleteItemContent").addClass("active");
        }
    });
    $(document).on("click",".deleteItemContent",function () {
        if($(this).hasClass("active")){
            $(this).removeClass('active');
        }
        else{
            $(this).addClass('active');
        }
    });
    $(".deleteBtn").click(function(){
        $("#deleteConfirModal").modal();
    });
    $("#confirmDelete").click(function () {
        deleteRecords();
    });
    function deleteRecords(){
        var ids = [];
        $(".deleteItemContent").each(function(){
            if($(this).hasClass("active"))
                ids.push($(this).data("orderid"));
        });
        if(ids.length > 0){
            $.ajax({
                cache: false,
                type: "POST",
                dataType: "json",
                url: "../nrlorder/deleteorder?orderids=" + JSON.stringify(ids),
                success: function(result) {
                    if(result.status == 0) {
                        $("#tipModal").modal({showString:"删除成功！"});
                    }
                    else {
                        alert("删除失败，原因为：" + result.msg);
                    }
                    $(".cancelBtn").trigger("click");
                    loadHistory();
                },
                error: function(xhr, ajaxOperation, throwErr) {
                    return false;
                }
            });
        } else {
            $("#tipModal").modal({showString:"您尚未选中任何内容！"});
        }
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
function appCallback_showShare(){
    return 0;
}
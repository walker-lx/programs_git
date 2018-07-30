$(function () {
    FastClick.attach(document.body);
    var userId=getQueryString("userId"),
        deviceId=getQueryString("deviceId"),
        mac=getQueryString("mac"),
        imei=getQueryString("imei");
    GetList();
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
        deleteOrder();
    });
    function deleteOrder()
    {
        var deleteUrl = "../nrlorder/deleteorder?orderids=";
        var orders = [];
        $(".deleteItemContent").each(function(){
            if($(this).hasClass("active"))
                orders.push($(this).data("orderId"));
        });
        if(orders.length > 0){
            deleteUrl = deleteUrl + JSON.stringify(orders);
            $.ajax({
                type: "GET",
                url: deleteUrl,
                dataType: "json",
                success: function (data) {
                    if (data && data.status == 0) {
                        $("#tipModal").modal({showString:"删除成功！"});
                        $(".cancelBtn").trigger("click");
                        GetList();
                    }
                }
            });
        }
        else{
            $("#tipModal").modal({showString:"您尚未选中任何内容！"});
        }
    }
    function GetList()
    {
        var url = "../nrlorder/GetHHOrderList?userId="+userId+"&deviceid="+deviceId+"&mac="+mac+"&imei="+imei+"&random="+Math.random();
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (data) {
                $("#history").empty();
                if (data && data.status == 0)
                {
                    if(data.data.length===0){
                        $(".noneItem").removeClass("hidden");
                        $(".fixedEditContent").addClass("hidden");
                        return false;
                    }
                    for (var i = 0; i < data.data.length; i++)
                    {
                        var obj=data.data[i];
                        var link = "bzhhfree.html?orderid=";
                        if (obj.isPayed)
                        {
                            link = "bzhhpayed.html?orderid=";
                        }
                        link += obj.orderId;
                        var tempItem=$(".tempItem").clone();
                        tempItem.find(".deleteItemContent").data("orderId",obj.orderId);
                        tempItem.find(".itemLink").attr("href",link);
                        tempItem.find(".scoreCount").html(obj.score);
                        tempItem.find(".scoreCount").html(obj.score);
                        tempItem.find(".nameItem").html(obj.maleName + " & " + obj.femaleName);
                        tempItem.find(".descItem").html(obj.result);
                        tempItem.removeClass("tempItem");
                        tempItem.removeClass("hidden");
                        tempItem.appendTo("#history");
                    }
                    $(".itemLink").width($("#history").width()-2);
                }
            }
        });
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
var wnl_utils = (function () {
    function getQS(name) {
        var sValue = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i"));
        return decodeURI(sValue ? sValue[1] : sValue);
    }

    return {
        getQS: getQS,
    };
})();
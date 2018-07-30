var abc = {
    lunarInfo: [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984, 27424, 108228, 43744, 41696, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732, 53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680, 53584, 62034, 54560],
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    Zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    sTermInfo: ["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"],
    nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    nStr2: ["初", "十", "廿", "卅"],
    nStr3: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
    lYearDays: function(f) {
        var c, e = 348;
        for (c = 32768; c > 8; c >>= 1) e += abc.lunarInfo[f - 1900] & c ? 1 : 0;
        return e + abc.leapDays(f)
    },
    leapMonth: function(f) {
        return 15 & abc.lunarInfo[f - 1900]
    },
    leapDays: function(f) {
        return abc.leapMonth(f) ? 65536 & abc.lunarInfo[f - 1900] ? 30 : 29 : 0
    },
    monthDays: function(f, c) {
        return c > 12 || 1 > c ? -1 : abc.lunarInfo[f - 1900] & 65536 >> c ? 30 : 29
    },
    solarDays: function(f, c) {
        if (c > 12 || 1 > c) return - 1;
        var e = c - 1;
        return 1 == e ? f % 4 == 0 && f % 100 != 0 || f % 400 == 0 ? 29 : 28 : abc.solarMonth[e]
    },
    toGanZhi: function(f) {
        return abc.Gan[f % 10] + abc.Zhi[f % 12]
    },
    getTerm: function(f, c) {
        if (1900 > f || f > 2100) return - 1;
        if (1 > c || c > 24) return - 1;
        var e = abc.sTermInfo[f - 1900],
            a = [parseInt("0x" + e.substr(0, 5)).toString(), parseInt("0x" + e.substr(5, 5)).toString(), parseInt("0x" + e.substr(10, 5)).toString(), parseInt("0x" + e.substr(15, 5)).toString(), parseInt("0x" + e.substr(20, 5)).toString(), parseInt("0x" + e.substr(25, 5)).toString()],
            r = [a[0].substr(0, 1), a[0].substr(1, 2), a[0].substr(3, 1), a[0].substr(4, 2), a[1].substr(0, 1), a[1].substr(1, 2), a[1].substr(3, 1), a[1].substr(4, 2), a[2].substr(0, 1), a[2].substr(1, 2), a[2].substr(3, 1), a[2].substr(4, 2), a[3].substr(0, 1), a[3].substr(1, 2), a[3].substr(3, 1), a[3].substr(4, 2), a[4].substr(0, 1), a[4].substr(1, 2), a[4].substr(3, 1), a[4].substr(4, 2), a[5].substr(0, 1), a[5].substr(1, 2), a[5].substr(3, 1), a[5].substr(4, 2)];
        return parseInt(r[c - 1])
    },
    toChinaYear: function(b) {
        var f = "零一二三四五六七八九";
        return b.toString().split("").map(function(b) {
            return f.substr(b, 1)
        }).join("")
    },
    toChinaMonth: function(f) {
        if (f > 12 || 1 > f) return - 1;
        var c = abc.nStr3[f - 1];
        return c += "月"
    },
    toChinaDay: function(f) {
        var c;
        switch (f) {
            case 10:
                c = "初十";
                break;
            case 20:
                c = "二十";
                break;
            case 30:
                c = "三十";
                break;
            default:
                c = abc.nStr2[Math.floor(f / 10)],
                    c += abc.nStr1[f % 10]
        }
        return c
    },
    getAnimal: function(f) {
        return abc.Animals[(f - 4) % 12]
    },
    solar2lunar: function(f, c, e) {
        if (1900 > f || f > 2100) return - 1;
        if (1900 == f && 1 == c && 31 > e) return - 1;
        if (f) var a = new Date(f, parseInt(c) - 1, e);
        else var a = new Date;
        var r, t = 0,
            d = 0,
            f = a.getFullYear(),
            c = a.getMonth() + 1,
            e = a.getDate(),
            n = (Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
        for (r = 1900; 2101 > r && n > 0; r++) d = abc.lYearDays(r),
            n -= d;
        0 > n && (n += d, r--);
        var s = new Date,
            u = !1;
        s.getFullYear() == f && s.getMonth() + 1 == c && s.getDate() == e && (u = !0);
        var o = a.getDay(),
            i = abc.nStr1[o];
        0 == o && (o = 7);
        var l = r,
            t = abc.leapMonth(r),
            h = !1;
        for (r = 1; 13 > r && n > 0; r++) t > 0 && r == t + 1 && 0 == h ? (--r, h = !0, d = abc.leapDays(l)) : d = abc.monthDays(l, r),
        1 == h && r == t + 1 && (h = !1),
            n -= d;
        0 == n && t > 0 && r == t + 1 && (h ? h = !1 : (h = !0, --r)),
        0 > n && (n += d, --r);
        var D = r,
            g = n + 1,
            p = c - 1,
            v = abc.getTerm(l, 3),
            m = abc.toGanZhi(l - 4);
        m = abc.toGanZhi(2 > p && v > e ? l - 5 : l - 4);
        var y = abc.getTerm(f, 2 * c - 1),
            T = abc.getTerm(f, 2 * c),
            I = abc.toGanZhi(12 * (f - 1900) + c + 11);
        e >= y && (I = abc.toGanZhi(12 * (f - 1900) + c + 12));
        var M = !1,
            C = null;
        y == e && (M = !0, C = abc.solarTerm[2 * c - 2]),
        T == e && (M = !0, C = abc.solarTerm[2 * c - 1]);
        var S = Date.UTC(f, p, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10,
            Y = abc.toGanZhi(S + e - 1);
        return {
            lYear: l,
            IYearCn: abc.toChinaYear(l),
            lMonth: D,
            lDay: g,
            Animal: abc.getAnimal(l),
            IMonthCn: (h ? "闰": "") + abc.toChinaMonth(D),
            IDayCn: abc.toChinaDay(g),
            cYear: f,
            cMonth: c,
            cDay: e,
            gzYear: m,
            gzMonth: I,
            gzDay: Y,
            isToday: u,
            isLeap: h,
            nWeek: o,
            ncWeek: "星期" + i,
            isTerm: M,
            Term: C
        }
    },
    lunar2solar: function(f, c, e, a) {
        {
            var r = abc.leapMonth(f);
            abc.leapDays(f)
        }
        if (a && r != c) return - 1;
        if (2100 == f && 12 == c && e > 1 || 1900 == f && 1 == c && 31 > e) return - 1;
        var t = abc.monthDays(f, c);
        if (1900 > f || f > 2100 || e > t) return - 1;
        for (var d = 0,
                 n = 1900; f > n; n++) d += abc.lYearDays(n);
        for (var s = 0,
                 u = !1,
                 n = 1; c > n; n++) s = abc.leapMonth(f),
        u || n >= s && s > 0 && (d += abc.leapDays(f), u = !0),
            d += abc.monthDays(f, n);
        a && (d += t);
        var o = Date.UTC(1900, 1, 30, 0, 0, 0),
            i = new Date(864e5 * (d + e - 31) + o),
            l = i.getUTCFullYear(),
            h = i.getUTCMonth() + 1,
            D = i.getUTCDate();
        return abc.solar2lunar(l, h, D)
    }
};
var e, s = $.mobiscroll,
    t = {
        isSolar: !0,
        enableSolarLunar: !0,
        showSolarLunar: !0,
        enableIgnore: !1,
        ignore: !1,
        formatValueCallback: null
    };
s.presets.scroller.datePicker = function(s) {
    function l(a, e) {
        var s = !1,
            t = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return (a % 400 == 0 || a % 100 != 0 && a % 4 == 0) && (s = !0),
            2 == e && s ? 29 : t[e - 1]
    }
    function n() {
        var e, t, n, r, o, i = {
                keys: [],
                values: [],
                label: "年"
            },
            u = {
                keys: [],
                values: [],
                label: "月"
            },
            c = {
                keys: [],
                values: [],
                label: "日"
            },
            d = s.getArrayVal(!0) || [1990, 1, 1];
        if (w) {
            for (t = 1902; t <= 2100; t++) i.keys.push(t),
                i.values.push(t + "年");
            if (f) {
                for (n = 1; 12 >= n; n++) u.keys.push(n),
                    u.values.push(n + "月");
                for (o = h[d[1] - 1], r = 1; o >= r; r++) c.keys.push(r),
                    c.values.push(r + "日")
            } else {
                for (n = 1; 12 >= n; n++) u.keys.push(n),
                    u.values.push(n + "月");
                for (r = 1; r <= l(d[0], d[1]); r++) c.keys.push(r),
                    c.values.push(r + "日")
            }
        }
        else {
            for (t = 1902; t <= 2100; t++) i.keys.push(t),
                //i.values.push(t + "(" + abc.toGanZhi(t - 4) + "年)");
                i.values.push(t+ "年");
            if (f) {
                for (n = 1; 12 >= n; n++) u.keys.push(n),
                    u.values.push(abc.toChinaMonth(n));
                for (r = 1; 30 >= r; r++) c.keys.push(r),
                    c.values.push(abc.toChinaDay(r))
            } else {
                for (e = -1 * abc.leapMonth(d[0]), n = 1; 12 >= n; n++) u.keys.push(n),
                    u.values.push(abc.toChinaMonth(n)),
                n == -1 * e && (u.keys.push(e), u.values.push("闰" + abc.toChinaMonth(n)));
                for (o = e == d[1] ? abc.leapDays(d[0]) : abc.monthDays(d[0], d[1]), r = 1; o >= r; r++) c.keys.push(r),
                    //c.values.push(abc.toChinaDay(r) + (abc.lunar2solar(d[0], d[1], r, e == d[1]).Term || ""))
                    c.values.push(abc.toChinaDay(r))
            }
        }
        return [[i, u, c]]
    }
    function r(a, e) {
        e ? $(".dwfl", a).slice(0, 1).hide() : $(".dwfl", a).slice(0, 1).show()
    }
    var o, i, u, h = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        c = $.extend({},
            s.settings),
        d = $.extend(s.settings, t, c),
        b = {},
        f = d.ignore,
        v = d.enableIgnore,
        p = d.enableSolarLunar,
        y = d.showSolarLunar,
        w = d.isSolar,
        C = d.formatValueCallback,
        g = ["set"],
        m = n(),
        k = $(this),
        M = d.fixedWidth || [150, 100, 100],
        D = function(e) {
            if ("string" == typeof e) return e;
            e.forEach(function(a, s) {
                    e[s] = 1 * a
                },
                0);
            var s,t;
            if(w){
                s="公历 "+e[0] + "年" + (e[1]>9?e[1]:"0"+e[1]) + "月" + (e[2]>9?e[2]:"0"+e[2])+"日";
            }
            else{
                var sDate=abc.lunar2solar(e[0], Math.abs(e[1]), e[2], e[1] < 0 ? !0 : !1);
                s="公历 "+sDate.cYear.toString()+"年"+((sDate.cMonth+1)<10?("0"+sDate.cMonth):sDate.cMonth)+"月"+(sDate.cDay<10?("0"+sDate.cDay):sDate.cDay)+"日";
            }
            return s;
            //console.log(w)
            //var s, t;
            //return w ? f ? s = e[1] + "-" + e[2] + "-": (s = e[0] + "-" + (e[1]>9?e[1]:"0"+e[1]) + "-" + (e[2]>9?e[2]:"0"+e[2]),
            //    t = abc.solar2lunar(e[0], e[1], e[2]),
            //p && y && (s += "   " + t.gzYear + "年" + t.IMonthCn + t.IDayCn)) :
            //    f ? s = abc.toChinaMonth(e[1]) + abc.toChinaDay(e[2]) :
            //        (s = abc.toGanZhi(e[0] - 4) + "年" + (e[1] < 0 ? "闰": "") + abc.toChinaMonth(Math.abs(e[1])) + abc.toChinaDay(e[2]),
            //    t = abc.lunar2solar(e[0], Math.abs(e[1]), e[2], e[1] < 0 ? !0 : !1), p && y && (s += "   " + t.cYear + "年" + t.cMonth + "月" + t.cDay + "日")),
            //    s = C && C(e, w, f, p) || s
        };
    return p && g.push({
            text: "公历",
            cssClass: "dwb-g-b" + (w ? " active": ""),
            parentClass: "dwb-g",
            handler: function(e, s) {
                $(this).hasClass("active") || ($(this).addClass("active"), $(".mbsc-ios .dwb-n-b").removeClass("active"), w = !0, s.settings.isSolar = w, i = s.getArrayVal(!0), f || (u = abc.lunar2solar(i[0], Math.abs(i[1]), i[2], i[1] < 0 ? !0 : !1), i = [u.cYear, u.cMonth, u.cDay]), s.setArrayVal(i, !1, !1, !0, 0))
            }
        },
        {
            text: "农历",
            cssClass: "dwb-n-b" + (w ? "": " active"),
            parentClass: "dwb-n",
            handler: function(e, s) {
                $(this).hasClass("active") || ($(this).addClass("active"), $(".mbsc-ios .dwb-g-b").removeClass("active"), w = !1, s.settings.isSolar = w, i = s.getArrayVal(!0), f || (u = abc.solar2lunar(i[0], i[1], i[2]), i = [u.lYear, u.isLeap ? -1 * u.lMonth: u.lMonth, u.lDay]), s.setArrayVal(i, !1, !1, !0, 0))
            }
        }),
    v && g.push({
        text: (f ? "显示": "忽略") + "年份",
        cssClass: "dwb dwb-i-b",
        parentClass: "dwb-i",
        handler: function(a, e) {
            f = !f,
                e.settings.ignore = f,
                $(this).html((f ? "显示": "忽略") + "年份"),
                i = e.getArrayVal(!0),
                i = [i[0], Math.abs(i[1]), i[2]],
                e.setArrayVal(i, !1, !1, !0, 0)
        }
    }),
    {
        fixedWidth: M,
        width: 200,
        maxWidth: 600,
        wheels: m,
        ignore: f,
        isSolar: w,
        formatResult: D,
        parseValue: function(a) {
            return a
        },
        buttons: g,
        headerText: !1,
        onBeforeShow: function() {
            o = !0,k.blur()
        },
        onValueFill: function(a) {
            k && k.val(a);
        },
        onShow: function(a) {
            w ? ($(".dwb-n-b", a).removeClass("active"), $(".dwb-g-b", a).addClass("active")) : ($(".dwb-n-b", a).addClass("active"), $(".dwb-g-b", a).removeClass("active")),
                $(".dwb-i-b", a).html((f ? "显示": "忽略") + "年份"),
                $(".dwwl", a).off().on("mousedown touchstart",
                    function() {
                        clearTimeout(b[$(".dwwl", a).index(this)])
                    })
        },
        validate: function(a, s, t, l, i) {
            return o ? (r(a, f), void(o = !1)) : (d.wheels = n(), clearTimeout(b[s]), b[s] = setTimeout(function() {
                    o = !0,
                        r(a, f),
                        i.changeWheel([0, 1, 2], s === e ? t: 0, s !== e)
                },
                s === e ? 0 : 1e3 * t), !1)
        }
    }
};
s.presetShort("datePicker");
!
function(t) {

    "function" == typeof define && define.amd ? define(t) : t()
} (function() {
    "use strict";
    function s(t) {
        return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
        function(t) {
            return typeof t
        }: function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
        })(t)
    } !
    function(n, T) {

        var N = location.protocol,
        t = "//engine.tuistone.com",
        o = t + "/api/v1/activity/get4web",
        i = t + "/api/v1/activity/spm4web";
        function C(t) {
            return "object" === s(t) ? t: T.querySelector(t)
        }
        "http:" !== N && "https:" !== N && (o = "http:" + o, i = "http:" + i);
        var a = {
            ajax: function(e) {
                try {
                    if (! (e = e || {}).url || !e.callback) throw new Error("鍙傛暟涓嶅悎娉�");
                    var i = ("jsonp_" + Math.random()).replace(".", ""),
                    o = T.getElementsByTagName("head")[0];
                    e.data[e.callback] = i;
                    var t = this.formatParams(e.data),
                    a = T.createElement("script");
                    o.appendChild(a),
                    n[i] = function(t) {
                        o.removeChild(a),
                        clearTimeout(a.timer),
                        n[i] = null,
                        e.success && e.success(t)
                    },
                    a.src = e.url + "?" + t,
                    e.time = e.time || 3e3,
                    a.timer = setTimeout(function() {
                        n[i] = null,
                        o.removeChild(a),
                        e.error && e.error({
                            message: "瓒呮椂"
                        })
                    },
                    e.time)
                } catch(t) {
                    e.error && e.error(t)
                }
            },
            formatParams: function(t) {
                var e = [];
                for (var i in t) e.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
                return e.join("&")
            },
            sendLog: function(t, e) {
                this.ajax({
                    url: i,
                    callback: "callback",
                    data: t,
                    success: function(t) {
                        e && e(t)
                    },
                    error: function(t) {
                        e && e(t)
                    }
                })
            }
        },
        e = T.head || T.getElementsByTagName("head")[0],
        r = T.createElement("style");
        r.innerHTML = ".ta-pr,.ta-container,.ta-infoflow{position:relative}.fubiao-dialog img,.img,.shouping-dialog img,.ta-container img,.ta-dialog .modal-dialog img,.ta-infoflow .ta-img,.ta-infoflow.large img{max-width:100%;vertical-align:baseline;border:0}.ta-container img{width:100%}.ta-infoflow{padding:0 10px;background-color:#fff;color:#000}.ta-infoflow div{width:100%;padding-right:125px;height:80px}.ta-infoflow div p{font-size:14px;margin:0;padding:5px}.ta-infoflow .ta-img{position:absolute;top:5px;right:20px;width:112.5px;height:70px}.ta-infoflow .ta-close{right:10px;top:0}.ta-infoflow .ta-icon{left:12px}.ta-infoflow.large{font-size:1px}.ta-infoflow.large p{width:100%;height:22px;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0;padding-right:20px}.ta-infoflow.large img{height:100%;width:100%;position:static}.ta-close,.ta-icon{position:absolute;background-repeat:no-repeat}.ta-infoflow.large .ta-close{right:10px;top:3px}.ta-icon{bottom:5px;right:5px;width:19px;height:10px;background-image:url(https://yun.tuisnake.com/h5-mami/msdk/micon.png);background-size:100% 100%}.ta-close{top:3px;right:3px;width:22.5px;height:22.5px;background-image:url(https://yun.tuisnake.com/h5-mami/msdk/close.png);background-position:right top;background-size:15px 15px}.ta-dialog{position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.8);z-index:1000000}.ta-dialog .modal-dialog{position:absolute;top:50%;left:50%;width:250px;height:250px;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ta-dialog .modal-dialog img{width:100%;height:100%}.fubiao-dialog{position:fixed;width:75px;height:75px;z-index:1000000}.fubiao-dialog img{width:100%;height:100%}.fubiao-dialog .ta-icon{right:0;bottom:0px;left:inherit}.fubiao-dialog .ta-close{top:-7.5px;right:-7.5px}.shouping-dialog{position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;z-index:1000000}.shouping-dialog img{width:100%;height:100%}.shouping-dialog .ta-pass{font-size: 14px;position:absolute;top:20px;right:15px;padding:5px 8px;border-radius:4px;font-style:inherit;text-align:center;color:#fff;background:rgba(0,0,0,.5)}",
        e.appendChild(r);
        var l = {
            init: function(t) {
                var e = this;
                e.flag = !1,
                e.opt = t,
                e.connect_type = function() {
                    var e = null,
                    t = n.navigator.userAgent,
                    i = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {
                        type: "unknown"
                    };
                    if (/MicroMessenger/.test(t)) if (/NetType/.test(t)) {
                        var o = t.match(/NetType\/(\S*)/);
                        e = o[1]
                    } else T.addEventListener("WeixinJSBridgeReady",
                    function() {
                        WeixinJSBridge.invoke("getNetworkType", {},
                        function(t) {
                            e = t.err_msg
                        })
                    });
                    else i && (e = i.type);
                    return isNaN(e) || (e = ["bluetooth", "cellular", "ethernet", "mixed", "none", "other", "unknown", "wifi", "wimax"][parseInt(e)]),
                    e
                } ();
                var i = t.slotId || t.adslotId;
                e.mdata = {
                    request_id: "",
                    app_key: t.appKey,
                    slotId: i,
                    device_id: ""
                };
                try {
                    e.setStorage()
                } catch(t) {}
                var o = n.location.host.match(/[0-9a-zA-Z]+((\.com)|(\.cn)|(\.org)|(\.net)|(\.edu)|(\.com.cn)|(\.xyz)|(\.xin)|(\.club)|(\.shop)|(\.site)|(\.wang)|(\.top)|(\.win)|(\.online)|(\.tech)|(\.store)|(\.bid)|(\.cc)|(\.ren)|(\.lol)|(\.pro)|(\.red)|(\.kim)|(\.space)|(\.link)|(\.click)|(\.news)|(\.news)|(\.ltd)|(\.website)|(\.biz)|(\.help)|(\.mom)|(\.work)|(\.date)|(\.loan)|(\.mobi)|(\.live)|(\.studio)|(\.info)|(\.pics)|(\.photo)|(\.trade)|(\.vc)|(\.party)|(\.game)|(\.rocks)|(\.band)|(\.gift)|(\.wiki)|(\.design)|(\.software)|(\.social)|(\.lawyer)|(\.engineer)|(\.org)|(\.net.cn)|(\.org.cn)|(\.gov.cn)|(\.name)|(\.tv)|(\.me)|(\.asia)|(\.co)|(\.press)|(\.video)|(\.market)|(\.games)|(\.science)|(\.涓浗)|(\.鍏徃)|(\.缃戠粶)|(\.pub)|(\.la)|(\.auction)|(\.email)|(\.sex)|(\.sexy)|(\.one)|(\.host)|(\.rent)|(\.fans)|(\.cn.com)|(\.life)|(\.cool)|(\.run)|(\.gold)|(\.rip)|(\.ceo)|(\.sale)|(\.hk)|(\.io)|(\.gg)|(\.tm)|(\.com.hk)|(\.gs)|(\.us))$/);
                o = o ? o[0] : n.location.host,
                e.logdata = {
                    slotId: i,
                    app_key: t.appKey,
                    device_id: e.mdata.device_id,
                    activity_id: "",
                    sdk_type: "JSSDK",
                    sdk_version: "3.3.1",
                    sdk_source: o,
                    type: "",
                    click_url: "",
                    data1: "",
                    data2: "",
                    refer_host: n.location.hostname
                },
                e.logdata.md = t.md || "",
                e.logdata.timestamp = t.timestamp || "",
                e.logdata.nonce = t.nonce || "",
                e.logdata.signature = t.signature || "",
                e.getMaterial(e.mdata,
                function(t) {
                    t.img_url && (e.getHtml(t), e.event())
                },
                t.error)
            },
            event: function() {
                var e = this,
                t = e.getEl(); !
                function(t) {
                    T.addEventListener("scroll",
                    function() {
                        t && t()
                    },
                    !1),
                    T.body.addEventListener("scroll",
                    function() {
                        t && t()
                    },
                    !1)
                } (function() {
                    e.isvisible(t)
                }),
                e.isvisible(t),
                t.addEventListener("click",
                function(t) {
                    e.sendclick()
                },
                !1)
            },
            getEl: function() {
                var t, e = this.opt.container;
                return e ? t = C(e) : this.eltype && (t = C("." + this.eltype + " .ta-img")),
                t
            },
            sendclick: function() {
                var t = this;
                t.logdata.type = 1,
                t.logdata.connect_type = t.connect_type,
                a.sendLog(t.logdata,
                function() {
                    t.opt.clickTag || (t.opt.target ? n.open(t.logdata.click_url, t.opt.target) : location.href = t.logdata.click_url)
                })
            },
            isvisible: function(t) {
                var e = this;
                if (!e.flag) {
                    var i = T.documentElement.scrollTop || T.body.scrollTop,
                    o = function(t) {
                        var e = null;
                        return (((e = T.documentElement) || (e = T.body.parentNode)) && "number" == typeof e.scrollTop ? e: T.body).scrollTop + t.getBoundingClientRect().top
                    } (t);
                    i <= o && o < i + T.documentElement.clientHeight && (e.flag = !0, e.logdata.type = 0, e.logdata.connect_type = e.connect_type, a.sendLog(e.logdata))
                }
            },
            colsehtm: function(t) {
                var e = "";
                return t && (e += '<i class="ta-close"></i>'),
                e
            },
            getHtml: function(t) {
                var e = this,
                i = "",
                o = "",
                a = t.close_visible,
                n = "https:" == N ? t.click_url: t.click_url.replace(/https/, "http"),
                r = t.data1,
                l = t.data2,
                c = t.icon_visible,
                s = "https:" == N ? t.img_url: t.img_url.replace(/https/, "http"),
                p = t.img_width,
                d = t.title,
                g = t.type,
                m = t.activity_id,
                u = t.activity_title,
                h = t.description,
                f = t.img_height,
                v = t.material_list;
                e.logdata.activity_id = m,
                e.logdata.click_url = n,
                e.logdata.data1 = r,
                e.logdata.data2 = l;
                var b = {
                    title: d,
                    activity_title: u,
                    description: h,
                    img_url: s,
                    img_width: p,
                    img_height: f,
                    material_list: v
                };
                e.opt.clickTag && (b.clickurl = n),
                e.eltype = "";
                var y = T.createElement("div"),
                x = C("body"),
                k = e.opt.container ? e.opt.container: "",
                w = e.opt.local;
                switch (g) {
                case 1:
                case 5:
                case 3:
                    y.className = "ta-container",
                    o = e.commhtml(s, c),
                    i += e.colsehtm(a) + o,
                    x = C(k);
                    break;
                case 2:
                    y.className = "ta-infoflow",
                    o = e.commhtml(s, c),
                    700 === p ? (y.className = "ta-infoflow large", i += "<p>" + d + "</p>" + o) : i += "<div><p>" + d + "</p>" + o + "</div>",
                    i += e.colsehtm(a),
                    x = C(k);
                    break;
                case 7:
                    (x = C(k)).className = x.className + " ta-pr",
                    e.opt.success && e.opt.success(b),
                    x.querySelector("img").setAttribute("width", "100%"),
                    i += (c ? '<i class="ta-icon"></i>': "") + e.colsehtm(a);
                    break;
                case 0:
                    y.className = "ta-dialog",
                    e.opt.container = "",
                    o = e.commhtml(s, c),
                    i += '<div class="modal-dialog">',
                    i += e.colsehtm(a) + o + "</div>",
                    e.eltype = "modal-dialog";
                    break;
                case 4:
                    y.className = "fubiao-dialog",
                    w ? "rt" === w ? y.setAttribute("style", "right: 7.5px; top: 100px;") : "rb" === w ? y.setAttribute("style", "right: 7.5px; bottom: 100px;") : "lt" === w ? y.setAttribute("style", "left: 7.5px; top: 100px;") : "lb" === w ? y.setAttribute("style", "left: 7.5px; bottom: 100px;") : y.setAttribute("style", w) : y.setAttribute("style", "right: 7.5px; top: 100px;"),
                    e.opt.container = "",
                    o = e.commhtml(s, c),
                    i += e.colsehtm(a) + o,
                    e.eltype = "fubiao-dialog";
                    break;
                case 6:
                    y.className = "shouping-dialog",
                    o = e.commhtml(s, c),
                    e.opt.container = "",
                    a || (i += '<i class="ta-pass">璺宠繃</i>'),
                    i += o,
                    setTimeout(function() {
                        y.parentNode && T.body.removeChild(y)
                    },
                    5e3),
                    e.eltype = "shouping-dialog"
                }
                y.innerHTML = i,
                x.appendChild(y),
                7 !== g && e.opt.success && e.opt.success();
                var _ = y.querySelector(".ta-close");
                _ && _.addEventListener("click",
                function(t) {
                    t.preventDefault(),
                    t.stopPropagation(),
                    k && "BODY" !== x.tagName ? x.parentNode.removeChild(x) : T.body.removeChild(y)
                },
                !1);
                var S = y.querySelector(".ta-pass");
                S && S.addEventListener("click",
                function(t) {
                    t.preventDefault(),
                    t.stopPropagation(),
                    T.body.removeChild(y)
                })
            },
            commhtml: function(t, e) {
                var i = '<img class="ta-img" src="' + t + '" />';
                return e && (i += '<i class="ta-icon"></i>'),
                i
            },
            getRandom20: function() {
                for (var t = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], e = "", i = 0; i < 20; i++) {
                    e += t[this.getRandomNum(0, 61)]
                }
                return e + +new Date
            },
            getRandomNum: function(t, e) {
                var i = e - t,
                o = Math.random();
                return t + Math.round(o * i)
            },
            cookie: function(t, e, i) {
                if (void 0 === e) {
                    var o = null;
                    if (T.cookie && "" != T.cookie) for (var a = T.cookie.split(";"), n = 0; n < a.length; n++) {
                        var r = a[n].replace(/(^\s*)|(\s*$)/g, "");
                        if (r.substring(0, t.length + 1) == t + "=") {
                            o = decodeURIComponent(r.substring(t.length + 1));
                            break
                        }
                    }
                    return o
                }
                i = i || {},
                null === e && (e = "", (i = $.extend({},
                i)).expires = -1);
                var l, c = "";
                i.expires && ("number" == typeof i.expires || i.expires.toUTCString) && ("number" == typeof i.expires ? (l = new Date).setTime(l.getTime() + 24 * i.expires * 60 * 60 * 1e3) : l = i.expires, c = "; expires=" + l.toUTCString());
                var s = i.path ? "; path=" + i.path: "",
                p = i.domain ? "; domain=" + i.domain: "",
                d = i.secure ? "; secure": "";
                T.cookie = [t, "=", encodeURIComponent(e), c, s, p, d].join("")
            },
            saveStorage: function(t) {
                this.cookie("fingerprint", t, {
                    path: "/",
                    expires: 1
                }),
                localStorage.fingerprint = t
            },
            setStorage: function() {
                var t = this,
                e = null,
                i = t.cookie("fingerprint"),
                o = localStorage.fingerprint;
                i || o || (e = t.getRandom20(), t.saveStorage(e)),
                i && !o && (e = i, t.saveStorage(e)),
                o && !i && (e = o, t.saveStorage(e)),
                o && i && (e = o),
                t.mdata.device_id = e,
                t.mdata.request_id = this.opt.appKey + e
            },
            getMaterial: function(t, e, i) {

                a.ajax({
                    url: o,
                    callback: "callback",
                    data: t,
                    success: function(t) {
                        e && e(t)
                    },
                    error: function(t) {
                        i && i(t)
                    }
                })
            }
        };
        function c(t) {
            Object.create(l).init(t)
        }
        n.TuiaMedia = c,
        n.TuiSDK = c
    } (window, document)
});

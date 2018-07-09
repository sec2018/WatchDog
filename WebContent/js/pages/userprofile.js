//var personinfo = "";
////if (location.search.length > 0) {
////    personinfo = unescape(location.search.split('?')[1].split('=')[1]);
////}
//if (getCookie("watchdogusername") == null || getCookie("watchdogusername") == "") {
//    window.location.href = "signin.html";
//} else {
    
//}
var senddata = {};
senddata.personinfo = personinfo;
senddata.clicktype = "userprofile";
$.ajax({
    url: "/api/userprofileapi",
    type: "POST",
    data: senddata,
    success: function (data) {
        if (data == "failed") {
            window.location.href = "/Login/SignIn";
            return;
        } else {
            data = eval("(" + data + ")");
            if (data[0].privilegelevel == 1) {
                $("#h3_managername").html(data[0].managername + " (国家级管理员)");
                $("#span_adminlevel").text("国家级管理员");
                $("#td_area").text(data[0].area);
                $("#td_job").text(data[0].job);
                $("#td_address").text(data[0].useraddress);
                $("#td_officecall").text(data[0].officecall);
                //$("#td_telphone").text(data[0].telphonecall);<a href=\"tel:" + data.data2[i].telphonecall + "\">
                $("#td_telphone").html("<a href=\"tel:" + data[0].telphonecall + "\">" + data[0].telphonecall + "</a>");
                var logintime = ChangeTimeFormat(data[0].logintime);
                $("#td_registertime").text(logintime);
                $("#td_dogtotal").text(data[0].dogtotalnum);
                $("#td_neckletedtotal").text(data[0].neckletedtotal);
                $("#td_adminstatus").text(data[0].adminstatus);

                $("#a_managepage").click(function () {
                    //window.location.href = "page_managecommon1.html";
                    window.location.href = "/PageManageCommon/Manage";
                });

            }
            else if (data[0].privilegelevel == 2) {
                $("#h3_managername").html(data[0].managername + " (省级管理员)");
                //$("#span_adminlevel").text("省级管理员");
                $("#td_area").text(data[0].area);
                $("#td_job").text(data[0].job);
                $("#td_address").text(data[0].useraddress);
                $("#td_officecall").text(data[0].officecall);
                //$("#td_telphone").text(data[0].telphonecall);
                $("#td_telphone").html("<a href=\"tel:" + data[0].telphonecall + "\">" + data[0].telphonecall + "</a>");
                var logintime = ChangeTimeFormat(data[0].logintime);
                $("#td_registertime").text(logintime);
                $("#td_dogtotal").text(data[0].dogtotalnum);
                $("#td_neckletedtotal").text(data[0].neckletedtotal);
                $("#td_adminstatus").text(data[0].adminstatus);
                if (data[0].adminstatus == "已激活") {
                    $("#a_activeadmin").text("账户冻结");
                } else {
                    $("#a_activeadmin").text("账户激活");
                }

                $("#a_managepage").click(function () {
                    //window.location.href = "page_managecommon2.html";
                    window.location.href = "/PageManageCommon/Manage";
                })
            }
            else if (data[0].privilegelevel == 3) {
                $("#h3_managername").html(data[0].managername + " (市级管理员)");
                //$("#span_adminlevel").text("市级管理员");
                $("#td_area").text(data[0].area);
                $("#td_job").text(data[0].job);
                $("#td_address").text(data[0].useraddress);
                $("#td_officecall").text(data[0].officecall);
                //$("#td_telphone").text(data[0].telphonecall);
                $("#td_telphone").html("<a href=\"tel:" + data[0].telphonecall + "\">" + data[0].telphonecall + "</a>");
                var logintime = ChangeTimeFormat(data[0].logintime);
                $("#td_registertime").text(logintime);
                $("#td_dogtotal").text(data[0].dogtotalnum);
                $("#td_neckletedtotal").text(data[0].neckletedtotal);
                $("#td_adminstatus").text(data[0].adminstatus);
                if (data[0].adminstatus == "已激活") {
                    $("#a_activeadmin").text("账户冻结");
                } else {
                    $("#a_activeadmin").text("账户激活");
                }

                $("#a_managepage").click(function () {
                    //window.location.href = "page_managecommon3.html";
                    window.location.href = "/PageManageCommon/Manage";
                })
            }
            else if (data[0].privilegelevel == 4) {
                $("#h3_managername").html(data[0].managername + " (县级管理员)");
                //$("#span_adminlevel").text("县级管理员");
                $("#td_area").text(data[0].area);
                $("#td_job").text(data[0].job);
                $("#td_address").text(data[0].useraddress);
                $("#td_officecall").text(data[0].officecall);
                //$("#td_telphone").text(data[0].telphonecall);
                $("#td_telphone").html("<a href=\"tel:" + data[0].telphonecall + "\">" + data[0].telphonecall + "</a>");
                var logintime = ChangeTimeFormat(data[0].logintime);
                $("#td_registertime").text(logintime);
                $("#td_dogtotal").text(data[0].dogtotalnum);
                $("#td_neckletedtotal").text(data[0].neckletedtotal);
                $("#td_adminstatus").text(data[0].adminstatus);
                if (data[0].adminstatus == "已激活") {
                    $("#a_activeadmin").text("账户冻结");
                } else {
                    $("#a_activeadmin").text("账户激活");
                }

                $("#a_managepage").click(function () {
                    //window.location.href = "page_managecommon4.html";
                    window.location.href = "/PageManageCommon/Manage";
                })
            }
            else if (data[0].privilegelevel == 5) {
                $("#h3_managername").html(data[0].managername + " (乡级管理员)");
                //$("#span_adminlevel").text("乡级管理员");
                $("#td_area").text(data[0].area);
                $("#td_job").text(data[0].job);
                $("#td_address").text(data[0].useraddress);
                $("#td_officecall").text(data[0].officecall);
                //$("#td_telphone").text(data[0].telphonecall);
                $("#td_telphone").html("<a href=\"tel:" + data[0].telphonecall + "\">" + data[0].telphonecall + "</a>");
                var logintime = ChangeTimeFormat(data[0].logintime);
                $("#td_registertime").text(logintime);
                $("#td_dogtotal").text(data[0].dogtotalnum);
                $("#td_neckletedtotal").text(data[0].neckletedtotal);
                $("#td_adminstatus").text(data[0].adminstatus);
                if (data[0].adminstatus == "已激活") {
                    $("#a_activeadmin").text("账户冻结");
                } else {
                    $("#a_activeadmin").text("账户激活");
                }

                $("#a_managepage").click(function () {
                    //window.location.href = "page_managecommon.html";
                    window.location.href = "/PageManageCommon/Manage";
                })
            }
            else if (data[0].privilegelevel == 6) {
                $("#h3_managername").html(data[0].managername + " (牧犬管理员)");
                //$("#span_adminlevel").text("牧犬管理员");
                $("#td_area").text(data[0].area);
                $("#td_job").text(data[0].job);
                $("#td_address").text(data[0].useraddress);
                $("#td_officecall").text(data[0].officecall);
                //$("#td_telphone").text(data[0].telphonecall);
                $("#td_telphone").html("<a href=\"tel:" + data[0].telphonecall + "\">" + data[0].telphonecall + "</a>");
                var logintime = ChangeTimeFormat(data[0].logintime);
                $("#td_registertime").text(logintime);
                $("#td_dogtotal").text(data[0].dogtotalnum);
                $("#td_neckletedtotal").text(data[0].neckletedtotal);
                $("#td_adminstatus").text(data[0].adminstatus);
                if (data[0].adminstatus == "已激活") {
                    $("#a_activeadmin").text("账户冻结");
                } else {
                    $("#a_activeadmin").text("账户激活");
                }

                $("#a_managepage").click(function () {
                    //window.location.href = "page_managecommon6.html";
                    window.location.href = "/PageManageCommon/Manage";
                })
            }
        }
    }
})

function ChangeTimeFormat(logintime) {
    //	20170926084552 ---> 2017.09.26 08:45:52
    var year = logintime.substring(0, 4);
    var month = logintime.substring(4, 6);
    var day = logintime.substring(6, 8);
    var hour = logintime.substring(8, 10);
    var min = logintime.substring(10, 12);
    var sec = logintime.substring(12);
    return year + "." + month + "." + day + " " + hour + ":" + min + ":" + sec;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    //setCookie(name, "", -1);
}

//如果需要设定自定义过期时间
//那么把上面的setCookie　函数换成下面两个函数就ok;
//程序代码
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

$(function () {
    $("#a_areasee").click(function () {
        window.location.href = "index.html";
    });

    $("#a_rebackpwd").click(function () {
        var clicktype = "rebackpwd";
        var username = getCookie("watchdogusername");
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.username = username;
        senddata.rebackusername = personinfo;
        $.ajax({
            url: "/api/userprofileapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                alert(data);
                window.location.reload();
            }
        })
    });


    $("#a_activeadmin").click(function () {
        var clicktype = "activeadmin";
        if ($("#a_activeadmin").text() == "账户冻结") {
            clicktype = "freezeadmin";
        }
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.username = username;
        senddata.activeusername = personinfo;
        $.ajax({
            url: "/api/userprofileapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                alert(data);
                window.location.reload();
            }
        })
    });

    $("#pagereflash").click(function () {
        window.location.reload();
    });
});
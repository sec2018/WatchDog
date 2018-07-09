var adduserarea = "";
var privilegelevel = -1;
var manageusername = username;

var senddata = {};
senddata.username = username;
senddata.manageusername = manageusername;
$.ajax({
    url: "/api/newuserapi",
    type: "POST",
    data: senddata,
    success: function (data) {
        if (data == "failed") {
            window.location.href = "/Login/SignIn";
            return;
        } else {
            data = eval("(" + data + ")");
            var html = "";
            var logintime = "";
            if (data != null) {
                var select_area = document.getElementById("select_area");
                switch (data.data3[0].privilegelevel) {
                    case 1:
                        $("#h3_adminname").html("添加新的省级管理员");
                        $("#span_leftscan").html("全国总览");
                        privilegelevel = 2;

                        for (var i = 0; i < data.data4.length; i++) {
                            //遍历后台传回的结果，一项项往select中添加option
                            select_area.options.add(new Option(data.data4[i].districtname, data.data4[i].districtcode));
                        }

                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        });

                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                        });
                        break;
                    case 2:
                        $("#h3_adminname").html("添加新的市级管理员");
                        privilegelevel = 3;
                        adduserarea = data.data3[0].province;
                        $("#span_leftscan").html(adduserarea+"总览");

                        for (var i = 0; i < data.data4.length; i++) {
                            //遍历后台传回的结果，一项项往select中添加option
                            select_area.options.add(new Option(data.data4[i].districtname, data.data4[i].districtcode));
                        }

                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        });

                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index/Province?province=" + escape(adduserarea);
                        });
                        break;

                    case 3:
                        $("#h3_adminname").html("添加新的县级管理员");
                        privilegelevel = 4;
                        adduserarea = data.data3[0].province + "-" + data.data3[0].city;

                        $("#span_leftscan").html(data.data3[0].city + "总览");

                        for (var i = 0; i < data.data4.length; i++) {
                            //遍历后台传回的结果，一项项往select中添加option
                            select_area.options.add(new Option(data.data4[i].districtname, data.data4[i].districtcode));
                        }

                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        })

                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index/City?city=" + escape(data.data3[0].city) + "&province=" + escape(data.data3[0].province);
                        });
                        break;

                    case 4:
                        $("#h3_adminname").html("添加新的乡级管理员");
                        privilegelevel = 5;
                        adduserarea = data.data3[0].province + "-" + data.data3[0].city + "-" + data.data3[0].county;

                        $("#span_leftscan").html(data.data3[0].county + "总览");

                        for (var i = 0; i < data.data4.length; i++) {
                            //遍历后台传回的结果，一项项往select中添加option
                            select_area.options.add(new Option(data.data4[i].districtname, data.data4[i].districtcode));
                        }

                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        })

                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index/County?county=" + escape(data.data3[0].county) + "&city=" + escape(data.data3[0].city) + "&province=" + escape(data.data3[0].province);
                        });
                        break;

                    case 5:
                        $("#h3_adminname").html("添加新的牧犬管理员");
                        privilegelevel = 6;
                        adduserarea = data.data3[0].province + "-" + data.data3[0].city + "-" + data.data3[0].county + "-" + data.data3[0].village;

                        $("#span_leftscan").html(data.data3[0].village + "总览");

                        for (var i = 0; i < data.data4.length; i++) {
                            //遍历后台传回的结果，一项项往select中添加option
                            select_area.options.add(new Option(data.data4[i].districtname, data.data4[i].districtcode));
                        }
                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        })
                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index/Village?village=" + escape(data.data3[0].village) + "&county=" + escape(data.data3[0].county) + "&city=" + escape(data.data3[0].city) + "&province=" + escape(data.data3[0].province);
                        });
                        break;
                }
            }
        }
    }
})


function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

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

$(function () {
    $("#btn_adduser").click(function () {
        var senddata = {};
        senddata.click_type = "AddUser";
        senddata.privilegelevel = privilegelevel;
        senddata.managername = $("#input_managername").val();
        senddata.address = $("#input_address").val();
        if (adduserarea != "") {
            senddata.area = adduserarea + "-" + $("#select_area").find("option:selected").text();
        } else {
            senddata.area = $("#select_area").find("option:selected").text();
        }
        senddata.identity = $("#input_identity").val();
        senddata.officecall = $("#input_officecall").val();
        senddata.tel = $("#input_tel").val();
        senddata.username = $("#input_username").val();
        senddata.password = $("#input_password").val();
        senddata.addtype = "admin";
        if ($("#input_managername").val() == null || $("#input_managername").val() == "" || $("#input_username").val() == null || $("#input_username").val() == "" || $("#input_password").val() == null || $("#input_password").val() == "") {
            alert("带(*)选项为必填项！");
            window.location.href = "#";
            return;
        }

        if (senddata.password != $("#input_confirmpassword").val()) {
            alert("两次输入的密码不一致！");
            window.location.href = "#";
        } else {
            $.ajax({
                url: "/api/loginapi",
                type: "POST",
                data: senddata,
                success: function (data) {
                    alert(data);
                    if (data == "添加成功") {
                        window.location.href = "/PageManageCommon/Manage";
                    } else {
                        window.location.href = "#";
                    }
                }
            })
        }
    });

    $("#pagereflash").click(function () {
        window.location.reload();
    });
})
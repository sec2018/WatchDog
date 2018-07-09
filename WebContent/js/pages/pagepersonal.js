var senddata = {};
senddata.username = username;
senddata.clicktype = "pagepersonal";
$.ajax({
    url: "/api/pagepersonalapi",
    type: "POST",
    data: senddata,
    success: function (data) {
        if (data == "failed") {
            window.location.href = "/Index/SignIn";
            return;
        } else {
            data = eval("(" + data + ")");
            var logintime = "";
            if (data != null) {
                //个人信息
                $("#input_managername").val(data.data1[0].managername);
                $("#input_managerarea").val(data.data1[0].area);
                $("#input_managerjob").val(data.data1[0].job);
                $("#input_manageridentity").val(data.data1[0].manageridentity);
                $("#input_officecall").val(data.data1[0].officecall);
                $("#input_managertel").val(data.data1[0].telphone);
                $("#input_manageraddress").val(data.data1[0].address);
                $("#input_email").val(data.data1[0].email);
                $("#input_username").val(data.data1[0].username);
                $("#input_password").val(data.data1[0].password);

                if (data.data1[0].privilegelevel == 5 || data.data1[0].privilegelevel == 6) {
                    //$("#li_countrysee").css("display", "none");

                    if (data.data1[0].privilegelevel == 5) {
                        $("#span_leftscan").html(data.data1[0].village + "总览");
                        //$("#a_farmdetail").click(function () {
                        //    window.location.href = "page_farmlevel5.html";
                        //});
                        //$("#a_areasee").click(function () {
                        //    window.location.href = "page_village.html";
                        //});
                        //$("#a_managepage").click(function () {
                        //    window.location.href = "/PageManageCommon/Manage";
                        //});
                    } else {
                        $("#span_leftscan").html("牧区详情");
                        $("#a_activelist").css("display", "none");
                        //$("#a_farmdetail").click(function () {
                        //    window.location.href = "page_farmlevel6.html";
                        //});
                        //$("#a_areasee").click(function () {
                        //    window.location.href = "page_farmlevel6.html";
                        //});
                        //$("#a_managepage").click(function () {
                        //    window.location.href = "page_managecommon6.html";
                        //});
                    }
                }
                else if (data.data1[0].privilegelevel == 1) {
                    //$("#li_areasee").css("display", "none");
                    //$("#li_farmdetail").css("display", "none");
                    $("#span_leftscan").html("全国总览");
                    //$("#a_managepage").click(function () {
                    //    window.location.href = "page_managecommon1.html";
                    //});
                    //$("#li_countrysee").click(function () {
                    //    window.location.href = "index.html";
                    //});
                    //$("#a_areasee").click(function () {
                    //    window.location.href = "/Index?username="+username+"&Ticket="+Ticket;
                    //});
                } else if (data.data1[0].privilegelevel == 2) {
                    //$("#li_areasee").css("display", "none");
                    //$("#li_farmdetail").css("display", "none");
                    $("#span_leftscan").html(data.data1[0].province + "总览");
                    //$("#a_managepage").click(function () {
                    //    window.location.href = "page_managecommon2.html";
                    //});
                    //$("#li_countrysee").click(function () {
                    //    if (data.data1[0].province == "建设兵团") {
                    //        window.location.href = "page_corps.html";
                    //    } else {
                    //        window.location.href = "page_province.html";
                    //    }
                    //});
                    //$("#a_areasee").click(function () {
                    //    if (data.data1[0].province == "建设兵团") {
                    //        window.location.href = "page_corps.html";
                    //    } else {
                    //        window.location.href = "page_province.html";
                    //    }
                    //});
                } else if (data.data1[0].privilegelevel == 3) {
                    $("#li_areasee").css("display", "none");
                    //$("#li_farmdetail").css("display", "none");
                    $("#span_leftscan").html(data.data1[0].city + "总览");
                    //$("#a_managepage").click(function () {
                    //    window.location.href = "page_managecommon3.html";
                    //});
                    //$("#li_countrysee").click(function () {
                    //    if (data.data1[0].province == "建设兵团") {
                    //        window.location.href = "page_division.html";
                    //    } else {
                    //        window.location.href = "page_city.html";
                    //    }
                    //});
                    //$("#a_areasee").click(function () {
                    //    if (data.data1[0].province == "建设兵团") {
                    //        window.location.href = "page_division.html";
                    //    } else {
                    //        window.location.href = "page_city.html";
                    //    }
                    //});
                } else if (data.data1[0].privilegelevel == 4) {
                    $("#li_areasee").css("display", "none");
                    //$("#li_farmdetail").css("display", "none");
                    $("#span_leftscan").html(data.data1[0].county + "总览");
                    //$("#a_managepage").click(function () {
                    //    window.location.href = "page_managecommon4.html";
                    //});
                    //$("#li_countrysee").click(function () {
                    //    window.location.href = "page_county.html";
                    //});
                    //$("#a_areasee").click(function () {
                    //    window.location.href = "page_county.html";
                    //});
                }
                $("#a_areasee").click(function () {
                    window.location.href = "/Index?username=" + username + "&Ticket=" + Ticket;
                });
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                });

                var html = "";
                var logintime = "";
                for (var i = 0; i < data.data2.length; i++) {
                    logintime = ChangeTimeFormat(data.data2[i].logintime).split(" ")[0];
                    html += "<tr><td>" + data.data2[i].username + "</td><td>" + data.data2[i].managername + "</td><td>" + logintime + "</td><td>" + data.data2[i].area + "</td><td>" + data.data2[i].telphonecall + "</td><td><input type=\"checkbox\"  value=\"" + data.data2[i].username + "\"></input></td></tr>";
                }
                $("#tbody_pagemanagecommon").append(html);
            }
        }
    }
})

function nameOnClick(id, privilegelevel) {
    switch (privilegelevel) {
        case 6:
            //alert(id);
            //setCookie("page_farmusername_6", id, "s6000");
            //window.location.href = "user-profile_farm.html";
            window.location.href = "/Index/UserProfileFarm?clickuser=" + id;
    }
}

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




$(function () {
    $("#btn_modify").click(function () {
        var senddata = {};
        senddata.managername = $("#input_managername").val();
        senddata.managerarea = $("#input_managerarea").val();
        senddata.managerjob = $("#input_managerjob").val();
        senddata.manageridentity = $("#input_manageridentity").val();
        senddata.officecall = $("#input_officecall").val();
        senddata.managertel = $("#input_managertel").val();
        senddata.manageraddress = $("#input_manageraddress").val();
        senddata.email = $("#input_email").val();
        senddata.username = $("#input_username").val();
        senddata.password = $("#input_password").val();
        senddata.clicktype = "modifyself";
        $.ajax({
            url: "/api/pagepersonalapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                alert(data);
            }
        })
    });

    $("#modal_confirmactive").click(function () {
        var count = 0;
        var names = "";
        $.each($('#tbody_pagemanagecommon tr td input:checkbox'), function () {
            if (this.checked) {
                count++;
                names += $(this).val() + ",";
                //alert("你选了：" + $('#tbody_pagemanagecommon tr td input[type=checkbox]:checked').length + "个，其中有：" + $(this).val());
            }
        });
        names = names.slice(0, names.length - 1);
        alert("你选了：" + count + "个，其中有：" + names);
        var activedata = {};
        senddata.username = $("#input_username").val();
        senddata.activenames = names;
        senddata.clicktype = "activeadmins";
        $.ajax({
            url: "/api/pagepersonalapi",
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
})
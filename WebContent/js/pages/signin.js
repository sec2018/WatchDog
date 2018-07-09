$(function () {
    var u_p = getCookie("rememberuser");
    if (u_p !== "" && u_p != null) {
        $("#remember_me").attr("checked", 'true');
        $("#username").val(u_p.split('+')[0]);
        $("#password").val(u_p.split('+')[1]);
    }

    $("#btn_login").click(function () {
        var usrn = document.getElementById("username").value.trim();
        var psw = document.getElementById("password").value.trim();
        var click_type = "login";
        var userinfo = {};
        userinfo.click_type = click_type;
        userinfo.username = usrn;
        userinfo.password = psw;
        $.ajax({
        	url: timestamp("user/login.do"),
            type: "POST",
            async: false,
            data: userinfo,
            success: function (data) {
                if (data == "" || data == null) {
                    alert("用户名或密码错误！");
                } else {
                	data = eval("("+data+")");
                    if (data.status == "0") {
                        alert("账户未激活！");
                        return;
                    } 
                    setCookie("watchdogusername", usrn, "s6000");
                    if ($("#remember_me")[0].checked) {
                        setCookie("rememberuser", usrn + "+" + psw, "s10000");
                    } else {
                        delCookie("rememberuser");
                    }
                    window.location = "user/index.do";
                }
            }
        })
    });

    $("#btn_visitor").click(function () {
        window.location.href = timestamp("/Login/Guest");
    });

    var datares = {};
    $('#modalselect_adminlevel').on('change', function () {
        var selectText = $(this).find('option:selected').text();
        var levelinfo = {};
        switch (selectText) {
            case "省级":
                $("#select_city").css("display", "none");
                $("#select_county").css("display", "none");
                $("#select_village").css("display", "none");
                $("#select_hamlet").css("display", "none");
                break;
            case "市级":
                $.ajax({
                    url: "/api/loginapi/1",
                    type: "GET",
                    success: function (data) {
                        datares = eval("(" + data + ")");
                        $("#select_city").css("display", "inline");
                        $("#select_county").css("display", "none");
                        $("#select_village").css("display", "none");
                        $("#select_hamlet").css("display", "none");
                    }
                });
                break;
            case "县级":
                $.ajax({
                    url: "/api/loginapi/2",
                    type: "GET",
                    success: function (data) {
                        datares = eval("(" + data + ")");
                        $("#select_city").css("display", "inline");
                        $("#select_county").css("display", "inline");
                        $("#select_village").css("display", "none");
                        $("#select_hamlet").css("display", "none");
                    }
                });
                break;
            case "乡级":
                $.ajax({
                    url: "/api/loginapi/3",
                    type: "GET",
                    success: function (data) {
                        datares = eval("(" + data + ")");
                        $("#select_city").css("display", "inline");
                        $("#select_county").css("display", "inline");
                        $("#select_village").css("display", "inline");
                        $("#select_hamlet").css("display", "none");
                    }
                });
                break;
            case "村级":
                $.ajax({
                    url: "/api/loginapi/4",
                    type: "GET",
                    success: function (data) {
                        datares = eval("(" + data + ")");
                        $("#select_city").css("display", "inline");
                        $("#select_county").css("display", "inline");
                        $("#select_village").css("display", "inline");
                        $("#select_hamlet").css("display", "inline");
                    }
                });
                break;
        }
    });

    $("#select_province").on('change', function () {
        var selectvalue = $(this).find('option:selected').val();
        selectvalue = selectvalue.substring(0,2);
        $("#select_city").find("option").remove();
        var select_city = document.getElementById("select_city");
        select_city.options.add(new Option("请选择", "-1"));
        if ($('#modalselect_adminlevel').find('option:selected').text()!="省级") {
            for (var i = 0; i < datares.data1.length; i++) {
                if (datares.data1[i].districtcode.toString().substring(0, 2) == selectvalue) {
                    //遍历后台传回的结果，一项项往select中添加option
                    select_city.options.add(new Option(datares.data1[i].districtname, datares.data1[i].districtcode));
                }
            }
        }
        $("#select_county").find("option").remove();
        var select_county = document.getElementById("select_county");
        select_county.options.add(new Option("请选择", "-1"));

        $("#select_village").find("option").remove();
        var select_village = document.getElementById("select_village");
        select_village.options.add(new Option("请选择", "-1"));

        $("#select_hamlet").find("option").remove();
        var select_hamlet = document.getElementById("select_hamlet");
        select_hamlet.options.add(new Option("请选择", "-1"));
    });
    $("#select_city").on('change', function () {
        var selectvalue = $(this).find('option:selected').val();
        $("#select_county").find("option").remove();
        selectvalue = selectvalue.substring(0, 4);
        var select_county = document.getElementById("select_county");
        select_county.options.add(new Option("请选择", "-1"));
        if ($('#modalselect_adminlevel').find('option:selected').text() != "市级") {
            for (var i = 0; i < datares.data2.length; i++) {
                if (datares.data2[i].districtcode.toString().substring(0, 4) == selectvalue) {
                    //遍历后台传回的结果，一项项往select中添加option
                    select_county.options.add(new Option(datares.data2[i].districtname, datares.data2[i].districtcode));
                }
            }
        }
        $("#select_village").find("option").remove();
        var select_village = document.getElementById("select_village");
        select_village.options.add(new Option("请选择", "-1"));

        $("#select_hamlet").find("option").remove();
        var select_hamlet = document.getElementById("select_hamlet");
        select_hamlet.options.add(new Option("请选择", "-1"));
    });
    $("#select_county").on('change', function () {
        var selectvalue = $(this).find('option:selected').val();
        $("#select_village").find("option").remove();
        selectvalue = selectvalue.substring(0, 6);
        var select_village = document.getElementById("select_village");
        select_village.options.add(new Option("请选择", "-1"));
        if ($('#modalselect_adminlevel').find('option:selected').text() != "县级") {
            for (var i = 0; i < datares.data3.length; i++) {
                if (datares.data3[i].districtcode.toString().substring(0, 6) == selectvalue) {
                    //遍历后台传回的结果，一项项往select中添加option
                    select_village.options.add(new Option(datares.data3[i].districtname, datares.data3[i].districtcode));
                }
            }
        }
        $("#select_hamlet").find("option").remove();
        var select_hamlet = document.getElementById("select_hamlet");
        select_hamlet.options.add(new Option("请选择", "-1"));
    });
    $("#select_village").on('change', function () {
        var selectvalue = $(this).find('option:selected').val();
        $("#select_hamlet").find("option").remove();
        selectvalue = selectvalue.substring(0, 9);
        var select_hamlet = document.getElementById("select_hamlet");
        select_hamlet.options.add(new Option("请选择", "-1"));
        if ($('#modalselect_adminlevel').find('option:selected').text() != "乡级") {
            for (var i = 0; i < datares.data4.length; i++) {
                if (datares.data4[i].districtcode.toString().substring(0, 9) == selectvalue) {
                    //遍历后台传回的结果，一项项往select中添加option
                    select_hamlet.options.add(new Option(datares.data4[i].districtname, datares.data4[i].districtcode));
                }
            }
        }
    });


    $("#btn_adduser").click(function () {
        var senddata = {};
        senddata.click_type = "AddUser";
        var privilegelevel = -1;
        var adduserarea = "";
        var selectText = $("#modalselect_adminlevel").find("option:selected").text();
        switch (selectText) {
            case "省级":
                privilegelevel = 2;
                adduserarea = $("#select_province").find("option:selected").text();
                break;
            case "市级":
                privilegelevel = 3;
                adduserarea = $("#select_province").find("option:selected").text() + "-" + $("#select_city").find("option:selected").text();
                break;
            case "县级":
                privilegelevel = 4;
                adduserarea = $("#select_province").find("option:selected").text() + "-" + $("#select_city").find("option:selected").text() + "-" + $("#select_county").find("option:selected").text();
                break;
            case "乡级":
                privilegelevel = 5;
                adduserarea = $("#select_province").find("option:selected").text() + "-" + $("#select_city").find("option:selected").text() + "-"
                    + $("#select_county").find("option:selected").text() + "-" + $("#select_village").find("option:selected").text();
                break;
            case "村级":
                privilegelevel = 6;
                adduserarea = $("#select_province").find("option:selected").text() + "-" + $("#select_city").find("option:selected").text() + "-"
                    + $("#select_county").find("option:selected").text() + "-" + $("#select_village").find("option:selected").text() + "-" + $("#select_hamlet").find("option:selected").text();
                break;
        }
        senddata.area = adduserarea;
        senddata.privilegelevel = privilegelevel;
        senddata.managername = $("#input_managername").val();
        senddata.address = "";
        senddata.identity = $("#input_identity").val();
        senddata.officecall = "";
        senddata.tel = $("#input_tel").val();
        senddata.username = $("#input_username").val();
        var reg = /^[a-zA-Z\d]\w{3,11}[a-zA-Z\d]$/;//正则表达式
        if (!reg.test($("#input_username").val())) {
            alert('用户名为4到12位字母(大小写敏感)，数字，下划线，不能以下划线开头和结尾！');
            return;
        }
        senddata.password = $("#input_password").val();
        senddata.addtype = "self";
        if ($("#input_managername").val() == null || $("#input_managername").val() == "" || $("#input_username").val() == null || $("#input_username").val() == "" || $("#input_password").val() == null || $("#input_password").val() == "") {
            alert("带(*)选项为必填项！");
            return;
        }
        if (adduserarea.indexOf("请选择")>0) {
            alert("地址选择有误！");
            return;
        }
        if (senddata.password != $("#input_confirmpassword").val()) {
            alert("两次输入的密码不一致！");
            //window.location.href = "#";
            return;
        } else {
            $.ajax({
                url: "/api/loginapi",
                type: "POST",
                data: senddata,
                success: function (data) {
                    alert(data);
                    if (data == "添加成功") {
                        window.location.reload();
                    }
                }
            })
        }
    });
});
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

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    //setCookie(name, "", -1);
}

function timestamp(url) {
    var getTimestamp = new Date().getTime();
    if (url.indexOf("?") > -1) {
        url = url + "&timestamp=" + getTimestamp;
    } else {
        url = url + "?timestamp=" + getTimestamp;
    }
    return url;
}

function keyLogin(){
    if (event.keyCode==13)  //回车键的键值为13
        document.getElementById("btn_login").click(); //调用登录按钮的登录事件
}
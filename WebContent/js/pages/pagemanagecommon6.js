//var manageusername = "";
//var username = "";
//if (getCookie("watchdogusername") == null || getCookie("watchdogusername") == "") {
//    window.location.href = "signin.html";
//}
if ((districtcode == "" || districtcode == null) && manageusername != null && manageusername != "" && manageusername != username) {
    //manageusername = getCookie("page_farmusername_6");
    //username = getCookie("watchdogusername");
    $("#a_dogadd").css("display", "none");
    $("#a_owneradd").css("display", "none");
    $("#a_neckletadd").css("display", "none"); 
    $("#a_feederadd").css("display", "none");
    //$("#a_goback").click(function () {
    //    window.location.href = "/PageManageCommon/ManageToNext?clickname=" + manageusername + "&clicknamelevel=5";
    //});
} else {
    //username = getCookie("watchdogusername");
    manageusername = username;
    //$("#a_goback").css("display", "none");
}
var senddata = {};
senddata.username = username;
senddata.manageusername = manageusername;
senddata.districtcode = districtcode;
$.ajax({
    url: "/api/pagemanagecommonapi",
    type: "POST",
    data: senddata,
    success: function (data) {
        if (data == "failed") {
            window.location.href = "#";
            return;
        } else {
            data = eval("(" + data + ")");

            if (data.data8[0].privilegelevel == 6) {
                $("#a_areasee").click(function () {
                    //window.location.href = "page_farmlevel6.html";
                    window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                });

                var modalselect_dogbelonghamlet = document.getElementById("modalselect_dogbelonghamlet");
                var modalselect_ownerhamlet = document.getElementById("modalselect_ownerhamlet");
                for (var i = 0; i < data.data3.length; i++) {
                    //遍历后台传回的结果，一项项往select中添加option
                    modalselect_dogbelonghamlet.options.add(new Option(data.data3[i].districtname, data.data3[i].districtcode));
                    modalselect_ownerhamlet.options.add(new Option(data.data3[i].districtname, data.data3[i].districtcode));
                }
                var modalselect_dogownername = document.getElementById("modalselect_dogownername");
                for (var i = 0; i < data.data4.length; i++) {
                    //遍历后台传回的结果，一项项往select中添加option
                    modalselect_dogownername.options.add(new Option(data.data4[i].ownername, data.data4[i].ownerid));
                }
                var modalselect_dogneckletid = document.getElementById("modalselect_dogneckletid");
                for (var i = 0; i < data.data7.length; i++) {
                    //遍历后台传回的结果，一项项往select中添加option
                    modalselect_dogneckletid.options.add(new Option(data.data7[i].neckletid, data.data7[i].necid));
                }
                var modalselect_dogfeederid = document.getElementById("modalselect_dogfeederid");
                for (var i = 0; i < data.data9.length; i++) {
                    //遍历后台传回的结果，一项项往select中添加option
                    modalselect_dogfeederid.options.add(new Option(data.data9[i].feederid, data.data9[i].id));
                }
            } else if (data.data8[0].privilegelevel == 5) {
                $("#span_leftscan").html(data.data8[0].village + "总览");
                $("#a_areasee").click(function () {
                    window.location.href = "/Index/Village?village=" + escape(data.data8[0].village) + "&county=" + escape(data.data8[0].county) + "&city=" + escape(data.data8[0].city) + "&province=" + escape(data.data8[0].province);
                });
            } else if (data.data8[0].privilegelevel == 4) {
                $("#span_leftscan").html(data.data8[0].county + "总览");
                $("#a_areasee").click(function () {
                    window.location.href = "/Index/County?county=" + escape(data.data8[0].county) + "&city=" + escape(data.data8[0].city) + "&province=" + escape(data.data8[0].province);
                });
            } else if (data.data8[0].privilegelevel == 3) {
                $("#span_leftscan").html(data.data8[0].city + "总览");
                $("#a_areasee").click(function () {
                    window.location.href = "/Index/City?city=" + escape(data.data8[0].city) + "&province=" + escape(data.data8[0].province);
                });
            } else if (data.data8[0].privilegelevel == 2) {
                $("#span_leftscan").html(data.data8[0].province + "总览");
                $("#a_areasee").click(function () {
                    window.location.href = "/Index/Province?province=" + escape(data.data8[0].province);
                });
            } else if (data.data8[0].privilegelevel == 1) {
                $("#span_leftscan").html("全国总览");
                $("#a_areasee").click(function () {
                    window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                });
            } else {

            }

            $("#h3_adminname").html("牧犬管理员(" + data.data1[0].hamlet + ")");

            var html = "";
            var firstrealtime = "";
            var lastrealtime = "";
            var nextrealtime = "";
            for (var i = 0; i < data.data2.length; i++) {
                firstrealtime = ChangeTimeFormat(data.data2[i].firstmedtime).split(" ")[0];
                lastrealtime = ChangeTimeFormat(data.data2[i].lastmed).split(" ")[0];
                nextrealtime = ChangeTimeFormat(data.data2[i].nextmed).split(" ")[0];
                html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data2[i].dogid + "\">" + data.data2[i].neckletid + "</a></td><td>" + data.data2[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data2[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
            }
            for (var i = 0; i < data.data10.length; i++) {
                firstrealtime = ChangeTimeFormat(data.data10[i].firstmedtime).split(" ")[0];
                lastrealtime = ChangeTimeFormat(data.data10[i].lastmed).split(" ")[0];
                nextrealtime = ChangeTimeFormat(data.data10[i].nextmed).split(" ")[0];
                html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data10[i].dogid + "\">" + data.data10[i].feederid + "</a></td><td>" + data.data10[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data10[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
            }
            $("#tbody_userprofilefarm").append(html);


            $("#div_usersearch").click(function () {
                var managername = $("#input_managername").val();
                var searchhtml = "";
                if ($.trim(managername) == "") {
                    $("#tbody_userprofilefarm").append(html);
                    goPage(1, 8);
                    var tempOption = "";
                    for (var i = 1; i <= totalPage; i++) {
                        tempOption += '<option value=' + i + '>' + i + '</option>'
                    }
                    $("#jumpWhere").html(tempOption);

                    $(".neckletid").click(function () {
                        GetDogPage(this.id);
                    });
                } else {
                    for (var i = 0; i < data.data2.length; i++) {
                        firstrealtime = ChangeTimeFormat(data.data2[i].firstmedtime).split(" ")[0];
                        lastrealtime = ChangeTimeFormat(data.data2[i].lastmed).split(" ")[0];
                        nextrealtime = ChangeTimeFormat(data.data2[i].nextmed).split(" ")[0];
                        if (data.data2[i].neckletid.indexOf(managername) >= 0) {
                            searchhtml += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data2[i].dogid + "\">" + data.data2[i].neckletid + "</a></td><td>" + data.data2[i].dogname + "</a></td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data2[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
                        }
                    }
                    $("#tbody_userprofilefarm").html(searchhtml);
                    goPage(1, 8);
                    var tempOption = "";
                    for (var i = 1; i <= totalPage; i++) {
                        tempOption += '<option value=' + i + '>' + i + '</option>'
                    }
                    $("#jumpWhere").html(tempOption);

                    $(".neckletid").click(function () {
                        GetDogPage(this.id);
                    });
                }
            });

            goPage(1, 8);
            var tempOption = "";
            for (var i = 1; i <= totalPage; i++) {
                tempOption += '<option value=' + i + '>' + i + '</option>'
            }
            $("#jumpWhere").html(tempOption);

            $(".neckletid").click(function () {
                GetDogPage(this.id);
            });

            $(".dogname").click(function () {
                //setCookie("user_profile_dogid", this.id, "s6000");
                window.location.href = "/Index/PageDog6?dogid=" + this.id;
            });


        }
    }
})


function nameOnClick(id, privilegelevel) {
    switch (privilegelevel) {
        case 6:
            //alert(id);
            //setCookie("page_farmusername_6", id, "s6000");
            window.location.href = "/Index/UserProfile?viewuser=" + id;
            break;
        default:
            window.location.href = "/Index/UserProfile?viewuser=" + id;
    }
}

function GetDogPage(id) {
    //setCookie("user_profile_dogid", id, "s6000");
    window.location.href = "/Index/PageDog6?dogid="+id;
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function ChangeTimeFormat(logintime) {
    if (logintime == "") {
        return "----";
    }
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
    $("#modal_dogadd").click(function () {
        var clicktype = "dogadd";
        var dogname = $("#modalinput_dogname").val();
        var dogsex = $("#modalselect_dogsex").find("option:selected").text();
        var dogbelonghamlet = $("#modalselect_dogbelonghamlet").find("option:selected").text();
        var dogownerid = $("#modalselect_dogownername").val();
        var dogweight = $("#modalinput_dogweight").val();
        var dogcolor = $("#modalinput_dogcolor").val();
        var dogage = $("#modalinput_dogage").val();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.username = username;
        senddata.dogname = dogname;
        senddata.dogsex = dogsex;
        senddata.dogbelonghamlet = dogbelonghamlet;
        senddata.dogownerid = dogownerid;
        senddata.dogweight = dogweight;
        senddata.dogcolor = dogcolor;
        senddata.dogage = dogage;
        $.ajax({
            url: "/api/pagedogapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                alert(data);
                window.location.reload();
            }
        })
    });

    $("#a_neckletbind").click(function () {
        var clicktype = "bindnecklet";
        var dogname = $("#modalinput_dogname").val();
        var dogsex = $("#modalselect_dogsex").find("option:selected").text();
        var dogbelonghamlet = $("#modalselect_dogbelonghamlet").find("option:selected").text();
        var dogownerid = $("#modalselect_dogownername").val();
        var dogweight = $("#modalinput_dogweight").val();
        var dogcolor = $("#modalinput_dogcolor").val();
        var dogage = $("#modalinput_dogage").val();
        var dogneckletid = $("#modalselect_dogneckletid").find("option:selected").text();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.username = username;
        senddata.dogname = dogname;
        senddata.dogsex = dogsex;
        senddata.dogbelonghamlet = dogbelonghamlet;
        senddata.dogownerid = dogownerid;
        senddata.dogweight = dogweight;
        senddata.dogcolor = dogcolor;
        senddata.dogage = dogage;
        senddata.dogneckletid = dogneckletid;
        $.ajax({
            url: "/api/pagedogapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                if (data == "success") {
                    alert("绑定成功！");
                    $("#dogDiv").modal('hide');
                    window.location.reload();
                } else {
                    alert("绑定失败！");
                }
            }
        })
    });

    $("#a_feederbind").click(function () {
        var clicktype = "bindfeeder";
        var dogname = $("#modalinput_dogname").val();
        var dogsex = $("#modalselect_dogsex").find("option:selected").text();
        var dogbelonghamlet = $("#modalselect_dogbelonghamlet").find("option:selected").text();
        var dogownerid = $("#modalselect_dogownername").val();
        var dogweight = $("#modalinput_dogweight").val();
        var dogcolor = $("#modalinput_dogcolor").val();
        var dogage = $("#modalinput_dogage").val();
        var dogfeederid = $("#modalselect_dogfeederid").find("option:selected").text();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.username = username;
        senddata.dogname = dogname;
        senddata.dogsex = dogsex;
        senddata.dogbelonghamlet = dogbelonghamlet;
        senddata.dogownerid = dogownerid;
        senddata.dogweight = dogweight;
        senddata.dogcolor = dogcolor;
        senddata.dogage = dogage;
        senddata.dogfeederid = dogfeederid;
        $.ajax({
            url: "/api/pagedogapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                if (data == "success") {
                    alert("绑定成功！");
                    $("#dogDiv").modal('hide');
                    window.location.reload();
                } else {
                    alert("绑定失败！");
                }
            }
        })
    });

    $("#modal_owneradd").click(function () {
        var clicktype = "owneradd";
        var ownername = $("#modalinput_ownername").val();
        var owneridentity = $("#modalinput_owneridentity").val();
        var ownersex = $("#modalselect_ownersex").find("option:selected").text();
        var ownerhamlet = $("#modalselect_ownerhamlet").find("option:selected").text();
        var ownerage = $("#modalinput_ownerage").val();
        var ownerjob = $("#modalinput_ownerjob").val();
        var homeaddress = $("#modalinput_homeaddress").val();
        var telphone = $("#modalinput_telphone").val();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.ownername = ownername;
        senddata.owneridentity = owneridentity;
        senddata.ownersex = ownersex;
        senddata.ownerhamlet = ownerhamlet;
        senddata.ownerage = ownerage;
        senddata.ownerjob = ownerjob;
        senddata.homeaddress = homeaddress;
        senddata.telphone = telphone;
        $.ajax({
            url: "/api/pagedogapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                alert(data);
                window.location.reload();
            }
        })
    });

    $("#modal_neckletadd").click(function () {
        var clicktype = "neckletadd";
        var neckletid = $("#neck_modalinput_neckletid").val();
        var medtotal = $("#neck_modalinput_medtotal").val();
        var category = $("#neck_modalinput_category").val();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.neckletid = neckletid;
        senddata.medtotal = medtotal;
        senddata.category = category;
        senddata.username = manageusername;
        $.ajax({
            url: "/api/pagedogapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                alert(data);
                window.location.reload();
            }
        })
    });

    $("#modal_feederadd").click(function () {
        var clicktype = "feederadd";
        var feederid = $("#feeder_modalinput_feederid").val();
        var medtotal = $("#feeder_modalinput_medtotal").val();
        var category = $("#feeder_modalinput_category").val();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.feederid = feederid;
        senddata.medtotal = medtotal;
        senddata.category = category;
        senddata.username = manageusername;
        $.ajax({
            url: "/api/pagedogapi",
            type: "POST",
            data: senddata,
            success: function (data) {
                alert(data);
                window.location.reload();
            }
        })
    });

})

/**
* 分页函数
* pno--页数
* psize--每页显示记录数
* 分页部分是从真实数据行开始，因而存在加减某个常数，以确定真正的记录数
* 纯js分页实质是数据行全部加载，通过是否显示属性完成分页功能
**/

var pageSize = 0;//每页显示行数
var currentPage_ = 1;//当前页全局变量，用于跳转时判断是否在相同页，在就不跳，否则跳转。
var totalPage;//总页数
function goPage(pno, psize) {
    var itable = document.getElementById("tbody_userprofilefarm");
    var num = itable.rows.length;//表格所有行数(所有记录数)

    pageSize = psize;//每页显示行数
    //总共分几页
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    currentPage_ = currentPage;
    var startRow = (currentPage - 1) * pageSize + 1;
    var endRow = currentPage * pageSize;
    endRow = (endRow > num) ? num : endRow;
    //遍历显示数据实现分页
    /*for(var i=1;i<(num+1);i++){
        var irow = itable.rows[i-1];
        if(i>=startRow && i<=endRow){
            irow.style.display = "";
        }else{
            irow.style.display = "none";
        }
    }*/

    $("#tbody_userprofilefarm tr").hide();
    for (var i = startRow - 1; i < endRow; i++) {
        $("#tbody_userprofilefarm tr").eq(i).show();
    }
    var tempStr = "共" + num + "条记录 分" + totalPage + "页 当前第" + currentPage + "页";
    document.getElementById("barcon1").innerHTML = tempStr;

    if (currentPage > 1) {
        $("#firstPage").on("click", function () {
            goPage(1, psize);
        }).removeClass("ban");
        $("#prePage").on("click", function () {
            goPage(currentPage - 1, psize);
        }).removeClass("ban");
    } else {
        $("#firstPage").off("click").addClass("ban");
        $("#prePage").off("click").addClass("ban");
    }

    if (currentPage < totalPage) {
        $("#nextPage").on("click", function () {
            goPage(currentPage + 1, psize);
        }).removeClass("ban")
        $("#lastPage").on("click", function () {
            goPage(totalPage, psize);
        }).removeClass("ban")
    } else {
        $("#nextPage").off("click").addClass("ban");
        $("#lastPage").off("click").addClass("ban");
    }

    $("#jumpWhere").val(currentPage);
}



function jumpPage() {
    var num = parseInt($("#jumpWhere").val());
    if (num != currentPage_) {
        goPage(num, pageSize);
    }
}

$(function () {
    $("#pagereflash").click(function () {
        window.location.reload();
    });
})
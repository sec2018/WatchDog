var senddata = {};
senddata.username = username;
senddata.manageusername = username;
$.ajax({
    url: "/api/pagemanagecommonapi",
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
                if (data.data3[0].privilegelevel == 1) {
                    //$("#h3_adminname").html("国家管理员——" + data.data1[0].managername);
                    $("#h3_adminname").html("国家管理员");
                    for (var i = 0; i < data.data2.length; i++) {
                        logintime = ChangeTimeFormat(data.data2[i].logintime).split(" ")[0];
                        html += "<tr><td><a onclick=\"nameOnClick(this.id)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "\">" + data.data2[i].managername + "</a></td><td>" + logintime + "</td><td><a onclick=\"areaOnClick(this.id,2)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "*\">" + data.data2[i].managearea + "</a></td><td>" + data.data2[i].job + "</td><td>" + data.data2[i].dogtotalnum + "</td><td>" + data.data2[i].neckletedtotal + "</td><td>" + 0 + "</td><td>" + data.data2[i].officecall + "</td><td>" + data.data2[i].telphonecall + "</td></tr>";
                        //html += "<tr><td><a class=\"name\" onclick=\"nameOnClick(this.id)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "\">" + data.data2[i].managername + "</a></td><td><a onclick=\"areaOnClick(this.id,2)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "*\">" + data.data2[i].managearea + "</a></td><td>" + data.data2[i].job + "</td><td>" + data.data2[i].dogtotalnum + "</td><td>" + data.data2[i].officecall + "</td><td><a href=\"#\">" + data.data2[i].telphonecall + "</a></td></tr>";
                    }

                } else {

                }
            }

            $("#tbody_pagemanagecommon").append(html);


            $("#div_usersearch").click(function () {
                var searchhtml = "";
                var managername = $("#input_managername").val();
                if ($.trim(managername) == "") {
                    for (var i = 0; i < data.data2.length; i++) {
                        logintime = ChangeTimeFormat(data.data2[i].logintime).split(" ")[0];
                        searchhtml += "<tr><td><a onclick=\"nameOnClick(this.id)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "\">" + data.data2[i].managername + "</a></td><td>" + logintime + "</td><td><a onclick=\"areaOnClick(this.id,2)\" style=\"cursor:pointer;\" id=\"" + data.data2[i].username + "*\">" + data.data2[i].managearea + "</a></td><td>" + data.data2[i].job + "</td><td>" + data.data2[i].dogtotalnum + "</td><td>" + data.data2[i].neckletedtotal + "</td><td>" + 0 + "</td><td>" + data.data2[i].officecall + "</td><td>" + data.data2[i].telphonecall + "</td></tr>";
                    }
                    $("#tbody_pagemanagecommon").html(searchhtml);
                    goPage(1, 8);
                    var tempOption = "";
                    for (var i = 1; i <= totalPage; i++) {
                        tempOption += '<option value=' + i + '>' + i + '</option>'
                    }
                    $("#jumpWhere").html(tempOption);
                }
                else {
                    var searchcontent = {};
                    searchcontent.clicktype = "onlynextonlinename";
                    searchcontent.managername = managername;    //managername 可能是姓名或区域或手机
                    searchcontent.username = username;
                    searchcontent.districtcode = "0";
                    $.ajax({
                        url: "/api/searchmanagerapi",
                        type: "POST",
                        data: searchcontent,
                        success: function (data) {
                            data = eval("(" + data + ")");
                            for (var i = 0; i < data.length; i++) {
                                logintime = ChangeTimeFormat(data[i].logintime).split(" ")[0];
                                searchhtml += "<tr><td><a onclick=\"nameOnClick(this.id)\" style=\"cursor:pointer;\" id=\"" + data[i].username + "\">" + data[i].managername + "</a></td><td>" + logintime + "</td><td>" + data[i].managearea + "</td><td>" + data[i].job + "</td><td>" + data[i].dogtotalnum + "</td><td>" + data[i].neckletedtotal + "</td><td>" + 0 + "</td><td>" + data[i].officecall + "</td><td>" + data[i].telphonecall + "</td></tr>";
                            }
                            $("#tbody_pagemanagecommon").html(searchhtml);
                            goPage(1, 8);
                            var tempOption = "";
                            for (var i = 1; i <= totalPage; i++) {
                                tempOption += '<option value=' + i + '>' + i + '</option>'
                            }
                            $("#jumpWhere").html(tempOption);
                        }
                    });
                }
            });

            goPage(1, 8);
            var tempOption = "";
            for (var i = 1; i <= totalPage; i++) {
                tempOption += '<option value=' + i + '>' + i + '</option>'
            }
            $("#jumpWhere").html(tempOption);

            $("#li_countrysee").click(function () {
                window.location.href = "/Index?UserName="+username+"&Ticket="+Ticket;
            });
        }
    }
})

$(function () {
    $("#pagereflash").click(function () {
        window.location.reload();
    });
})

function areaOnClick(id, privilegelevel) {
    switch (privilegelevel) {
        case 2:
            id = id.substring(0, id.length - 1);
            //alert(id);
            //setCookie("page_farmusername_2", id, "s6000");
            window.location.href = "/PageManageCommon/ManageToNext?clickname=" + id + "&clicknamelevel=" + privilegelevel;
    }
}

function nameOnClick(id) {
    //alert("跳转至" + id + "信息页面");
    window.location.href = "/Index/UserProfile?viewuser=" + id;
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
    var itable = document.getElementById("tbody_pagemanagecommon");
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

    $("#tbody_pagemanagecommon tr").hide();
    for (var i = startRow - 1; i < endRow; i++) {
        $("#tbody_pagemanagecommon tr").eq(i).show();
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
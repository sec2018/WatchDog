$.ajax({
    url: "../hamlet/hamletapi",
    type: "POST",
    success: function (data) {
        if (data == "failed") {
            window.location.href = "/login.jsp";
            return;
        } else {
            data = eval("(" + data + ")");

            var html = "";
            var firstrealtime = "";
            var lastrealtime = "";
            var nextrealtime = "";

            data.data2 = objToArray(data.data2);
            data.data3 = objToArray(data.data3);
            data.data5 = objToArray(data.data5);
            data.data6 = objToArray(data.data6);
            data.data8 = objToArray(data.data8);
            for (var i = 0; i < data.data8.length; i++) {
                //修正信息
                //var datenow = new Date();//获取系统当前时间
                var timestampnow = Date.parse(new Date()) / 1000;
                //上次投药时间  20180323155000
                var lastmedtime_1 = data.data8[i].lastmed;
                var firstmedtime_1 = data.data8[i].firstmedtime;
                var nextmedtime_1 = data.data8[i].nextmed;

                var medcycle = data.data8[i].exhibitcycle * 1440 * 60;
                var lastmedtime_2 = lastmedtime_1.substring(0, 4) + "/" + lastmedtime_1.substring(4, 6) + "/" + lastmedtime_1.substring(6, 8) + " " + lastmedtime_1.substring(8, 10) + ":" + lastmedtime_1.substring(10, 12) + ":" + lastmedtime_1.substring(12, 14);
                var firstmedtime_2 = firstmedtime_1.substring(0, 4) + "/" + firstmedtime_1.substring(4, 6) + "/" + firstmedtime_1.substring(6, 8) + " " + firstmedtime_1.substring(8, 10) + ":" + firstmedtime_1.substring(10, 12) + ":" + firstmedtime_1.substring(12, 14);
                //var nextmedtime_2 = nextmedtime_1.substring(0, 4) + "/" + nextmedtime_1.substring(4, 6) + "/" + nextmedtime_1.substring(6, 8) + " " + nextmedtime_1.substring(8, 10) + ":" + nextmedtime_1.substring(10, 12) + ":" + nextmedtime_1.substring(12, 14);

                var lastmedtimestamp = new Date(lastmedtime_2).getTime() / 1000;
                var firstmedtimestamp = new Date(firstmedtime_2).getTime() / 1000;

                var lastmedtimeres = ChangeTimeFormat(lastmedtime_1).split(" ")[0];
                var firstrealtime = ChangeTimeFormat(firstmedtime_1).split(" ")[0];
                var nextmedtimeres = firstrealtime;
                if (firstmedtimestamp < timestampnow) {
                    var forgetmedtimes = Math.floor((timestampnow - lastmedtimestamp) / medcycle);
                    var lastmedtimeres_ = lastmedtimestamp + forgetmedtimes * medcycle;
                    var nextmedtimeres_ = lastmedtimeres_ + medcycle;
                    var d = new Date(lastmedtimeres_ * 1000);
                    var n = new Date(lastmedtimeres_ * 1000);
                    var year = d.getFullYear();
                    var month = d.getMonth() + 1;
                    var day = d.getDate();
                    var hour = d.getHours();
                    var min = d.getMinutes();
                    var sec = d.getSeconds();
                    if ((month + '').length < 2) {
                        month = "0" + month;
                    }
                    if ((day + '').length < 2) {
                        day = "0" + day;
                    }
                    lastmedtimeres = year + "-" + month + "-" + day;

                    var year2 = n.getFullYear();
                    var month2 = n.getMonth() + 1;
                    var day2 = n.getDate();
                    var hour2 = n.getHours();
                    var min2 = n.getMinutes();
                    var sec2 = n.getSeconds();
                    if ((month2 + '').length < 2) {
                        month2 = "0" + month2;
                    }
                    if ((day2 + '').length < 2) {
                        day2 = "0" + day2;
                    }
                    nextmedtimeres = year2 + "-" + month2 + "-" + day2;

                    firstrealtime = ChangeTimeFormat(data.data8[i].firstmedtime).split(" ")[0];
                }

                //lastrealtime = ChangeTimeFormat(data.data2[i].lastmed).split(" ")[0];
                //nextrealtime = ChangeTimeFormat(data.data2[i].nextmed).split(" ")[0];
                lastrealtime = lastmedtimeres;
                nextrealtime = nextmedtimeres;
                if(data.data8[i].neckletid != null){
                	html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data8[i].dogid + "\">" + data.data8[i].neckletid + "</a></td><td>" + data.data8[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data8[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
                }else{
                	html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data8[i].dogid + "\">" + data.data8[i].feederid + "</a></td><td>" + data.data8[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data8[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
                }
            }
//            for (var i = 0; i < data.data5.length; i++) {
//                firstrealtime = ChangeTimeFormat(data.data5[i].firstmedtime).split(" ")[0];
//                lastrealtime = ChangeTimeFormat(data.data5[i].lastmed).split(" ")[0];
//                nextrealtime = ChangeTimeFormat(data.data5[i].nextmed).split(" ")[0];
//                html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data5[i].dogid + "\">" + data.data5[i].feederid + "</a></td><td>" + data.data5[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data5[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
//            }
            $("#tbody_userprofilefarm").append(html);
            //document.getElementById("barcon").innerHTML = pagecode;

            $(".pagination").append(data.pageCode);


            $("#div_usersearch").click(function () {
                var neckletid = $("#input_managername").val();
                var searchhtml = "";
                for (var i = 0; i < data.data2.length; i++) {
                    if (data.data2[i].neckletid.indexOf(neckletid) >= 0) {

                        //修正信息
                        //var datenow = new Date();//获取系统当前时间
                        var timestampnow = Date.parse(new Date()) / 1000;
                        //上次投药时间  20180323155000
                        var lastmedtime_1 = data.data2[i].lastmed;
                        var firstmedtime_1 = data.data2[i].firstmedtime;
                        var nextmedtime_1 = data.data2[i].nextmed;

                        var medcycle = data.data2[i].exhibitcycle * 1440 * 60;
                        var lastmedtime_2 = lastmedtime_1.substring(0, 4) + "/" + lastmedtime_1.substring(4, 6) + "/" + lastmedtime_1.substring(6, 8) + " " + lastmedtime_1.substring(8, 10) + ":" + lastmedtime_1.substring(10, 12) + ":" + lastmedtime_1.substring(12, 14);
                        var firstmedtime_2 = firstmedtime_1.substring(0, 4) + "/" + firstmedtime_1.substring(4, 6) + "/" + firstmedtime_1.substring(6, 8) + " " + firstmedtime_1.substring(8, 10) + ":" + firstmedtime_1.substring(10, 12) + ":" + firstmedtime_1.substring(12, 14);
                        //var nextmedtime_2 = nextmedtime_1.substring(0, 4) + "/" + nextmedtime_1.substring(4, 6) + "/" + nextmedtime_1.substring(6, 8) + " " + nextmedtime_1.substring(8, 10) + ":" + nextmedtime_1.substring(10, 12) + ":" + nextmedtime_1.substring(12, 14);

                        var lastmedtimestamp = new Date(lastmedtime_2).getTime() / 1000;
                        var firstmedtimestamp = new Date(firstmedtime_2).getTime() / 1000;

                        var lastmedtimeres = ChangeTimeFormat(lastmedtime_1).split(" ")[0];
                        var firstrealtime = ChangeTimeFormat(firstmedtime_1).split(" ")[0];
                        var nextmedtimeres = firstrealtime;

                        if (firstmedtimestamp < timestampnow) {
                            var forgetmedtimes = Math.floor((timestampnow - lastmedtimestamp) / medcycle);
                            var lastmedtimeres_ = lastmedtimestamp + forgetmedtimes * medcycle;
                            var nextmedtimeres_ = lastmedtimeres_ + medcycle;
                            var d = new Date(lastmedtimeres_ * 1000);
                            var n = new Date(lastmedtimeres_ * 1000);
                            var year = d.getFullYear();
                            var month = d.getMonth() + 1;
                            var day = d.getDate();
                            var hour = d.getHours();
                            var min = d.getMinutes();
                            var sec = d.getSeconds();
                            if ((month + '').length < 2) {
                                month = "0" + month;
                            }
                            if ((day + '').length < 2) {
                                day = "0" + day;
                            }
                            lastmedtimeres = year + "-" + month + "-" + day;

                            var year2 = n.getFullYear();
                            var month2 = n.getMonth() + 1;
                            var day2 = n.getDate();
                            var hour2 = n.getHours();
                            var min2 = n.getMinutes();
                            var sec2 = n.getSeconds();
                            if ((month2 + '').length < 2) {
                                month2 = "0" + month2;
                            }
                            if ((day2 + '').length < 2) {
                                day2 = "0" + day2;
                            }
                            nextmedtimeres = year2 + "-" + month2 + "-" + day2;

                            firstrealtime = ChangeTimeFormat(data.data2[i].firstmedtime).split(" ")[0];
                        }
                        //lastrealtime = ChangeTimeFormat(data.data2[i].lastmed).split(" ")[0];
                        //nextrealtime = ChangeTimeFormat(data.data2[i].nextmed).split(" ")[0];
                        lastrealtime = lastmedtimeres;
                        nextrealtime = nextmedtimeres;

                        //searchhtml += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data2[i].dogid + "\">" + data.data2[i].neckletid + "</a></td><td>" + data.data2[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data2[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
                        searchhtml += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data2[i].dogid + "\">" + data.data2[i].neckletid + "</a></td><td>" + data.data2[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data2[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
                    }
                }
                
                for (var i = 0; i < data.data5.length; i++) {
                    if (data.data5[i].feederid.indexOf(neckletid) >= 0) {
                        searchhtml += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data5[i].dogid + "\">" + data.data5[i].feederid + "</a></td><td>" + data.data5[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data5[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
                    }
                }
                $("#tbody_userprofilefarm").html(searchhtml);
//                goPage(1, 8);
//                var tempOption = "";
//                for (var i = 1; i <= totalPage; i++) {
//                    tempOption += '<option value=' + i + '>' + i + '</option>'
//                }
//                $("#jumpWhere").html(tempOption);

                $(".neckletid").click(function () {
                    GetDogPage(this.id);
                });
            });

            if (data.data1.privilegelevel == 1) {
                $("#span_leftscan").html("全国总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                });
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            }
            else if (data.data1.privilegelevel == 2) {
                $("#span_leftscan").html(provincename + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 3) {
                $("#span_leftscan").html(cityname + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 4) {
                $("#span_leftscan").html(countyname + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 5) {
                $("#span_leftscan").html(villagename + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                });
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else {
                $("#span_leftscan").html("地区总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                });
                $("#a_areasee").click(function () {
                    window.location.href = "#";
                });
                $("#goback").css("display", "none");
            }


//            goPage(1, 8);
//            var tempOption = "";
//            for (var i = 1; i <= totalPage; i++) {
//                tempOption += '<option value=' + i + '>' + i + '</option>'
//            }
//            $("#jumpWhere").html(tempOption);

            $(".neckletid").click(function () {
                GetDogPage(this.id);
            });

            $("#a_farmdetail").click(function () {
                //window.location.href = "page_farmlevel6.html";
                window.location.href = "#";
            });

            GetFarmEcharts(data);
        }
    }
})

$(function () {
    $("#pagereflash").click(function () {
        window.location.reload();
    });
})

function nameOnClick(id, privilegelevel) {
    switch (privilegelevel) {
        case 6:
            //alert(id);
            //setCookie("page_farmusername_6", id, "s6000");
            window.location.href = "/Index/UserProfileFarm?clickuser=" + id;
    }
}

function GetDogPage(id) {
    window.location.href = "/Index/PageDog6?dogid="+id;
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

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
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



var district, map = null;

function GetFarmEcharts(data) {

    //初始化地图对象，加载地图
    district, map = new AMap.Map("statsChart", {
        resizeEnable: true,
        //center: [116.40, 39.91],//地图中心点
        zoom: 10 //地图显示的缩放级别
    });


    AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {


        var zoomCtrl2 = new BasicControl.Zoom({
            position: 'br',
            showZoomNum: true
        });

        //map.addControl(zoomCtrl1);

        map.addControl(zoomCtrl2);
    });


    var harmletname = data.data4.hamletname;
    $("#h3_logtitle").html(harmletname);
    function addMarker(point, title, content, dogid) {
        marker = new AMap.Marker({
            //icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            icon: "/Views/img/necklet_3.ico",
            //position: [116.41, 39.91]
            position: point,
            //icon: new AMap.Icon({
            //    size: new AMap.Size(40, 50),  //图标大小
            //    //image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
            //    image: "../img/dog.png",
            //    imageOffset: new AMap.Pixel(0, -60)
            //})
        });

        marker.content = title + "<br>" + content;
        //marker.on('click', function (e) {

        //    //"<a onclick=\"GetDogPage(" + n["dogid"] + ")\"><b>" + p_titles[i] + "</b></a>"

        //    //window.location.href = "GetDogPage(" + dogid + ")\";

        //    GetDogPage(dogid);

        //});
        //marker.on('mouseover', markerOver);
        marker.on('click', markerOver);
        //marker.on('mouseout', markerOut);
        //marker.emit('click', { target: marker });

        marker.setMap(map);

        return marker;
    }



		function addNeckletMarker(point, title, content, dogid) {
        marker = new AMap.Marker({
            //icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            icon: "../img/necklet_3.ico",
            //position: [116.41, 39.91]
            position: point,
            //icon: new AMap.Icon({
            //    size: new AMap.Size(40, 50),  //图标大小
            //    //image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
            //    image: "../img/dog.png",
            //    imageOffset: new AMap.Pixel(0, -60)
            //})
        });

        marker.content = title + "<br>" + content;
        //marker.on('click', function (e) {

        //    //"<a onclick=\"GetDogPage(" + n["dogid"] + ")\"><b>" + p_titles[i] + "</b></a>"

        //    //window.location.href = "GetDogPage(" + dogid + ")\";

        //    GetDogPage(dogid);

        //});
        //marker.on('mouseover', markerOver);
        marker.on('click', markerOver);
        //marker.on('mouseout', markerOut);
        //marker.emit('click', { target: marker });

        marker.setMap(map);

        return marker;
    }

		function addFeederMarker(point, title, content, dogid) {
        marker = new AMap.Marker({
            //icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            icon: "../img/feeder_2.ico",
            //position: [116.41, 39.91]
            position: point,
            //icon: new AMap.Icon({
            //    size: new AMap.Size(40, 50),  //图标大小
            //    //image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
            //    image: "../img/dog.png",
            //    imageOffset: new AMap.Pixel(0, -60)
            //})
        });

        marker.content = title + "<br>" + content;
        //marker.on('click', function (e) {

        //    //"<a onclick=\"GetDogPage(" + n["dogid"] + ")\"><b>" + p_titles[i] + "</b></a>"

        //    //window.location.href = "GetDogPage(" + dogid + ")\";

        //    GetDogPage(dogid);

        //});
        //marker.on('mouseover', markerOver);
        marker.on('click', markerOver);
        //marker.on('mouseout', markerOut);
        //marker.emit('click', { target: marker });

        marker.setMap(map);

        return marker;
    }

    function markerOver(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }

    function markerOut(e) {
        //infoWindow.setContent("");
        infoWindow.close();
    }

    //=========================================//

    //==================全局变量========================//

    var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
    var cluster, markers = [];

    //==========================================//



    //var p_X = [];
    //var p_Y = [];
//    var p_titles = [];
//    var p_dognames = [];
//    var p_managers = [];
//    var p_medtime = [];
    
    
    
    var all_necklet_dogs_num = 0;
    var all_feeder_dogs_num = 0;

    var p_necklet_ids = [];
    var p_necklet_Xs = [];
    var p_necklet_Ys = [];
    var p_necklet_titles = [];
    var p_necklet_dognames = [];
    var p_necklet_nextmedtimes = [];
    var p_necklet_mangers = [];

    var p_feeder_ids = [];
    var p_feeder_Xs = [];
    var p_feeder_Ys = [];
    var p_feeder_titles = [];
    var p_feeder_dognames = [];
    var p_feeder_times = [];
    var p_feeder_nextmedtimes = [];
    var p_feeder_mangers = [];

    
    


    $.each(data.data3, function (i, n) {
        //alert("进入data");
        
        p_necklet_ids[i] = n["neckletid"];
        
        p_necklet_Xs[i] = n["lng"];
        //alert("X=" + p_categories[i]);
        p_necklet_Ys[i] = n["lat"];

        p_necklet_titles[i] = "项圈编号：" + n["dogid"];

        p_necklet_dognames[i] = n["dogname"];
        //p_figs[i] = n["fig"];
        p_necklet_mangers[i] = n["manager"];
        p_necklet_nextmedtimes[i] = n["nextmedtime"];


        //var one_title = p_titles[i];

        var one_title = "设备编号：<a onclick=\"GetDogPage(" + n["dogid"] + ")\">" + p_necklet_ids[i] + "</a>"

        var one_content = "<div><table>" +
            "<tr><th>牧犬名字：</th><th>" + p_necklet_dognames[i] + "</th></tr>" +
            "<tr><th>所属村庄：</th><th>" + harmletname + "</th></tr>" +
            "<tr><th>管理员：</th><th>" + p_necklet_mangers[i] + "</th></tr>" +
            "<tr><th>下次投药时间：</th><th>" + ChangeTimeFormat(p_necklet_nextmedtimes[i]) + "</th></tr>" +
            "</table></div>";

        markers.push(addNeckletMarker([p_necklet_Xs[i], p_necklet_Ys[i]], one_title, one_content, n["dogid"]));


    });




    $.each(data.data6, function (i, n) {
        //alert("进入data");
        
        p_feeder_ids[i] = n["feederid"];
        
        p_feeder_Xs[i] = n["lng"];
        //alert("X=" + p_categories[i]);
        p_feeder_Ys[i] = n["lat"];

        p_feeder_titles[i] = "喂饲器编号：" + n["dogid"];

        p_feeder_dognames[i] = n["dogname"];
        //p_figs[i] = n["fig"];
        p_feeder_mangers[i] = n["manager"];
        p_feeder_nextmedtimes[i] = n["nextmedtime"];


        //var one_title = p_titles[i];

        var one_title = "设备编号：<a onclick=\"GetDogPage(" + n["dogid"] + ")\">" + p_feeder_ids[i] + "</a>"

        var one_content = "<div><table>" +
            "<tr><th>牧犬名字：</th><th>" + p_feeder_dognames[i] + "</th></tr>" +
            "<tr><th>所属村庄：</th><th>" + harmletname + "</th></tr>" +
            "<tr><th>管理员：</th><th>" + p_feeder_mangers[i] + "</th></tr>" +
            "<tr><th>下次投药时间：</th><th>" + ChangeTimeFormat(p_feeder_nextmedtimes[i]) + "</th></tr>" +
            "</table></div>";

        markers.push(addFeederMarker([p_feeder_Xs[i], p_feeder_Ys[i]], one_title, one_content, n["dogid"]));


    });


    //var show_X = 0;
    //var show_Y = 0;


    //for (j = 0; j < p_necklet_Xs.length; j++) {

    //    show_X = show_X + p_necklet_Xs[j];
    //    show_Y = show_Y + p_necklet_Ys[j];

    //}

    //for (j = 0; j < p_feeder_Xs.length; j++) {

    //    show_X = show_X + p_feeder_Xs[j];
    //    show_Y = show_Y + p_feeder_Ys[j];

    //}

    //show_X = show_X / (p_necklet_Xs.length + p_feeder_Xs.length);
    //show_Y = show_Y / (p_necklet_Xs.length + p_feeder_Xs.length);

    //map.setZoomAndCenter(10, [show_X, show_Y]);
    map.setFitView();//地图自适应

    //alert(show_X);
    //alert(show_Y);

}



/**
* 分页函数
* pno--页数
* psize--每页显示记录数
* 分页部分是从真实数据行开始，因而存在加减某个常数，以确定真正的记录数
* 纯js分页实质是数据行全部加载，通过是否显示属性完成分页功能
**/

//var pageSize = 0;//每页显示行数
//var currentPage_ = 1;//当前页全局变量，用于跳转时判断是否在相同页，在就不跳，否则跳转。
//var totalPage;//总页数
//function goPage(pno, psize) {
//    var itable = document.getElementById("tbody_userprofilefarm");
//    var num = itable.rows.length;//表格所有行数(所有记录数)
//
//    pageSize = psize;//每页显示行数
//    //总共分几页
//    if (num / pageSize > parseInt(num / pageSize)) {
//        totalPage = parseInt(num / pageSize) + 1;
//    } else {
//        totalPage = parseInt(num / pageSize);
//    }
//    var currentPage = pno;//当前页数
//    currentPage_ = currentPage;
//    var startRow = (currentPage - 1) * pageSize + 1;
//    var endRow = currentPage * pageSize;
//    endRow = (endRow > num) ? num : endRow;
//    //遍历显示数据实现分页
//    /*for(var i=1;i<(num+1);i++){
//        var irow = itable.rows[i-1];
//        if(i>=startRow && i<=endRow){
//            irow.style.display = "";
//        }else{
//            irow.style.display = "none";
//        }
//    }*/
//
//    $("#tbody_userprofilefarm tr").hide();
//    for (var i = startRow - 1; i < endRow; i++) {
//        $("#tbody_userprofilefarm tr").eq(i).show();
//    }
//    var tempStr = "共" + num + "条记录 分" + totalPage + "页 当前第" + currentPage + "页";
//    document.getElementById("barcon1").innerHTML = tempStr;
//
//    if (currentPage > 1) {
//        $("#firstPage").on("click", function () {
//            goPage(1, psize);
//        }).removeClass("ban");
//        $("#prePage").on("click", function () {
//            goPage(currentPage - 1, psize);
//        }).removeClass("ban");
//    } else {
//        $("#firstPage").off("click").addClass("ban");
//        $("#prePage").off("click").addClass("ban");
//    }
//
//    if (currentPage < totalPage) {
//        $("#nextPage").on("click", function () {
//            goPage(currentPage + 1, psize);
//        }).removeClass("ban")
//        $("#lastPage").on("click", function () {
//            goPage(totalPage, psize);
//        }).removeClass("ban")
//    } else {
//        $("#nextPage").off("click").addClass("ban");
//        $("#lastPage").off("click").addClass("ban");
//    }
//
//    $("#jumpWhere").val(currentPage);
//}
//
//
//function jumpPage() {
//    var num = parseInt($("#jumpWhere").val());
//    if (num != currentPage_) {
//        goPage(num, pageSize);
//    }
//}

function objToArray(array) {
    var arr = []
    for (var i in array) {
        arr.push(array[i]); 
    }
    console.log(arr);
    return arr;
}

function gopage(e){
	$.ajax({
	    url: e.href,
	    type: "POST",
	    success: function (data) {
	        if (data == "failed") {
	            window.location.href = "/login.jsp";
	            return;
	        } else {
	            data = eval("(" + data + ")");

	            $("#tbody_userprofilefarm").empty();
	            //document.getElementById("barcon").innerHTML = pagecode;

	            $(".pagination").empty();
	            
	            var html = "";
	            var firstrealtime = "";
	            var lastrealtime = "";
	            var nextrealtime = "";

	            data.data8 = objToArray(data.data8);
	            for (var i = 0; i < data.data8.length; i++) {
	                //修正信息
	                //var datenow = new Date();//获取系统当前时间
	                var timestampnow = Date.parse(new Date()) / 1000;
	                //上次投药时间  20180323155000
	                var lastmedtime_1 = data.data8[i].lastmed;
	                var firstmedtime_1 = data.data8[i].firstmedtime;
	                var nextmedtime_1 = data.data8[i].nextmed;

	                var medcycle = data.data8[i].exhibitcycle * 1440 * 60;
	                var lastmedtime_2 = lastmedtime_1.substring(0, 4) + "/" + lastmedtime_1.substring(4, 6) + "/" + lastmedtime_1.substring(6, 8) + " " + lastmedtime_1.substring(8, 10) + ":" + lastmedtime_1.substring(10, 12) + ":" + lastmedtime_1.substring(12, 14);
	                var firstmedtime_2 = firstmedtime_1.substring(0, 4) + "/" + firstmedtime_1.substring(4, 6) + "/" + firstmedtime_1.substring(6, 8) + " " + firstmedtime_1.substring(8, 10) + ":" + firstmedtime_1.substring(10, 12) + ":" + firstmedtime_1.substring(12, 14);
	                //var nextmedtime_2 = nextmedtime_1.substring(0, 4) + "/" + nextmedtime_1.substring(4, 6) + "/" + nextmedtime_1.substring(6, 8) + " " + nextmedtime_1.substring(8, 10) + ":" + nextmedtime_1.substring(10, 12) + ":" + nextmedtime_1.substring(12, 14);

	                var lastmedtimestamp = new Date(lastmedtime_2).getTime() / 1000;
	                var firstmedtimestamp = new Date(firstmedtime_2).getTime() / 1000;

	                var lastmedtimeres = ChangeTimeFormat(lastmedtime_1).split(" ")[0];
	                var firstrealtime = ChangeTimeFormat(firstmedtime_1).split(" ")[0];
	                var nextmedtimeres = firstrealtime;
	                if (firstmedtimestamp < timestampnow) {
	                    var forgetmedtimes = Math.floor((timestampnow - lastmedtimestamp) / medcycle);
	                    var lastmedtimeres_ = lastmedtimestamp + forgetmedtimes * medcycle;
	                    var nextmedtimeres_ = lastmedtimeres_ + medcycle;
	                    var d = new Date(lastmedtimeres_ * 1000);
	                    var n = new Date(lastmedtimeres_ * 1000);
	                    var year = d.getFullYear();
	                    var month = d.getMonth() + 1;
	                    var day = d.getDate();
	                    var hour = d.getHours();
	                    var min = d.getMinutes();
	                    var sec = d.getSeconds();
	                    if ((month + '').length < 2) {
	                        month = "0" + month;
	                    }
	                    if ((day + '').length < 2) {
	                        day = "0" + day;
	                    }
	                    lastmedtimeres = year + "-" + month + "-" + day;

	                    var year2 = n.getFullYear();
	                    var month2 = n.getMonth() + 1;
	                    var day2 = n.getDate();
	                    var hour2 = n.getHours();
	                    var min2 = n.getMinutes();
	                    var sec2 = n.getSeconds();
	                    if ((month2 + '').length < 2) {
	                        month2 = "0" + month2;
	                    }
	                    if ((day2 + '').length < 2) {
	                        day2 = "0" + day2;
	                    }
	                    nextmedtimeres = year2 + "-" + month2 + "-" + day2;

	                    firstrealtime = ChangeTimeFormat(data.data8[i].firstmedtime).split(" ")[0];
	                }

	                //lastrealtime = ChangeTimeFormat(data.data2[i].lastmed).split(" ")[0];
	                //nextrealtime = ChangeTimeFormat(data.data2[i].nextmed).split(" ")[0];
	                lastrealtime = lastmedtimeres;
	                nextrealtime = nextmedtimeres;
	                if(data.data8[i].neckletid != null){
	                	html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data8[i].dogid + "\">" + data.data8[i].neckletid + "</a></td><td>" + data.data8[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data8[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
	                }else{
	                	html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data8[i].dogid + "\">" + data.data8[i].feederid + "</a></td><td>" + data.data8[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data8[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
	                }
	            }
//	            for (var i = 0; i < data.data5.length; i++) {
//	                firstrealtime = ChangeTimeFormat(data.data5[i].firstmedtime).split(" ")[0];
//	                lastrealtime = ChangeTimeFormat(data.data5[i].lastmed).split(" ")[0];
//	                nextrealtime = ChangeTimeFormat(data.data5[i].nextmed).split(" ")[0];
//	                html += "<tr><td><a class=\"neckletid\" style=\"cursor:pointer;\" id=\"" + data.data5[i].dogid + "\">" + data.data5[i].feederid + "</a></td><td>" + data.data5[i].dogname + "</td><td>" + firstrealtime + "</td><td>" + lastrealtime + "</td><td>" + data.data5[i].timemed + "</td><td>" + nextrealtime + "</td></tr>";
//	            }
	            $("#tbody_userprofilefarm").append(html);
	            //document.getElementById("barcon").innerHTML = pagecode;

	            $(".pagination").append(data.pageCode);
	        }
	    }
	})

	            
}
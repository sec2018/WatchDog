$(function(){
           /* $("#h3_logtitle").html(data.data4.villagename);*/

            $("#td_areadognumtotal").html("全乡总数");
            $("#td_areamednumtotal").html("全乡总数");

            //$("#tr_epidemicprovice").css("display", "none");
            //$("#tr_epidemiccity").css("display", "none");
            //$("#tr_epidemiccounty").css("display", "none");
            //$("#tr_epidemicvillage").css("display", "none");
            $("#hamletepidemictotal").text(data.data2.hamletepidemictotal);

            //$("#tr_admincountry").css("display", "none");
            //$("#tr_adminprovince").css("display", "none");
            //$("#tr_admincity").css("display", "none");
            //$("#tr_admincounty").css("display", "none");
            $("#villageadmintotal").text(data.data2.villageadmintotal);
            $("#hamletadmintotal").text(data.data2.hamletadmintotal);

            $("#neckdognumtotal").text(data.data2.neckdognumtotal);
            $("#countryalldognumtotal").text(data.data2.alldognumtotal);
            $("#villagewsqdognumtotal").text(data.data2.feedernumtotal);
            $("#countryratedognumtotal").text(((data.data2.neckdognumtotal + data.data2.feedernumtotal) * 100 / data.data2.alldognumtotal).toFixed(6));
            $("#countrymednumtotal").text(data.data2.countrymednumtotal);

            GetVillageEcharts(data);

            //$("#tr_admin").click(function () {
            //    window.location.href = "SearchManager.html?districtcode=" + escape(data.data4.districtcode);
            //});

            if (data.data1.privilegelevel == 1 || data.data1.privilegelevel == 0) {
                $("#span_leftscan").html("全国总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=5";
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
                $("#span_leftscan").html(data.data1.province + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=5";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 3) {
                $("#span_leftscan").html(data.data1.city + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=5";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 4) {
                $("#span_leftscan").html(data.data1.county + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=5";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 5) {
                $("#span_leftscan").html(data.data1.village + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=5";
                });
                $("#a_areasee").click(function () {
                    window.location.href = "#";
                });
                $("#goback").css("display", "none");
            }
})


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

    $("#pagereflash").click(function () {
        window.location.reload();
    });
});

var district, map = null;

function GetVillageEcharts(data) {
	var villageGov = "" + data.data4.villageGov;
	var villageEchartsAreaName="" + data.data4.villageEchartsAreaName;
	var countyGov = "" + data.data4.countyGov;
	var countyEchartsAreaName="" + data.data4.countyEchartsAreaName;
	var cityGov = "" + data.data4.cityGov;
	var cityEchartsAreaName="" + data.data4.cityEchartsAreaName;
	var provinceGov = "" + data.data4.provinceGov;
    var provinceEchartsAreaName="" + data.data4.provinceEchartsAreaName;
    //=========================================//

    district, map = new AMap.Map("statsChart", {
        resizeEnable: true,
        //center: [116.40, 39.91],//地图中心点
        //zoom: 10 //地图显示的缩放级别
    });



    //var _onZoomEnd = function (e) {
    //    if (map.getZoom() < 11) {
    //        //for (var i = 0; i < markers.length; i += 1) {
    //        //    mapObj.remove(markers[i].subMarkers)
    //        //}
    //        //alert("zoomed");
    //        //alert("zoomed out");
    //        for (var i = 0; i < markers.length; i++) {

    //            //map.remove(markers[i].label);
    //            markers[i].setLabel({
    //                //label默认蓝框白底左上角显示，样式className为：amap-marker-label
    //                offset: new AMap.Pixel(4, 16),//修改label相对于maker的位置
    //                content: ""
    //            });
    //        }
    //    } else {
    //        //alert("zoomed in");
    //        for (var i = 0; i < markers.length; i++) {

    //            //map.remove(markers[i].label);
    //            markers[i].setLabel({
    //                //label默认蓝框白底左上角显示，样式className为：amap-marker-label
    //                offset: new AMap.Pixel(4, 16),//修改label相对于maker的位置
    //                content: p_titles[i]

    //            });
    //        }

    //    }
    //}
    //AMap.event.addListener(map, 'zoomend', _onZoomEnd);


    AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {


        var zoomCtrl2 = new BasicControl.Zoom({
            position: 'br',
            showZoomNum: true
        });

        //map.addControl(zoomCtrl1);

        map.addControl(zoomCtrl2);
    });


    //============添加点标记=============================//

    // 实例化点标记
    function addMarker(point, title, content, icondir) {
        marker = new AMap.Marker({

            icon: icondir,
            position: point,

        });

        marker.content = title + "<br>" + content;

        marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(4, 27),//修改label相对于maker的位置
            content: title
        });

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

    var p_Xs = [];
    var p_Ys = [];
    var p_titles = [];
    var p_managernums = [];
    var p_dognums = [];
    var p_neckletnums = [];
    var p_mednums = [];
    var p_feedernums = [];

    $("#h3_logtitle").html(villageGov);
    $.each(data.data3, function (i, n) {
        //alert("进入data");
        //alert(n["lng"]);
        p_Xs[i] = n["lng"];
        //p_Xs[i] = data.data3[n].Lng;
        //alert("X=" + p_Xs[i]);
        p_Ys[i] = n["lat"];
        //p_Ys[i] = data.data3[n].Lat;


        p_titles[i] = n["harmletname"];
        p_managernums[i] = n["managernum"];
        //p_figs[i] = n["fig"];
        p_dognums[i] = n["dognum"];
        p_neckletnums[i] = n["neckletnum"];
        p_mednums[i] = n["mednum"];
        //p_admins[i] = n["admin"];

        p_feedernums[i] = 0;

        //var one_title = p_titles[i];

        //var one_title = "<a href=\"page_farm.html?farm=" + p_titles[i] + "\"><h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + p_titles[i] + "</h4></a>"
        var one_title = null;
        var one_icondir = null;
        if (p_neckletnums[i] > 0) {
            one_title = "<a href=\"../hamlet/hamlet.do?hamlet=" + p_titles[i] + "&village=" + villageEchartsAreaName + "&county=" + countyEchartsAreaName + "&city=" + cityEchartsAreaName + "&province=" + provinceEchartsAreaName + "\"><font color='blue'>"
            + p_titles[i] + "</font></a>";
            one_icondir = "../img/village.png";
            p_titles[i] = one_title;
        } else {
            one_title = "<font color='#C0C0C0'>" + p_titles[i] + "</font>";
            one_icondir = "../img/no.png";
            p_titles[i] = one_title;
        }

        var percentage = (p_neckletnums[i] / p_dognums[i]).toFixed(2);

        if (isNaN(percentage)) {
            percentage = 0.0;
        }

        var one_content = "<div>" +
            "<table><tr><th>管理员人数：</th><th>" + p_managernums[i] + "</th></tr>" +
            "<tr><th>牧犬数量：</th><th>" + p_dognums[i] + "</th></tr>" +
            "<tr><th>项圈数量：</th><th>" + p_neckletnums[i] + "</th></tr>" +
            "<tr><th>喂饲器数量：</th><th>" + p_feedernums[i] + "</th></tr>" +
            "<tr><th>总投药次数：</th><th>" + p_mednums[i] + "</th></tr>" +
            "<tr><th>项圈犬占比：</th><th>" + percentage  + "</th></tr>" +
            //"<tr><th>管理员：</th><th>" + p_admins[i] + "</th></tr>" +
        "</table>" +
        "</div>";



        markers.push(addMarker([p_Xs[i], p_Ys[i]], one_title, one_content, one_icondir));

    });
    map.setFitView();//地图自适应

}
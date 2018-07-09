var senddata = {};
senddata.dogid = dogid;
senddata.username = username;
senddata.clicktype = "pagedog6";
var deviceId = "";
$.ajax({
    url: "/api/pagedogapi",
    type: "POST",
    data: senddata,
    success: function (data) {
        if (data == "failed") {
            window.location.href = "/Login/SignIn";
            return;
        } else {
            data = eval("(" + data + ")");

            if (data.data6[0].privilegelevel == 1 || data.data6[0].privilegelevel == 2 || data.data6[0].privilegelevel == 3 || data.data6[0].privilegelevel == 4 || data.data6[0].privilegelevel == 5 || username != dogmanager) {
                $("#a_dogmodify").css("display", "none");
                $("#a_neckletmodify").css("display", "none");
                $("#a_ownermodify").css("display", "none");
                $("#a_feedermodify").css("display", "none");
                switch (data.data6[0].privilegelevel) {
                    case 1:
                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                        });
                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        });
                        //$("#goback").click(function () {
                        //    window.location.href = history.go(-1);
                        //    return false;
                        //});
                        break;
                    case 2:
                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                        });
                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        });
                        //$("#goback").click(function () {
                        //    window.location.href = history.go(-1);
                        //    return false;
                        //});
                        break;
                    case 3:
                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                        });
                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        });
                        //$("#goback").click(function () {
                        //    window.location.href = history.go(-1);
                        //    return false;
                        //});
                        break;
                    case 4:
                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                        });
                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        });
                        //$("#goback").click(function () {
                        //    window.location.href = history.go(-1);
                        //    return false;
                        //});
                        break;
                    case 5:
                        $("#li_countrysee").click(function () {
                            window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                        });
                        $("#a_managepage").click(function () {
                            window.location.href = "/PageManageCommon/Manage";
                        });
                        //$("#goback").click(function () {
                        //    window.location.href = history.go(-1);
                        //    return false;
                        //});
                        break;
                }

            } else {
                //$("#li_countrysee").css("display", "none");
                $("#li_countrysee").click(function () {
                    window.location.href = "/Index?UserName=" + username + "&Ticket=" + Ticket;
                });
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/Manage";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            }

            var modalselect_dogbelonghamlet = document.getElementById("modalselect_dogbelonghamlet");
            for (var i = 0; i < data.data4.length; i++) {
                //遍历后台传回的结果，一项项往select中添加option
                modalselect_dogbelonghamlet.options.add(new Option(data.data4[i].districtname, data.data4[i].districtcode));
            }
            var modalselect_dogownername = document.getElementById("modalselect_dogownername");
            for (var i = 0; i < data.data5.length; i++) {
                //遍历后台传回的结果，一项项往select中添加option
                modalselect_dogownername.options.add(new Option(data.data5[i].ownername, data.data5[i].ownerid));
            }
            var modalselect_dogneckletid = document.getElementById("modalselect_dogneckletid");
            if (data.data1[0].neckletid != "") {
                modalselect_dogneckletid.options.add(new Option(data.data1[0].neckletid, data.data1[0].necid));
            }
            for (var i = 0; i < data.data7.length; i++) {
                //遍历后台传回的结果，一项项往select中添加option
                modalselect_dogneckletid.options.add(new Option(data.data7[i].neckletid, data.data7[i].necid));
            }

            var modalselect_feederid = document.getElementById("modalselect_dogfeederid");
            if (data.data1[0].feederid != "") {
                //$("modalselect_dogfeederid").find("option").remove();
                modalselect_feederid.options.add(new Option(data.data1[0].feederid, data.data1[0].fid));
            }
            for (var i = 0; i < data.data8.length; i++) {
                //遍历后台传回的结果，一项项往select中添加option
                modalselect_feederid.options.add(new Option(data.data8[i].feederid, data.data8[i].fid));
            }

            //牧犬信息
            $("#input_dogname").val(data.data1[0].dogname);
            $("#input_dogsex").val(data.data1[0].dogsex);
            $("#input_dogbelonghamlet").val(data.data1[0].belonghamlet);
            $("#input_dogownername").val(data.data1[0].ownername);
            $("#input_dogweight").val(data.data1[0].dogweight);
            $("#input_dogcolor").val(data.data1[0].dogcolor);
            $("#input_dogage").val(data.data1[0].dogage);
            $("#input_adminname").val(data.data1[0].adminname);
            $("#input_adminphone").append("<a href=\"tel:" + data.data1[0].adminphone + "\">" + data.data1[0].adminphone + "</a>");
            if (data.data1[0].feederid != "" && data.data1[0].feederid != "----") {
                deviceId = data.data1[0].feederid;
                $("#a_neckletmodify").css("display", "none");
                $("#label_id").text("喂饲器编号");
                $("#input_dogneckletid").val("----");
                $("#input_dogfeederid").val(data.data1[0].feederid);
                $("#input_neckletid").val(data.data9[0].feederid);
                $("#input_power").val((data.data9[0].powerleft)*100+"%");
                $("#input_medtotal").val(data.data9[0].medtotal);
                $("#input_medleft").val(data.data9[0].medleft);
                $("#input_endmedtime").val(ChangeTimeFormat(data.data9[0].endmedtime));
                $("#input_areacycle").val(data.data9[0].areacycle);
                $("#input_exhibitcycle").val(data.data9[0].exhibitcycle);
                $("#input_firstmedtime").val(ChangeTimeFormat(data.data9[0].firstmedtime));
                $("#input_lastmedtime").val(ChangeTimeFormat(data.data9[0].lastmedtime));
                $("#input_lastremindmedtime").val(ChangeTimeFormat(data.data9[0].lastremindmedtime));
            } else {
                deviceId = "";
                $("#a_feedermodify").css("display", "none");
                $("#a_seevideo").css("display", "none");
                $("#label_id").text("项圈编号");
                $("#input_dogneckletid").val(data.data1[0].neckletid);
                $("#input_dogfeederid").val("----");
                //项圈信息


                //先修正信息
                //var datenow = new Date();//获取系统当前时间
                var timestampnow = Date.parse(new Date()) / 1000;
                //上次投药时间  20180323155000
                var lastmedtime_1 = data.data2[0].lastmedtime;
                var firstmedtime_1 = data.data2[0].firstmedtime;
                var medcycle = data.data2[0].exhibitcycle *1440 * 60;
                var lastmedtime_2 = lastmedtime_1.substring(0, 4) + "/" + lastmedtime_1.substring(4, 6) + "/" + lastmedtime_1.substring(6, 8) + " " + lastmedtime_1.substring(8, 10) + ":" + lastmedtime_1.substring(10, 12) + ":" + lastmedtime_1.substring(12, 14);
                var firstmedtime_2 = firstmedtime_1.substring(0, 4) + "/" + firstmedtime_1.substring(4, 6) + "/" + firstmedtime_1.substring(6, 8) + " " + firstmedtime_1.substring(8, 10) + ":" + firstmedtime_1.substring(10, 12) + ":" + firstmedtime_1.substring(12, 14);
                var lastmedtimestamp = new Date(lastmedtime_2).getTime()/1000;
                var firstmedtimestamp = new Date(firstmedtime_2).getTime() / 1000;

                var lastmedtimeres = ChangeTimeFormat(lastmedtime_1);
                var medleft = data.data2[0].medleft;
                if (firstmedtimestamp < timestampnow) {
                    var forgetmedtimes = Math.floor((timestampnow - lastmedtimestamp) / medcycle);
                    var lastmedtimeres_ = lastmedtimestamp + forgetmedtimes * medcycle;
                    var d = new Date(lastmedtimeres_ * 1000);
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
                    if ((hour + '').length < 2) {
                        hour = "0" + hour;
                    }
                    if ((min + '').length < 2) {
                        min = "0" + min;
                    }
                    if ((sec + '').length < 2) {
                        sec = "0" + sec;
                    }
                    lastmedtimeres = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
                    if (medleft - forgetmedtimes <= 0) {
                        medleft = 0;
                    } else {
                        medleft = medleft - forgetmedtimes;
                    }
                }

                $("#input_neckletid").val(data.data2[0].neckletid);
                $("#input_power").val(((data.data2[0].powerleft)/6).toFixed(2)*100+"%");
                $("#input_medtotal").val(data.data2[0].medtotal);
                $("#input_medleft").val(medleft);
                $("#input_endmedtime").val(ChangeTimeFormat(data.data2[0].endmedtime));
                $("#input_areacycle").val(data.data2[0].areacycle);
                $("#input_exhibitcycle").val(data.data2[0].exhibitcycle);
                $("#input_firstmedtime").val(ChangeTimeFormat(data.data2[0].firstmedtime));
                //$("#input_lastmedtime").val(ChangeTimeFormat(data.data2[0].lastmedtime));
                //$("#input_lastremindmedtime").val(ChangeTimeFormat(data.data2[0].lastremindmedtime));
                $("#input_lastmedtime").val(lastmedtimeres);
                $("#input_lastremindmedtime").val(lastmedtimeres);
            }

            //修改牧犬信息
            $("#modalinput_dogid").val(data.data1[0].dogid);
            $("#modalinput_dogname").val(data.data1[0].dogname);

            $("#modalselect_dogsex").find("option:contains(" + data.data1[0].dogsex + ")").attr("selected", true);
            $("#modalselect_dogbelonghamlet").find("option:contains(" + data.data1[0].belonghamlet + ")").attr("selected", true);
            $("#modalselect_dogownername").find("option:contains(" + data.data1[0].ownername + ")").attr("selected", true);

            $("#modalinput_dogweight").val(data.data1[0].dogweight);
            $("#modalinput_dogcolor").val(data.data1[0].dogcolor);
            $("#modalinput_dogage").val(data.data1[0].dogage);
            //$("#modalinput_dogneckletid").val(data.data1[0].neckletid);
            if (data.data1[0].neckletid != "") {
                $("#modalselect_dogneckletid").find("option:contains(" + data.data1[0].neckletid + ")").attr("selected", true);
            }
            if (data.data1[0].feederid != "") {
                $("#modalselect_dogfeederid").find("option:contains(" + data.data1[0].feederid + ")").attr("selected", true);
            }

            //修改项圈信息
            $("#modalinput_neckletid").val(data.data2[0].neckletid);
            $("#modalinput_power").val(((data.data2[0].powerleft)/6).toFixed(2));
            $("#modalinput_medtotal").val(data.data2[0].medtotal);
            $("#modalinput_medleft").val(data.data2[0].medleft);
            $("#modalinput_areacycle").val(data.data2[0].areacycle);
            $("#modalinput_exhibitcycle").val(data.data2[0].exhibitcycle);
            $("#modalinput_firstmedtime").val(ChangeTimeFormat(data.data2[0].firstmedtime));


            //修改喂食器信息
            $("#modalinput_feederid").val(data.data9[0].feederid);
            $("#modalinput_feederpower").val(data.data9[0].powerleft);
            $("#modalinput_feedermedtotal").val(data.data9[0].medtotal);
            $("#modalinput_feedermedleft").val(data.data9[0].medleft);
            $("#modalinput_feederareacycle").val(data.data9[0].areacycle);
            $("#modalinput_feederexhibitcycle").val(data.data9[0].exhibitcycle);
            $("#modalinput_feederfirstmedtime").val(ChangeTimeFormat(data.data9[0].firstmedtime));

            //主人信息
            $("#input_ownername").val(data.data3[0].ownername);
            $("#input_owneridentity").val(data.data3[0].owneridentity);
            $("#input_ownersex").val(data.data3[0].ownersex);
            $("#input_ownerage").val(data.data3[0].ownerage);
            $("#input_ownerjob").val(data.data3[0].ownerjob);
            $("#input_homeaddress").val(data.data3[0].homeaddress);
            //$("#input_telphone").val(data.data3[0].telphone);
            $("#input_telphone").append("<a href=\"tel:" + data.data3[0].telphone + "\">" + data.data3[0].telphone + "</a>");

            //修改主人信息
            $("#modalinput_ownerid").val(data.data3[0].ownerid);
            $("#modalinput_ownername").val(data.data3[0].ownername);
            $("#modalinput_owneridentity").val(data.data3[0].owneridentity);

            $("#modalselect_ownersex").find("option:contains(" + data.data3[0].ownersex + ")").attr("selected", true);

            $("#modalinput_ownerage").val(data.data3[0].ownerage);
            $("#modalinput_ownerjob").val(data.data3[0].ownerjob);
            $("#modalinput_homeaddress").val(data.data3[0].homeaddress);
            $("#modalinput_telphone").val(data.data3[0].telphone);


            var data8 = [];
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            var obj4 = {};
            obj1.feederid = "F0001";
            obj1.videoname = "本地标准mp4_01";
            obj1.videotime = "20171220131952";
            obj2.feederid = "F0002";
            obj2.videoname = "本地标准mp4_02";
            obj2.videotime = "20171221142312";
            obj3.feederid = "F0003";
            obj3.videoname = "下载深圳mp4至本地";
            obj3.videotime = "20171221142320";
            obj4.feederid = "F0004";
            obj4.videoname = "深圳mp4转为标准mp4";
            obj4.videotime = "20171221142340";
            data8[0] = obj1;
            data8[1] = obj2;
            data8[2] = obj3;
            data8[3] = obj4;
            var html1 = "";
            var videotime = "";

            for (var i = 0; i < data8.length; i++) {
                //videotime = ChangeTimeFormat(data8[i].videotime).split(" ")[0];
                videotime = ChangeTimeFormat(data8[i].videotime).split(":")[0] + "时";
                // html += "<tr><td>" + data8[i].feederid + "</td><td>" + data8[i].videoname + "</td><td>" + videotime + "</td><td><input class=\"checkgroup\" name=\"checkgroup\" type=\"checkbox\"  value=\"" + data8[i].videoname + "\"></input></td></tr>";
                html1 += '<div class="row mbottom" data-videoname="' + data8[i].videoname + '"><div class="col-xs-3 col-md-3 nopadding">' + data8[i].feederid + '</div>' +
                  '<div class="col-xs-4 col-md-3 nopadding">' + data8[i].videoname + '</div>' +
                  '<div class="col-xs-3 col-md-3 nopadding">' + videotime + '</div>' +
                  '<div class="col-xs-2 col-md-3 nopadding"><div class="videocom"></div></div></div>'
            }
            $("#tbody_videolist").append(html1);
            $('#tbody_videolist .videocom').unbind('click').click(function () {
                $('#tbody_videolist').find('.videocom').removeClass('videochiosed');
                $(this).addClass('videochiosed');
                videoParentIndex = $(this).parents('.row').index();
                console.log(videoParentIndex)
            })


            var vediolist = [];
            if (deviceId != "") {
                $.ajax({
                    url: timestamp("https://www.xtell.cn/projects/25_auto_feeder/getDeviceVideo.php?deviceId=" + deviceId),
                    type: "GET",
                    success: function (resulttemp) {
                        if (resulttemp == "" || resulttemp == null) {
                            //alert("远端视频列表传输中断！");
                            return;
                        } else {
                            vediolist = resulttemp.data;
                            var html2 = "";
                            for (var i = 0; i < vediolist.length; i++) {
                                //videotime = vediolist[i].Timestamp.split(" ")[0];
                                videotime = vediolist[i].Timestamp.split(":")[0]+"时";
                                filename = vediolist[i].FileName;
                                html2 += '<div class="row mbottom" data-videoname="' + vediolist[i].url + '"><div class="col-xs-3 col-md-3 nopadding">' + vediolist[i].DeviceId + '</div>' +
                                  '<div class="col-xs-4 col-md-3 nopadding">' + filename + '</div>' +
                                  '<div class="col-xs-3 col-md-3 nopadding">' + videotime + '</div>' +
                                  '<div class="col-xs-2 col-md-3 nopadding"><div class="videocom"></div></div></div>'
                            }
                            $("#tbody_videolist").append(html2);
                            $('#tbody_videolist .videocom').unbind('click').click(function () {
                                $('#tbody_videolist').find('.videocom').removeClass('videochiosed');
                                $(this).addClass('videochiosed');
                                videoParentIndex = $(this).parents('.row').index();
                                console.log(videoParentIndex)
                            })
                        }
                    }
                })
            }

            //$.ajax({
            //    url: timestamp("/api/videofromresapi?deviceId=" + deviceId),
            //    type: "POST",
            //    success: function (resulttemp) {
            //        if (resulttemp == "" || resulttemp == null) {
            //            //alert("远端视频列表传输中断！");
            //            return;
            //        } else {
            //            vediolist = eval("(" + resulttemp + ")");

            //            for (var i = 0; i < vediolist.length; i++) {
            //                html += '<div class="row mbottom" data-videoname="' + "/Views/res/" + vediolist[i].filename + '"><div class="col-xs-4 col-md-3 nopadding">' + deviceId + '</div>' +
            //                  '<div class="col-xs-3 col-md-3 nopadding">' + vediolist[i].filename.split('+')[1] + '</div>' +
            //                  '<div class="col-xs-3 col-md-3 nopadding">' + vediolist[i].filename.split('+')[2].split('.')[0] + '</div>' +
            //                  '<div class="col-xs-2 col-md-3 nopadding"><div class="videocom"></div></div></div>'
            //            }
            //            $("#tbody_videolist").append(html);
            //            $('#tbody_videolist .videocom').unbind('click').click(function () {
            //                $('#tbody_videolist').find('.videocom').removeClass('videochiosed');
            //                $(this).addClass('videochiosed');
            //                videoParentIndex = $(this).parents('.row').index();
            //                console.log(videoParentIndex)
            //            })
            //        }
            //    }
            //})
        }
    }
})
//}
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
function ChangeTimeFormat(logintime) {
    //	20170926084552 ---> 2017.09.26 08:45:52
    var year = logintime.substring(0, 4);
    var month = logintime.substring(4, 6);
    var day = logintime.substring(6, 8);
    var hour = logintime.substring(8, 10);
    var min = logintime.substring(10, 12);
    var sec = logintime.substring(12);
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
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

$(function () {
    $("#modal_neckletmodify").click(function () {
        var clicktype = "neckletmodify";
        var neckletid = $("#modalinput_neckletid").val();
        var power = ($("#modalinput_power").val()*6).toFixed(2);
        var medtotal = $("#modalinput_medtotal").val();
        var medleft = $("#modalinput_medleft").val();
        var areacycle = $("#modalinput_areacycle").val();
        var exhibitcycle = $("#modalinput_exhibitcycle").val();
        var firstmedtime = $("#modalinput_firstmedtime").val();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.neckletid = neckletid;
        senddata.power = power;
        senddata.medtotal = medtotal;
        senddata.medleft = medleft;
        senddata.areacycle = areacycle;
        senddata.exhibitcycle = exhibitcycle;
        senddata.firstmedtime =  firstmedtime;
        if (isNaN(areacycle) || isNaN(areacycle)) {
            alert("反馈周期和投药周期为数字！单位（天）");
            return;
        }
        if (isNaN(exhibitcycle) || isNaN(exhibitcycle)) {
            alert("反馈周期和投药周期为数字！单位（天）");
            return;
        }
        var dateReg = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!firstmedtime.match(dateReg)) {
            alert("投药时间的格式为：yyyy-MM-dd HH:mm:ss");
            return;
        }
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

    $("#modal_feedermodify").click(function () {
        var clicktype = "feedermodify";
        var feederid = $("#modalinput_feederid").val();
        var power = $("#modalinput_feederpower").val();
        var medtotal = $("#modalinput_feedermedtotal").val();
        var medleft = $("#modalinput_feedermedleft").val();
        var areacycle = $("#modalinput_feederareacycle").val();
        var exhibitcycle = $("#modalinput_feederexhibitcycle").val();
        var firstmedtime = $("#modalinput_feederfirstmedtime").val();

        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.feederid = feederid;
        senddata.power = power;
        senddata.medtotal = medtotal;
        senddata.medleft = medleft;
        senddata.areacycle = areacycle;
        sneddata.exhibitcycle = exhibitcycle;
        senddata.firstmedtime = firstmedtime;
        if (isNaN(areacycle) || isNaN(areacycle)) {
            alert("反馈周期和投药周期为数字！单位（天）");
            return;
        }
        if (isNaN(exhibitcycle) || isNaN(exhibitcycle)) {
            alert("反馈周期和投药周期为数字！单位（天）");
            return;
        }
        var dateReg = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!firstmedtime.match(dateReg)) {
            alert("投药时间的格式为：yyyy-MM-dd HH:mm:ss");
            return;
        }
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

    $("#modal_ownermodify").click(function () {
        var clicktype = "ownermodify";
        var ownerid = $("#modalinput_ownerid").val();
        var ownername = $("#modalinput_ownername").val();
        var owneridentity = $("#modalinput_owneridentity").val();
        var ownersex = $("#modalselect_ownersex").find("option:selected").text();
        var ownerage = $("#modalinput_ownerage").val();
        var ownerjob = $("#modalinput_ownerjob").val();
        var homeaddress = $("#modalinput_homeaddress").val();
        var telphone = $("#modalinput_telphone").val();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.ownerid = ownerid;
        senddata.ownername = ownername;
        senddata.owneridentity = owneridentity;
        senddata.ownersex = ownersex;
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

    $("#modal_dogmodify").click(function () {
        var clicktype = "dogmodify";
        var dogid = $("#modalinput_dogid").val();
        var dogname = $("#modalinput_dogname").val();
        var dogsex = $("#modalselect_dogsex").find("option:selected").text();
        var dogbelonghamlet = $("#modalselect_dogbelonghamlet").find("option:selected").text();
        var districtcode = $("#modalselect_dogbelonghamlet").find("option:selected").val();
        var dogownerid = $("#modalselect_dogownername").val();
        var dogweight = $("#modalinput_dogweight").val();
        var dogcolor = $("#modalinput_dogcolor").val();
        var dogage = $("#modalinput_dogage").val();
        //var dogneckletid = $("#modalinput_dogneckletid").val();
        var dogneckletid = $("#modalselect_dogneckletid").find("option:selected").text();
        var dogfeederid = $("#modalselect_dogfeederid").find("option:selected").text();
        var senddata = {};
        senddata.clicktype = clicktype;
        senddata.username = username;
        senddata.dogid = dogid;
        senddata.dogname = dogname;
        senddata.dogsex = dogsex;
        senddata.dogbelonghamlet = dogbelonghamlet;
        senddata.districtcode = districtcode;
        senddata.dogownerid = dogownerid;
        senddata.dogweight = dogweight;
        senddata.dogcolor = dogcolor;
        senddata.dogage = dogage;
        senddata.dogneckletid = dogneckletid;
        senddata.dogfeederid = dogfeederid;
        if (dogneckletid != "" && dogfeederid!="") {
            alert("您不能同时绑定项圈和喂饲器！");
            return;
        }
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

    $("#modal_seevideo").click(function () {

        var count = 0;
        var names = "";
        //$.each($('#tbody_videolist tr td input:checkbox'), function () {
        //    if (this.checked) {
        //        count++;
        //        names += $(this).val() + ",";
        //        //alert("你选了：" + $('#tbody_pagemanagecommon tr td input[type=checkbox]:checked').length + "个，其中有：" + $(this).val());
        //    }
        //});
        //names = names.slice(0, names.length - 1);
        //name = names.split(",")[0];
        //alert("你选了：" + name);
        //window.location.href = "SeeVideo.html?name="+escape(name);



        name = $("#tbody_videolist .row").eq(videoParentIndex).attr('data-videoname');
        alert("视频地址为：" + name);
        //window.location.href = "SeeVideo.html?name=" + escape(name);
        if (name != "本地标准mp4_01" && name != "本地标准mp4_02" && name != "下载深圳mp4至本地" && name != "深圳mp4转为标准mp4") {
            //name = escape(name).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
            //document.getElementById("video").src = "/UI/res/XTELL_3+1515687378+2018-01-12.mp4";
            document.getElementById("video").src = name;
        } else {
            document.getElementById("video").src = "/Views/res/" + name + ".mp4";
        }

        var audio = document.getElementById('video');   //获取视频节点如果用jq选择器，则控制会报错
        var $videoModal = $('#SeeVideoDiv');  //模态框id
        //bt modal的事件钩子
        $videoModal.on('show.bs.modal',function () {
            audio.play();
        });
        $videoModal.on('hide.bs.modal',function () {
            audio.pause();
        })
        


    });

    $("#close_video").click(function (event) {
        document.getElementById("video").pause();
        document.getElementById("a_seevideo").click();
    });


    $("#modal_downloadvideo").click(function () {
        //var form = $("<form>");//定义一个form表单
        //form.attr("style", "display:none");
        //form.attr("target", "");
        //form.attr("method", "post");
        //form.attr("action", "/Controllers/VideoLoad.ashx");
        //var input = $("<input>");
        //input.attr("type", "hidden");
        //var name = $("#tbody_videolist .row").eq(videoParentIndex).attr('data-videoname');
        //if(name.indexOf("http")<0){
        //    name = name + ".mp4";
        //}
        //input.attr("name", deviceId);
        //input.attr("value", name);
        //$("body").append(form);//将表单放置在web中
        //form.append(input);
        //form.submit().remove();//表单提交

        var name = $("#tbody_videolist .row").eq(videoParentIndex).attr('data-videoname');
        if (name.indexOf("http") == 0) {
            var link = document.createElement('a');
            link.setAttribute("download", "");
            link.href = name;
            link.click();
        } else {
            var form = $("<form>");//定义一个form表单
            form.attr("style", "display:none");
            form.attr("target", "");
            form.attr("method", "post");
            form.attr("action", "/Controllers/VideoLoad.ashx");
            var input = $("<input>");
            input.attr("type", "hidden");
            var name = $("#tbody_videolist .row").eq(videoParentIndex).attr('data-videoname');
            if(name.indexOf("http")<0){
                name = name + ".mp4";
            }
            input.attr("name", deviceId);
            input.attr("value", name);
            $("body").append(form);//将表单放置在web中
            form.append(input);
            form.submit().remove();//表单提交
        }
    });
})
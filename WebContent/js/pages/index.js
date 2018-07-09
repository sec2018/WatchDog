$(function(){
	if (data.data1.privilegelevel == 1) {
	    $("#span_leftscan").html("全国总览");
	    //下面的表格
	    $("#proviceepidemictotal").text(data.data2.provinceepidemictotal);
	    //$("#cityepidemictotal").text(data.data2.cityepidemictotal);
	    //$("#countyepidemictotal").text(data.data2.countyepidemictotal);
	    $("#cityepidemictotal").text("73");
	    $("#countyepidemictotal").text("350");
	    $("#villageepidemictotal").text(data.data2.villageepidemictotal);
	    $("#hamletepidemictotal").text(data.data2.hamletepidemictotal);

	    $("#countryadmintotal").text(data.data2.countryadmintotal);
	    $("#proviceadmintotal").text(data.data2.provinceadmintotal);
	    $("#cityadmintotal").text(data.data2.cityadmintotal);
	    $("#countyadmintotal").text(data.data2.countyadmintotal);
	    $("#villageadmintotal").text(data.data2.villageadmintotal);
	    $("#hamletadmintotal").text(data.data2.hamletadmintotal);

	    $("#countrydognumtotal").text(data.data2.countrydognumtotal);
	    $("#countryalldognumtotal").text(data.data2.alldognumtotal);
	    $("#countrywsqdognumtotal").text(data.data2.feedernumtotal);
	    $("#countryratedognumtotal").text(((data.data2.countrydognumtotal + data.data2.feedernumtotal) * 100 / data.data2.alldognumtotal).toFixed(6));
	    $("#countrymednumtotal").text(data.data2.countrymednumtotal);

	    //echarts
	    GetCountryEcharts(data);

	    $("#a_managepage").click(function () {
	        window.location.href = timestamp("/PageManageCommon?districtcode=" + escape("0"));
	    }); 
	    
	    $("#quit").click(function () {
	        window.location = "/Login/Index?clicktype=quit";
	    });

	    $("#pagereflash").click(function () {
	        window.location.reload();
	    });
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

function objToArray(array) {
    var arr = []
    for (var i in array) {
        arr.push(array[i]); 
    }
    console.log(arr);
    return arr;
}

function GetCountryEcharts(data) {
    var p_names = new Array();
    var p_city_values = new Array();
    var p_dog_values = new Array();
    var p_manager_values = new Array();
    var p_necklet_values = new Array();
    var p_med_values = new Array();
    var p_percents = new Array();

    var p_feeders = new Array();

    var necklet_min = 0;
    var necklet_max = 100;
    var cur = 1;
    data.data3 = objToArray(data.data3);
    for (var t = 0; t < data.data3.length; t++) {
        p_names.push(data.data3[t].provincename);
        p_city_values.push({ "name": data.data3[t].provincename, "value_1": data.data3[t].citynum });
        p_dog_values.push({ "name": data.data3[t].provincename, "value_1": data.data3[t].dognum });
        p_manager_values.push({ "name": data.data3[t].provincename, "value_1": data.data3[t].managernum });
        p_necklet_values.push({ "name": data.data3[t].provincename, "value_1": data.data3[t].neckletnum });
        p_med_values.push({ "name": data.data3[t].provincename, "value_1": data.data3[t].mednum });

        p_feeders.push({ "name": data.data3[t].provincename, "value_1": 0 });

        percent = (data.data3[t].neckletnum / data.data3[t].dognum).toFixed(3);
        if (isNaN(percent)) {
            percent = 0.0;
        }
        p_percents.push({ "name": data.data3[t].provincename, "value": percent, "value_1": percent });

        cur = data.data3[t].neckletnum;
        cur > necklet_max ? necklet_max = cur : null;
        //				cur<necklet_min ? necklet_min=cur : null;


    }

    var pa_army_values = new Array();
    var pa_army_geo = {};
    var pa_dog_values = new Array();
    var pa_manager_values = new Array();
    var pa_necklet_values = new Array();
    var pa_med_values = new Array();
    var pa_percents = new Array();

    var pa_feeders = new Array();

    var armyname = data.data4.armyname;
    pa_army_values.push({ "name": armyname, "value_1": data.data4.divisionnum });
    pa_army_geo[armyname] = [data.data4.lng, data.data4.lat];

    pa_dog_values.push({ "name": armyname, "value_1": data.data4.dognum });
    pa_manager_values.push({ "name": armyname, "value_1": data.data4.managernum });
    pa_necklet_values.push({ "name": armyname, "value_1": data.data4.neckletnum });
    pa_med_values.push({ "name": armyname, "value_1": data.data4.mednum });

    pa_feeders.push({ "name": armyname, "value_1": 0 });

    percent = (data.data4.neckletnum / data.data4.dognum).toFixed(3);
    if (isNaN(percent)) {
        percent = 0.0;
    }
    pa_percents.push({ "name": armyname, "value": percent, "value_1": percent });


    // 路径配置
    require.config({
        paths: {
            echarts: '../js'
        }
    });

    // 使用
    require(
        [
            'echarts',
            'echarts/chart/map' // 使用地图就加载map模块，按需加载
        ],
        function (ec) {

            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('statsChart'));
            var valueAxis = [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    }
            ];

            var option = {
                title: {
                    text: '',
                    x: 'center',
                    textStyle: {
                        fontSize: 28,
                    }

                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {

                        var res = params.name + '<br />';
                        var myseries = option.series;
                        for (var i = 0; i < myseries.length; i++) {

                            for (var k = 0; k < myseries[i].data.length; k++) {

                                if (myseries[i].data[k].name == params.name) {

                                    res += myseries[i].name + ":" + myseries[i].data[k].value_1 + '<br />';

                                }

                            }
                            if (myseries[i].markPoint) {
                                for (var k = 0; k < myseries[i].markPoint.data.length; k++) {

                                    if (myseries[i].markPoint.data[k].name == params.name) {

                                        res += myseries[i].name + ":" + myseries[i].markPoint.data[k].value_1 + '<br />';

                                    }

                                }
                            }

                        }
                        return res;

                    },
                },
                dataRange: {
                    min: 0,
                    max: 1,
                    orient: 'horizontal',
                    x: 'left',
                    y: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    color: ['#008000', '#FFFF00', '#FF0000', '#D6A4A4'],//, '#FF0000'
                    calculable: true
                },

                //roamController: {
                //    show: true,
                //    x: 'right',
                //    y: 'top',
                //    mapTypeControl: {
                //        'china': true
                //    }
                //},
                series: [
                    {
                        name: '流行城市数量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_city_values
                    },
                    {
                        name: '流行师数量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        selectedMode: 'single',
                        data: [],
                        markPoint: {
                            symbol: 'pin',
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderColor: 'red',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    borderWidth: 2,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: pa_army_values,
                        },
                        geoCoord: pa_army_geo
                    },
                    {
                        name: '管理员总数量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_manager_values,
                        markPoint: {
                            symbol: 'pin',
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderColor: 'red',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    borderWidth: 2,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: pa_manager_values,
                        }
                    },
                    {
                        name: '牧犬总数量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_dog_values,
                        markPoint: {
                            symbol: 'pin',
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderColor: 'red',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    borderWidth: 2,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: pa_dog_values,
                        }
                    },
                    {
                        name: '项圈总数量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_necklet_values,
                        markPoint: {
                            symbol: 'pin',
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderColor: 'red',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    borderWidth: 2,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: pa_necklet_values,
                        }
                    },
                    {
                        name: '喂饲器数量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_feeders,
                        markPoint: {
                            symbol: 'pin',
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderColor: 'red',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    borderWidth: 2,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: pa_feeders,
                        }
                    },
                    {
                        name: '投药总次数',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_med_values,
                        markPoint: {
                            symbol: 'pin',
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderColor: 'red',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    borderWidth: 2,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: pa_med_values,
                        }
                    },
                    {
                        name: '项圈犬占比',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_percents,
                        markPoint: {
                            symbol: 'pin',
                            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                            itemStyle: {
                                normal: {
                                    borderColor: 'red',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    borderWidth: 2,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: pa_percents,
                        }
                    },
                ]
            };

            //responsive
            if (screen.width < 768) {
                option.series[0].itemStyle.normal.label.textStyle = { fontSize: 8 };
            }

            var name_selected = '';
            myChart.on("click", function (param) {
                //alert(param.name + 'S');
                if (param.seriesName != '' && param.name == name_selected) {
                    //if (param.name == "建设兵团") {
                    //    window.location.href = "page_corps.html";
                    //} else {
                    //    window.location.href = "/Index/Province?province=" + escape(param.name);
                    //}
                    window.location.href = "../province/province.do?province=" + param.name;
                    //alert(param.name);
                } else {
                    name_selected = param.name;
                }
            });

            //myChart.on("dblclick", function (param) {
            //    window.location.href = "page_province.html?province=" + escape(param.name);
            //    alert(param.name);
            //});
            // 为echarts对象加载数据 
            myChart.setOption(option);

        });

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




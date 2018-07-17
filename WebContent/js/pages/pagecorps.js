$(function(){
            $("#td_areadognumtotal").html("全兵团总数");
            $("#td_areaalldognumtotal").html("全兵团总数");
            $("#td_areamednumtotal").html("全兵团总数");

            //$("#tr_epidemicprovice").css("display", "none");
            $("#cityepidemictotal").text(data.data2.divisionepidemictotal);
            $("#countyepidemictotal").text(data.data2.regimentalepidemictotal);
            $("#villageepidemictotal").text(data.data2.companyepidemictotal);

            //$("#tr_admincountry").css("display", "none");
            $("#proviceadmintotal").text(data.data2.armyadmintotal);
            $("#cityadmintotal").text(data.data2.divisionadmintotal);
            $("#countyadmintotal").text(data.data2.regimentaladmintotal);
            $("#villageadmintotal").text(data.data2.companyadmintotal);

            $("#neckdognumtotal").text(data.data2.neckdognumtotal);
            $("#countryalldognumtotal").text(data.data2.alldognumtotal);
            $("#countryratedognumtotal").text(((data.data2.neckdognumtotal + 0) * 100 / data.data2.alldognumtotal).toFixed(6));
            $("#countrymednumtotal").text(data.data2.countrymednumtotal);
            $("#countrywsqdognumtotal").text(data.data2.feedernumtotal);
            var provinceGov;
            GetProvinceEcharts(data);

            //$("#tr_admin").click(function () {
            //    window.location.href = "SearchManager.html?districtcode=" + escape(data.data4.districtcode);
            //});

            if (data.data1.privilegelevel == 1) {
                $("#span_leftscan").html("全国总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=2";
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
                $("#span_leftscan").html(provinceGov + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=2";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "#";
                });
                $("#goback").css("display", "none");
            }
            else {
                window.location.href = "../user/logout.do";
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


$(function () {
    $("#pagereflash").click(function () {
        window.location.reload();
    });
});


function GetProvinceEcharts(data) {

	provinceGov = "" + data.data4.provinceGov;
    var provinceEchartsAreaName="" + data.data4.provinceEchartsAreaName;

    $("#h3_logtitle").html(provinceGov);
    var map_ctrl = {};
    map_ctrl[provinceEchartsAreaName] = true;

    var pa_division_values = new Array();
	var pa_division_geo={};
    var pa_dog_values = new Array();
    var pa_manager_values = new Array();
    var pa_necklet_values = new Array();
    var pa_med_values = new Array();
    var pa_percents = new Array();

    var pa_feeders = new Array();
    data.data3 = objToArray(data.data3);
	for (var t = 0; t < data.data3.length; t++){

		var divisionname=data.data3[t].divisionname;
		pa_division_values.push({ "name": divisionname, "value_1": data.data3[t].regimentalnum});
		pa_division_geo[divisionname]=[data.data3[t].lng,data.data3[t].lat];

        pa_dog_values.push({ "name": divisionname, "value_1": data.data3[t].dognum });
        pa_manager_values.push({ "name": divisionname, "value_1": data.data3[t].managernum });
        pa_necklet_values.push({ "name": divisionname, "value_1": data.data3[t].neckletnum });
        pa_med_values.push({ "name": divisionname, "value_1": data.data3[t].mednum });

        pa_feeders.push({ "name": divisionname, "value_1": 0 });

        percent = (data.data3[t].neckletnum / data.data3[t].dognum).toFixed(3);
        if (isNaN(percent)) {
            percent = 0.0;
        }
        pa_percents.push({ "name": divisionname, "value": percent, "value_1": percent });

	}

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
            option = {
                title: {
                    text: "",
                    x: 'center',
                    textStyle: {
                        fontSize: 18,
                    }

                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
//
//						if (!params[0])
//						{
////							alert('re');
//							return null;
//						}
                        var res = params.name + '<br />';
                        var myseries = option.series;
                        for (var i = 0; i < myseries.length; i++) {

							if (myseries[i].markPoint)
							{
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
					color: ['#00FF00', '#FFFF00', '#FF0000','#D6A4A4'],
                    calculable: true
                },

//                roamController: {
//                    show: true,
//                    x: 'right',
//                    y: 'top',
//                    mapTypeControl: map_ctrl
//                },
                series: [

                    {
                        name: '流行团数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
						hoverable:false,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        data: [],
						markPoint : {
							symbol:'pin',
							symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									borderColor:'red',
									borderWidth: 1,            // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor:'red',
									borderWidth: 2,
									label: {
										show: false
									}
								}
							},
							data : pa_division_values,
						},
						geoCoord: pa_division_geo

                    },
                    {
                        name: '管理员总数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
 						hoverable:false,
						roam: false,
                        data: [],
						markPoint : {
							symbol:'pin',
							symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									borderColor:'red',
									borderWidth: 1,            // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor:'red',
									borderWidth: 2,
									label: {
										show: false
									}
								}
							},
							data : pa_manager_values,
						},
						geoCoord: pa_division_geo
                    },
                    {
                        name: '牧犬总数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
						hoverable:false,
						roam: false,
                        data: [],
						markPoint : {
							symbol:'pin',
							symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									borderColor:'red',
									borderWidth: 1,            // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor:'red',
									borderWidth: 2,
									label: {
										show: false
									}
								}
							},
							data : pa_dog_values,
						},
						geoCoord: pa_division_geo
                    },
                    {
                        name: '项圈总数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
						hoverable:false,
                        roam: false,
                        data: [],
						markPoint : {
							symbol:'pin',
							symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									borderColor:'red',
									borderWidth: 1,            // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor:'red',
									borderWidth: 2,
									label: {
										show: false
									}
								}
							},
							data : pa_necklet_values,
						},
						geoCoord: pa_division_geo
                    },
                    {
                        name: '喂饲器数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
						hoverable:false,
                        roam: false,
                        data: [],
						markPoint : {
							symbol:'pin',
							symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									borderColor:'red',
									borderWidth: 1,            // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor:'red',
									borderWidth: 2,
									label: {
										show: false
									}
								}
							},
							data : pa_feeders,
						},
						geoCoord: pa_division_geo					
                    },
                    {
                        name: '投药总次数',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
						hoverable:false,
                        roam: false,
                        data: [],
						markPoint : {
							symbol:'pin',
							symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									borderColor:'red',
									borderWidth: 1,            // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor:'red',
									borderWidth: 2,
									label: {
										show: false
									}
								}
							},
							data : pa_med_values,
						},
						geoCoord: pa_division_geo
                    },
                    {
                        name: '项圈犬占比',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
						hoverable:false,
                        roam: false,
                        data: [],
						markPoint : {
							symbol:'pin',
							symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
							itemStyle: {
								normal: {
									borderColor:'red',
									borderWidth: 1,            // 标注边线线宽，单位px，默认为1
									label: {
										show: false
									}
								},
								emphasis: {
									borderColor:'red',
									borderWidth: 2,
									label: {
										show: false
									}
								}
							},
							data : pa_percents,
						},
						geoCoord: pa_division_geo
                    }


                ]
            };
            //responsive
            if (screen.width < 768) {
//                option.series[0].markPoint.symbolSize = 5;
				for (var i = 0; i < option.series.length; i++){
					option.series[i].markPoint.symbolSize = 5;
				}
				option.series[0].itemStyle.normal.label.textStyle = { fontSize: 8 };

            }

            var name_selected = '';
            myChart.on("click", function (param) {        	 
                if (param.seriesName != '') {
                    if (param.name == name_selected) {               
                        window.location.href = "../city/city.do?city=" + param.name + "&province=" + provinceGov;

                    } else {
                        name_selected = param.name;
                    }
                }
            });

            // 为echarts对象加载数据
            myChart.setOption(option);
        }
    );
}
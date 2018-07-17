$(function(){

            $("#td_areadognumtotal").html("全师总数");
            $("#td_areamednumtotal").html("全师总数");

            $("#countyepidemictotal").text(data.data2.regimentalepidemictotal);
            $("#villageepidemictotal").text(data.data2.companyepidemictotal);

            $("#cityadmintotal").text(data.data2.divisionadmintotal);
            $("#countyadmintotal").text(data.data2.regimentaladmintotal);
            $("#villageadmintotal").text(data.data2.companyadmintotal);

            $("#neckdognumtotal").text(data.data2.neckdognumtotal);
            $("#countryalldognumtotal").text(data.data2.alldognumtotal);
            $("#countryratedognumtotal").text(((data.data2.neckdognumtotal + 0) * 100 / data.data2.alldognumtotal).toFixed(6));
            $("#countrymednumtotal").text(data.data2.countrymednumtotal);
            $("#countrywsqdognumtotal").text(data.data2.feedernumtotal);
            var cityGov;
            var provinceGov;
            GetCityEcharts(data);

            //$("#tr_admin").click(function () {
            //    window.location.href = "SearchManager.html?districtcode=" + escape(data.data4.districtcode);
            //});

            if (data.data1.privilegelevel == 1) {
                $("#span_leftscan").html("全国总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=3";
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
                $("#span_leftscan").html("兵团总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=3";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 3) {
                $("#span_leftscan").html("全师总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=3";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "#";
                });
                $("#goback").css("display", "none");
            } else {
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

$(function () {
    $("#pagereflash").click(function () {
        window.location.reload();
    });
});

function objToArray(array) {
    var arr = []
    for (var i in array) {
        arr.push(array[i]); 
    }
    console.log(arr);
    return arr;
}


function GetCityEcharts(data) {
	cityGov = "" + data.data4.cityGov;
	var cityEchartsAreaName="" + data.data4.cityEchartsAreaName;
	provinceGov = "" + data.data4.provinceGov;
    var provinceEchartsAreaName="" + data.data4.provinceEchartsAreaName;
 
    $("#h3_logtitle").html(cityGov);
    var map_ctrl = {};
    map_ctrl[cityEchartsAreaName] = true;

    var pa_regimental_values = new Array();
	var pa_regimental_geo={};
    var pa_dog_values = new Array();
    var pa_manager_values = new Array();
    var pa_necklet_values = new Array();
    var pa_med_values = new Array();
    var pa_percents = new Array();

    var pa_feeders = new Array();

	var regimentalname;
	 data.data3 = objToArray(data.data3);
    for (var t = 0; t < data.data3.length; t++) {
		regimentalname=data.data3[t].regimentalname;
		pa_regimental_values.push({ "name": regimentalname, "value_1": data.data3[t].companynum});
		pa_regimental_geo[regimentalname]=[data.data3[t].lng,data.data3[t].lat];

        pa_dog_values.push({ "name": regimentalname, "value_1": data.data3[t].dognum });
        pa_manager_values.push({ "name": regimentalname, "value_1": data.data3[t].managernum });
        pa_necklet_values.push({ "name": regimentalname, "value_1": data.data3[t].neckletnum });
        pa_med_values.push({ "name": regimentalname, "value_1": data.data3[t].mednum });

		pa_feeders.push({ "name": regimentalname, "value_1": 0 });

        percent = (data.data3[t].neckletnum / data.data3[t].dognum).toFixed(3);
        if (isNaN(percent)) {
            percent = 0.0;
        }
        pa_percents.push({ "name": regimentalname, "value": percent, "value_1": percent });

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

            var option = {
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
                series: [

                    {
                        name: '流行连数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
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
							data : pa_regimental_values,
						},
						geoCoord: pa_regimental_geo


                    },
                    {
                        name: '管理员总数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
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
						geoCoord: pa_regimental_geo
                    },
                    {
                        name: '牧犬总数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
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
						geoCoord: pa_regimental_geo
                    },
                    {
                        name: '项圈总数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
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
						geoCoord: pa_regimental_geo
                    },
                    {
                        name: '喂饲器数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
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
						geoCoord: pa_regimental_geo					
                    },
                    {
                        name: '投药总次数',
                        type: 'map',
                        mapType: cityEchartsAreaName,
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
						geoCoord: pa_regimental_geo
                    },
                    {
                        name: '项圈犬占比',
                        type: 'map',
                        mapType: cityEchartsAreaName,
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
							data : pa_percents,
						},
						geoCoord: pa_regimental_geo
                    }


                ]
            };

            var mapGeoData = require('echarts/util/mapData/params');
            var mapType = [];
            var cityMap = {
                "乌鲁木齐市": "650100",
                "哈密地区": "652200",

				"石河子市": "659001",
				"阿拉尔市": "659002",
				"图木舒克市": "659003",
				"五家渠市": "659004",
				"北屯市": "659005",
				"铁门关市": "659006",
				"双河市": "659007",
				"可克达拉市": "659008",
				"昆玉市": "659009",
				"奎屯市": "654003",
				"额敏县": "654221"
            };
            mapGeoData.params[cityEchartsAreaName] = {
                getGeoJson: (function (c) {
                    var geoJsonName = cityMap[c];
                    return function (callback) {
                        $.getJSON('../js/chart/geometryCouties/' + geoJsonName + '.json', callback);
                    }
                })(cityEchartsAreaName)
            }

            //responsive
            if (screen.width < 768) {
                option.series[0].itemStyle.normal.label.textStyle = { fontSize: 8 };
            }

            var name_selected = '';
            myChart.on("click", function (param) {
                //alert(param.name + 'S');
                if (param.seriesName != '' && param.name == name_selected) {
//                    window.location.href = "page_county.html?county=" + escape(param.name) + "&city=" + escape(cityname) + "&province=" + escape(provincename);
                    //alert(param.name);
                } else {
                    name_selected = param.name;
                }
            });




            // 为echarts对象加载数据 
            myChart.setOption(option);


        });
}
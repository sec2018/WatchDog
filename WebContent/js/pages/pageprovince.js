$(function(){

            $("#td_areadognumtotal").html("全省总数");
            $("#td_areaalldognumtotal").html("全省总数");
            $("#td_areamednumtotal").html("全省总数");

            //$("#tr_epidemicprovice").css("display", "none");
            $("#cityepidemictotal").text(data.data2.cityepidemictotal);
            $("#countyepidemictotal").text(data.data2.countyepidemictotal);
            $("#villageepidemictotal").text(data.data2.villageepidemictotal);
            $("#hamletepidemictotal").text(data.data2.hamletepidemictotal);

            //$("#tr_admincountry").css("display", "none");
            $("#provinceadmintotal").text(data.data2.provinceadmintotal);
            $("#cityadmintotal").text(data.data2.cityadmintotal);
            $("#countyadmintotal").text(data.data2.countyadmintotal);
            $("#villageadmintotal").text(data.data2.villageadmintotal);
            $("#hamletadmintotal").text(data.data2.hamletadmintotal);

            $("#neckdognumtotal").text(data.data2.neckdognumtotal);
            $("#countryalldognumtotal").text(data.data2.alldognumtotal);
            $("#countrywsqdognumtotal").text(data.data2.feedernumtotal);
            $("#countryratedognumtotal").text(((data.data2.neckdognumtotal + data.data2.feedernumtotal) * 100 / data.data2.alldognumtotal).toFixed(6));
            $("#countrymednumtotal").text(data.data2.countrymednumtotal);

            var provinceGov;
            GetProvinceEcharts(data);

            //$("#tr_admin").click(function () {
            //    window.location.href = "SearchManager.html?districtcode=" + escape(data.data4.districtcode);
            //});

            if (data.data1.privilegelevel == 1) {
                $("#span_leftscan").html("全国总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode+"&arealevel=2";
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
                    window.location.href = "../user/index.do";
                });
                $("#goback").css("display", "none");
            }
            else {
                window.location.href = "../user/logout.do";
            }
        }
)


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

    var p_names = new Array();
    var p_county_values = new Array();
    var p_dog_values = new Array();
    var p_manager_values = new Array();
    var p_necklet_values = new Array();
    var p_med_values = new Array();
    var p_percents = new Array();

    var p_feeders = new Array();

  
    provinceGov = "" + data.data4.provinceGov;
    var provinceEchartsAreaName="" + data.data4.provinceEchartsAreaName;
    $("#h3_logtitle").html(provinceGov);
    var map_ctrl = {};
    map_ctrl[provinceEchartsAreaName] = true;

    var necklet_min = 0;
    var necklet_max = 100;
    var cur = 1;
    data.data3 = objToArray(data.data3);
    for (var t = 0; t < data.data3.length; t++) {
    	
        p_names.push(data.data3[t].cityname);
        p_county_values.push({ "name": data.data3[t].cityname, "value_1": data.data3[t].countynum });
        p_dog_values.push({ "name": data.data3[t].cityname, "value_1": data.data3[t].dognum });
        p_manager_values.push({ "name": data.data3[t].cityname, "value_1": data.data3[t].managernum });
        p_necklet_values.push({ "name": data.data3[t].cityname, "value_1": data.data3[t].neckletnum});
        p_med_values.push({ "name": data.data3[t].cityname, "value_1": data.data3[t].mednum });
        cur = data.data3[t].neckletnum;
        cur > necklet_max ? necklet_max = cur : null;

        p_feeders.push({ "name": data.data3[t].cityname, "value_1": 0 });
        percent = (data.data3[t].neckletnum / data.data3[t].dognum).toFixed(3);
        if (isNaN(percent)) {
            percent = 0.0;
        }
        p_percents.push({ "name": data.data3[t].cityname, "value": percent, "value_1": percent });

        
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

                        var res = params.name + '<br />';
                        var myseries = option.series;
                        for (var i = 0; i < myseries.length; i++) {

                            for (var k = 0; k < myseries[i].data.length; k++) {

                                if (myseries[i].data[k].name == params.name) {

                                    res += myseries[i].name + ":" + myseries[i].data[k].value_1 + '<br />';

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
                //    mapTypeControl: map_ctrl
                //},
                series: [

                    {
                        name: '流行县数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_county_values
                    },
                    {
                        name: '管理员总数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_manager_values
                    },
                    {
                        name: '牧犬总数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_dog_values
                    },
                    {
                        name: '项圈总数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_necklet_values
                    },
                    {
                        name: '喂饲器数量',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_feeders
                    },
                    {
                        name: '投药总次数',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_med_values
                    },
                    {
                        name: '项圈犬占比',
                        type: 'map',
                        mapType: provinceEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_percents
                    }
                ]
            };
            //responsive
            if (screen.width < 768) {
                option.series[0].itemStyle.normal.label.textStyle = { fontSize: 8 };
            }

            var name_selected = '';
            myChart.on("click", function (param) {
               // alert(param.seriesName + 'S'+ (param.name == name_selected));
                if (param.seriesName != '' && param.name == name_selected) {
                	 
                    window.location.href = "../city/city.do?city=" + param.name + "&province=" + provinceGov;
                    //alert(param.name);
                } else {
                    name_selected = param.name;
                }
            });

            //var ecConfig = require('echarts/config');
            //myChart.on(ecConfig.EVENT.DBLCLICK, function (param) {
            //    window.location.href = "page_city.html?city=" + escape(param.name) + "&province=" + escape(provincename);
            //});


            // 为echarts对象加载数据
            myChart.setOption(option);
        }
    );
}
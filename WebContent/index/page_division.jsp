

<!DOCTYPE html>
<html>
<head>
    <title>包虫病防控犬驱虫远程管理系统 - 首页</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- bootstrap -->
    <link href="../css/bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="../css/bootstrap/bootstrap-overrides.css" type="text/css" rel="stylesheet" />

    <!-- libraries -->
    <link href="../css/lib/font-awesome.css" type="text/css" rel="stylesheet" />

    <!-- global styles -->
    <link rel="stylesheet" type="text/css" href="../css/compiled/layout.css" />
    <link rel="stylesheet" type="text/css" href="../css/compiled/elements.css" />
    <link rel="stylesheet" type="text/css" href="../css/compiled/icons.css" />

    <!-- this page specific styles -->
    <link rel="stylesheet" href="../css/compiled/index.css" type="text/css" media="screen" />

    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
     
    <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	if(session.getAttribute("currentUser")==null){
		response.sendRedirect(request.getContextPath()+"/login.jsp");
		return;
	}
%>
<script  type="text/javascript">
	var data = <%=request.getAttribute("model")%>;
</script>
</head>
<body>
    <!-- navbar -->
    <header class="navbar navbar-inverse" role="banner">
        <div class="navbar-header">
            <button class="navbar-toggle" type="button" data-toggle="collapse" id="menu-toggler">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="logo">
                <h3 style="color:white;">&nbsp;&nbsp;包虫病防控犬驱虫远程管理系统 </h3>
            </div>
        </div>
    </header>
    <!-- end navbar -->
    <!-- sidebar -->
    <div id="sidebar-nav">
        <ul id="dashboard-menu">

            <li class="active">
                <div class="pointer">
                    <div class="arrow"></div>
                    <div class="arrow_border"></div>
                </div>
                <a style="cursor:pointer" id="a_areasee" href="#">
                    <i class="icon-home"></i>
                    <span id="span_leftscan">全国总览</span>
                </a>
            </li>
            <li>
                <a style="cursor:pointer" id="a_managepage">
                    <i class="icon-wrench"></i>
                    <span>管理页面</span>
                </a>
            </li>
            <li>
                <a style="cursor:pointer">
                    <i class="icon-cogs"></i>
                    <span>统计分析</span>
                </a>
            </li>
            <li>
                <a href="/Index/PagePersonal" style="cursor:pointer">
                    <i class="icon-user"></i>
                    <span>个人信息</span>
                </a>
            </li>
            <li>
                <a href="/Login/Index?clicktype=quit" style="cursor:pointer">
                    <i class="icon-off"></i>
                    <span>退出</span>
                </a>
            </li>
            <!--<li>
                <a style="cursor:pointer" id="pagereflash">
                    <i class="icon-repeat"></i>
                    <span>刷新</span>
                </a>
            </li>-->
            <li>
                <a style="cursor:pointer" id="goback" href="#" onclick="history.back(-1);return false;">
                    <i class="icon-arrow-left"></i>
                    <span>返回</span>
                </a>
            </li>
        </ul>
    </div>
    <!-- end sidebar -->
    <!-- main container -->
    <div class="content">

        <!-- upper main stats -->
        <!-- end upper main stats -->

        <div id="pad-wrapper">
            <!-- statistics chart built with jQuery Flot -->
            <div class="row chart">
                <div class="col-md-9">
                    <div style="text-align: center;">
                        <h3 id="h3_logtitle"></h3>
                    </div>
                    <div id="statsChart"></div>
                </div>
                <div class="col-md-3">
                    <table class="table table-hover text-center" style="margin:20px auto">
                        <tbody>
                            <!-- row -->
                            <tr class="success">
                                <td>
                                    流行区
                                </td>
                                <td>
                                    数量（个）
                                </td>
                            </tr>
                            <tr id="tr_epidemiccounty">
                                <td>
                                    团级
                                </td>
                                <td id="countyepidemictotal"></td>
                            </tr>
                            <tr id="tr_epidemicvillage">
                                <td>
                                    连级
                                </td>
                                <td id="villageepidemictotal"></td>
                            </tr>

                            <tr class="success" id="tr_admin" style="cursor:pointer">
                                <td>
                                    管理人员
                                </td>
                                <td>
                                    数量（人）
                                </td>
                            </tr>
                            <tr id="tr_admincity">
                                <td>
                                    师级
                                </td>
                                <td id="cityadmintotal"></td>
                            </tr>
                            <tr id="tr_admincounty">
                                <td>
                                    团级
                                </td>
                                <td id="countyadmintotal"></td>
                            </tr>
                            <tr>
                                <td>
                                    连级
                                </td>
                                <td id="villageadmintotal"></td>
                            </tr>
                            <tr class="success">
                                <td>
                                    犬只总数
                                </td>
                                <td>
                                    数量（只）
                                </td>
                            </tr>
                            <tr>
                                <td id="td_areaalldognumtotal">
                                    全师总数
                                </td>
                                <td id="countryalldognumtotal"></td>
                            </tr>
                            <tr class="success">
                                <td>
                                    已佩项圈犬只数
                                </td>
                                <td>
                                    数量（只）
                                </td>
                            </tr>
                            <tr>
                                <td id="td_areadognumtotal">
                                    全师总数
                                </td>
                                <td id="neckdognumtotal"></td>
                            </tr>
                            <tr class="success">
                                <td>
                                    使用喂饲器数
                                </td>
                                <td>
                                    数量（只）
                                </td>
                            </tr>
                            <tr>
                                <td id="td_areawsqdognumtotal">
                                    全师总数
                                </td>
                                <td id="countrywsqdognumtotal"></td>
                            </tr>
                            <tr class="success">
                                <td>
                                    驱虫犬只比
                                </td>
                                <td>
                                    单位（%）
                                </td>
                            </tr>
                            <tr>
                                <td id="td_arearatedognumtotal">
                                    全师
                                </td>
                                <td id="countryratedognumtotal"></td>
                            </tr>
                            <tr class="success">
                                <td>
                                    驱虫总次数
                                </td>
                                <td>
                                    数量（次）
                                </td>
                            </tr>
                            <tr>
                                <td id="td_areamednumtotal">
                                    全师总数
                                </td>
                                <td id="countrymednumtotal"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


    <!-- scripts -->
    <script src="../js/jquery-latest.js"></script>
    <!-- <script src="../js/Jquery_ajax_extention.js"></script> -->
<!--     <script type="text/javascript">
        var Ticket = '@ViewBag.Ticket';
        var username = '@ViewBag.UserName';
        var provincename = '@ViewBag.Province';
        var cityname = '@ViewBag.City';
    </script> -->
    <script src="../js/bootstrap.min.js"></script>
 
    <!--echarts2-->
    <script src="../js/other.js"></script>
    <script src="../js/echarts.js"></script>
    <script src="../js/china.js"></script>
    <!-- flot charts -->
    <script src="../js/theme.js"></script>
    <script src="../js/pages/pagedivision.js" type="text/javascript"></script>

</body>
</html>
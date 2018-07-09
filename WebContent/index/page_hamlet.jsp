<!DOCTYPE html>
<html>
<head>
    <title>包虫病防控犬驱虫远程管理系统 - 用户列表</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- bootstrap -->
    <link href="../css/bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="../css/bootstrap/bootstrap-overrides.css" type="text/css" rel="stylesheet" />

    <!-- global styles -->
    <link rel="stylesheet" type="text/css" href="../css/compiled/layout.css" />
    <link rel="stylesheet" type="text/css" href="../css/compiled/elements.css" />
    <link rel="stylesheet" type="text/css" href="../css/compiled/icons.css" />

    <!-- libraries -->
    <link href="../css/lib/font-awesome.css" type="text/css" rel="stylesheet" />

    <!-- this page specific styles -->
    <link rel="stylesheet" href="../css/compiled/user-list.css" type="text/css" media="screen" />

    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
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
                    <i class="icon-picture"></i>
                    <span id="span_leftscan">乡村详情</span>
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

        <div id="pad-wrapper" class="users-list">
            <div class="row chart">
                <div class="col-md-12">
                    <div style="text-align: center;">
                        <h3 id="h3_logtitle"></h3>
                    </div>
                    <div id="statsChart"></div>
                </div>
            </div>
            <div class="row header" style='margin-top:20px'>
                <h3 style="margin-left:20px">管理员</h3>
                <div class="col-md-10 col-sm-12 col-xs-12 pull-right">
                    <input id="input_managername" type="text" class="col-md-5 search" placeholder="输入设备编号...">

                    <!-- custom popup filter -->
                    <!-- styles are located in css/elements.css -->
                    <!-- script that enables this dropdown is located in js/theme.js -->
                    <a id="div_usersearch" class="btn-flat default" style='margin-left:5px'>
                        点击搜索
                    </a>
                </div>
            </div>

            <!-- Users table -->
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-hover table_hide2">
                        <thead>
                            <tr>
                                <th class="col-md-1">
                                    设备编号
                                </th>
                                <th class="col-md-1">
                                    <span class="line"></span>犬只名称
                                </th>
                                <th class="col-md-1">
                                    <span class="line"></span>首次投药时间
                                </th>
                                <th class="col-md-1">
                                    <span class="line"></span>上次投药时间
                                </th>
                                <th class="col-md-1">
                                    <span class="line"></span>已投次数
                                </th>
                                <th class="col-md-1">
                                    <span class="line"></span>下次投药时间
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tbody_userprofilefarm"></tbody>
                    </table>
                </div>
            </div>
            <!-- <div id="barcon" class="barcon">
                <div id="barcon1" class="barcon1"></div>
                <div id="barcon2" class="barcon2">
                    <ul>
                        <li><a href="###" id="firstPage">首页</a></li>
                        <li><a href="###" id="prePage">上一页</a></li>
                        <li><a href="###" id="nextPage">下一页</a></li>
                        <li><a href="###" id="lastPage">尾页</a></li>
                        <li>
                            <select id="jumpWhere"></select>
                        </li>
                        <li><a href="###" id="jumpPage" onclick="jumpPage()">跳转</a></li>
                    </ul>
                </div>
             </div>-->
             <nav >
				<ul class="pagination">
					
				</ul>
			</nav>
            <!-- end users table -->
        </div>
    </div>
    <!-- end main container -->
    <!-- scripts -->
    <script src="../js/jquery-latest.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/theme.js"></script>
    <!--echarts2-->
    <script src="../js/echarts.js"></script>
    <link rel="stylesheet" href="../css/main1119.css" />
    <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.0&key=39f6a5bd38f3167dc032e09b8e6d2a12&plugin=AMap.MarkerClusterer"></script>
    <script src="https://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
    <script src="../js/china.js"></script>

    <script src="../js/pages/pagehamlet.js" type="text/javascript"></script>
</body>
</html>

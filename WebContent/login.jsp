<!DOCTYPE html>
<html class="login-bg">
<head>
    <title>包虫病防控犬驱虫远程管理系统 - 登录</title>
    <%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" href="~/bitbug.ico" />
    <link rel="bookmark" href="~/bitbug.ico" />
    <!-- bootstrap -->
    <link href="css/bootstrap/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap/bootstrap-overrides.css" type="text/css" rel="stylesheet" />
    <!-- global styles -->
    <link rel="stylesheet" type="text/css" href="css/compiled/layout.css" />
    <link rel="stylesheet" type="text/css" href="css/compiled/elements.css" />
    <link rel="stylesheet" type="text/css" href="css/compiled/icons.css" />
    <!-- libraries -->
    <link rel="stylesheet" type="text/css" href="css/lib/font-awesome.css" />

    <!-- this page specific styles -->
    <link rel="stylesheet" href="css/compiled/signin.css" type="text/css" media="screen" />
   <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body onkeydown="keyLogin();">
    <div class="login-wrapper">
        <div class="logo">
            <h3 style="color:white;">包虫病防控犬驱虫远程管理系统</h3>
        </div>
        <div class="box">
            <div class="content-wrap">
                <input id="username" class="form-control" type="text" placeholder="用户名" style="margin-top:30px">
                <input id="password" class="form-control" type="password" placeholder="密码">
                <!--                 <a href="#" class="forgot">忘记密码?</a> -->
                <div class="remember">
                    <input id="remember_me" type="checkbox">
                    <label for="remember-me">记住我</label>
                </div>
                <a class="btn-glow primary login" id="btn_login">登录</a>
                <a class="btn-glow primary login" id="btn_visitor">游客</a>
            </div>
        </div>

        <div class="no-account">
            <p>还未有账号?</p>
            <a id="a_register" style="cursor:pointer" data-toggle="modal" href="#registerDiv">请注册</a>
        </div>
    </div>

    <!-- /.modal -->
    <div class="modal fade" id="registerDiv" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">管理员注册</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputName1" class="col-md-2 control-label">姓名(*)</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="input_managername">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputWebsite1" class="col-md-2 control-label">管理等级(*)</label>
                            <div class="col-md-8">
                                <select id="modalselect_adminlevel">
                                    <option value="2">省级</option>
                                    <option value="3">市级</option>
                                    <option value="4">县级</option>
                                    <option value="5">乡级</option>
                                    <option value="6">村级</option>
                                </select>
                                (注：<span style="color:red">请先选择管理等级</span>）
                            </div>

                        </div>
                        <div class="form-group">
                            <label for="inputPhone1" class="col-md-2 control-label">所属区域(*)</label>
                            <div class="col-md-8">
                                <select id="select_province">
                                    <option value="-1">请选择</option>
                                    <option value="150000000000">内蒙古自治区</option>
                                    <option value="510000000000">四川省</option>
                                    <option value="530000000000">云南省</option>
                                    <option value="540000000000">西藏自治区</option>
                                    <option value="610000000000">陕西省</option>
                                    <option value="620000000000">甘肃省</option>
                                    <option value="630000000000">青海省</option>
                                    <option value="640000000000">宁夏回族自治区</option>
                                </select>
                                <select id="select_city" style="display:none">
                                    <option value="-1">请选择</option>
                                </select>
                                <select id="select_county" style="display:none"><option value="-1">请选择</option></select>
                                <br /><br />
                                <select id="select_village" style="display:none"><option value="-1">请选择</option></select>
                                <select id="select_hamlet" style="display:none"><option value="-1">请选择</option></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputWebsite1" class="col-md-2 control-label">身份证号</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="input_identity">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputWebsite1" class="col-md-2 control-label">手机号码(*)</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="input_tel">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress1" class="col-md-2 control-label">用户名(*)</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="input_username">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress1" class="col-md-2 control-label">密码(*)</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="input_password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress1" class="col-md-2 control-label">确认密码(*)</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="input_confirmpassword">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-center col-md-12">
                                <button id="btn_adduser" class="btn-glow primary">确认添加</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- scripts -->
    <script src="js/jquery-latest.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/theme.js"></script>
    <script src="js/pages/signin.js" type="text/javascript"></script>
</body>
</html>


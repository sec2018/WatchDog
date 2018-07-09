<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<title>包虫病防控犬驱虫远程管理系统 - 首页</title>
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
    <link rel="stylesheet" href="../css/compiled/index.css" type="text/css" media="screen" />
    
    <script src="../js/jquery-latest.js"></script>
<%
	if(session.getAttribute("currentUser")==null){
		response.sendRedirect(request.getContextPath()+"/login.jsp");
		return;
	}
%>
</head>
<body>
  	<%@include file="/common/head.jsp"%>
  	<%@include file="/common/menu.jsp"%>	  
	<!-- main container -->
    <div class="content">
        <!-- upper main stats -->
        <!-- end upper main stats -->
        <div id="pad-wrapper">
            <!-- statistics chart built with jQuery Flot -->
            <div class="row chart">
                <div class="col-md-9">
                    <%@include file="/common/map.jsp"%>
                </div>
                <div class="col-md-3" id="rightlogo">
                    <%@include file="/common/rightlogo.jsp"%>
                </div>
            </div>
        </div>
    </div>
  	<!--</div>
	  <div class="row">
		  <div class="col-md-12">
		  	<jsp:include page="/common/foot.jsp"/>
		  </div>
	  </div>
	</div>-->
	<!-- scripts -->
	<script  type="text/javascript">
		var data = <%=request.getAttribute("model")%>;
	</script>
    <script src="../js/bootstrap.min.js"></script>
    <!--echarts2-->
    <script src="../js/other.js"></script>
    <script src="../js/echarts.js"></script>
    <!-- flot charts -->
    <script src="../js/theme.js"></script>
    <script src="../js/pages/index.js" type="text/javascript"></script>
</body>
</html>
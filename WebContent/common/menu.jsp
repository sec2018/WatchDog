<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
	function logout(){
		if(confirm('您确定要退出系统吗?')){
			window.location.href="${pageContext.request.contextPath}/user/logout.do";
		}
	}
</script>
<div class="list-group">
  <c:if test="${currentUser.privilegelevel=='1' }">
	<!-- sidebar -->
    <div id="sidebar-nav">
        <ul id="dashboard-menu">
            <li class="active">
                <div class="pointer">
                    <div class="arrow"></div>
                    <div class="arrow_border"></div>
                </div>
                <a style="cursor: pointer" id="a_areasee" href="#">
                    <i class="icon-home"></i>
                    <span id="span_leftscan">全国总览</span>
                </a>
            </li>
            <li>
                <a style="cursor: pointer" id="a_managepage">
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
                <a href="/Index/PagePersonal" style="cursor: pointer">
                    <i class="icon-user"></i>
                    <span>个人信息</span>
                </a>
            </li>
            <li>
                <a href="javascript:logout()" style="cursor:pointer">
                    <i class="icon-off"></i>
                    <span>安全退出</span>
                </a>
            </li>
        </ul>
    </div>
    <!-- end sidebar -->
  </c:if>
</div>
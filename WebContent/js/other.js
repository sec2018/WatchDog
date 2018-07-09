// JavaScript Document
$(function() {
	
	
  $("#yhm_icon").click(
		function(){ $("#yhm_content").slideToggle();
}

	);	
  
    $("#rq_xz").click(
		function(){ $("#rq_ch").slideToggle();
}

	);	
	
	$("#zk").click(
		function(){ $("#l_menu").hide(); $("#sq").show();$("#zk").hide();}
	);	
	
	$("#sq").click(
		function(){ $("#l_menu").show(); $("#sq").hide();$("#zk").show();}
	);
	
	$(".right_tab_c_l").mouseover(
		function(){ $(".btn_show",this).show();}
	);	
	$(".right_tab_c_l").mouseout(
		function(){ $(".btn_show",this).hide();}
	);	
	
	$("#map_zk").click(
		function(){ $(".map_info .content").hide(); $("#map_sq").show();$("#map_zk").hide();}
	);	
	
	$("#map_sq").click(
		function(){ $(".map_info .content").show(); $("#map_sq").hide();$("#map_zk").show();}
	);
	
});

function setTab1(m, n) {
	var tli = document.getElementById("fl" + m).getElementsByTagName("li");
	var mli = document.getElementById("fl_body" + m).getElementsByTagName("ul");
	for (i = 0; i < tli.length; i++) {
		tli[i].className = i == n ? "hover" : "";
		mli[i].style.display = i == n ? "block" : "none";
	}
}

function showDilog (){
	var dilog = document.createElement('div');
	$(dilog).addClass('coverClass');
	$('.mainsite').append($(dilog));
}

function destoryDilog () {
	$('.coverClass').remove();
	
}

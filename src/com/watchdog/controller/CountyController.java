package com.watchdog.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.watchdog.model.Managers;
import com.watchdog.service.CountyService;
import com.watchdog.service.UserService;

import net.sf.json.JSONObject;
@Controller
@RequestMapping("/county")
public class CountyController {
	@Resource
	private UserService userService;
	
	@Resource
	private CountyService countyService;
/***
 * 
 * @param city 城市名
 * @param province 省名
 * @param request
 * @param model
 * @return
 */
	@RequestMapping("/county")
	public String GoToCountyPage(@RequestParam(value="county") String county,@RequestParam(value="city") String city,@RequestParam(value="province") String province,HttpServletRequest request,ModelMap model) {
		HttpSession session=request.getSession();
		//session失效，退到登陆页面
		if(session.getAttribute("currentUser")==null){;
			return "redirect:/login.jsp";
		}
		
		Managers manager= (Managers) session.getAttribute("currentUser");
		StringBuilder url = new StringBuilder("index/");
		JSONObject jsStr = null;
			
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("data1",manager);//data1保存用户信息

		url.append("page_county");//转到页面index/page_county.jsp
		Map<String,Integer> countyIndexInfo = countyService.GetIndexLogoInfo(province, city,county);//获得该县的总体数据信息
		data.put("data2",countyIndexInfo);
		Map<String,Object> countyMap = countyService.GetCountyMap(province,city,county);//获得该县下各个流行乡德详细数据信息
		data.put("data3", countyMap);
		Map<String,Object> data4 = countyService.GetDistrictcode(province,city,county);//获得该县的区域编码
		data.put("data4", data4);
		
		jsStr = JSONObject.fromObject(data);//数据转为json格式
		model.addAttribute("model",jsStr.toString());	 
		return url.toString();
	}
}

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
import com.watchdog.service.VillageService;

import net.sf.json.JSONObject;
@Controller
@RequestMapping("/village")
public class VillageController {
	@Resource
	private UserService userService;
	
	@Resource
	private VillageService villageService;
/***
 * 
 * @param city 城市名
 * @param province 省名
 * @param request
 * @param model
 * @return
 */
	@RequestMapping("/village")
	public String GoToCountyPage(@RequestParam(value="village") String village, @RequestParam(value="county") String county,@RequestParam(value="city") String city,@RequestParam(value="province") String province,HttpServletRequest request,ModelMap model) {
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

		url.append("page_village");//转到页面index/page_village.jsp
		Map<String,Integer> villageIndexInfo = villageService.GetIndexLogoInfo(province, city,county,village);//获得该乡的总体数据信息
		data.put("data2",villageIndexInfo);
		Map<String,Object> villageMap = villageService.GetVillageMap(province,city,county,village);//获得该乡下各个流行村德详细数据信息
		data.put("data3", villageMap);
		Map<String,Object> data4 = villageService.GetDistrictcode(province,city,county,village);//获得该乡的区域编码
		data.put("data4", data4);
		
		jsStr = JSONObject.fromObject(data);//数据转为json格式
		model.addAttribute("model",jsStr.toString());	 
		return url.toString();
	
	}
}

package com.watchdog.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.watchdog.model.Managers;
import com.watchdog.service.HamletService;
import com.watchdog.service.ProvinceService;
import com.watchdog.service.UserService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/province")
public class ProvinceController {

	@Resource
	private UserService userService;
	
	@Resource
	private ProvinceService provinceService;
	
	@RequestMapping("/province")
	public String GoToProvincePage(@RequestParam(value="province") String province,HttpServletRequest request,ModelMap model) {
		HttpSession session=request.getSession();
		if(session.getAttribute("currentUser")==null){;
			return "redirect:/login.jsp";
		}
		
		Managers manager= (Managers) session.getAttribute("currentUser");
		StringBuilder url = new StringBuilder("index/");
		JSONObject jsStr = null;
			
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("data1",manager);
		if(province.equals("Ω®…Ë±¯Õ≈")) {
			url.append("page_corps");
			Map<String,Integer> armyIndexInfo = provinceService.GetArmyIndexLogo(manager, province);
			data.put("data2",armyIndexInfo);
			Map<String,Object> armyProvinceMap = provinceService.GetArmyProvinceMap(province);
			data.put("data3", armyProvinceMap);
			Map<String,Object> data4 = provinceService.GetDistrictcode(province);
			data.put("data4", data4);
		}else {
			url.append("page_province");
			Map<String,Integer> armyIndexInfo = provinceService.GetIndexLogoInfo(manager, province);
			data.put("data2",armyIndexInfo);
			Map<String,Object> armyProvinceMap = provinceService.GetProvinceMap(province);
			data.put("data3", armyProvinceMap);
			Map<String,Object> data4 = provinceService.GetDistrictcode(province);
			data.put("data4", data4);
		}
		jsStr = JSONObject.fromObject(data);
		model.addAttribute("model",jsStr.toString());	 
		return url.toString();
	}
}

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
	/***
	 * 
	 * @param province 兵团或者省名
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/province")
	public String GoToProvincePage(@RequestParam(value="province") String province,HttpServletRequest request,ModelMap model) {
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
		if(province.equals("建设兵团")) {//查看建设兵团的详情
			url.append("page_corps");//转到页面index/page_corps.jsp
			Map<String,Integer> armyIndexInfo = provinceService.GetArmyIndexLogo(province);//获得建设兵团的总体数据信息
			data.put("data2",armyIndexInfo);
			Map<String,Object> armyProvinceMap = provinceService.GetArmyProvinceMap(province);//获得建设兵团下各个流行师德详细数据信息
			data.put("data3", armyProvinceMap);
			Map<String,Object> data4 = provinceService.GetDistrictcode(province);//获得建设兵团的区域编码
			data.put("data4", data4);
		}else {//如果非建设兵团，即省
			url.append("page_province");//转到页面index/page_province.jsp
			Map<String,Integer> provinceIndexInfo = provinceService.GetIndexLogoInfo(province);//获得该省的总体数据信息
			data.put("data2",provinceIndexInfo);
			Map<String,Object> ProvinceMap = provinceService.GetProvinceMap(province);//获得该下各个流行市德详细数据信息
			data.put("data3", ProvinceMap);
			Map<String,Object> data4 = provinceService.GetDistrictcode(province);//获得该省的区域编码
			data.put("data4", data4);
		}
		jsStr = JSONObject.fromObject(data);//数据转为json格式
		model.addAttribute("model",jsStr.toString());	 
		return url.toString();
	}
}

package com.watchdog.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.watchdog.model.Managers;
import com.watchdog.model.PageBean;
import com.watchdog.service.HamletService;
import com.watchdog.service.UserService;
import com.watchdog.util.PageUtil;
import com.watchdog.util.StringUtil;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/hamlet")
public class HamletController {
	
	@Resource
	private UserService userService;
	
	@Resource
	private HamletService hamletService;
	
	@RequestMapping(value="/hamletapi", produces="text/html;charset=UTF-8")
	@ResponseBody
	public String GoToHamlet(@RequestParam(value="page",required=false)String page,Managers manager,HttpServletRequest request) {
		HttpSession session=request.getSession();
		if(session.getAttribute("currentUser")==null){;
			return "redirect:/login.jsp";
		}
		if(StringUtil.isEmpty(page)){
			page="1";
		}
		PageBean pageBean=new PageBean(Integer.parseInt(page),6);
		Managers resultUser= (Managers) session.getAttribute("currentUser");
		System.out.println(resultUser.getAddress());
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("data1", resultUser);
		Map<String,Object> Getuser_page_farmDogList = new HashMap<String,Object>();
		Getuser_page_farmDogList = hamletService.Getuser_page_farmDogList(pageBean,resultUser.getUsername());
		data.put("data2", Getuser_page_farmDogList);
		Map<String,Object> gethamletmap = new HashMap<String,Object>();
		gethamletmap = hamletService.GetHamletMap(resultUser.getProvince(),resultUser.getCity(),resultUser.getCounty(),resultUser.getVillage(),resultUser.getHamlet());
		data.put("data3", gethamletmap);
		Map<String,String> data4 = new HashMap<String,String>();
		data4.put("provincename", hamletService.GovToEchartsAreaName(resultUser.getProvince()));
		data4.put("cityname", hamletService.GovToEchartsAreaName(resultUser.getCity()));
		data4.put("countyname", hamletService.GovToEchartsAreaName(resultUser.getCounty()));
		data4.put("villagename", hamletService.GovToEchartsAreaName(resultUser.getVillage()));
		data4.put("hamletname", hamletService.GovToEchartsAreaName(resultUser.getHamlet()));
		data.put("data4", data4);
		Map<String,Object> getupuser_page_farmDogFeederList = new HashMap<String,Object>();
		getupuser_page_farmDogFeederList = hamletService.Getupuser_page_farmDogFeederList(resultUser.getProvince(),resultUser.getCity(),resultUser.getCounty(),resultUser.getVillage(),resultUser.getHamlet());
		data.put("data5", getupuser_page_farmDogFeederList);
		Map<String,Object> getHamletFeederMap = new HashMap<String,Object>();
		getHamletFeederMap = hamletService.GetHamletFeederMap(resultUser.getProvince(),resultUser.getCity(),resultUser.getCounty(),resultUser.getVillage(),resultUser.getHamlet());
		data.put("data6", getHamletFeederMap);
		Map<String,Object> getLevel6AdminDogNum = new HashMap<String,Object>();
		getLevel6AdminDogNum = hamletService.GetLevel6AdminDogNum(resultUser.getUsername());
		data.put("data7", getLevel6AdminDogNum);
		
		Map<String,Object> combineneckletandfeederdoglist = new HashMap<String,Object>();
		combineneckletandfeederdoglist = hamletService.CombineNeckletAndFeederDogList(pageBean,resultUser.getUsername());
		data.put("data8", combineneckletandfeederdoglist);
		
		int total=hamletService.CombineNeckletAndFeederDogTotal(resultUser.getUsername());
		String pageCode=PageUtil.getPagation(request.getContextPath()+"/hamlet/hamletpage.do", total, Integer.parseInt(page), 6);
		data.put("pageCode", pageCode);
		JSONObject jsStr = JSONObject.fromObject(data);
		return jsStr.toString();
	}
	
	@RequestMapping(value="/hamletpage", produces="text/html;charset=UTF-8")
	@ResponseBody
	public String GoToHamletPage(@RequestParam(value="page",required=false)String page,HttpServletRequest request) {
		HttpSession session=request.getSession();
		if(session.getAttribute("currentUser")==null){;
			return "redirect:/login.jsp";
		}
		if(StringUtil.isEmpty(page)){
			page="1";
		}
		Managers resultUser= (Managers) session.getAttribute("currentUser");
		PageBean pageBean=new PageBean(Integer.parseInt(page),6);
		Map<String,Object> combineneckletandfeederdoglist = new HashMap<String,Object>();
		combineneckletandfeederdoglist = hamletService.CombineNeckletAndFeederDogList(pageBean,resultUser.getUsername());
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("data8", combineneckletandfeederdoglist);
		int total=hamletService.CombineNeckletAndFeederDogTotal(resultUser.getUsername());
		String pageCode=PageUtil.getPagation(request.getContextPath()+"/hamlet/hamletpage.do", total, Integer.parseInt(page), 6);
		data.put("pageCode", pageCode);
		JSONObject jsStr = JSONObject.fromObject(data);
		return jsStr.toString();
	}
}

package com.watchdog.service;

import java.util.Map;

import com.watchdog.model.Managers;
import com.watchdog.model.PageBean;

public interface HamletService {

	public Map<String, Object> Getuser_page_farmDogList(PageBean pageBean, String username);

	public Map<String, Object> GetHamletMap(String province, String city, String county, String village, String hamlet);

	public String GovToEchartsAreaName(String city);

	public Map<String, Object> Getupuser_page_farmDogFeederList(String province, String city, String county,
			String village, String hamlet);

	public Map<String, Object> GetHamletFeederMap(String province, String city, String county, String village,
			String hamlet);

	public Map<String, Object> GetLevel6AdminDogNum(String username);

	public Integer Getuser_page_farmDogListtotal(String username);

	public Map<String, Object> CombineNeckletAndFeederDogList(PageBean pageBean, String username);

	public Integer CombineNeckletAndFeederDogTotal(String username);
	
	
}

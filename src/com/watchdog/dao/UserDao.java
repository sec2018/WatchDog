package com.watchdog.dao;

import java.util.Map;

import com.watchdog.model.Managers;
import com.watchdog.model.User;

public interface UserDao {
	
	public Managers login(Managers manager);

	public Map<String, Integer> GetIndexLogoInfo(Managers manager);
	
	public Map<String, Object> GetCountryMap();

	public Map<String, Object> GetXinJiangArmyCountryMap();
	
	public Managers checklogin(String username);
}

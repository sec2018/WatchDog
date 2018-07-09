package com.watchdog.service;

import java.util.Map;

import com.watchdog.model.Managers;
import com.watchdog.model.User;

public interface UserService {

	public Managers login(Managers manager);
	
	public Map<String, Integer> GetIndexLogoInfo(Managers resultUser);

	public Map<String, Object> GetCountryMap();

	public Map<String, Object> GetXinJiangArmyCountryMap();
	
	public Managers checklogin(String username);
}


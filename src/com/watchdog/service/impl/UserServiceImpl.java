package com.watchdog.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.watchdog.dao.UserDao;
import com.watchdog.model.Managers;
import com.watchdog.model.User;
import com.watchdog.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Resource
	private UserDao userDao;
	
	@Override
	public Managers login(Managers manager) {
		return userDao.login(manager);
	}

	@Override
	public Map<String, Integer> GetIndexLogoInfo(Managers manager) {
		// TODO Auto-generated method stub
		return userDao.GetIndexLogoInfo(manager);
	}
	
	@Override
	public Map<String, Object> GetCountryMap(){
		return userDao.GetCountryMap();
	}

	@Override
	public Map<String, Object> GetXinJiangArmyCountryMap(){
		return userDao.GetXinJiangArmyCountryMap();
	}
	
	public Managers checklogin(String username) {
		return userDao.checklogin(username);
	}
}

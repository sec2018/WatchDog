package com.watchdog.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.watchdog.dao.CityDao;
import com.watchdog.dao.CountyDao;
import com.watchdog.dao.VillageDao;
import com.watchdog.service.CityService;
import com.watchdog.service.CountyService;
import com.watchdog.service.VillageService;
@Service("villageService")
public class VillageServiceImpl implements VillageService {


	@Resource
	private VillageDao villageDao;

	@Override
	public Map<String, Integer> GetIndexLogoInfo(String provinceName, String cityName, String countyName,String villageName) {
 
		return villageDao.GetIndexLogoInfo(provinceName, cityName, countyName,villageName);
	}

	@Override
	public Map<String, Object> GetVillageMap(String provinceName, String cityName, String countyName,String villageName) {
		// TODO Auto-generated method stub
		return villageDao.GetVillageMap(provinceName, cityName, countyName, villageName);
	}

	@Override
	public Map<String, Object> GetDistrictcode(String provinceName, String cityName, String countyName,String villageName) {
		// TODO Auto-generated method stub
		return villageDao.GetDistrictcode(provinceName, cityName, countyName,villageName);
	}
	
 

}

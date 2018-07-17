package com.watchdog.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.watchdog.dao.CityDao;
import com.watchdog.dao.CountyDao;
import com.watchdog.service.CityService;
import com.watchdog.service.CountyService;
@Service("countyService")
public class CountyServiceImpl implements CountyService {


	@Resource
	private CountyDao countyDao;

	@Override
	public Map<String, Integer> GetIndexLogoInfo(String provinceName, String cityName, String countyName) {
 
		return countyDao.GetIndexLogoInfo(provinceName, cityName, countyName);
	}

	@Override
	public Map<String, Object> GetCountyMap(String provinceName, String cityName, String countyName) {
		// TODO Auto-generated method stub
		return countyDao.GetCountyMap(provinceName, cityName, countyName);
	}

	@Override
	public Map<String, Object> GetDistrictcode(String provinceName, String cityName, String countyName) {
		// TODO Auto-generated method stub
		return countyDao.GetDistrictcode(provinceName, cityName, countyName);
	}
	
 

}

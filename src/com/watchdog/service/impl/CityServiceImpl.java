package com.watchdog.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.watchdog.dao.CityDao;
import com.watchdog.service.CityService;
@Service("cityService")
public class CityServiceImpl implements CityService {


	@Resource
	private CityDao cityDao;
	
	@Override
	public Map<String, Integer> GetIndexLogoInfo(String provincename, String cityname) {
		return cityDao.GetIndexLogoInfo(provincename, cityname);
	}

	@Override
	public Map<String, Integer> GetDivisionIndexLogo(String provincename,String cityname) {
		// TODO Auto-generated method stub
		return cityDao.GetDivisionIndexLogo(provincename, cityname);
	}

	@Override
	public Map<String, Object> GetCityMap(String provincename,String cityname) {
		// TODO Auto-generated method stub
		return cityDao.GetCityMap(provincename, cityname);
	}

	@Override
	public Map<String, Object> GetArmyCityMap(String provincename,String cityname) {
		// TODO Auto-generated method stub
		return cityDao.GetArmyCityMap(provincename, cityname);
	}


	@Override
	public Map<String, Object> GetDistrictcode(String provincename,String cityname) {
		// TODO Auto-generated method stub
		return cityDao.GetDistrictcode(provincename, cityname );
	}


}

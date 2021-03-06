package com.watchdog.service;

import java.util.Map;

import com.watchdog.model.Managers;

public interface CountyService {

	public Map<String, Integer> GetIndexLogoInfo(String provinceName,String cityName,String countyName);
    public Map<String, Object> GetCountyMap(String provinceName,String cityName,String countyName);
	public Map<String, Object> GetDistrictcode(String provinceName,String cityName,String countyName);
}

package com.watchdog.dao;

import java.util.Map;

import com.watchdog.model.Managers;

public interface ProvinceDao {
	public Map<String, Integer> GetIndexLogoInfo(String provincename);
    public Map<String, Integer> GetArmyIndexLogo(String provincename);
    public Map<String, Object> GetProvinceMap(String provincename);
    public Map<String, Object> GetArmyProvinceMap(String provincename);
	public Map<String, Object> GetDistrictcode(String provincename);
	
}

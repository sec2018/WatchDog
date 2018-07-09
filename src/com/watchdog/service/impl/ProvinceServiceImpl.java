package com.watchdog.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.watchdog.dao.ProvinceDao;
import com.watchdog.dao.UserDao;
import com.watchdog.model.Managers;
import com.watchdog.service.ProvinceService;
@Service("provinceService")
public class ProvinceServiceImpl implements ProvinceService {


	@Resource
	private ProvinceDao provinceDao;
	@Override
	public Map<String, Integer> GetIndexLogoInfo(Managers manager,String provincename) {
		// TODO Auto-generated method stub
		return provinceDao.GetIndexLogoInfo(manager,provincename);
	}

	@Override
	public Map<String, Integer> GetArmyIndexLogo(Managers manager,String provincename) {
		// TODO Auto-generated method stub
		return provinceDao.GetArmyIndexLogo(manager,provincename);
	}

	@Override
	public Map<String, Object> GetProvinceMap(String provincename) {
		// TODO Auto-generated method stub
		return provinceDao.GetProvinceMap(provincename);
	}

	@Override
	public Map<String, Object> GetArmyProvinceMap(String provincename) {
		// TODO Auto-generated method stub
		return provinceDao.GetArmyProvinceMap(provincename);
	}

	@Override
	public String GovToEchartsAreaName(String provincename) {
		// TODO Auto-generated method stub
		return provinceDao.GovToEchartsAreaName(provincename);
	}

	@Override
	public Map<String, Object> GetDistrictcode(String provincename) {
		// TODO Auto-generated method stub
		return provinceDao.GetDistrictcode(provincename);
	}

}

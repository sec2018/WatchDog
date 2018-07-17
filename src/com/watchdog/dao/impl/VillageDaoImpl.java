package com.watchdog.dao.impl;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Repository;

import com.watchdog.dao.CityDao;
import com.watchdog.dao.CountyDao;
import com.watchdog.dao.VillageDao;
import com.watchdog.model.Districts;
import com.watchdog.model.Managers;
import com.watchdog.model.Sheepdogs;
import com.watchdog.util.NameConversionUtil;
@Repository("villageDao")
public class VillageDaoImpl implements VillageDao {

    private SqlSession session;
	
	public VillageDaoImpl(){
		//使用类加载器加载mybatis的配置文件(它也加载关联的映射文件)
        String resource = "mybatis-config.xml";
        Reader reader;
		try {
			reader = Resources.getResourceAsReader(resource);
			SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();      
	        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(reader);
	        session = sqlSessionFactory.openSession();
		}catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	@Override
	public Map<String, Integer> GetIndexLogoInfo(String provinceName,String cityName, String countyName,String villageName) {	
		provinceName = NameConversionUtil.EchartsAreaNameToGov(session, provinceName);
		cityName = NameConversionUtil.EchartsAreaNameToGov(session, cityName);
		countyName = NameConversionUtil.EchartsAreaNameToGov(session, countyName);
		Map<String, Integer> map = new HashMap<String,Integer>();		 
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("provinceName", provinceName);
		mapparam.put("cityName", cityName);
		mapparam.put("countyName", countyName);
		mapparam.put("villageName", villageName);
		//获得地区编号前两位(省)
		String statement = "com.watchdog.dao.VillageDao.getProvince";//映射sql的标识字符串  
		Districts province = session.selectOne(statement,mapparam);
		String provinceCode = province.getDistrictcode();
		String provincCode0to2 = provinceCode.substring(0,2);
		mapparam.put("provincCode0to2", provincCode0to2);
		//获得地区编号前四位(市)
		statement = "com.watchdog.dao.VillageDao.getCity";//映射sql的标识字符串  
		Districts city = session.selectOne(statement,mapparam);
		String cityCode = city.getDistrictcode();
		String cityCode0to4 = cityCode.substring(0,4);	
		mapparam.put("cityCode0to4", cityCode0to4);
		//获得地区编号前六位(县)
		statement = "com.watchdog.dao.VillageDao.getCounty";//映射sql的标识字符串  
		Districts county= session.selectOne(statement,mapparam);
		String countyCode = county.getDistrictcode();
		String countyCode0to6 = countyCode.substring(0,6);	
		mapparam.put("countyCode0to6", countyCode0to6); 	
		//获得地区编号前九位(乡)
		statement = "com.watchdog.dao.VillageDao.getVillage";//映射sql的标识字符串  
		Districts village= session.selectOne(statement,mapparam);
		String villageCode = village.getDistrictcode();
		String villageCode0to9 = villageCode.substring(0,9);	
		mapparam.put("villageCode0to9", villageCode0to9); 		
		
		List<Sheepdogs> sdlist = null;
		statement = "com.watchdog.dao.VillageDao.getVillageIndexInfo";//映射sql的标识字符串  
		
		sdlist = session.selectList(statement, mapparam);
		//佩戴项圈牧犬数量和喂食器数量
		int neckDogNumTotal = 0;
		int feederNumTotal = 0;
		for(Sheepdogs each:sdlist){
			if(!each.getNeckletid().equals("-1")) {//"-1"表示未佩戴项圈
				neckDogNumTotal++;
			}
			if(!each.getApparatusid().equals("-1")) {//"-1"表示无喂食器
				feederNumTotal++;
			}
		}
		statement = "com.watchdog.dao.VillageDao.getExhiCount";//映射sql的标识字符串  
		int med1 = session.selectOne(statement, mapparam);//投药次数
		statement = "com.watchdog.dao.VillageDao.getAppexhiCount";//映射sql的标识字符串  
		int med2 = session.selectOne(statement, mapparam);//喂食次数
		int medNumTotal = med1 + med2;//驱虫总次数
		List<Districts> dislist = new ArrayList<Districts>();
		//获得以上九位数字开头的编号对应的所有区域的信息
		statement = "com.watchdog.dao.VillageDao.ywDisctricts";//映射sql的标识字符串  
		dislist = session.selectList(statement,mapparam);
		
        //村流行区数量
		int hamletEpidemicTotal = 0;	
		for(Districts each : dislist) {
			if(each.getEpidemic() == 1) {//该区域为流行区
					hamletEpidemicTotal++;	
			}
		}
		List<Integer> levellist = new ArrayList<Integer>();
		statement = "com.watchdog.dao.VillageDao.getManagerLevel";//映射sql的标识字符串  
		levellist = session.selectList(statement,mapparam);
		//乡、村级管理员数
		int villageAdminTotal = 0;
		int hamletAdminTotal = 0;

			for(Integer each:levellist) {
				switch(each) {
	            case 5:
	            	villageAdminTotal++;
	                break;
	            case 6:
	            	hamletAdminTotal++;
	                break;
				}
			}
		
		//将数据保存到map中
		map.put("hamletepidemictotal",  hamletEpidemicTotal-1);

		map.put("villageadmintotal", villageAdminTotal);
		map.put("hamletadmintotal", hamletAdminTotal);
		
		statement = "com.watchdog.dao.VillageDao.getAllDogNum";//映射sql的标识字符串  
		int allDogNumTotal = session.selectOne(statement,mapparam);
		map.put("neckdognumtotal", neckDogNumTotal);
		map.put("alldognumtotal",allDogNumTotal);
		map.put("countrymednumtotal", medNumTotal);
		map.put("feedernumtotal", feederNumTotal);
	   return map;
	}

	 

	@Override
	public Map<String, Object> GetVillageMap(String provinceName, String cityName, String countyName, String villageName) {
		provinceName = NameConversionUtil.EchartsAreaNameToGov(session,provinceName);
		cityName = NameConversionUtil.EchartsAreaNameToGov(session,cityName);
		countyName = NameConversionUtil.EchartsAreaNameToGov(session,countyName);
		villageName = NameConversionUtil.EchartsAreaNameToGov(session,villageName);
 
		Map<String, Object> map = new HashMap<String,Object>();//保存请求返回的数据
		Map<String, String> mapparam = new HashMap<String,String>();//sql参数
		mapparam.put("provinceName", provinceName);
		String statement = "com.watchdog.dao.VillageDao.getProvinceMap";//映射sql的标识字符串   
		String thisProvince = session.selectOne(statement,mapparam);//获得省区域编码
	    String thisProvince0to2 = thisProvince.substring(0, 2);//编码前两位表示省份
	    mapparam.put("thisProvince0to2", thisProvince0to2);
	    mapparam.put("cityName", cityName);
	    statement = "com.watchdog.dao.VillageDao.getCityMap";//映射sql的标识字符串      
	    String thisCity = session.selectOne(statement,mapparam);//获得市区域编码
	    String thisCity0to4 = thisCity.substring(0, 4);//编码前四位表示市
	    mapparam.put("thisCity0to4", thisCity0to4);
	    
	    mapparam.put("countyName", countyName);
	    statement = "com.watchdog.dao.VillageDao.getCountyMap";//映射sql的标识字符串      
	    String thisCounty = session.selectOne(statement,mapparam);//获得县区域编码
	    String thisCounty0to6 = thisCounty.substring(0, 6);//编码前六位表示县 	    
	    mapparam.put("thisCounty0to6", thisCounty0to6);
	    
	    mapparam.put("villageName", villageName);
	    statement = "com.watchdog.dao.VillageDao.getVillageMap";//映射sql的标识字符串      
	    String thisVillage = session.selectOne(statement,mapparam);//获得乡区域编码
	    String thisVillage0to9 = thisVillage.substring(0, 9);//编码前六位表示县 	    
	    mapparam.put("thisVillage0to9", thisVillage0to9);
		statement = "com.watchdog.dao.VillageDao.getHamlets";//映射sql的标识字符串  
		//获得流行村
		List<Districts> hamlets = session.selectList(statement,mapparam);
		int i=0;
		for(Districts pro : hamlets)
        { 
			//对于每个流行村
         
        	//保存每个村的相关信息
        	Map<String, Object> maptemp = new HashMap<String,Object>();
			maptemp.put("harmletname", pro.getShortname());
			String hamletCode = pro.getDistrictcode();
			
			//计算该县管理员总数
			statement = "com.watchdog.dao.VillageDao.getManagerNum";//映射sql的标识字符串  
			mapparam.put("districtName", pro.getDistrictname());
			int managerNum = session.selectOne(statement,mapparam);
			maptemp.put("managernum", managerNum);
			//计算牧犬总数
			statement = "com.watchdog.dao.VillageDao.getAllNecketId";//映射sql的标识字符串  
			mapparam.put("hamletCode", hamletCode);
			List<String> dogNumList = session.selectList(statement,mapparam);
			maptemp.put("dognum", dogNumList.size());
			//计算项圈总数
			int neckletNum = 0;
			for(String n1:dogNumList) {
				//"-1"表示未佩戴项圈
				if(!n1.equals("-1")) {
					neckletNum++;
				}
			}
			maptemp.put("neckletnum", neckletNum);
			//经纬度
			maptemp.put("lng", pro.getLng());
			maptemp.put("lat", pro.getLat());
			//计算投药总次数
			statement = "com.watchdog.dao.VillageDao.getCountExhibitrealtime";//映射sql的标识字符串  
			int medNum = session.selectOne(statement,mapparam);
			maptemp.put("mednum", medNum);
			//计算喂食次数
			statement = "com.watchdog.dao.VillageDao.getCountAppexhibitrealtime";//映射sql的标识字符串  
			int feednum = session.selectOne(statement,mapparam);
			maptemp.put("feedernum", feednum);	

			map.put(""+i, maptemp);
			
			i++;
            
        }
		return map;
	}

 
	@Override
	public Map<String, Object> GetDistrictcode(String provinceName, String cityName, String countyName,String villageName) {
		Map<String, Object> map = new HashMap<String,Object>();
		Map<String, Object> mapparam = new HashMap<String,Object>();
	
		mapparam.put("provinceName", provinceName);
		mapparam.put("cityName", cityName);
		mapparam.put("countyName", countyName);
		mapparam.put("villageName", villageName);
		//获得地区编号前两位(省)
		String statement = "com.watchdog.dao.VillageDao.getProvince";//映射sql的标识字符串  
		Districts province = session.selectOne(statement,mapparam);
		String provinceCode = province.getDistrictcode();
		String provinceCode0to2 = provinceCode.substring(0,2);	
		mapparam.put("provinceCode0to2", provinceCode0to2);
		//获得地区编号前四位(师)
		statement = "com.watchdog.dao.VillageDao.getCity";//映射sql的标识字符串  
		Districts city = session.selectOne(statement,mapparam);
		String cityCode = city.getDistrictcode();
		String cityCode0to4 = cityCode.substring(0,4);	
		mapparam.put("cityCode0to4", cityCode0to4);		
		//获得地区编号前六(县)
		statement = "com.watchdog.dao.VillageDao.getCounty";//映射sql的标识字符串  
		Districts county = session.selectOne(statement,mapparam);
		String countyCode = county.getDistrictcode();
		String countyCode0to6 = countyCode.substring(0,6);	
		mapparam.put("countyCode0to6", countyCode0to6);	
		//获得地区编号(乡)
		statement = "com.watchdog.dao.VillageDao.getVillage";//映射sql的标识字符串  
		Districts village = session.selectOne(statement,mapparam);
		String villageCode = village.getDistrictcode();
		
		map.put("villageGov",NameConversionUtil.EchartsAreaNameToGov(session, villageName));
		map.put("villageEchartsAreaName",NameConversionUtil.GovToEchartsAreaName(session, villageName).replace("*",""));
		map.put("countyGov",NameConversionUtil.EchartsAreaNameToGov(session, countyName));
		map.put("countyEchartsAreaName",NameConversionUtil.GovToEchartsAreaName(session, countyName).replace("*",""));
		map.put("cityGov",NameConversionUtil.EchartsAreaNameToGov(session, cityName));
		map.put("cityEchartsAreaName",NameConversionUtil.GovToEchartsAreaName(session, cityName).replace("*",""));
		map.put("provinceGov",NameConversionUtil.EchartsAreaNameToGov(session, provinceName));
		map.put("provinceEchartsAreaName",NameConversionUtil.GovToEchartsAreaName(session, provinceName).replace("*",""));
		map.put("districtcode",villageCode);
		return map;
		
	}
 

}

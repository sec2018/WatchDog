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

import com.watchdog.dao.ProvinceDao;
import com.watchdog.model.Districts;
import com.watchdog.model.Managers;
import com.watchdog.model.Sheepdogs;
@Repository("provinceDao")
public class ProvinceDaoImpl implements ProvinceDao {

    private SqlSession session;
	
	public ProvinceDaoImpl(){
		//使用类加载器加载mybatis的配置文件（它也加载关联的映射文件）  
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
	public Map<String, Integer> GetIndexLogoInfo(String provincename) {	
		provincename = EchartsAreaNameToGov(provincename);
		Map<String, Integer> map = new HashMap<String,Integer>();		 
		Districts districtsist = null;
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("provincename", provincename);
		String statement="";
		//获得该地区地区编号前两位(省)
		statement = "com.watchdog.dao.ProvinceDao.getdistrictsist";//映射sql的标识字符串  
		districtsist = session.selectOne(statement,mapparam);
		String provincecode = districtsist.getDistrictcode();
		String provincecode0to2 = provincecode.substring(0,2);	

		List<Sheepdogs> sdlist = null;
		statement = "com.watchdog.dao.ProvinceDao.getprovinceindexinfo";//映射sql的标识字符串  
        //执行查询返回一个唯一user对象的sql  
		mapparam.put("provincecode0to2", provincecode0to2);
		sdlist = session.selectList(statement, mapparam);
		//佩戴项圈牧犬数量和喂食器数量
		int neckdognumtotal = 0;
		int feedernumtotal = 0;
		for(Sheepdogs each:sdlist){
			if(!each.getNeckletid().equals("-1")) {//"-1"表示未佩戴项圈
				neckdognumtotal++;
			}
			if(!each.getApparatusid().equals("-1")) {//"-1"表示无喂食器
				feedernumtotal++;
			}
		}
		statement = "com.watchdog.dao.ProvinceDao.getexhicount";//映射sql的标识字符串  
		int med1 = session.selectOne(statement, mapparam);//投药次数
		statement = "com.watchdog.dao.ProvinceDao.getappexhicount";//映射sql的标识字符串  
		int med2 = session.selectOne(statement, mapparam);//喂食次数
		int mednumtotal = med1 + med2;//驱虫总次数
		List<Districts> dislist = new ArrayList<Districts>();
		//获得以上面两位数字开头的编号对应的所有区域信息
		statement = "com.watchdog.dao.ProvinceDao.ywdisctricts";//映射sql的标识字符串  
		dislist = session.selectList(statement,mapparam);
		
        //市、县、乡、村流行区数量
		int cityepidemictotal = 0;	
		int countyepidemictotal = 0;
		int villageepidemictotal = 0;
		int hamletepidemictotal = 0;
		
		for(Districts each : dislist) {
			if(each.getEpidemic() == 1) {//该区域为流行区
				//根据区域编码将区域分类，如xx0000000000为省，xxxx00000000表明该区域为市级，xxxxxx000000为县级，xxxxxxxx0000为乡级，最后一位不为0则表示村级
				if(each.getDistrictcode().substring(4, 12).equals("00000000")) {
					cityepidemictotal++;
				}
				else if(each.getDistrictcode().substring(6,12).equals("000000")) {
					countyepidemictotal++;
				}
				else if(each.getDistrictcode().substring(9,12).equals("000")) {
					villageepidemictotal++;
				}else
					hamletepidemictotal++;
			}
		
		}
		List<Integer> levellist = new ArrayList<Integer>();
		statement = "com.watchdog.dao.ProvinceDao.getmanagerlevel";//映射sql的标识字符串  
		levellist = session.selectList(statement,mapparam);
		//省、市、县、乡、村级管理员数
		int provinceadmintotal = 0;
		int cityadmintotal = 0;
		int countyadmintotal = 0;
		int villageadmintotal = 0;
		int hamletadmintotal = 0;

	
			for(Integer each:levellist) {
				switch(each) {
	            case 2:
	                provinceadmintotal++;
	                break;
	            case 3:
	                cityadmintotal++;
	                break;
	            case 4:
	                countyadmintotal++;
	                break;
	            case 5:
	                villageadmintotal++;
	                break;
	            case 6:
	                hamletadmintotal++;
	                break;
				}
			}
		
		//将数据保存到map中
		map.put("cityepidemictotal", cityepidemictotal-1);
		map.put("countyepidemictotal", countyepidemictotal);
		map.put("villageepidemictotal", villageepidemictotal);
		map.put("hamletepidemictotal",  hamletepidemictotal);
		map.put("provinceadmintotal", provinceadmintotal);
		map.put("cityadmintotal", cityadmintotal);
		map.put("countyadmintotal", countyadmintotal);
		map.put("villageadmintotal", villageadmintotal);
		map.put("hamletadmintotal", hamletadmintotal);
		
		statement = "com.watchdog.dao.ProvinceDao.getalldognum";//映射sql的标识字符串  
		mapparam.put("provincecode", provincecode);
		int alldognumtotal = session.selectOne(statement,mapparam);
		
		map.put("neckdognumtotal", neckdognumtotal);
		map.put("alldognumtotal",alldognumtotal );
		map.put("countrymednumtotal", mednumtotal);
		map.put("feedernumtotal", feedernumtotal);
	   return map;
	}

	@Override
	public Map<String, Integer> GetArmyIndexLogo(String provincename) {
		provincename = EchartsAreaNameToGov(provincename);
 
		Map<String, Integer> map = new HashMap<String,Integer>();		 
		Districts districtsist = null;
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("provincename", provincename);
		String statement="";
		//获得该地区地区编号前两位(省)	
		statement = "com.watchdog.dao.ProvinceDao.getdistrictsist";//映射sql的标识字符串  
		districtsist = session.selectOne(statement,mapparam);
		String provincecode = districtsist.getDistrictcode();
		String provincecode0to2 = provincecode.substring(0,2);
		

		List<Sheepdogs> sdlist = null;
		statement = "com.watchdog.dao.ProvinceDao.getprovinceindexinfo";//映射sql的标识字符串  
        //执行查询返回一个唯一user对象的sql  
		mapparam.put("provincecode0to2", provincecode0to2);
		sdlist = session.selectList(statement, mapparam);
		//佩戴项圈牧犬数量和喂食器数量
		int neckdognumtotal = 0;
		int feedernumtotal = 0;
		for(Sheepdogs each:sdlist){
			if(!each.getNeckletid().equals("-1")) {//"-1"表示未佩戴项圈
				neckdognumtotal++;
			}
			if(!each.getApparatusid().equals("-1")) {//"-1"表示无喂食器
				feedernumtotal++;
			}
		}
		statement = "com.watchdog.dao.ProvinceDao.getexhicount";//映射sql的标识字符串  
		int med1 = session.selectOne(statement, mapparam);//投药次数
		statement = "com.watchdog.dao.ProvinceDao.getappexhicount";//映射sql的标识字符串  
		int med2 = session.selectOne(statement, mapparam);//喂食次数
		int mednumtotal = med1 + med2;//驱虫总次数
		List<Districts> armylist = new ArrayList<Districts>(); 
		//获得以上面两位数字开头的编号对应的所有区域信息
		statement = "com.watchdog.dao.ProvinceDao.ywdisctricts";//映射sql的标识字符串  
		armylist = session.selectList(statement,mapparam);
		
		//师，团，连流行区数量
		int divisionepidemictotal=0;
		int regimentalepidemictotal=0;
		int companyepidemictotal=0;
		
		for(Districts each : armylist) {
			if(each.getEpidemic() == 1) {//该区域为流行区
				//根据区域编码将区域分类，如xx000000为兵团，xxxx0000表明该区域为师级，xxxxxx00为团级，后两位不全为0则表示连级
				if(each.getDistrictcode().substring(4, 8).equals("0000")) {
					divisionepidemictotal++;
				}
				else if(each.getDistrictcode().substring(6,8).equals("00")) {
					regimentalepidemictotal++;
				}else
					companyepidemictotal++;
			}
		}
		List<Integer> levellist = new ArrayList<Integer>();
		statement = "com.watchdog.dao.ProvinceDao.getmanagerlevel";//映射sql的标识字符串  
		levellist = session.selectList(statement,mapparam);
		//兵团，师，团，连级管理员数量
		int armyadmintotal = 0;
        int divisionadmintotal = 0;
        int regimentaladmintotal = 0;
        int companyadmintotal = 0;

			 for (Integer each:levellist)
	           {
	               switch (each)//根据管理员级别统计各级管理员数量
	               {
	                   case 2:
	                       armyadmintotal++;
	                       break;
	                   case 3:
	                       divisionadmintotal++;
	                       break;
	                   case 4:
	                       regimentaladmintotal++;
	                       break;
	                   case 5:
	                       companyadmintotal++;
	                       break;
	               }
	           }
		
		//将数据保存到map中
		map.put("divisionepidemictotal", divisionepidemictotal-1);
        map.put("regimentalepidemictotal", regimentalepidemictotal);
        map.put("companyepidemictotal",companyepidemictotal);
		map.put("armyadmintotal", armyadmintotal);
        map.put("divisionadmintotal", divisionadmintotal);
        map.put("regimentaladmintotal",regimentaladmintotal);
        map.put("companyadmintotal", companyadmintotal);
		
		statement = "com.watchdog.dao.ProvinceDao.getalldognum";//映射sql的标识字符串  
		mapparam.put("provincecode", provincecode);
		int alldognumtotal = session.selectOne(statement,mapparam);
		
		map.put("neckdognumtotal", neckdognumtotal);
		map.put("alldognumtotal",alldognumtotal );
		map.put("countrymednumtotal", mednumtotal);
		map.put("feedernumtotal", feedernumtotal);
	   return map;
	}

	@Override
	public Map<String, Object> GetProvinceMap(String provincename) {
		provincename = EchartsAreaNameToGov(provincename);
 
		Map<String, Object> map = new HashMap<String,Object>();//保存请求返回的数据
		Map<String, String> mapparam = new HashMap<String,String>();//sql参数
		mapparam.put("provincename", provincename);
		String statement = "com.watchdog.dao.ProvinceDao.getprovincemap";//映射sql的标识字符串  
		 
		String thisprovince = session.selectOne(statement,mapparam);//获得省区域编码
	    String thisprovince1to2 = thisprovince.substring(0, 2);//编码前两位表示省份
	    mapparam.put("thisprovince1to2", thisprovince1to2);
		statement = "com.watchdog.dao.ProvinceDao.ywprovinces";//映射sql的标识字符串  
		//获得流行市和县
		List<Districts> citiesandcounties = session.selectList(statement,mapparam);
		int i=0;
		for(Districts pro : citiesandcounties)
        { 
			//对于每个流行市
            if (pro.getDistrictcode().endsWith("00000000"))
            {
            	//保存每个市的相关信息
            	Map<String, Object> maptemp = new HashMap<String,Object>();
				maptemp.put("cityname", pro.getShortname());
				String city1to4 = pro.getDistrictcode().substring(0, 4);
				int countynum = 0;
				//统计每个流行市所属流行县的个数
				for(Districts cn:citiesandcounties) {
					if(cn.getDistrictcode().startsWith(city1to4) && cn.getDistrictcode().endsWith("000000") 
							&& !cn.getDistrictcode().equals(city1to4+"00000000")) {
						countynum++;
					}
				}
				//该市流行县数
				maptemp.put("countynum", countynum);
				//计算该市管理员总数
				statement = "com.watchdog.dao.ProvinceDao.getmanagernum";//映射sql的标识字符串  
				mapparam.put("districtname", pro.getDistrictname());
				int managernum = session.selectOne(statement,mapparam);
				maptemp.put("managernum", managernum);
				//计算牧犬总数
				statement = "com.watchdog.dao.ProvinceDao.getallnecketid";//映射sql的标识字符串  
				mapparam.put("city1to4", city1to4);
				List<String> dognumlist = session.selectList(statement,mapparam);
				maptemp.put("dognum", dognumlist.size());
				//计算项圈总数
				int neckletnum = 0;
				for(String n1:dognumlist) {
					//"-1"表示未佩戴项圈
					if(!n1.equals("-1")) {
						neckletnum++;
					}
				}
				maptemp.put("neckletnum", neckletnum);
				//计算投药总次数
				statement = "com.watchdog.dao.ProvinceDao.getcountexhibitrealtime";//映射sql的标识字符串  
				int mednum = session.selectOne(statement,mapparam);
				maptemp.put("mednum", mednum);
				//计算喂食器数量
				statement = "com.watchdog.dao.ProvinceDao.getcountappexhibitrealtime";//映射sql的标识字符串  
				int feednum = session.selectOne(statement,mapparam);
				maptemp.put("feedernum", feednum);			
				
				map.put(""+i, maptemp);
				
				i++;
            }
        }

		return map;
	}

	@Override
	public Map<String, Object> GetArmyProvinceMap(String provincename) {
		Map<String, Object> map = new HashMap<String,Object>();
		Map<String, String> mapparam = new HashMap<String,String>();//sql参数
		mapparam.put("provincename", provincename);
		String statement = "com.watchdog.dao.ProvinceDao.getprovincemap";//映射sql的标识字符串  
		 
		String thisprovince = session.selectOne(statement,mapparam);
	    String thisprovince1to2 = thisprovince.substring(0, 2);
	    mapparam.put("thisprovince1to2", thisprovince1to2);
	  //获得流行师和团
		statement = "com.watchdog.dao.ProvinceDao.ywarmyprovinces";//映射sql的标识字符串  
		List<Districts> divisionsandregimental = session.selectList(statement,mapparam);
		int i=0;
		for(Districts divisions : divisionsandregimental)
        { 
			//对于每个流行师
            if (divisions.getDistrictcode().endsWith("0000"))
            {
            	//保存每个师的相关信息
            	Map<String, Object> maptemp = new HashMap<String,Object>();
				maptemp.put("divisionname", divisions.getDistrictname());
				String regimental1to4 = divisions.getDistrictcode().substring(0, 4);
				int regimentalnum = 0;
				//统计每个流行师所属流行团的个数
				for(Districts rt:divisionsandregimental) {
					if(rt.getDistrictcode().startsWith(regimental1to4) && rt.getDistrictcode().endsWith("00") 
							&& !rt.getDistrictcode().equals(regimental1to4+"0000")) {					 
						regimentalnum++;
					}
				}
				maptemp.put("regimentalnum", regimentalnum);
				//计算该师管理员总数
				statement = "com.watchdog.dao.ProvinceDao.getmanagernum";//映射sql的标识字符串  
				mapparam.put("districtname", divisions.getDistrictname());
				int managernum = session.selectOne(statement,mapparam);
				maptemp.put("managernum", managernum);
				//计算牧犬总数
				statement = "com.watchdog.dao.ProvinceDao.getarmyallnecketid";//映射sql的标识字符串  
				mapparam.put("regimental1to4", regimental1to4);
				List<String> dognumlist = session.selectList(statement,mapparam);
				maptemp.put("dognum", dognumlist.size());
				//计算项圈总数
				int neckletnum = 0;
				for(String n1:dognumlist) {
					//"-1"表示未佩戴项圈
					if(!n1.equals("-1")) {
						neckletnum++;
					}
				}
				maptemp.put("neckletnum", neckletnum);
				//经纬度
				maptemp.put("lng", divisions.getLng());
				maptemp.put("lat", divisions.getLat());
				//计算投药次数
				statement = "com.watchdog.dao.ProvinceDao.getarmycountexhibitrealtime";//映射sql的标识字符串  
				int mednum = session.selectOne(statement,mapparam);
				maptemp.put("mednum", mednum);
				//计算喂食次数
				statement = "com.watchdog.dao.ProvinceDao.getarmycountappexhibitrealtime";//映射sql的标识字符串  
				int feednum = session.selectOne(statement,mapparam);
				maptemp.put("feedernum", feednum);	
 
				map.put(""+i, maptemp);
				i++;
            }
        }

		return map;
	}

	@Override
	public Map<String, Object> GetDistrictcode(String provincename) {
		Map<String, Object> map = new HashMap<String,Object>();
		Map<String, Object> mapparam = new HashMap<String,Object>();
		Districts districtsist = null;
		mapparam.put("provincename", provincename);
		String statement = "com.watchdog.dao.ProvinceDao.getdistrictsist";//映射sql的标识字符串  
		
		districtsist = session.selectOne(statement,mapparam);
		String provincecode = districtsist.getDistrictcode();
		map.put("province",GovToEchartsAreaName(provincename).replace("*",""));
		map.put("districtcode",provincecode);
		return map;
	}
	@Override
	public String GovToEchartsAreaName(String areaname) {
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("areaname", areaname);
		String statement = "com.watchdog.dao.ProvinceDao.echartsareanametemp";//映射sql的标识字符串  
		String echartsareaname =  session.selectOne(statement, mapparam);
        
        return echartsareaname;
	}
	
	public String EchartsAreaNameToGov(String areaname) {
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("areaname", areaname);
		String statement = "com.watchdog.dao.ProvinceDao.govareanametemp";//映射sql的标识字符串  
		String govareaname =  session.selectOne(statement, mapparam);
	 
		
		return govareaname;
	}



}

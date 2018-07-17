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
import com.watchdog.model.Districts;
import com.watchdog.model.Managers;
import com.watchdog.model.Sheepdogs;
import com.watchdog.util.NameConversionUtil;
@Repository("cityDao")
public class CityDaoImpl implements CityDao {

    private SqlSession session;
	
	public CityDaoImpl(){
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
	public Map<String, Integer> GetIndexLogoInfo(String provincename,String cityname) {	
		provincename = NameConversionUtil.EchartsAreaNameToGov(session, provincename);
		cityname = NameConversionUtil.EchartsAreaNameToGov(session, cityname);
		Map<String, Integer> map = new HashMap<String,Integer>();		 
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("provincename", provincename);
		mapparam.put("cityname", cityname);
		//获得地区编号前两位(省)
		String statement = "com.watchdog.dao.CityDao.getprovince";//映射sql的标识字符串  
		Districts province = session.selectOne(statement,mapparam);
		String provincecode = province.getDistrictcode();
		String provincecode0to2 = provincecode.substring(0,2);	
		//获得地区编号前四位(市)
		statement = "com.watchdog.dao.CityDao.getcity";//映射sql的标识字符串  
		Districts city = session.selectOne(statement,mapparam);
		String citycode = city.getDistrictcode();
		String citycode0to4 = citycode.substring(0,4);	

		List<Sheepdogs> sdlist = null;
		statement = "com.watchdog.dao.CityDao.getcityindexinfo";//映射sql的标识字符串  

		mapparam.put("provincecode0to2", provincecode0to2);
		mapparam.put("citycode0to4", citycode0to4);
		
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
		statement = "com.watchdog.dao.CityDao.getexhicount";//映射sql的标识字符串  
		int med1 = session.selectOne(statement, mapparam);//投药次数
		statement = "com.watchdog.dao.CityDao.getappexhicount";//映射sql的标识字符串  
		int med2 = session.selectOne(statement, mapparam);//喂食次数
		int mednumtotal = med1 + med2;//驱虫总次数
		List<Districts> dislist = new ArrayList<Districts>();
		//获得以上四位数字开头的编号对应的所有区域的信息
		statement = "com.watchdog.dao.CityDao.ywdisctricts";//映射sql的标识字符串  
		dislist = session.selectList(statement,mapparam);
		
        //县、乡、村流行区数量
		int countyepidemictotal = 0;
		int villageepidemictotal = 0;
		int hamletepidemictotal = 0;
		
		for(Districts each : dislist) {
			if(each.getEpidemic() == 1) {//该区域为流行区
				//根据区域编码将区域分类，如xx0000000000为省，xxxx00000000表明该区域为市级，xxxxxx000000为县级，xxxxxxxxx000为乡级，最后三位不全为0则表示村级
			 if(each.getDistrictcode().substring(6,12).equals("000000")) {
					countyepidemictotal++;
				}
				else if(each.getDistrictcode().substring(9,12).equals("000")) {
					villageepidemictotal++;
				}else
					hamletepidemictotal++;
			}
		
		}
		List<Integer> levellist = new ArrayList<Integer>();
		statement = "com.watchdog.dao.CityDao.getmanagerlevel";//映射sql的标识字符串  
		levellist = session.selectList(statement,mapparam);
		//市、县、乡、村级管理员数
		int cityadmintotal = 0;
		int countyadmintotal = 0;
		int villageadmintotal = 0;
		int hamletadmintotal = 0;

			for(Integer each:levellist) {
				switch(each) {
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
		map.put("countyepidemictotal", countyepidemictotal-1);
		map.put("villageepidemictotal", villageepidemictotal);
		map.put("hamletepidemictotal",  hamletepidemictotal);
		map.put("cityadmintotal", cityadmintotal);
		map.put("countyadmintotal", countyadmintotal);
		map.put("villageadmintotal", villageadmintotal);
		map.put("hamletadmintotal", hamletadmintotal);
		
		statement = "com.watchdog.dao.CityDao.getalldognum";//映射sql的标识字符串  
		mapparam.put("citycode", citycode);
		int alldognumtotal = session.selectOne(statement,mapparam);
		
		map.put("neckdognumtotal", neckdognumtotal);
		map.put("alldognumtotal",alldognumtotal );
		map.put("countrymednumtotal", mednumtotal);
		map.put("feedernumtotal", feedernumtotal);
	   return map;
	}

	@Override
	public Map<String, Integer> GetDivisionIndexLogo(String provincename, String cityname) {
		//兵团名
		provincename = NameConversionUtil.EchartsAreaNameToGov(session, provincename);
		//师名
		cityname = NameConversionUtil.EchartsAreaNameToGov(session, cityname);
		Map<String, Integer> map = new HashMap<String,Integer>();		 
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("provincename", provincename);
		mapparam.put("cityname", cityname);
		//获得地区编号前两位(兵团)
		String statement = "com.watchdog.dao.CityDao.getprovince";//映射sql的标识字符串  
		Districts province = session.selectOne(statement,mapparam);
		String provincecode = province.getDistrictcode();
		String provincecode0to2 = provincecode.substring(0,2);	
		//获得地区编号前四位(师)
		statement = "com.watchdog.dao.CityDao.getcity";//映射sql的标识字符串  
		Districts city = session.selectOne(statement,mapparam);
		String citycode = city.getDistrictcode();
		String citycode0to4 = citycode.substring(0,4);	

		List<Sheepdogs> sdlist = null;
		statement = "com.watchdog.dao.CityDao.getcityindexinfo";//映射sql的标识字符串  

		mapparam.put("provincecode0to2", provincecode0to2);
		mapparam.put("citycode0to4", citycode0to4);
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
		statement = "com.watchdog.dao.CityDao.getexhicount";//映射sql的标识字符串  
		int med1 = session.selectOne(statement, mapparam);//投药次数
		statement = "com.watchdog.dao.CityDao.getappexhicount";//映射sql的标识字符串  
		int med2 = session.selectOne(statement, mapparam);//喂食次数
		int mednumtotal = med1 + med2;//驱虫总次数
		List<Districts> armylist = new ArrayList<Districts>();
		//获得以上面四位数字开头的编号对应的所有区域的信息
		statement = "com.watchdog.dao.CityDao.ywdisctricts";//映射sql的标识字符串  
		armylist = session.selectList(statement,mapparam);
		
		//团，连流行区数量
		int regimentalepidemictotal=0;
		int companyepidemictotal=0;
		
		for(Districts each : armylist) {
			if(each.getEpidemic() == 1) {//该区域为流行区
				//根据区域编码将区域分类，如xx000000为兵团，xxxx0000表明该区域为师级，xxxxxx00为团级，后两位不全为0则表示连级
				if(each.getDistrictcode().substring(6,8).equals("00")) {
					regimentalepidemictotal++;
				}else
					companyepidemictotal++;
			}
		
		}
		List<Integer> levellist = new ArrayList<Integer>();
		statement = "com.watchdog.dao.CityDao.getmanagerlevel";//映射sql的标识字符串  
		levellist = session.selectList(statement,mapparam);
		//师，团，连级管理员数量
        int divisionadmintotal = 0;
        int regimentaladmintotal = 0;
        int companyadmintotal = 0;

			for(Integer each:levellist) {
				switch(each) {
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
		map.put("regimentalepidemictotal", regimentalepidemictotal);
		map.put("companyepidemictotal",  companyepidemictotal);
		map.put("divisionadmintotal", divisionadmintotal);
		map.put("regimentaladmintotal", regimentaladmintotal);
		map.put("companyadmintotal", companyadmintotal);
		
		statement = "com.watchdog.dao.CityDao.getalldognum";//映射sql的标识字符串  
		mapparam.put("citycode", citycode);
		int alldognumtotal = session.selectOne(statement,mapparam);
		
		map.put("neckdognumtotal", neckdognumtotal);
		map.put("alldognumtotal",alldognumtotal );
		map.put("countrymednumtotal", mednumtotal);
		map.put("feedernumtotal", feedernumtotal);
	   return map;
	}

	@Override
	public Map<String, Object> GetCityMap(String provincename, String cityname) {
		provincename = NameConversionUtil.EchartsAreaNameToGov(session,provincename);
		cityname = NameConversionUtil.EchartsAreaNameToGov(session,cityname);
 
		Map<String, Object> map = new HashMap<String,Object>();//保存请求返回的数据
		Map<String, String> mapparam = new HashMap<String,String>();//sql参数
		mapparam.put("provincename", provincename);
		String statement = "com.watchdog.dao.CityDao.getprovincemap";//映射sql的标识字符串   
		String thisprovince = session.selectOne(statement,mapparam);//获得省区域编码
	    String thisprovince1to2 = thisprovince.substring(0, 2);//编码前两位表示省份
	    mapparam.put("thisprovince1to2", thisprovince1to2);
	    
	    mapparam.put("cityname", cityname);
	    statement = "com.watchdog.dao.CityDao.getcitymap";//映射sql的标识字符串      
	    String thiscity = session.selectOne(statement,mapparam);//获得市区域编码
	    String thiscity1to4 = thiscity.substring(0, 4);//编码前四位表示市
	    
	    mapparam.put("thiscity1to4", thiscity1to4);
		statement = "com.watchdog.dao.CityDao.getcountiesandtowns";//映射sql的标识字符串  
		//获得流行县和乡
		List<Districts> countiesandtowns = session.selectList(statement,mapparam);
		int i=0;
		for(Districts pro : countiesandtowns)
        { 
			//对于每个流行县
            if (pro.getDistrictcode().endsWith("000000"))
            {
            	//保存每个县的相关信息
            	Map<String, Object> maptemp = new HashMap<String,Object>();
				maptemp.put("countyname", pro.getShortname());
				String county1to6 = pro.getDistrictcode().substring(0, 6);
				int townnum = 0;
				//统计每个流行县所属流行乡的个数
				for(Districts cn:countiesandtowns) {
					if(cn.getDistrictcode().startsWith(county1to6) && cn.getDistrictcode().endsWith("000") 
							&& !cn.getDistrictcode().equals(county1to6+"000000")) {
						townnum++;
					}
				}
				//该县流行乡数
				maptemp.put("townnum", townnum);
				//计算该县管理员总数
				statement = "com.watchdog.dao.CityDao.getmanagernum";//映射sql的标识字符串  
				mapparam.put("districtname", pro.getDistrictname());
				int managernum = session.selectOne(statement,mapparam);
				maptemp.put("managernum", managernum);
				//计算牧犬总数
				statement = "com.watchdog.dao.CityDao.getallnecketid";//映射sql的标识字符串  
				mapparam.put("county1to6", county1to6);
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
				statement = "com.watchdog.dao.CityDao.getcountexhibitrealtime";//映射sql的标识字符串  
				int mednum = session.selectOne(statement,mapparam);
				maptemp.put("mednum", mednum);
				//计算喂食器数量
				statement = "com.watchdog.dao.CityDao.getcountappexhibitrealtime";//映射sql的标识字符串  
				int feednum = session.selectOne(statement,mapparam);
				maptemp.put("feedernum", feednum);			
				
				map.put(""+i, maptemp);
				
				i++;
            }
        }

		return map;
	}

	@Override
	public Map<String, Object> GetArmyCityMap(String provincename, String cityname) {
		provincename = NameConversionUtil.EchartsAreaNameToGov(session,provincename);
		cityname = NameConversionUtil.EchartsAreaNameToGov(session,cityname);
 
		Map<String, Object> map = new HashMap<String,Object>();//保存请求返回的数据
		Map<String, String> mapparam = new HashMap<String,String>();//sql参数
		mapparam.put("provincename", provincename);
		String statement = "com.watchdog.dao.CityDao.getprovincemap";//映射sql的标识字符串   
		String thisprovince = session.selectOne(statement,mapparam);//获得省区域编码
	    String thisprovince1to2 = thisprovince.substring(0, 2);//编码前两位表示省份
	    mapparam.put("thisprovince1to2", thisprovince1to2);
	    
	    mapparam.put("cityname", cityname);
	    statement = "com.watchdog.dao.CityDao.getcitymap";//映射sql的标识字符串      
	    String thiscity = session.selectOne(statement,mapparam);//获得市区域编码
	    String thiscity1to4 = thiscity.substring(0, 4);//编码前四位表示市
	    
	    mapparam.put("thiscity1to4", thiscity1to4);
		statement = "com.watchdog.dao.CityDao.getregimentalandcompany";//映射sql的标识字符串  
		//获得流行团和连
		List<Districts> regimentalandcompany = session.selectList(statement,mapparam);
		int i=0;
		for(Districts pro : regimentalandcompany)
        { 
			//对于每个流行团
            if (pro.getDistrictcode().endsWith("00"))
            {
            	//保存每个团的相关信息
            	Map<String, Object> maptemp = new HashMap<String,Object>();
				maptemp.put("regimentalname", pro.getShortname());
				String regimental1to6 = pro.getDistrictcode().substring(0, 6);
				int companynum = 0;
				//统计每个流行团所属流行连的个数
				for(Districts cn:regimentalandcompany) {
					if(cn.getDistrictcode().startsWith(regimental1to6) && !cn.getDistrictcode().equals(regimental1to6+"00")) {
						companynum++;
					}
				}
				//该团流行连数
				maptemp.put("companynum", companynum);
				//计算该团管理员总数
				statement = "com.watchdog.dao.CityDao.getmanagernum";//映射sql的标识字符串  
				mapparam.put("districtname", pro.getDistrictname());
				int managernum = session.selectOne(statement,mapparam);
				maptemp.put("managernum", managernum);
				//计算牧犬总数
				statement = "com.watchdog.dao.CityDao.getarmyallnecketid";//映射sql的标识字符串  
				mapparam.put("regimental1to6", regimental1to6);
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
				maptemp.put("lng", pro.getLng());
				maptemp.put("lat", pro.getLat());
				//计算投药总次数
				statement = "com.watchdog.dao.CityDao.getarmycountexhibitrealtime";//映射sql的标识字符串  
				int mednum = session.selectOne(statement,mapparam);
				maptemp.put("mednum", mednum);
				//计算喂食器数量
				statement = "com.watchdog.dao.CityDao.getarmycountappexhibitrealtime";//映射sql的标识字符串  
				int feednum = session.selectOne(statement,mapparam);
				maptemp.put("feedernum", feednum);			
				
				map.put(""+i, maptemp);
				
				i++;
            }
        }

		return map;
	}

	@Override
	public Map<String, Object> GetDistrictcode(String provincename, String cityname) {
		Map<String, Object> map = new HashMap<String,Object>();
		Map<String, Object> mapparam = new HashMap<String,Object>();
	
		mapparam.put("provincename", provincename);
		mapparam.put("cityname", cityname);
		//获得地区编号前两位(兵团或省)
		String statement = "com.watchdog.dao.CityDao.getprovince";//映射sql的标识字符串  
		Districts province = session.selectOne(statement,mapparam);
		String provincecode = province.getDistrictcode();
		String provincecode0to2 = provincecode.substring(0,2);	
		mapparam.put("provincecode0to2", provincecode0to2);
		//获得地区编号(师或市)
		statement = "com.watchdog.dao.CityDao.getcity";//映射sql的标识字符串  
		Districts city = session.selectOne(statement,mapparam);
		String citycode = city.getDistrictcode();
		map.put("cityGov",NameConversionUtil.EchartsAreaNameToGov(session, cityname));
		map.put("cityEchartsAreaName",NameConversionUtil.GovToEchartsAreaName(session, cityname).replace("*",""));
		map.put("provinceGov",NameConversionUtil.EchartsAreaNameToGov(session, provincename));
		map.put("provinceEchartsAreaName",NameConversionUtil.GovToEchartsAreaName(session, provincename).replace("*",""));
		map.put("districtcode",citycode);
		return map;
	}
 
 


}

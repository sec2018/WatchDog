package com.watchdog.dao.impl;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.watchdog.dao.UserDao;
import com.watchdog.model.Districts;
import com.watchdog.model.Managers;
import com.watchdog.model.Sheepdogs;
import com.watchdog.model.User;
import com.watchdog.service.UserService;
import com.watchdog.util.AESUtil;

@Repository("userDao")
public class UserDaoImpl implements UserDao{
	
	private SqlSession session;
	
	public UserDaoImpl(){
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
	public Managers login(Managers manager) {
		Managers resultUser = null;
        Map<String, Object> map = new HashMap<String, Object>();
        AESUtil util = new AESUtil(); // 密钥 
//        String password ="";
//		try {
//			password = util.encryptData(manager.getPassword());
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
        map.put("username", manager.getUsername());
        /** 
         * 映射sql的标识字符串org.guus.mapping.userMapper.getUser 
         * getUser是select标签的id属性值，通过select标签的id属性值就可以找到要执行的SQL 
         */  
        String statement = "com.watchdog.dao.UserDao.login";//映射sql的标识字符串  
        //执行查询返回一个唯一user对象的sql  
        resultUser = session.selectOne(statement,map);
        try {
			resultUser.setPassword(util.decryptData(resultUser.getPassword()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return resultUser;
	}
	
	@Override
	public Managers checklogin(String username) {
		Managers resultUser = null;
        /** 
         * 映射sql的标识字符串org.guus.mapping.userMapper.getUser 
         * getUser是select标签的id属性值，通过select标签的id属性值就可以找到要执行的SQL 
         */  
        String statement = "com.watchdog.dao.UserDao.checklogin";//映射sql的标识字符串  
        //执行查询返回一个唯一user对象的sql  
        resultUser = session.selectOne(statement,username);
		return resultUser;
	}

	@Override
	public Map<String, Integer> GetIndexLogoInfo(Managers manager) {
		// TODO Auto-generated method stub
		Map<String, Integer> map = new HashMap<String,Integer>();
		if(manager.getPrivilegelevel() == 1) {
			List<Sheepdogs> sdlist = null;
			String statement = "com.watchdog.dao.UserDao.getcountryindexinfo";//映射sql的标识字符串  
	        //执行查询返回一个唯一user对象的sql  
			sdlist = session.selectList(statement);
			int dognumtotal = 0;
			int feedernumtotal = 0;
			for(Sheepdogs each:sdlist){
				if(!each.getNeckletid().equals("-1")) {
					dognumtotal++;
				}
				if(!each.getApparatusid().equals("-1")) {
					feedernumtotal++;
				}
			}
			statement = "com.watchdog.dao.UserDao.getexhicount";//映射sql的标识字符串  
			int med1 = session.selectOne(statement);
			statement = "com.watchdog.dao.UserDao.getappexhicount";//映射sql的标识字符串  
			int med2 = session.selectOne(statement);
			int mednumtotal = med1 + med2;
			
			List<Districts> alllist = new ArrayList<Districts>();
			List<Districts> dislist = new ArrayList<Districts>();
			List<Districts> armylist = new ArrayList<Districts>(); 
			statement = "com.watchdog.dao.UserDao.ywdisctricts";//映射sql的标识字符串  
			alllist = session.selectList(statement);
			for(Districts al : alllist)
            {
                if (al.getDistrictcode().startsWith("66"))
                {
                    armylist.add(al);
                }
                else
                {
                    dislist.add(al);
                }
            }
			
			int armyepidemictotal = 1;
			
			int provinceepidemictotal = 0;
			int cityepidemictotal = 0;
			
			int countyepidemictotal = 0;
			int villageepidemictotal = 0;
			int hamletepidemictotal = 0;
			
			for(Districts each : dislist) {
				if(each.getEpidemic() == 1) {
					hamletepidemictotal++;
					if(each.getDistrictcode().substring(2, 12).equals("0000000000")) {
						provinceepidemictotal++;
					}
					if(each.getDistrictcode().substring(4, 12).equals("00000000")) {
						cityepidemictotal ++;
					}
					if(each.getDistrictcode().substring(6,12).equals("000000")) {
						countyepidemictotal ++;
					}
					if(each.getDistrictcode().substring(9,12).equals("000")) {
						villageepidemictotal ++;
					}
				}
			}
			
			int divisionepidemictotal=0;
			int regimentalepidemictotal =0;
			int companyepidemictotal = 0;
			for(Districts each : armylist) {
				if(each.getEpidemic() == 1) {
					companyepidemictotal++;
					if(each.getDistrictcode().substring(4,8).equals("0000")) {
						divisionepidemictotal++;
					}
					if(each.getDistrictcode().substring(6,8).equals("00")) {
						regimentalepidemictotal++;
					}
				}
			}
			
			List<Integer> levellist = new ArrayList<Integer>();
			int countryadmintotal = 0;
			int provinceadmintotal = 0;
			int cityadmintotal = 0;
			int countyadmintotal = 0;
			int villageadmintotal = 0;
			int hamletadmintotal = 0;
			statement = "com.watchdog.dao.UserDao.getmanagerlevel";//映射sql的标识字符串  
			levellist = session.selectList(statement);
			for(Integer each:levellist) {
				switch(each) {
				case 1:
                    countryadmintotal++;
                    break;
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
			map.put("provinceepidemictotal", provinceepidemictotal + armyepidemictotal);
			map.put("cityepidemictotal", cityepidemictotal - provinceepidemictotal + (divisionepidemictotal - 1));
			map.put("countyepidemictotal", countyepidemictotal - cityepidemictotal + (regimentalepidemictotal - divisionepidemictotal));
			map.put("villageepidemictotal", villageepidemictotal - countyepidemictotal + (companyepidemictotal - regimentalepidemictotal));
			map.put("hamletepidemictotal",  hamletepidemictotal - villageepidemictotal - companyepidemictotal);
			map.put("countryadmintotal", countryadmintotal);
			map.put("provinceadmintotal", provinceadmintotal);
			map.put("cityadmintotal", cityadmintotal);
			map.put("countyadmintotal", countyadmintotal);
			map.put("villageadmintotal", villageadmintotal);
			map.put("hamletadmintotal", hamletadmintotal);
			map.put("countrydognumtotal", dognumtotal);
			map.put("alldognumtotal", 3280564);
			map.put("countrymednumtotal", mednumtotal);
			map.put("feedernumtotal", feedernumtotal);
		}
		return map;
	}

	public Map<String,Object> GetCountryMap(){
		Map<String, Object> map = new HashMap<String,Object>();
		String statement = "com.watchdog.dao.UserDao.getcountrymap";//映射sql的标识字符串  
		List<Districts> provincelist = new ArrayList<Districts>();
		provincelist = session.selectList(statement);
		int i = 0;
		for(Districts each:provincelist) {
			if(each.getDistrictcode().endsWith("0000000000")) {
				Map<String, Object> maptemp = new HashMap<String,Object>();
				maptemp.put("provincename", each.getShortname());
				String pro1to2 = each.getDistrictcode().substring(0, 2);
				int citynum = 0;
				for(Districts each2:provincelist) {
					if(each2.getDistrictcode().startsWith(pro1to2) && each2.getDistrictcode().endsWith("00000000") 
							&& !each2.getDistrictcode().equals(pro1to2+"0000000000") && each2.getEpidemic() == 1) {
						citynum++;
					}
				}
				maptemp.put("citynum", citynum);
				statement = "com.watchdog.dao.UserDao.getmanagernum";//映射sql的标识字符串  
				Map<String, String> mapparam = new HashMap<String,String>();
				mapparam.put("districtname", each.getDistrictname());
				int managernum = session.selectOne(statement,mapparam);
				maptemp.put("managernum", managernum);
				statement = "com.watchdog.dao.UserDao.getallnecketid";//映射sql的标识字符串  
				mapparam.put("pro1to2", pro1to2);
				List<String> dognumlist = session.selectList(statement,mapparam);
				maptemp.put("dognum", dognumlist.size());
				int neckletnum = 0;
				for(String each3:dognumlist) {
					if(!each3.equals("-1")) {
						neckletnum++;
					}
				}
				maptemp.put("neckletnum", neckletnum);
				statement = "com.watchdog.dao.UserDao.getcountexhibitrealtime";//映射sql的标识字符串  
				int mednum = session.selectOne(statement,mapparam);
				maptemp.put("mednum", mednum);
				statement = "com.watchdog.dao.UserDao.getcountappexhibitrealtime";//映射sql的标识字符串  
				int feednum = session.selectOne(statement,mapparam);
				maptemp.put("feedernum", feednum);
				
				map.put(""+i, maptemp);
				i++;
			}
		}
		return map;
	}
	
	public Map<String,Object> GetXinJiangArmyCountryMap(){
		Map<String, Object> map = new HashMap<String,Object>();
		String statement = "com.watchdog.dao.UserDao.getdivisionnum";//映射sql的标识字符串  
		int divisionnum = session.selectOne(statement);
		map.put("armyname","建设兵团");
		map.put("divisionnum", divisionnum);
		statement = "com.watchdog.dao.UserDao.getarmymanagernum";//映射sql的标识字符串  
		int managernum = session.selectOne(statement);
		map.put("managernum", managernum);
		statement = "com.watchdog.dao.UserDao.getarmydognum";//映射sql的标识字符串  
		List<String> dognumlist = session.selectList(statement);
		map.put("dognum", dognumlist.size());
		int neckletnum = 0;
		for(String each:dognumlist) {
			if(each != "-1") {
				neckletnum++;
			}
		}
		map.put("neckletnum", neckletnum);
		statement = "com.watchdog.dao.UserDao.getarmyposition";//映射sql的标识字符串  
		List<Districts> positionlist = session.selectList(statement);
		Districts position = positionlist.get(0);
		map.put("lng", position.getLng());
		map.put("lat", position.getLat());
		statement = "com.watchdog.dao.UserDao.getarmymednum";//映射sql的标识字符串  
		int mednum = session.selectOne(statement);
		map.put("mednum", mednum);
		statement = "com.watchdog.dao.UserDao.getarmyfeedernum";//映射sql的标识字符串  
		int feedernum = session.selectOne(statement);
		map.put("feedernum", feedernum);
		return map;
	}
}

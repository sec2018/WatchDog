package com.watchdog.util;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

public class NameConversionUtil {
	public static String GovToEchartsAreaName(SqlSession session, String areaname) {
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("areaname", areaname);
		String statement = "com.watchdog.util.echartsareanametemp";//映射sql的标识字符串  
		String echartsareaname =  session.selectOne(statement, mapparam);
        
        return echartsareaname;
	}
	
	public static String EchartsAreaNameToGov(SqlSession session, String areaname) {
		Map<String, String> mapparam = new HashMap<String,String>();
		mapparam.put("areaname", areaname);
		String statement = "com.watchdog.util.govareanametemp";//映射sql的标识字符串  
		String govareaname =  session.selectOne(statement, mapparam);
	 
		
		return govareaname;
	}
}

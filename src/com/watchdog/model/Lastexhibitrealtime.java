package com.watchdog.model;

public class Lastexhibitrealtime {
    public long id;

    public String realtime;

    public String neckletid;
    
    public String exhibitlongitude;
    
    public String exhibitvdoing;

    public String nextexhibittime;

    public long districtcode;

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRealtime() {
		return realtime;
	}

	public void setRealtime(String realtime) {
		this.realtime = realtime;
	}

	public String getNeckletid() {
		return neckletid;
	}

	public void setNeckletid(String neckletid) {
		this.neckletid = neckletid;
	}

	public String getExhibitlongitude() {
		return exhibitlongitude;
	}

	public void setExhibitlongitude(String exhibitlongitude) {
		this.exhibitlongitude = exhibitlongitude;
	}

	public String getExhibitvdoing() {
		return exhibitvdoing;
	}

	public void setExhibitvdoing(String exhibitvdoing) {
		this.exhibitvdoing = exhibitvdoing;
	}

	public String getNextexhibittime() {
		return nextexhibittime;
	}

	public void setNextexhibittime(String nextexhibittime) {
		this.nextexhibittime = nextexhibittime;
	}

	public long getDistrictcode() {
		return districtcode;
	}

	public void setDistrictcode(long districtcode) {
		this.districtcode = districtcode;
	}

	public Integer getTableremain() {
		return tableremain;
	}

	public void setTableremain(Integer tableremain) {
		this.tableremain = tableremain;
	}

	public Integer tableremain;
}

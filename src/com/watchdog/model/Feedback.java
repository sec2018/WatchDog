package com.watchdog.model;

public class Feedback {
	public long feedid;

    public String neckletid;

    public String feedcycle;

    public String exhibitcycle;

    public String updatetime;

    public Integer medtotal;

    public String firstmedtime;

    public String endmedtime;

	public long getFeedid() {
		return feedid;
	}

	public void setFeedid(long feedid) {
		this.feedid = feedid;
	}

	public String getNeckletid() {
		return neckletid;
	}

	public void setNeckletid(String neckletid) {
		this.neckletid = neckletid;
	}

	public String getFeedcycle() {
		return feedcycle;
	}

	public void setFeedcycle(String feedcycle) {
		this.feedcycle = feedcycle;
	}

	public String getExhibitcycle() {
		return exhibitcycle;
	}

	public void setExhibitcycle(String exhibitcycle) {
		this.exhibitcycle = exhibitcycle;
	}

	public String getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}

	public Integer getMedtotal() {
		return medtotal;
	}

	public void setMedtotal(Integer medtotal) {
		this.medtotal = medtotal;
	}

	public String getFirstmedtime() {
		return firstmedtime;
	}

	public void setFirstmedtime(String firstmedtime) {
		this.firstmedtime = firstmedtime;
	}

	public String getEndmedtime() {
		return endmedtime;
	}

	public void setEndmedtime(String endmedtime) {
		this.endmedtime = endmedtime;
	}
}

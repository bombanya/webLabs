package com.bombanya.web3;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

@Entity
@NamedQuery(name = "deleteSessionResults", query = "DELETE FROM TableRow tr " +
        "WHERE tr.ownerSessionID = :sessionID")
public class TableRow {

    @Id
    @GeneratedValue
    private long id;
    private double x;
    private double y;
    private int r;
    private String timeOfRequest;
    private String workTime;
    private String result;
    private boolean boolResult;
    private String ownerSessionID;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }

    public String getTimeOfRequest() {
        return timeOfRequest;
    }

    public void setTimeOfRequest(String timeOfRequest) {
        this.timeOfRequest = timeOfRequest;
    }

    public String getWorkTime() {
        return workTime;
    }

    public void setWorkTime(String workTime) {
        this.workTime = workTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public boolean isBoolResult() {
        return boolResult;
    }

    public void setBoolResult(boolean boolResult) {
        this.boolResult = boolResult;
    }

    public String getOwnerSessionID() {
        return ownerSessionID;
    }

    public void setOwnerSessionID(String ownerSessionID) {
        this.ownerSessionID = ownerSessionID;
    }
}

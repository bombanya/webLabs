package com.bombanya.web2;

public class TableRow {

    private String timeOfRequest;
    private String workTime;
    private double r;
    private double x;
    private double y;
    private String result;
    private boolean boolResult;

    public String getTimeOfRequest() {
        return timeOfRequest;
    }

    public String getWorkTime() {
        return workTime;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public double getX() {
        return x;
    }

    public String getResult() {
        return result;
    }

    public boolean isBoolResult() {
        return boolResult;
    }

    public void setTimeOfRequest(String timeOfRequest) {
        this.timeOfRequest = timeOfRequest;
    }

    public void setWorkTime(String workTime) {
        this.workTime = workTime;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public void setBoolResult(boolean boolResult) {
        this.boolResult = boolResult;
    }
}

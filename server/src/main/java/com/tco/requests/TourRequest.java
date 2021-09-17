package com.tco.requests;

import com.tco.Database.Select;
import com.tco.Database.Database;
import com.tco.Database.Credential;

import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends RequestHeader {

    private ArrayList<HashMap<String,String>> places;
    private Double earthRadius;
    private Double response;
    
    @Override
    public void buildResponse(){
    
    }

    public TourRequest(Double er, Double r) {
        this.requestType = "tour";
        this.earthRadius = er;
        this.response = r;
    }

    public Double getEarthRadius(){
        return this.earthRadius;
    }

    public Double getResponseTime(){
        return this.response;
    }

    public ArrayList<HashMap<String,String>> getPlaces(){
        return this.places;
    }
}
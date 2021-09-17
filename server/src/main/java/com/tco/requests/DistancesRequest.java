package com.tco.requests;

import com.tco.Database.Select;
import com.tco.Database.Database;
import com.tco.Database.Credential;

import java.util.List;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tco.distances.Coordinate;
import com.tco.distances.DistanceCalculator;

import com.tco.misc.BadRequestException;

public class DistancesRequest extends RequestHeader {

    private List<Coordinate> places;
    private List<Long> distances;
    private double earthRadius;
    
    @Override
    public void buildResponse() throws BadRequestException {
        distances = DistanceCalculator.calculateTrip(places,earthRadius);
        //Will need to grab client state to fill the actual trip info
    }

    public DistancesRequest(List<Coordinate> thisTrip, double thisRadius) {
        this.requestType = "distances";
        this.places = thisTrip;
        this.earthRadius = thisRadius;
    }

    public List<Long> getDistances() {
        return distances;
    }
}
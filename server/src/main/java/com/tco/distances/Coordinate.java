package com.tco.distances;

import java.lang.Math;

import java.lang.Double;
import java.lang.IllegalArgumentException;


public class Coordinate {
    private final double latitude;
    private final double longitude;
    private final String name;
    private final double MAX_LONG = 180;
    private final double MAX_LAT = 90;

    public Coordinate(double latitude, double longitude) {
        if (Math.abs(latitude) > MAX_LAT || Math.abs(longitude) > MAX_LONG) {
            throw new IllegalArgumentException("Argument out of range.");
        }
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = "";
    }

    public Coordinate(double latitude, double longitude , String name) {
        if (Math.abs(latitude) > MAX_LAT || Math.abs(longitude) > MAX_LONG) {
            throw new IllegalArgumentException("Argument out of range.");
        }
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
    }

    public Coordinate(String latitude, String longitude, String name) {
        try {
            this.latitude = Double.parseDouble(latitude);
            this.longitude = Double.parseDouble(longitude);

        } catch (Exception e) {
            throw new IllegalArgumentException("Cannot convert to Double");
        }
        this.name = name;
    }

    public Coordinate(String latitude, String longitude) {
        try {
            this.latitude = Double.parseDouble(latitude);
            this.longitude = Double.parseDouble(longitude);

        } catch (Exception e) {
            throw new IllegalArgumentException("Cannot convert to Double");
        }
        this.name = "";
    }

    public double getLatitude() {
        return this.latitude;
    }

    public double getLongitude() {
        return this.longitude;
    }

    public String getName() {
        return this.name;
    }
}
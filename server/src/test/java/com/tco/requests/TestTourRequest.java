package com.tco.requests;

import org.junit.jupiter.api.Test;

import jdk.jfr.Timestamp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestTourRequest {

    private TourRequest tour;

    @BeforeEach
    public void createFindConfigurationForTestCases() {
        tour = new TourRequest(3959.0, 0.0);
        tour.buildResponse();
    }

    @Test
    @DisplayName("Earth Radius is 3959.0")
    public void testRadius() {
        Double radius = tour.getEarthRadius();
        assertEquals(3959.0, radius);
    }

    @Test 
    @DisplayName("Response is 0.0")
    public void testResponse(){
        Double response = tour.getResponseTime();
        assertEquals(0.0, response);
    }
}
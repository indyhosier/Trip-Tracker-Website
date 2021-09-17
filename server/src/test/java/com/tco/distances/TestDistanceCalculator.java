package com.tco.distances;

import com.tco.misc.BadRequestException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.lang.Long;
import java.lang.Long;

import java.util.*;

public class TestDistanceCalculator {

    private final double KM_RADIUS = 6371.0;
    private final double MILE_RADIUS = 3959.0;

    @Test
    @DisplayName("3 equal coordinates.")
    public void testAllZeroes() throws BadRequestException{
        Coordinate coordinate1 = new Coordinate(0, 0);
        Coordinate coordinate2 = new Coordinate(0, 0);
        Coordinate coordinate3 = new Coordinate(0, 0);
        List<Coordinate> trip = new ArrayList<>();
        List<Long> distances;

        trip.add(coordinate1);
        trip.add(coordinate2);
        trip.add(coordinate3);

        distances = DistanceCalculator.calculateTrip(trip, KM_RADIUS);
        assertEquals(distances.size(), 3);
        for (Long distance: distances) {
            assertEquals(distance, 0);
        }
    }

    @Test
    @DisplayName("KM and Miles for one trip")
    public void testMilesAndKM() throws BadRequestException {
        Coordinate coordinate1 = new Coordinate(1, 2);
        Coordinate coordinate2 = new Coordinate(40, 105);
        Coordinate coordinate3 = new Coordinate(40, -105);
        List<Coordinate> trip = new ArrayList<>();
        List<Long> distances1;
        List<Long> distances2;

        trip.add(coordinate1);
        trip.add(coordinate2);
        trip.add(coordinate3);

        distances1 = DistanceCalculator.calculateTrip(trip, KM_RADIUS);
        distances2 = DistanceCalculator.calculateTrip(trip, MILE_RADIUS);
        assertEquals(distances1.size(), 3);
        assertEquals(distances2.size(), 3);      
        
        assertEquals(distances1.get(0), 11038);
        assertEquals(distances1.get(1), 10614);
        assertEquals(distances1.get(2), 11373);

        assertEquals(distances2.get(0), 6859);
        assertEquals(distances2.get(1), 6596);
        assertEquals(distances2.get(2), 7067);
    }

    @Test
    @DisplayName("Enforces min and max radius")
    public void testRadiusBoundaries() throws BadRequestException {
        boolean lessThan1 = false;
        boolean greaterThanMax = false;
        Coordinate coordinate1 = new Coordinate(1, 2);
        Coordinate coordinate2 = new Coordinate(40, 105);
        List<Coordinate> trip = new ArrayList<>();
        trip.add(coordinate1);
        trip.add(coordinate2);

        List<Long> distances;
        try {
            distances = DistanceCalculator.calculateTrip(trip, 0);
        } catch (BadRequestException bre) {
            lessThan1 = true;
        }
        try {
            double radius = Math.pow(2, 64); // order of magnitude larger than max long ((2^63) - 1)
            distances = DistanceCalculator.calculateTrip(trip, radius);
        } catch (BadRequestException bre) {
            greaterThanMax = true;
        }
        assertEquals(lessThan1, true);
        assertEquals(greaterThanMax, true);
    }

    @Test
    @DisplayName("Doesn't overflow when given the farthest points on earth") 
    public void testOverflows() throws BadRequestException {
        int throwCount = 0;

        Coordinate coordinate1 = new Coordinate(90, 180);
        Coordinate coordinate2 = new Coordinate(-90, -180);
        Coordinate coordinate3 = new Coordinate(-90, 180);
        Coordinate coordinate4 = new Coordinate(90, -180);

        List<Coordinate> trip1 = new ArrayList<>();
        List<Coordinate> trip2 = new ArrayList<>();

        trip1.add(coordinate1);
        trip1.add(coordinate2);
        trip2.add(coordinate3);
        trip2.add(coordinate4);

        List<List<Coordinate>> trips = new ArrayList<>();
        trips.add(trip1);
        trips.add(trip2);

        List<Long> distances;
        for (List<Coordinate> trip: trips) {
            try {
                distances = DistanceCalculator.calculateTrip(trip, Long.MAX_VALUE);
            } catch (BadRequestException bre) {
                throwCount++;
            }
        }
        assertEquals(2, throwCount);
    }

    @Test
    @DisplayName("Empty trip gives empty distances")
    public void emptyTripReturnsEmptyDistances() throws BadRequestException {
        List<Coordinate> trip = new ArrayList<>();
        List<Long> distances = DistanceCalculator.calculateTrip(trip, KM_RADIUS);

        assertEquals(distances.size(), 0);
    }

    @Test
    @DisplayName("Trip with one destination gives 0 distance")
    public void oneDestinationDistanceIsZero() throws BadRequestException {
        List<Coordinate> trip = new ArrayList<>();
        List<Long> distances;

        trip.add(new Coordinate(40, -105));
        distances = DistanceCalculator.calculateTrip(trip, KM_RADIUS);

        assertEquals(distances.size(), 1);
        assertEquals(distances.get(0), 0);
    }
}
package com.tco.distances;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;


import java.lang.IllegalArgumentException;

public class TestCoordinate {

    private Coordinate coordinate;

    @Test
    @DisplayName("Can create coordinate.")
    public void testCtor() {
        Coordinate coordinate = new Coordinate(50, 105);
        coordinate = new Coordinate(50, 105, "place 1");
    }

    @Test
    @DisplayName("Can create coordinate with strings.")
    public void testStringCtor() {
        Coordinate coordinate = new Coordinate("50", "105");
        coordinate = new Coordinate("50", "105", "place 1");
    }

    @Test
    @DisplayName("Can get coordinates from instance.")
    public void testGetters(){
        Coordinate coordinate = new Coordinate(80, -105);
        assertEquals(coordinate.getLatitude(), 80);
        assertEquals(coordinate.getLongitude(), -105);
    }

    @Test
    @DisplayName("Enforces valid coordinates.")
    public void testBadCoordinates() {
        int throwCount = 0;
        int[] lats = {91, -91, 0, 0};
        int[] longs = {0, 0, 181, -181};
        for (int i = 0; i < lats.length; i++) {
            try {
                new Coordinate(lats[i], longs[i]);
            } catch (IllegalArgumentException iae) {
                throwCount++;                
            }
        }
        assertEquals(throwCount, lats.length);
    }
}
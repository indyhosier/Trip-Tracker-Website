
package com.tco.distances;

import org.junit.jupiter.api.Test;

import jdk.jfr.Timestamp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;

import java.lang.IllegalArgumentException;
import com.tco.misc.BadRequestException;


import com.tco.requests.DistancesRequest;
import com.tco.distances.Coordinate;


public class TestDistancesRequest {
    private DistancesRequest dRequest;


    @BeforeEach
    public void createDistancesConfigurationForTestCases() throws BadRequestException {
        Coordinate coordinate1 = new Coordinate(-7.2455,-55.3506);
        Coordinate coordinate2 = new Coordinate(32.1462,-85.0131);
        Coordinate coordinate3 = new Coordinate(47.7403,8.5347);
        double radius1 = 6371;
        List<Coordinate> Trippy = new ArrayList<Coordinate>();
        Trippy.add(coordinate1);
        Trippy.add(coordinate2);
        Trippy.add(coordinate3);
        //  "distances": [5392, 7671, 8723]
        dRequest = new DistancesRequest(Trippy, radius1);
        dRequest.buildResponse();
    }

    @Test
    @DisplayName("Creates distances array")
    public void testDistances() throws BadRequestException {
        List<Long> distances;
        List<Long> result = new ArrayList<Long>();
        result.add((long)5392);
        result.add((long)7671);
        result.add((long)8723);

        distances = dRequest.getDistances();

        assertEquals(result, distances);

    }
}
package com.tco.requests;

import org.junit.jupiter.api.Test;

import jdk.jfr.Timestamp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;

public class TestFindRequest {

    private FindRequest find;

    @BeforeEach
    public void createFindConfigurationForTestCases() {
        find = new FindRequest("Denver International Airport", 1);
        find.buildResponse();
    }

    @Test
    @DisplayName("match is DIA")
    public void testMatch() {
        String stringMatch = find.getMatchString();
        assertEquals("Denver International Airport", stringMatch);
    }

    @Test
    @DisplayName("Limit equals 1")
    public void testLimit() {
        Integer limitNumber = find.getLimit();
        assertEquals(1, limitNumber);
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = find.getRequestType();
        assertEquals("find", type);
    }

}

package com.tco.Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Database {
    public static ArrayList<HashMap<String, String>> query(String sql, Credential db) {
        try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(db.URL, db.USER, db.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql)
        ) {
            return process(results);
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }

    static ArrayList<HashMap<String, String>> process(ResultSet results) throws Exception {
        ArrayList<HashMap<String, String>> out = new ArrayList<>();
        while (results.next()) {
            HashMap<String, String> toAdd = new HashMap<>();
                toAdd.put("name", results.getString("name"));
                toAdd.put("latitude", results.getString("latitude"));
                toAdd.put("longitude", results.getString("longitude"));
                toAdd.put("type", results.getString("type"));
                toAdd.put("region", results.getString("iso_region"));
                toAdd.put("country", results.getString("iso_country"));
                toAdd.put("url", results.getString("home_link"));
                toAdd.put("municipality", results.getString("municipality"));
                toAdd.put("id", results.getString("id"));
                toAdd.put("altitude", results.getString("altitude"));
                toAdd.put("iataCode", results.getString("iata_code"));
                out.add(toAdd);
        }
        return out;
    }

    public static Integer queryCount(String sql, Credential db) {
            Integer count;
        try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(db.URL, db.USER, db.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql)
        ) {
            results.next();
            count = Integer.parseInt(results.getString(1));
            return count;
            
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }

}
package com.tco.Database;


public class Select {
    public static String match(String matchString, String column, int limit) {
        if (limit == 0){
            limit = 100;
        }
        return "SELECT "
                + " DISTINCT " + "*"
                + " FROM world "
                + " WHERE name LIKE '%" + matchString + "%' OR municipality LIKE '%" + matchString + "%' OR"
                + " iso_country LIKE '%" + matchString + "%' OR iso_region LIKE '%" + matchString +"%' OR"
                + " iata_code LIKE '%" + matchString + "%'"
                + " ORDER BY " + column + " ASC "
                + "LIMIT " + Integer.toString(limit)
                + ";";
    }

    public static String countMatch(String matchString, String column) {
        return "SELECT "
                + " COUNT(*) "
                + " FROM world "
                + " WHERE name LIKE '%" + matchString + "%' OR municipality LIKE '%" + matchString + "%' OR " +
                    "iso_country LIKE '%" + matchString + "%' OR iso_region LIKE '%" + matchString +"%'"
                + " ORDER BY " + column + " ASC "
                + ";";
    }

}
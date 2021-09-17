package com.tco.Database;

public  class Credential {
    // connection information when using port forwarding from localhost
    // shared user with read-only access
    final static String USER = "cs314-db";
    final static String PASSWORD = "eiK5liet1uej";

    final String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

    final String URL;

    public Credential(){
        if(useTunnel != null && useTunnel.equals("true")) {
            // When using Locally (by Port Forwarding)
            URL = "jdbc:mariadb://127.0.0.1:55666/cs314";
        }
        // Else, we must be running against the production database directly
        else {
            URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
        }
    }

}
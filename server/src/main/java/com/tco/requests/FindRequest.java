package com.tco.requests;

import com.tco.Database.Select;
import com.tco.Database.Database;
import com.tco.Database.Credential;

import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends RequestHeader {

    private String match;
    private Integer limit;
    private Integer found;
    private ArrayList<HashMap<String,String>> places;
    
    @Override
    public void buildResponse() {
        Credential credential = new Credential();;
        String select = Select.match(this.match, "name", this.limit);
        places =  new ArrayList<HashMap<String,String>>();
        places = Database.query(select, credential);
        String count = Select.countMatch(this.match, "name");
        found = Database.queryCount(count, credential);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public FindRequest(String m, Integer l) {
        this.requestType = "find";
        this.match = m;
        this.limit = l;
    }

    public FindRequest(String m) {
        this.requestType = "find";
        this.match = m;
    }


    public String getMatchString(){
        return this.match;
    }

    public Integer getLimit(){
        return this.limit;
    }

    public Integer getFound(){
        return found;
    }

    public ArrayList<HashMap<String,String>> getPlaces(){
        return places;
    }

}
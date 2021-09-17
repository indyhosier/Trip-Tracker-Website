package com.tco.distances;

import com.tco.misc.BadRequestException;

import java.lang.Math;
import java.lang.Long;
import java.lang.Double;
import java.util.*;

public class DistanceCalculator {
    private final static long MINIMUM_RADIUS = 1;
    private final static long MAX_RADIUS = Long.MAX_VALUE;

    /**
     * Calculates the distance of a trip (round trip) from a list of given coordinates. The 
     * last distance in the list returned is the distance from the final coordinate to the start coordinate.
     */
    public static List<Long> calculateTrip(List<Coordinate> trip, double earthRadius) throws BadRequestException {
        if (earthRadius > MAX_RADIUS || earthRadius < MINIMUM_RADIUS) {
            throw new BadRequestException();
        }
        List<Long> distances = new ArrayList<>();
        if (trip.isEmpty()) {
            return distances;
        }

        List<Coordinate> staticTrip = Collections.unmodifiableList(trip);
        for (int i = 0; i < staticTrip.size() - 1; i++) {
            distances.add(calculateDistance(staticTrip.get(i), staticTrip.get(i+1), earthRadius));
        }
        distances.add(calculateDistance(staticTrip.get(0), staticTrip.get(staticTrip.size() - 1), earthRadius));

        return distances;
    }

    /**
     * Calculates the distance between 2 points on a sphere using the Vincenty formula.
     */
    public static long calculateDistance(Coordinate coordinate1, Coordinate coordinate2, double earthRadius) throws BadRequestException {
        // Convert all latitudes and longitudes to radians
        double rLat1 = Math.toRadians(coordinate1.getLatitude());
        double rLong1 = Math.toRadians(coordinate1.getLongitude());
        double rLat2 = Math.toRadians(coordinate2.getLatitude());
        double rLong2 = Math.toRadians(coordinate2.getLongitude());

        // Get the difference in longitude needed for the Vicenty formula
        double deltaLong = rLong2 - rLong1;

        // Using the Vincenty formula
        double numerator = Math.sqrt(
                (Math.pow(Math.cos(rLat2) * Math.sin(deltaLong), 2)) +
                (Math.pow(Math.cos(rLat1)*Math.sin(rLat2) - Math.sin(rLat1)*Math.cos(rLat2)*Math.cos(deltaLong), 2))
        );
        double denominator = Math.sin(rLat1)*Math.sin(rLat2) + Math.cos(rLat1)*Math.cos(rLat2)*Math.cos(deltaLong);
        double centralAngle = Math.atan2(numerator, denominator);

        // catch any overflowed values before they are returned
        double distance = earthRadius * centralAngle;
        if (distance > Long.MAX_VALUE) {
            throw new BadRequestException();
        }

        return ((long) Math.round(distance));
    }

    public static List<Coordinate> nearestNeighborNoOpt(List<Coordinate> cities) throws BadRequestException {
            List<Coordinate> returnTour = cities;
            List<Coordinate> unvisitedCities = cities;
            long totalDistancePlacehold = Long.MAX_VALUE;

            for (int i = 0; i < cities.size(); i++) {
                //
                System.out.println("LOOP 1");
                List<Coordinate> optedTour = new ArrayList<Coordinate>();
                optedTour.add(cities.get(i));
                unvisitedCities.remove(cities.get(i));

                while (!unvisitedCities.isEmpty()) {
                    //
                    System.out.println("LOOP 2");
                    //Below might need to be moved
                    long distancePlacehold = Long.MAX_VALUE;
                    Coordinate cityPlacehold = new Coordinate(0.0,0.0,"");
                    for (Coordinate curr: unvisitedCities) {
                        //
                        System.out.println("LOOP 3");
                        if (calculateDistance(cities.get(cities.size() - 1),curr,(double)6739) < distancePlacehold) {
                            //
                            System.out.println("I can AASSSUURREE  you");
                            cityPlacehold = curr;
                            distancePlacehold = calculateDistance(cities.get(cities.size() - 1),curr,(double)6739);
                        }
                    }
                    optedTour.add(cityPlacehold);
                    unvisitedCities.remove(cityPlacehold);
                }
                //
                    System.out.println("Yeetus");
                    System.out.println(optedTour.get(0).getName());
                    List<Long> holdMyBeer = calculateTrip(optedTour, (double)6739);

                    long total = totalDistance(holdMyBeer);
                    //
                    System.out.println(total);
                    if (total < totalDistancePlacehold) {
                        totalDistancePlacehold = total;
                        returnTour = optedTour;
                        //
                        System.out.println(returnTour.get(0).getName());
                    }
            }
            return returnTour;
        }
        public static long totalDistance(List<Long> trip) {
            long total = 0;
            for (Long city: trip) {
                total += city;
            }
            return total;
        }     
}


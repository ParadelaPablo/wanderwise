package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.repository.TripRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TripService {
    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Trip getTripById(Long id) {
        if (id < 0) {
            throw new IllegalArgumentException("Invalid trip id");
        }
        return tripRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Trip not found"));
    }

    public List<Trip> getTripsByUserId(String userId) {
        List<Trip> userTrips = tripRepository.findByUserId(userId);
        if (userTrips.isEmpty()) {
            return new ArrayList<>();
        }
        return userTrips;
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public Trip updateTrip(Long id, Trip trip) {
        if (id < 0) {
            throw new IllegalArgumentException("Invalid trip id");
        }
        Trip existingTrip = getTripById(id);
        existingTrip.setTitle(trip.getTitle());
        return tripRepository.save(existingTrip);
    }

    public void deleteTrip(Long id) throws Exception {
        if (id < 0) {
            throw new IllegalArgumentException("Invalid trip id");
        }
        Trip trip = getTripById(id);
        try {
            tripRepository.delete(trip);
        } catch (Exception e) {
            throw new Exception("Error deleting trip: " + e.getMessage());
        }
    }
}

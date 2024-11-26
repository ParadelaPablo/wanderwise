package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.DTO.request.TripRequest;
import org.wanderwise.wanderwise.DTO.response.TripResponse;
import org.wanderwise.wanderwise.service.TripService;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<String> getAllTrips() {
        return ResponseEntity.ok("getAllTrips() called");
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getTripById(@PathVariable Long id) {
        return ResponseEntity.ok("getTripById() called: " + id);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<String> getTripsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok("getTripsByUserId() called: " + userId);
    }

    @PostMapping
    public ResponseEntity<String> createTrip(@RequestBody TripRequest tripRequest) {
        return ResponseEntity.ok("A new trip has been created");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTrip(@PathVariable Long id, @RequestBody TripRequest tripRequest) {
        return ResponseEntity.ok("Trip has been updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrip(@PathVariable Long id) {

        return ResponseEntity.ok("Trip has been deleted");
    }

}

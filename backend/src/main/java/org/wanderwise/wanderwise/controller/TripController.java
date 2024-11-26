package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.DTO.request.TripRequest;
import org.wanderwise.wanderwise.DTO.response.TripResponse;
import org.wanderwise.wanderwise.service.TripService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    List<TripResponse> trips = List.of(new TripResponse(1L, 1L, "Hello world", LocalDateTime.now(), LocalDateTime.now()), new TripResponse(2L, 1L, "Hello world", LocalDateTime.now(), LocalDateTime.now()));

    private TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllTrips() {

        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable Long id) {
        if (id < 0) {
            return ResponseEntity.badRequest().build();
        }
        for (TripResponse trip : trips) {
            if (trip.getId().equals(id)) {
                return ResponseEntity.ok(trip);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<TripResponse> getTripsByUserId(@PathVariable Long userId) {
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

package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.DTO.request.TripRequest;
import org.wanderwise.wanderwise.DTO.response.TripResponse;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.service.TripService;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    public TripResponse mapToResponse(Trip trip) {
        return TripResponse.builder()
                .id(trip.getId())
                .userTripId(trip.getUserTrip().getId())
                .title(trip.getTitle())
                .createdAt(trip.getCreatedAt())
                .updatedAt(trip.getUpdatedAt())
                .build();
    }

    public Trip mapToEntity(TripRequest tripRequest) {
        return Trip.builder()
                .title(tripRequest.getTitle())
                .createdAt(LocalDateTime.now())
                .build();
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllTrips() {
        List<TripResponse> tripResponses = tripService.getAllTrips().stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(tripResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable Long id) {
        Trip trip = tripService.getTripById(id);
        return ResponseEntity.ok(mapToResponse(trip));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TripResponse>> getTripsByUserId(@PathVariable String userId) {
        List<TripResponse> tripResponses = tripService.getTripsByUserId(userId).stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(tripResponses);
    }

    @PostMapping
    public ResponseEntity<TripResponse> createTrip(@RequestBody TripRequest tripRequest) {
        Trip trip = tripService.createTrip(mapToEntity(tripRequest));
        URI location = URI.create("/api/trips/" + tripRequest);
        return ResponseEntity.created(location).body(mapToResponse(trip));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripResponse> updateTrip(@PathVariable Long id, @RequestBody TripRequest tripRequest) {
        Trip trip = tripService.updateTrip(id, mapToEntity(tripRequest));
        return ResponseEntity.ok(mapToResponse(trip));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrip(@PathVariable Long id) {
        try {
            tripService.deleteTrip(id);
            return ResponseEntity.ok("Trip deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

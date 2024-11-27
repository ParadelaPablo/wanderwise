package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.DTO.request.DayWithStops;
import org.wanderwise.wanderwise.DTO.request.StopRequest;
import org.wanderwise.wanderwise.DTO.request.TripRequest;
import org.wanderwise.wanderwise.DTO.request.TripWithDaysAndStops;
import org.wanderwise.wanderwise.DTO.response.DayWithStopsResponse;
import org.wanderwise.wanderwise.DTO.response.StopResponse;
import org.wanderwise.wanderwise.DTO.response.TripResponse;
import org.wanderwise.wanderwise.DTO.response.TripWithDaysAndStopsResponse;
import org.wanderwise.wanderwise.entity.Day;
import org.wanderwise.wanderwise.entity.Stop;
import org.wanderwise.wanderwise.entity.StopType;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.service.DayService;
import org.wanderwise.wanderwise.service.StopService;
import org.wanderwise.wanderwise.service.TripService;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin
public class TripController {

    private TripService tripService;
    private DayService dayService;
    private StopService stopService;

    public TripController(TripService tripService,
                          DayService dayService,
                          StopService stopService) {
        this.tripService = tripService;
        this.dayService = dayService;
        this.stopService = stopService;
    }

    private TripWithDaysAndStopsResponse buildTripResponse(Trip trip) {
        return TripWithDaysAndStopsResponse.builder()
                .id(trip.getId())
                .userId(trip.getUserId())
                .title(trip.getTitle())
                .days(trip.getDays().stream().map(day -> DayWithStopsResponse.builder()
                                .id(day.getId())
                                .tripId(day.getTrip().getId())
                                .dayOrder(day.getDayOrder())
                                .date(day.getDate().toString())
                                .stops(day.getStops().stream()
                                        .map(stop -> StopResponse.builder()
                                                .name(stop.getName())
                                                .stopType(stop.getStopType().toString())
                                                .createdAt(stop.getCreatedAt())
                                                .build())
                                        .toList())
                                .build())
                        .toList())
                .build();
    }


    private TripResponse mapToResponse(Trip trip) {
        return TripResponse.builder()
                .id(trip.getId())
                .userId(trip.getUserId())
                .title(trip.getTitle())
                .createdAt(trip.getCreatedAt())
                .updatedAt(trip.getUpdatedAt())
                .build();
    }

    private Trip mapToEntity(TripRequest tripRequest) {
        return Trip.builder()
                .title(tripRequest.getTitle())
                .userId(tripRequest.getUserId())
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

    @PostMapping("/full-trip")
    public ResponseEntity<TripWithDaysAndStopsResponse> createTripWithDaysAndStops(
            @RequestBody TripWithDaysAndStops tripRequest) {
        System.err.println(tripRequest.getUserId() + " " + tripRequest.getTitle());
        try {
            // Create trip with nested days and stops
            Trip trip = Trip.builder()
                    .title(tripRequest.getTitle())
                    .userId(tripRequest.getUserId())
                    .build();

            // Persist trip
            Trip savedTrip = tripService.createTrip(trip);

            // Handle days and stops
            List<Day> savedDays = new ArrayList<>();
            for (DayWithStops dayWithStop : tripRequest.getDays()) {
                // Create day
                Day day = Day.builder()
                        .trip(savedTrip)
                        .dayOrder(dayWithStop.getDayOrder())
                        .date(LocalDateTime.parse(LocalDate.parse(dayWithStop.getDate()).atStartOfDay().toString()))
                        .build();

                Day savedDay = dayService.createDay(savedTrip.getId(), day);

                // Create stops for the day
                List<Stop> savedStops = new ArrayList<>();
                for (StopRequest stopRequest : dayWithStop.getStops()) {
                    Stop stop = Stop.builder()
                            .day(savedDay)
                            .name(stopRequest.getName())
                            .stopType(StopType.valueOf(stopRequest.getStopType()))
                            .build();
                    Stop savedStop = stopService.createStop(stop);
                    savedStops.add(savedStop);
                }
                savedDay.setStops(savedStops);
                savedDays.add(savedDay);
            }

            savedTrip.setDays(savedDays);

            // Build response
            TripWithDaysAndStopsResponse response = buildTripResponse(savedTrip);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
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
        System.err.println(tripRequest.getUserId() + " " + tripRequest.getTitle());
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

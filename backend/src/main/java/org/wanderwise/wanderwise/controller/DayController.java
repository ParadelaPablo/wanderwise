package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.DTO.request.DayRequest;
import org.wanderwise.wanderwise.DTO.response.DayResponse;
import org.wanderwise.wanderwise.DTO.response.StopResponse;
import org.wanderwise.wanderwise.entity.Day;
import org.wanderwise.wanderwise.entity.Stop;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.service.DayService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/days")
@CrossOrigin
public class DayController {

    private final DayService dayService;

    public DayController(DayService dayService) {
        this.dayService = dayService;
    }

    public List<StopResponse> mapToStopResponse(List<Stop> stops) {
        return stops.stream()
                .map(stop -> StopResponse.builder()
                        .id(stop.getId())
                        .dayId(stop.getDay().getId())
                        .stopType(stop.getStopType().toString())
                        .name(stop.getName())
                        .createdAt(stop.getCreatedAt())
                        .updatedAt(stop.getUpdatedAt())
                        .build())
                .toList();
    }

    private DayResponse mapToResponse(Day day) {
        return DayResponse.builder()
                .id(day.getId())
                .tripId(day.getTrip().getId())
                .dayOrder(day.getDayOrder())
                .date(day.getDate())
                .stops(mapToStopResponse(day.getStops()))
                .createdAt(day.getCreatedAt())
                .updatedAt(day.getUpdatedAt())
                .build();
    }

    @GetMapping
    public ResponseEntity<List<DayResponse>> getAllDays(@PathVariable Long tripId) {
        List<DayResponse> dayResponses = dayService.getAllDays(tripId).stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(dayResponses);
    }

    @GetMapping("/{dayId}")
    public ResponseEntity<DayResponse> getDayById(@PathVariable Long tripId, @PathVariable Long dayId) {
        DayResponse dayResponse = mapToResponse(dayService.getDayById(tripId, dayId));
        return ResponseEntity.ok(dayResponse);
    }

    @PostMapping
    public ResponseEntity<DayResponse> createDay(@PathVariable Long tripId, @RequestBody DayRequest dayRequest) {
        Day day = Day.builder()
                .trip(Trip.builder().id(tripId).build())
                .dayOrder(dayRequest.getDayOrder())
                .date(dayRequest.getDate())
                .build();
        Day createdDay = dayService.createDay(tripId, day);
        URI location = URI.create(String.format("/api/trips/%d/days/%d", tripId, createdDay.getId()));
        return ResponseEntity.created(location).body(mapToResponse(createdDay));
    }

    @PutMapping("/{dayId}")
    public ResponseEntity<DayResponse> updateDay(@PathVariable Long tripId, @PathVariable Long dayId, @RequestBody DayRequest dayRequest) {
        Day day = Day.builder()
                .id(dayId)
                .trip(Trip.builder().id(tripId).build())
                .dayOrder(dayRequest.getDayOrder())
                .date(dayRequest.getDate())
                .build();
        Day updatedDay = dayService.updateDay(tripId, day);
        return ResponseEntity.ok(mapToResponse(updatedDay));
    }

    @DeleteMapping("/{dayId}")
    public ResponseEntity<Void> deleteDay(@PathVariable Long tripId, @PathVariable Long dayId) {
        dayService.deleteDay(tripId, dayId);
        return ResponseEntity.noContent().build();
    }
}

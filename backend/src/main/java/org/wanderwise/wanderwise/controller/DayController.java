package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wanderwise.wanderwise.DTO.response.DayResponse;
import org.wanderwise.wanderwise.DTO.response.StopResponse;
import org.wanderwise.wanderwise.entity.Day;
import org.wanderwise.wanderwise.entity.Stop;
import org.wanderwise.wanderwise.service.DayService;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/days")
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
                        .tripId(stop.getDay().getTrip().getId())
                        .latitude(stop.getLatitude())
                        .longitude(stop.getLongitude())
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



}

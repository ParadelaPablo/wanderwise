package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.DTO.request.StopRequest;
import org.wanderwise.wanderwise.DTO.response.StopResponse;
import org.wanderwise.wanderwise.entity.Stop;
import org.wanderwise.wanderwise.entity.StopType;
import org.wanderwise.wanderwise.service.StopService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/days/{dayId}/stops")
@CrossOrigin
public class StopController {
    private final StopService stopService;

    public StopController(StopService stopService) {
        this.stopService = stopService;
    }

    private StopResponse mapToResponse(Stop stop) {
        return StopResponse.builder()
                .id(stop.getId())
                .dayId(stop.getDay().getId())
                .stopType(stop.getStopType().toString())
                .name(stop.getName())
                .createdAt(stop.getCreatedAt())
                .updatedAt(stop.getUpdatedAt())
                .build();
    }

    private Stop mapToEntity (StopRequest stopRequest) {
        return  Stop.builder()
                .name(stopRequest.getName())
                .stopType(StopType.valueOf(stopRequest.getStopType()))
                .build();
    }

    @GetMapping
    public ResponseEntity<List<StopResponse>> getAllStops(@PathVariable Long tripId, @PathVariable Long dayId) {
        List<Stop> stops = stopService.getAllStops(dayId);
        return ResponseEntity.ok(stops.stream().map(this::mapToResponse).toList());
    }

    @GetMapping("/{stopId}")
    public ResponseEntity<StopResponse> getStopById(@PathVariable Long tripId,
                            @PathVariable Long dayId,
                            @PathVariable Long stopId) {
        Stop stop = stopService.getStopById(stopId);
        return ResponseEntity.ok(mapToResponse(stop));
    }

    @PostMapping
    public ResponseEntity<StopResponse> createStop(@PathVariable Long tripId,
                                   @PathVariable Long dayId,
                                   @RequestBody StopRequest stopRequest) {
        Stop stop = mapToEntity(stopRequest);
        stop = stopService.createStop(stop);
        URI location = URI.create(String.format("/api/trips/%d/days/%d/stops/%d", tripId, dayId, stop.getId()));
        return ResponseEntity.created(location).body(mapToResponse(stop));
    }

    @PutMapping("/{stopId}")
    public ResponseEntity<StopResponse> updateStop(@PathVariable Long tripId,
                                   @PathVariable Long dayId,
                                   @PathVariable Long stopId,
                                   @RequestBody StopRequest stopRequest) {
        Stop stop = mapToEntity(stopRequest);
        stop = stopService.updateStop(stopId, stop);
        return ResponseEntity.ok(mapToResponse(stop));
    }

    @DeleteMapping("/{stopId}")
    public ResponseEntity<Void> deleteStop(@PathVariable Long tripId,
                           @PathVariable Long dayId,
                           @PathVariable Long stopId) throws Exception {
        stopService.deleteStop(stopId);
        return ResponseEntity.noContent().build();
    }

}

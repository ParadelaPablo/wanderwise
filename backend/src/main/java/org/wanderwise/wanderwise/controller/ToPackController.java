package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.entity.ToPack;
import org.wanderwise.wanderwise.service.ToPackService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/topacks")
public class ToPackController {

    private final ToPackService toPackService;

    public ToPackController(ToPackService toPackService) {
        this.toPackService = toPackService;
    }

    @GetMapping
    public ResponseEntity<List<ToPack>> getAllToPacksByTrip(@PathVariable Long tripId) {
        List<ToPack> toPacks = toPackService.getToPacksByTripId(tripId);
        return ResponseEntity.ok(toPacks);
    }

    @GetMapping("/{toPackId}")
    public ResponseEntity<ToPack> getToPackById(@PathVariable Long tripId, @PathVariable Long toPackId) {
        ToPack toPack = toPackService.getToPackById(toPackId);
        return ResponseEntity.ok(toPack);
    }

    @PostMapping
    public ResponseEntity<ToPack> createToPack(@PathVariable Long tripId, @RequestBody ToPack toPack) {
        ToPack newToPack = toPackService.createToPackForTrip(tripId, toPack);
        URI location = URI.create(String.format("/api/trips/%d/topacks/%d", tripId, newToPack.getId()));
        return ResponseEntity.created(location).body(newToPack);
    }

    @PutMapping("/{toPackId}")
    public ResponseEntity<ToPack> updateToPack(@PathVariable Long tripId, @PathVariable Long toPackId, @RequestBody ToPack updatedToPack) {
        ToPack toPack = toPackService.updateToPackForTrip(tripId, toPackId, updatedToPack);
        return ResponseEntity.ok(toPack);
    }

    @DeleteMapping("/{toPackId}")
    public ResponseEntity<Void> deleteToPack(@PathVariable Long tripId, @PathVariable Long toPackId) {
        toPackService.deleteToPackById(toPackId);
        return ResponseEntity.noContent().build();
    }
}

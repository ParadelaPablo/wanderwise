package org.wanderwise.wanderwise.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.entity.ToPack;
import org.wanderwise.wanderwise.service.ToPackService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard/trips/{tripId}/topacks")
public class ToPackController {

    private final ToPackService toPackService;

    public ToPackController(ToPackService toPackService) {
        this.toPackService = toPackService;
    }

    @GetMapping
    public ResponseEntity<List<ToPack>> getAllToPacks(@PathVariable Long tripId) {
        List<ToPack> toPacks = toPackService.getAllToPacks();
        return ResponseEntity.ok(toPacks);
    }

    @GetMapping("/{topackId}")
    public ResponseEntity<ToPack> getToPackById(@PathVariable Long tripId, @PathVariable Long toPackId) {
        ToPack toPack = toPackService.getToPackById(toPackId);
        return ResponseEntity.ok(toPack);

    }

    @PostMapping
    public ResponseEntity<ToPack> createToPack(@PathVariable Long tripId, @RequestBody ToPack toPack) {
        ToPack newToPack = toPackService.createToPack(toPack);
        URI location = URI.create(String.format("/api/dashboard/trips/%s/topacks/%s", tripId, newToPack.getId()));
        return ResponseEntity.ok(newToPack);
    }

    @PutMapping
    public ResponseEntity<ToPack> updateToPack(@PathVariable Long tripId, @RequestBody ToPack updatedToPack, @RequestParam Long toPackId) {
        ToPack toPack = toPackService.updateToPack(toPackId, updatedToPack);
        return ResponseEntity.ok(toPack);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteToPack(@PathVariable Long tripId, @PathVariable Long toPackId) {
        toPackService.deleteToPackById(toPackId);
        return ResponseEntity.noContent().build();
    }
}
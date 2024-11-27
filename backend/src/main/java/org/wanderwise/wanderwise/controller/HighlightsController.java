package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.DTO.response.HighlightsResponse;
import org.wanderwise.wanderwise.entity.Highlights;
import org.wanderwise.wanderwise.service.HighlightsService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/highlights")
public class HighlightsController {

    private final HighlightsService highlightsService;

    public HighlightsController(HighlightsService highlightsService) {
        this.highlightsService = highlightsService;
    }

    @GetMapping
    public ResponseEntity<List<HighlightsResponse>> getAllHighlights() {
        List<HighlightsResponse> response = highlightsService.getAllHighlights().stream()
                .map(this::mapToHighlightsResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<HighlightsResponse> createHighlight(@RequestBody Highlights highlights) {
        Highlights createdHighlight = highlightsService.createHighlight(highlights);
        return ResponseEntity.ok(mapToHighlightsResponse(createdHighlight));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHighlight(@PathVariable Long id) {
        highlightsService.deleteHighlight(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<HighlightsResponse> updateHighlights(
            @PathVariable Long id,
            @RequestBody Highlights updatedHighlights) {
        Highlights highlight = highlightsService.updateHighlights(id, updatedHighlights);
        return ResponseEntity.ok(mapToHighlightsResponse(highlight));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<HighlightsResponse>> getHighlightsByTripId(@PathVariable Long tripId) {
        List<HighlightsResponse> response = highlightsService.getHighlightsByTripId(tripId).stream()
                .map(this::mapToHighlightsResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    private HighlightsResponse mapToHighlightsResponse(Highlights highlights) {
        return HighlightsResponse.builder()
                .id(highlights.getId())
                .tripId(highlights.getTrip().getId())
                .text(highlights.getText())
                .title(highlights.getTitle())
                .image_url(highlights.getImage())
                .song_url(highlights.getSong())
                .build();
    }
}

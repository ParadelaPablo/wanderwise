package org.wanderwise.wanderwise.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.wanderwise.wanderwise.DTO.request.HighlightRequest;
import org.wanderwise.wanderwise.DTO.response.HighlightsResponse;
import org.wanderwise.wanderwise.entity.Highlights;
import org.wanderwise.wanderwise.entity.Song;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.service.HighlightsService;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/highlights")
@CrossOrigin
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

    @PostMapping("/new")
    public ResponseEntity<HighlightsResponse> createHighlight(
            @RequestParam("tripId") String tripId,
            @RequestParam("text") String text,
            @RequestParam("title") String title,
            @RequestParam("date") String date,
            @RequestParam(value = "songTitle", defaultValue = "", required = false) String songTitle,
            @RequestParam(value = "songArtist", defaultValue = "", required = false) String songArtist,
            @RequestParam(value = "songUrl", defaultValue = "", required = false) String songUrl,
            @RequestParam(value = "songCoverUrl", defaultValue = "", required = false) String songCoverUrl,
            @RequestParam(value = "image") MultipartFile image) throws IOException   {


        HighlightRequest highlightRequest = HighlightRequest.builder()
                .tripId(Long.parseLong(tripId))
                .text(text)
                .date(date)
                .title(title)
                .songTitle(songTitle)
                .artist(songArtist)
                .songUrl(songUrl)
                .songCoverUrl(songCoverUrl)
                .image(image.getBytes())
                .build();

        Highlights highlight = highlightsService.createHighlight(highlightRequest);

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHighlight(@PathVariable Long id) {
        System.err.println("Highglight to be delete with ID: " + id);
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
        String songTitle = null;
        String songArtist = null;
        String songUrl = null;
        String songCoverUrl = null;

        if (highlights.getSong() != null) {
            songTitle = highlights.getSong().getTitle();
            songArtist = highlights.getSong().getArtist();
            songUrl = highlights.getSong().getSongUrl();
            songCoverUrl = highlights.getSong().getCoverUrl();
        }
        return new HighlightsResponse(
                highlights.getId(),
                highlights.getText(),
                highlights.getTitle(),
                highlights.getDate(),
                songTitle,
                songArtist,
                songUrl,
                songCoverUrl,
                highlights.getImage()
        );
    }
}

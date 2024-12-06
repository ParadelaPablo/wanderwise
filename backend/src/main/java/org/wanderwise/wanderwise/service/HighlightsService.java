package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.DTO.request.HighlightRequest;
import org.wanderwise.wanderwise.entity.Highlights;
import org.wanderwise.wanderwise.entity.Song;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.repository.HighlightsRepository;
import org.wanderwise.wanderwise.repository.SongRepository;
import org.wanderwise.wanderwise.repository.TripRepository;

import java.util.List;

@Service
public class HighlightsService {

    private final HighlightsRepository highlightsRepository;
    private final SongRepository songRepository;
    private final TripRepository tripRepository;
    private final CloudStorage cloudStorage;

    public HighlightsService(HighlightsRepository highlightRepository,
            SongRepository songRepository,
            TripRepository tripRepository,
            CloudStorage cloudStorage) {
        this.highlightsRepository = highlightRepository;
        this.songRepository = songRepository;
        this.tripRepository = tripRepository;
        this.cloudStorage = cloudStorage;
    }

    public List<Highlights> getAllHighlights() {
        return highlightsRepository.findAll();
    }

    public Highlights createHighlight(HighlightRequest highlightRequest) {
        Trip trip = tripRepository.findById(highlightRequest.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        Song song = null;
        if (highlightRequest.getSongTitle() != null && !highlightRequest.getSongTitle().isEmpty()) {
            song = Song.builder()
                    .title(highlightRequest.getSongTitle())
                    .artist(highlightRequest.getArtist())
                    .songUrl(highlightRequest.getSongUrl())
                    .coverUrl(highlightRequest.getSongCoverUrl())
                    .build();
            song = songRepository.save(song);
        }

        Highlights highlights = Highlights.builder()
                .trip(trip)
                .date(highlightRequest.getDate())
                .text(highlightRequest.getText())
                .title(highlightRequest.getTitle())
                .image(cloudStorage.uploadFile(highlightRequest.getTitle() + "-" + highlightRequest.getTitle() + ".png", highlightRequest.getImage()))
                .song(song)
                .build();
        System.err.println("Date: " + highlights.getDate());    
        System.err.println("Trip ID: " + highlights.getTrip().getId());     
        return highlightsRepository.save(highlights);
    }

    public void deleteHighlight(Long id) {
        System.err.println("deleteHighlight() in service with ID: " + id);
        highlightsRepository.deleteById(id);
    }

    public Highlights updateHighlights(Long id, Highlights updatedHighlights) {
        return highlightsRepository.findById(id)
                .map(highlights -> {
                    highlights.setText(updatedHighlights.getText());
                    highlights.setTitle(updatedHighlights.getTitle());
                    highlights.setImage(updatedHighlights.getImage());
                    highlights.setSong(updatedHighlights.getSong());
                    return highlightsRepository.save(highlights);
                })
                .orElseThrow(() -> new RuntimeException("Highlight not found"));
    }

    public List<Highlights> getHighlightsByTripId(Long tripId) {
        return highlightsRepository.findByTripId(tripId);
    }
}

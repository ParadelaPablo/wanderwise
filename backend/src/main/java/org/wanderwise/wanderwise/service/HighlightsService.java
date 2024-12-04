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
        Song song = null;
        System.out.println("sohighlightRequest = " + highlightRequest.getSongTitle());
        System.out.println(" highlightRequest.getSongUrl() = " + highlightRequest.getSongUrl());

        if (highlightRequest.getSongTitle() != null ||
                highlightRequest.getArtist() != null ||
                highlightRequest.getSongUrl() != null ||
                highlightRequest.getSongCoverUrl() != null) {
            song = songRepository.save(Song.builder()
                    .title(highlightRequest.getSongTitle())
                    .artist(highlightRequest.getArtist())
                    .songUrl(highlightRequest.getSongUrl())
                    .coverUrl(highlightRequest.getSongCoverUrl())
                    .build());
        }
        System.out.println("song = " + song);

        Trip trip = tripRepository.findById(highlightRequest.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        String imageUrl = cloudStorage.uploadFile(highlightRequest.getTitle() + ".png", highlightRequest.getImage());

        Highlights highlight = Highlights.builder()
                .trip(trip)
                .text(highlightRequest.getText())
                .title(highlightRequest.getTitle())
                .date(highlightRequest.getDate())
                .image(imageUrl)
                .song(song)
                .build();

        return highlightsRepository.save(highlight);
    }

    public void deleteHighlight(Long id) {
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

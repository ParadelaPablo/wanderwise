package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.Highlights;
import org.wanderwise.wanderwise.repository.HighlightsRepository;

import java.util.List;

@Service
public class HighlightsService {

    private final HighlightsRepository highlightsRepository;

    public HighlightsService(HighlightsRepository highlightRepository) {
        this.highlightsRepository = highlightRepository;
    }

    public List<Highlights> getAllHighlights() {
        return highlightsRepository.findAll();
    }

    public Highlights createHighlight(Highlights highlights) {
        return highlightsRepository.save(highlights);
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
        return highlightsRepository.findAll().stream()
                .filter(highlights -> highlights.getTripId().getId().equals(tripId))
                .toList();
    }
}

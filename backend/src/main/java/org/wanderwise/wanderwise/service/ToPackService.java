package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.ToPack;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.repository.ToPackRepository;
import org.wanderwise.wanderwise.repository.TripRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ToPackService {

    private final ToPackRepository toPackRepository;
    private final TripRepository tripRepository;

    public ToPackService(ToPackRepository toPackRepository, TripRepository tripRepository) {
        this.toPackRepository = toPackRepository;
        this.tripRepository = tripRepository;
    }


    public List<ToPack> getToPacksByTripId(Long tripId) {
        return toPackRepository.findByTrip_Id(tripId);
    }

    public ToPack getToPackById(Long id) {
        return toPackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("ToPack not found with ID: " + id));
    }

    public ToPack createToPackForTrip(Long tripId, ToPack toPack) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new NoSuchElementException("Trip not found with ID: " + tripId));

        toPack.setTrip(trip);

        if (toPack.getText() == null || toPack.getText().isEmpty()) {
            throw new IllegalArgumentException("Text for ToPack cannot be null or empty");
        }

        ToPack savedToPack = toPackRepository.save(toPack);

        if (savedToPack.getId() == null) {
            throw new RuntimeException("Failed to generate ID for ToPack");
        }

        return savedToPack;
    }



    public ToPack updateToPackForTrip(Long tripId, Long toPackId, ToPack updatedToPack) {
        return toPackRepository.findById(toPackId)
                .filter(toPack -> toPack.getTrip().getId().equals(tripId))
                .map(toPack -> {
                    toPack.setText(updatedToPack.getText());
                    toPack.setDone(updatedToPack.getDone());
                    return toPackRepository.save(toPack);
                })
                .orElseThrow(() -> new RuntimeException("ToPack not found for Trip ID: " + tripId + " and ToPack ID: " + toPackId));
    }

    public void deleteToPackById(Long toPackId) {
        if (!toPackRepository.existsById(toPackId)) {
            throw new RuntimeException("ToPack not found with ID: " + toPackId);
        }
        toPackRepository.deleteById(toPackId);
    }
}

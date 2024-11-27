package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.ToPack;
import org.wanderwise.wanderwise.repository.ToPackRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ToPackService {

    private final ToPackRepository toPackRepository;

    public ToPackService(ToPackRepository toPackRepository) {
        this.toPackRepository = toPackRepository;
    }

    public List<ToPack> getToPacksByTripId(Long tripId) {
        return toPackRepository.findByTrip_Id(tripId);
    }

    public ToPack getToPackById(Long id) {
        return toPackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("ToPack not found with ID: " + id));
    }

    public ToPack createToPackForTrip(Long tripId, ToPack toPack) {
        toPack.getTrip().setId(tripId);
        return toPackRepository.save(toPack);
    }

    public ToPack updateToPackForTrip(Long tripId, Long toPackId, ToPack updatedToPack) {
        return toPackRepository.findById(toPackId)
                .filter(toPack -> toPack.getTrip().getId().equals(tripId))
                .map(toPack -> {
                    toPack.setToPack(updatedToPack.getToPack());
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

package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.Stop;
import org.wanderwise.wanderwise.repository.StopRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StopService {
    private final StopRepository stopRepository;

    public StopService(StopRepository stopRepository) {
        this.stopRepository = stopRepository;
    }

    public List<Stop> getAllStops(Long dayId) {
        return stopRepository.findByDay_Id(dayId);
    }

    public Stop getStopById(Long id) {
        if (id < 0) {
            throw new IllegalArgumentException("Invalid stop id");
        }
        return stopRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Stop not found"));
    }

    public Stop createStop(Stop stop) {
        if (stop.getDay() == null) {
            throw new IllegalArgumentException("Day is required");
        }
        if (stop.getDay().getId() < 0) {
            throw new IllegalArgumentException("Invalid day id");
        }
        return stopRepository.save(stop);
    }

    public Stop updateStop(Long id, Stop stop) {
        if (id < 0) {
            throw new IllegalArgumentException("Invalid stop id");
        }
        Stop existingStop = getStopById(id);
        existingStop.setLatitude(stop.getLatitude());
        existingStop.setLongitude(stop.getLongitude());
        return stopRepository.save(existingStop);
    }

    public void deleteStop(Long id) throws Exception {
        if (id < 0) {
            throw new IllegalArgumentException("Invalid stop id");
        }
        Stop stop = getStopById(id);
        try {
            stopRepository.delete(stop);
        } catch (Exception e) {
            throw new Exception("Error deleting stop: " + e.getMessage());
        }
    }
}

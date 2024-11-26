package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.repository.StopRepository;

@Service
public class StopService {
    private final StopRepository stopRepository;

    public StopService(StopRepository stopRepository) {
        this.stopRepository = stopRepository;
    }
}

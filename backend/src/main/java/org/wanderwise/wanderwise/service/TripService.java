package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.repository.TripRepository;
import org.wanderwise.wanderwise.repository.UserTripRepository;

@Service
public class TripService {
    private final TripRepository tripRepository;
    private final UserTripRepository userTripRepository;

    public TripService(TripRepository tripRepository,
                       UserTripRepository userTripRepository) {
        this.tripRepository = tripRepository;
        this.userTripRepository = userTripRepository;
    }
}

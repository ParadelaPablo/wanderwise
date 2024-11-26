package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.repository.UserTripRepository;

@Service
public class UserTripService {
    private final UserTripRepository userTripRepository;

    public UserTripService(UserTripRepository userTripRepository) {
        this.userTripRepository = userTripRepository;
    }
}

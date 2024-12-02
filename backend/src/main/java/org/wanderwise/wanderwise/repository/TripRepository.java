package org.wanderwise.wanderwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.Trip;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByUserId(String userId);
}

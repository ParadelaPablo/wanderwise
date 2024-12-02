package org.wanderwise.wanderwise.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.Highlights;

import java.util.List;

@Repository
public interface HighlightsRepository extends JpaRepository<Highlights, Long> {
    List<Highlights> findByTripId(Long tripId);

}

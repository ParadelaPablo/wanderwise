package org.wanderwise.wanderwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.Stop;

@Repository
public interface StopRepository  extends JpaRepository<Stop, Long> {
}

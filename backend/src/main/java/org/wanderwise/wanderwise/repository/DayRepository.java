package org.wanderwise.wanderwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.Day;

import java.util.List;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
    List<Day> findByTrip_Id(Long tripId);
}

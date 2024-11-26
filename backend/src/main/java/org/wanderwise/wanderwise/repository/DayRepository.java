package org.wanderwise.wanderwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.Day;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
}

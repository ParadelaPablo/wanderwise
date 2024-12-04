package org.wanderwise.wanderwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.ToDo;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    List<ToDo> findByTrip_Id(Long tripId);

    boolean existsByIdAndTrip_Id(Long id, Long tripId);

    Optional<ToDo> findByIdAndTrip_Id(Long id, Long tripId);
}

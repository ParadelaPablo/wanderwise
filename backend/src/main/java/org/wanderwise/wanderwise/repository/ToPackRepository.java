package org.wanderwise.wanderwise.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.ToPack;

import java.util.List;

@Repository
public interface ToPackRepository extends JpaRepository <ToPack, Long> {
    List<ToPack> findByTrip_Id(Long tripId);

}

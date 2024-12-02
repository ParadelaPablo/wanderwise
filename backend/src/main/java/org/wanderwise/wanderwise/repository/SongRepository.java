package org.wanderwise.wanderwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wanderwise.wanderwise.entity.Song;


@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

}

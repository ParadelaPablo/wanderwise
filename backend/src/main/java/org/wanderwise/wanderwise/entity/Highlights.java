package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import lombok.*;
import org.wanderwise.wanderwise.entity.Trip;

@Entity
@Table(name = "highlights")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Highlights {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false, length = 400)
    private String text;

    @Column(nullable = false)
    private String title;

    @Column(name = "image_url")
    private String image;

    @Column(name = "song_url")
    private String song;

}

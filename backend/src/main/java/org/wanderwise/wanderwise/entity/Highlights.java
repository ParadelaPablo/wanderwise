package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import lombok.*;

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
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false, length = 400)
    private String text;

    @Column(nullable = false)
    private String title;

    @Column(name = "image_url")
    private String image;

    @Column(nullable = true)
    private String date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id", nullable = true)
    private Song song;
}

package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "toPack")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ToPack {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Column(nullable = false)
    String text;

    @Column(nullable = false)
    Boolean done;

}

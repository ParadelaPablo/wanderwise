package org.wanderwise.wanderwise.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "to_pack")
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
    @JoinColumn(name = "trip_id", nullable = false)
    @JsonIgnore
    private Trip trip;

    @Column(nullable = false)
    String text;

    @Column(nullable = false)
    Boolean done;
}

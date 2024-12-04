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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    @JsonIgnore
    private Trip trip;

    @Column(nullable = false, length = 1000)
    private String text;

    @Column(nullable = false)
    private Boolean done;
}


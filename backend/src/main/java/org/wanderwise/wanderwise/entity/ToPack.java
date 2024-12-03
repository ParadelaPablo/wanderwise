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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private Boolean done;
}

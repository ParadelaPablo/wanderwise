package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "stops")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Stop {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_id")
    private Day day;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StopType stopType;

    @Column(nullable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @PastOrPresent
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

}

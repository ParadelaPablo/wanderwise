package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_trip_id")
    private UserTrip userTrip;


    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @CreationTimestamp
    @PastOrPresent(message = "Start date should be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;


    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
}

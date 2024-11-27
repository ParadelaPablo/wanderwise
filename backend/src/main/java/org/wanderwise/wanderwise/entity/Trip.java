package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "trips")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_trip_id")
    private UserTrip userTrip;

    @OneToMany(mappedBy = "trip", fetch = FetchType.LAZY)
    private List<Stop> stops;


    @Column(nullable = false)
    @Size(min = 3, max = 255, message = "Title must be between 3 and 255 characters")
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

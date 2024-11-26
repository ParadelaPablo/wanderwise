package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_trips")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    @OneToMany(mappedBy = "userTrip", fetch = FetchType.LAZY)
    private List<Trip> trips;

    @Column(nullable = false)
    @PastOrPresent
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

}

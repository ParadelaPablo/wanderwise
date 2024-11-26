package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;


/**
 * The Day entity represents a day in a trip. It contains the date of the day, the order of the day in the trip, the trip
 * it belongs to and the stops that are in the day.
 * The day order is used to determine the order of the days in the trip. The date is used to determine the date of the day.
 *
 * @see Trip
 * @see Stop
 * @see StopType
 */
@Entity
@Table(name = "days")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Day {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Column(nullable = false)
    @Min(1)
    private Integer dayOrder;

    @OneToMany(mappedBy = "day", fetch = FetchType.LAZY)
    private List<Stop> stops;

    @Column(nullable = false)
    @Future
    private LocalDateTime date;

    @Column(nullable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @PastOrPresent
    private LocalDateTime createdAt;

    @Column(nullable = true)
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
}

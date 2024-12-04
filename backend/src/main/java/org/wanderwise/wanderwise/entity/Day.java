package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * The Day entity represents a day in a trip. It contains the date of the day,
 * the order of the day in the trip, the trip
 * it belongs to and the stops that are in the day.
 * The day order is used to determine the order of the days in the trip. The
 * date is used to determine the date of the day.
 * <ul>
 * A Day has the following properties:
 * <li>id: a Long value representing the id of the day.</li>
 * <li>trip: a Trip object representing the trip the day belongs to.</li>
 * <li>dayOrder: an Integer value representing the order of the day in the
 * trip.</li>
 * <li>stops: a List of Stop objects representing the stops in the day.</li>
 * <li>date: a String value representing the date of the day.</li>
 * <li>createdAt: a LocalDateTime object representing the date and time the day
 * was created.</li>
 * <li>updatedAt: a LocalDateTime object representing the date and time the day
 * was last updated.</li>
 * </ul>
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
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false)
    @Min(1)
    private Integer dayOrder;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Stop> stops = new ArrayList<>();

    @Column(nullable = false)
    private String date;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    @PastOrPresent
    private LocalDateTime createdAt;

    @Column(nullable = true)
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}


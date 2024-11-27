package org.wanderwise.wanderwise.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "toDo")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip tripId;

    @Column(nullable = false, length = 200)
    private String toDo;

    @Column(nullable = false)
    private Boolean done;
}

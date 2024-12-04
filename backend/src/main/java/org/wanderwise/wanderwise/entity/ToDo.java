package org.wanderwise.wanderwise.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "to_do")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    @JsonIgnore
    private Trip trip;

    @Column(nullable = false, length = 1000)
    @NotBlank(message = "The toDo field cannot be empty")
    private String text;

    @Column(nullable = false)
    private Boolean done;
}


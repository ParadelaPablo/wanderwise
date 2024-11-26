package org.wanderwise.wanderwise.DTO.response;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TripResponse {
    private Long id;

    private Long userTripId;

    private String title;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

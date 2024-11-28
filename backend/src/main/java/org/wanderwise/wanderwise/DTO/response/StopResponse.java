package org.wanderwise.wanderwise.DTO.response;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class StopResponse {
    private Long id;

    private Long dayId;

    private String stopType;

    private String name;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}


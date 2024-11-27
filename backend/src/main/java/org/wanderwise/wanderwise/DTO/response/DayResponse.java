package org.wanderwise.wanderwise.DTO.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DayResponse {
    private Long id;

    private Long tripId;

    private Integer dayOrder;

    private LocalDateTime date;

    private List<StopResponse> stops;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}

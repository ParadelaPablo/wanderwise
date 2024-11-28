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

    private String date;

    private List<StopResponse> stops;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    public DayResponse(Long id, Long tripId, Integer dayOrder, String date, List<StopResponse> stops) {
        this.id = id;
        this.tripId = tripId;
        this.dayOrder = dayOrder;
        this.date = date;
        this.stops = stops;
    }
}

package org.wanderwise.wanderwise.DTO.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayWithStopsResponse {
    private Long id;
    private Integer dayOrder;
    private String date;
    private Long tripId;
    private List<StopResponse> stops;
}

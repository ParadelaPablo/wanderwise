package org.wanderwise.wanderwise.DTO.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayWithStops {
    private Integer dayOrder;
    private String date;
    private List<StopRequest> stops;
}

package org.wanderwise.wanderwise.DTO.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TripWithDaysAndStopsResponse {
    private Long id;
    private String userId;
    private String title;
    private List<DayWithStopsResponse> days;
}

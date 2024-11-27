package org.wanderwise.wanderwise.DTO.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TripWithDaysAndStops {
    private String userId;
    private String title;
    private List<DayWithStops> days;
}

package org.wanderwise.wanderwise.DTO.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DayRequest {

        @NotNull
        private Long tripId;

        @Min(1)
        private Integer dayOrder;

        @Future
        private String date;
}

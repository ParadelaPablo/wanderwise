package org.wanderwise.wanderwise.DTO.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class StopRequest {
    @NotNull
    private Long dayId;

    @NotNull
    private String stopType;

    @NotNull
    private String name;
}

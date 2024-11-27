package org.wanderwise.wanderwise.DTO.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TripRequest {
    @NotNull
    private String userId;

    @NotNull
    @Size(min = 3, max = 255, message = "Title must be between 3 and 255 characters")
    private String title;
}

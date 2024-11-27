package org.wanderwise.wanderwise.DTO.request;


import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class HighlightsRequest {

    @NotNull
    private Long tripId;

    @NotNull
    private String text;

    @NotNull
    private String title;

    @NotNull
    private String image_url;

    @NotNull
    private String song_url;

}

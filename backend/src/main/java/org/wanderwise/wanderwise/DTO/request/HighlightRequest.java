package org.wanderwise.wanderwise.DTO.request;


import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class HighlightRequest {

    @NotNull
    private Long tripId;

    @NotNull
    private String text;

    @NotNull
    private String title;

    private String date;
    private String songTitle;
    private String artist;
    private String songUrl;
    private String songCoverUrl;

    @NotNull
    private byte[] image;

}

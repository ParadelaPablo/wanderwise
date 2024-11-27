package org.wanderwise.wanderwise.DTO.response;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class HighlightsResponse {

    private Long id;

    private Long tripId;

    private String text;

    private String title;

    private String image_url;

    private String song_url;
}

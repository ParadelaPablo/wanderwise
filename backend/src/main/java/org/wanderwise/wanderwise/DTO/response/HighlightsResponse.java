package org.wanderwise.wanderwise.DTO.response;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class HighlightsResponse {
    private Long id;
    private String text;
    private String title;
    private String date;
    private String songTitle;
    private String songArtist;
    private String songUrl;
    private String songCoverUrl;
    private String imageUrl;

}

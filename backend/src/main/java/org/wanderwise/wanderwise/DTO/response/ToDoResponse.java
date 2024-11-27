package org.wanderwise.wanderwise.DTO.response;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ToDoResponse {

    private Long id;

    private Long tripId;

    private String toDo;

    private Boolean done;
}

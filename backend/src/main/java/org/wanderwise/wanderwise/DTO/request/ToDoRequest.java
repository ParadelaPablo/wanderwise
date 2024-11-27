package org.wanderwise.wanderwise.DTO.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ToDoRequest {

    @NotNull
    private Long tripId;

    @NotNull
    private String toDo;

    @NotNull
    private Boolean done;
}

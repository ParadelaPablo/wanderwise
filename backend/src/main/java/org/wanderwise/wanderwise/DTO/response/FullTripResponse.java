package org.wanderwise.wanderwise.DTO.response;

import lombok.*;
import org.wanderwise.wanderwise.entity.Day;

import java.time.LocalDateTime;
import java.util.List;


public record FullTripResponse(Long id, String userId, String title, LocalDateTime createdAt , LocalDateTime updatedAt, List<DayResponse> days){
    public FullTripResponse {
    }
}

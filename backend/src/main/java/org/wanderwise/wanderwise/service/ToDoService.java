package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.ToDo;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.repository.ToDoRepository;

import java.util.List;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;
    private final TripService tripService;

    public ToDoService(ToDoRepository toDoRepository, TripService tripService) {
        this.toDoRepository = toDoRepository;
        this.tripService = tripService;
    }

    public List<ToDo> getToDosByTripId(Long tripId) {
        return toDoRepository.findByTrip_Id(tripId);
    }

    public ToDo createToDoForTrip(Long tripId, ToDo toDo) {
        if (toDo.getText() == null || toDo.getText().isBlank()) {
            throw new IllegalArgumentException("ToDo text cannot be null or blank");
        }

        Trip trip = tripService.getTripById(tripId);
        toDo.setTrip(trip);
        return toDoRepository.save(toDo);
    }


    public ToDo updateToDoForTrip(Long tripId, Long toDoId, ToDo updatedToDo) {
        return toDoRepository.findById(toDoId)
                .filter(todo -> todo.getTrip().getId().equals(tripId))
                .map(todo -> {
                    todo.setText(updatedToDo.getText());
                    todo.setDone(updatedToDo.getDone());
                    return toDoRepository.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("ToDo not found for Trip ID: " + tripId + " and ToDo ID: " + toDoId));
    }

    public void deleteToDoById(Long toDoId) {
        if (!toDoRepository.existsById(toDoId)) {
            throw new RuntimeException("ToDo not found with ID: " + toDoId);
        }
        toDoRepository.deleteById(toDoId);
    }
}

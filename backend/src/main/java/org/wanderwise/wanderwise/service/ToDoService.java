package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.ToDo;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.repository.ToDoRepository;
import org.wanderwise.wanderwise.repository.TripRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;
    private final TripRepository tripRepository;

    public ToDoService(ToDoRepository toDoRepository, TripRepository tripRepository) {
        this.toDoRepository = toDoRepository;
        this.tripRepository = tripRepository;
    }

    public List<ToDo> getToDosByTripId(Long tripId) {
        return toDoRepository.findByTrip_Id(tripId);
    }

    public ToDo getToDoById(Long id) {
        return toDoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("ToDo not found with ID: " + id));
    }

    public ToDo createToDoForTrip(Long tripId, ToDo toDo) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new NoSuchElementException("Trip not found with ID: " + tripId));

        toDo.setTrip(trip);

        if (toDo.getText() == null || toDo.getText().isEmpty()) {
            throw new IllegalArgumentException("Text for ToDo cannot be null or empty");
        }

        if (toDo.getDone() == null) {
            toDo.setDone(false);
        }

        return toDoRepository.save(toDo);
    }

    public ToDo updateToDoForTrip(Long tripId, Long toDoId, ToDo updatedToDo) {
        return toDoRepository.findById(toDoId)
                .map(todo -> {
                    if (!todo.getTrip().getId().equals(tripId)) {
                        throw new IllegalArgumentException("ToDo does not belong to the specified Trip ID");
                    }
                    todo.setText(updatedToDo.getText());
                    todo.setDone(updatedToDo.getDone());
                    return toDoRepository.save(todo);
                })
                .orElseThrow(() -> new NoSuchElementException("ToDo not found with ID: " + toDoId));
    }


    public void deleteToDoById(Long toDoId) {
        if (!toDoRepository.existsById(toDoId)) {
            throw new RuntimeException("ToDo not found with ID: " + toDoId);
        }
        toDoRepository.deleteById(toDoId);
    }

    public boolean existsByTripIdAndToDoId(Long tripId, Long toDoId) {
        return toDoRepository.existsByIdAndTrip_Id(toDoId, tripId);
    }

    public ToDo getToDoByTripIdAndToDoId(Long tripId, Long toDoId) {
        return toDoRepository.findByIdAndTrip_Id(toDoId, tripId)
                .orElseThrow(() -> new NoSuchElementException("ToDo not found with ID: " + toDoId + " for Trip ID: " + tripId));
    }


}

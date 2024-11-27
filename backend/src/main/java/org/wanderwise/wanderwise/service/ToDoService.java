package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.ToDo;
import org.wanderwise.wanderwise.repository.ToDoRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public List<ToDo> getToDosByTripId(Long tripId) {
        return toDoRepository.findByTrip_Id(tripId);
    }

    public ToDo getToDoById(Long id) {
        return toDoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("ToDo not found with ID: " + id));
    }

    public ToDo createToDoForTrip(Long tripId, ToDo toDo) {
        toDo.getTrip().setId(tripId);
        return toDoRepository.save(toDo);
    }

    public ToDo updateToDoForTrip(Long tripId, Long toDoId, ToDo updatedToDo) {
        return toDoRepository.findById(toDoId)
                .filter(todo -> todo.getTrip().getId().equals(tripId))
                .map(todo -> {
                    todo.setToDo(updatedToDo.getToDo());
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

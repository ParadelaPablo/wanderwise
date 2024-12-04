package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.entity.ToDo;
import org.wanderwise.wanderwise.service.ToDoService;

import java.util.List;
@RestController
@RequestMapping("/api/trips/{tripId}/todos")
public class ToDoController {

    private final ToDoService toDoService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public ResponseEntity<List<ToDo>> getAllToDosByTrip(@PathVariable Long tripId) {
        List<ToDo> toDos = toDoService.getToDosByTripId(tripId);
        return ResponseEntity.ok(toDos);
    }

    @PostMapping
    public ResponseEntity<ToDo> createToDo(
            @PathVariable Long tripId,
            @RequestBody ToDo toDo) {
        if (toDo.getText() == null || toDo.getText().isBlank()) {
            return ResponseEntity.badRequest().body(null);
        }

        ToDo createdToDo = toDoService.createToDoForTrip(tripId, toDo);
        return ResponseEntity.ok(createdToDo); 
    }

    @PutMapping("/{toDoId}")
    public ResponseEntity<ToDo> updateToDo(
            @PathVariable Long tripId,
            @PathVariable Long toDoId,
            @RequestBody ToDo updatedToDo) {
        ToDo toDo = toDoService.updateToDoForTrip(tripId, toDoId, updatedToDo);
        return ResponseEntity.ok(toDo);
    }

    @DeleteMapping("/{toDoId}")
    public ResponseEntity<Void> deleteToDo(
            @PathVariable Long tripId,
            @PathVariable Long toDoId) {
        toDoService.getToDoByTripIdAndToDoId(tripId, toDoId); // Valida que el ToDo pertenece al Trip
        toDoService.deleteToDoById(toDoId);
        return ResponseEntity.noContent().build();
    }


}

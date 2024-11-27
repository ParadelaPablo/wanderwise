package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wanderwise.wanderwise.entity.ToDo;
import org.wanderwise.wanderwise.service.ToDoService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard/trips/{tripId}/todos")
public class ToDoController {

    private final ToDoService toDoService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public ResponseEntity<List<ToDo>> getAllToDos(@PathVariable Long tripId) {
        List<ToDo> toDos = toDoService.getAllToDos();
        return ResponseEntity.ok(toDos);
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<ToDo> getToDoById(@PathVariable Long tripId, @PathVariable Long toDoId) {
        ToDo toDo = toDoService.getToDoById(toDoId);
        return ResponseEntity.ok(toDo);
    }

    @PostMapping
    public ResponseEntity<ToDo> createToDo(@PathVariable Long tripId, @RequestBody ToDo toDo) {
        ToDo createdToDo = toDoService.createToDo(toDo);
        URI location = URI.create(String.format("/api/dashboard/trips/%d/todos/%d", tripId, createdToDo.getId()));
        return ResponseEntity.created(location).body(createdToDo);
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<ToDo> updateToDo(@PathVariable Long tripId, @PathVariable Long toDoId, @RequestBody ToDo updatedToDo) {
        ToDo toDo = toDoService.updateToDo(toDoId, updatedToDo);
        return ResponseEntity.ok(toDo);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteToDo(@PathVariable Long tripId, @PathVariable Long toDoId) {
        toDoService.deleteToDoById(toDoId);
        return ResponseEntity.noContent().build();
    }
}

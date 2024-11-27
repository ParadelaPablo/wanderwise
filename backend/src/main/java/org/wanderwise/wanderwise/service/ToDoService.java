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

    public List<ToDo> getAllToDos() {
        return toDoRepository.findAll();
    }

    public ToDo getToDoById(Long id) {
        return toDoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("ToDo not found"));
    }

    public ToDo createToDo(ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    public void deleteToDoById(Long id) {
        toDoRepository.deleteById(id);
    }

    public ToDo updateToDo(Long id, ToDo updatedToDo) {
        return toDoRepository.findById(id)
                .map(todo -> {
                    todo.setToDo(updatedToDo.getToDo());
                    todo.setDone(updatedToDo.getDone());
                    return toDoRepository.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }
}

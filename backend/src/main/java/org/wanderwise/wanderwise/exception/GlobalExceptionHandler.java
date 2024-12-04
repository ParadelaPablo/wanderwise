package org.wanderwise.wanderwise.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

/**
 * Global exception handler for the application
 * Handles exceptions thrown by the application
 * and returns appropriate response to the client
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles IllegalArgumentException thrown by the application
     * @param e IllegalArgumentException object
     * @return ResponseEntity with bad request status (400) and exception message
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    /**
     * Handles NullPointerException thrown by the application
     * @param e NullPointerException object
     * @return ResponseEntity with bad request status (400) and exception message
     */
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException e) {
        e.printStackTrace();
        System.err.println(e.getMessage());
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    /**
     * Handles NoSuchElementException thrown by the application
     * @param e NoSuchElementException object
     * @return ResponseEntity with not found status (404) and exception message
     */
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }

    /**
     * Handles Exception thrown by the application
     * @param e Exception object
     * @return ResponseEntity with internal server error status (500) and exception message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace();
        System.err.println(e.getMessage());
        return ResponseEntity.status(500).body(e.getMessage());
    }


}

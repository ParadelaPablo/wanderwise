package org.wanderwise.wanderwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wanderwise.wanderwise.service.TripService;

@RestController
@RequestMapping("/api")
public class TripController {

  private TripService tripService;

  public TripController(TripService tripService) {
    this.tripService = tripService;
  }

  @GetMapping
  public ResponseEntity<String> getTrip(){
    String response = "Hello World";
    return ResponseEntity.ok(response);
  }

}

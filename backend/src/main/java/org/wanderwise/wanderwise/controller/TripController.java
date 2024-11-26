package org.wanderwise.wanderwise.controller;

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
  
}

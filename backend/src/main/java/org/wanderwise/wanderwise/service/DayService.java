package org.wanderwise.wanderwise.service;

import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.Day;
import org.wanderwise.wanderwise.entity.Trip;
import org.wanderwise.wanderwise.repository.DayRepository;
import org.wanderwise.wanderwise.repository.TripRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class DayService {
    private final DayRepository dayRepository;
    private final TripRepository tripRepository;

    public DayService(DayRepository dayRepository,
                      TripRepository tripRepository) {
        this.dayRepository = dayRepository;
        this.tripRepository = tripRepository;
    }

    /**
     * Get all days for a trip
     *
     * @param tripId trip id
     * @return list of days
     */
    public List<Day> getAllDays(Long tripId) {
        if (tripId < 1) {
            throw new IllegalArgumentException("Invalid trip id");
        }
        List<Day> days = dayRepository.findByTrip_Id(tripId);
        if (days.isEmpty()) {
            throw new IllegalArgumentException("No days found for trip");
        }
        return days;
    }

    /**
     * Get a day by id
     *
     * @param tripId trip id
     * @param dayId day id
     * @return day
     * @throws IllegalArgumentException if trip or day id is invalid
     * @throws NoSuchElementException if day is not found
     */
    public Day getDayById(Long tripId, Long dayId) {
        if (tripId < 1 || dayId < 1) {
            throw new IllegalArgumentException("Invalid trip or day id");
        }
        Day day = dayRepository.findById(dayId)
                .orElseThrow(() -> new NoSuchElementException("Day not found"));
        if (!day.getTrip().getId().equals(tripId)) {
            throw new IllegalArgumentException("Day not found for trip");
        }
        return day;
    }

    /**
     * Create a day for a trip
     * @param tripId trip id to create day for
     * @param day day to create
     * @return created day
     * @throws IllegalArgumentException if trip id is invalid or day data is invalid
     */
    public Day createDay(Long tripId, Day day) {
        System.err.println("createDay() has been called, and tripId is: " + tripId);
        if (tripId < 1) {
            throw new IllegalArgumentException("Invalid trip id");
        }
        try {

            Trip trip = tripRepository.findById(tripId)
                    .orElseThrow(() -> new IllegalArgumentException("Trip not found with id: " + tripId));
            System.err.println(trip.getTitle());
            day.setTrip(trip);

            day = dayRepository.save(day);
            return day;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            throw new IllegalArgumentException("Invalid day data");
        }
    }

    /**
     * Update a day
     *
     * @param dayId day id to update
     * @param day day data to update
     * @return updated day
     * @throws IllegalArgumentException if day id is invalid or day data is invalid
     * @throws NoSuchElementException if day is not found
     */
    public Day updateDay(Long dayId, Day day) {
        if (dayId < 1) {
            throw new IllegalArgumentException("Invalid day id");
        }
        Day existingDay = dayRepository.findById(dayId)
                .orElseThrow(() -> new NoSuchElementException("Day not found"));
        day.setId(existingDay.getId());
        day.setTrip(existingDay.getTrip());
        return dayRepository.save(day);
    }

    /**
     * Delete a day
     *
     * @param tripId trip id
     * @param dayId day id
     * @throws IllegalArgumentException if trip or day id is invalid
     * @throws NoSuchElementException if day is not found
     */
    public void deleteDay(Long tripId, Long dayId) {
        if (tripId < 1 || dayId < 1) {
            throw new IllegalArgumentException("Invalid trip or day id");
        }
        Day day = dayRepository.findById(dayId)
                .orElseThrow(() -> new IllegalArgumentException("Day not found"));
        if (!day.getTrip().getId().equals(tripId)) {
            throw new NoSuchElementException("Day not found for trip");
        }
        dayRepository.delete(day);
    }
}

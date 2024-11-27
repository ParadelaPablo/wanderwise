package org.wanderwise.wanderwise.service;


import org.springframework.stereotype.Service;
import org.wanderwise.wanderwise.entity.ToPack;
import org.wanderwise.wanderwise.repository.ToPackRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ToPackService {


    private final ToPackRepository toPackRepository;

    public ToPackService(ToPackRepository toPackRepository) {
        this.toPackRepository = toPackRepository;
    }

    public ToPack getToPackById(Long id) {
        return toPackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("ToPack not found"));
    }

    public List<ToPack> getAllToPacks() {
        return toPackRepository.findAll();
    }

    public ToPack createToPack(ToPack toPack) {
        return toPackRepository.save(toPack);
    }

    public void deleteToPackById(Long id) {
        toPackRepository.deleteById(id);
    }

    public ToPack updateToPack(Long id, ToPack updatedToPack) {
        return toPackRepository.findById(id)
                .map(toPack -> {
                    toPack.setToPack(updatedToPack.getToPack());
                    toPack.setDone(updatedToPack.getDone());
                    return toPackRepository.save(toPack);
                })
                .orElseThrow(() -> new RuntimeException("ToPack not found"));
    }
}


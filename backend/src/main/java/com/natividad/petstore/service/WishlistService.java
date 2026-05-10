package com.natividad.petstore.service;

import com.natividad.petstore.dto.PetDTO;
import com.natividad.petstore.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final PetRepository petRepository;
    private final Set<UUID> petIds = new LinkedHashSet<>();

    public WishlistService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<PetDTO> getWishlistItems() {
        return petIds.stream()
                .flatMap(id -> petRepository.findById(id).stream())
                .map(PetDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void addToWishlist(UUID petId) {
        if (!petRepository.existsById(petId)) {
            throw new IllegalArgumentException("Pet not found: " + petId);
        }
        petIds.add(petId);
    }

    public void removeFromWishlist(UUID petId) {
        petIds.remove(petId);
    }
}

package com.natividad.petstore.dto;

import com.natividad.petstore.model.Pet;

import java.math.BigDecimal;
import java.util.UUID;

public record PetDTO(UUID id, String name, String type, BigDecimal price, Integer age, String description, String imageUrl, Boolean available) {

    public static PetDTO fromEntity(Pet pet) {
        return new PetDTO(
                pet.getId(),
                pet.getName(),
                pet.getType(),
                pet.getPrice(),
                pet.getAge(),
                pet.getDescription(),
                pet.getImageUrl(),
                pet.getAvailable()
        );
    }
}

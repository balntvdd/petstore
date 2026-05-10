package com.natividad.petstore.service;

import com.natividad.petstore.dto.PetDTO;
import com.natividad.petstore.model.Pet;
import com.natividad.petstore.repository.PetRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PetService {

    private final EntityManager entityManager;
    private final PetRepository petRepository;

    public PetService(EntityManager entityManager, PetRepository petRepository) {
        this.entityManager = entityManager;
        this.petRepository = petRepository;
    }

    public Page<PetDTO> findPets(
            String type,
            String search,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer minAge,
            Integer maxAge,
            Boolean available,
            Pageable pageable
    ) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        CriteriaQuery<Pet> query = builder.createQuery(Pet.class);
        Root<Pet> root = query.from(Pet.class);

        List<Predicate> predicates = new ArrayList<>();

        if (type != null && !type.isBlank() && !type.equalsIgnoreCase("all")) {
            predicates.add(builder.equal(builder.lower(root.get("type")), type.toLowerCase()));
        }

        if (search != null && !search.isBlank()) {
            String searchTerm = "%" + search.toLowerCase() + "%";
            predicates.add(builder.or(
                    builder.like(builder.lower(root.get("name")), searchTerm),
                    builder.like(builder.lower(root.get("description")), searchTerm)
            ));
        }

        if (minPrice != null) {
            predicates.add(builder.ge(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            predicates.add(builder.le(root.get("price"), maxPrice));
        }

        if (minAge != null) {
            predicates.add(builder.ge(root.get("age"), minAge));
        }

        if (maxAge != null) {
            predicates.add(builder.le(root.get("age"), maxAge));
        }

        if (available != null) {
            predicates.add(builder.equal(root.get("available"), available));
        }

        query.where(predicates.toArray(new Predicate[0]));
        query.orderBy(builder.asc(root.get("name")));

        TypedQuery<Pet> typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());

        List<PetDTO> pets = typedQuery.getResultList().stream()
                .map(PetDTO::fromEntity)
                .collect(Collectors.toList());

        CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
        Root<Pet> countRoot = countQuery.from(Pet.class);
        List<Predicate> countPredicates = new ArrayList<>();

        if (type != null && !type.isBlank() && !type.equalsIgnoreCase("all")) {
            countPredicates.add(builder.equal(builder.lower(countRoot.get("type")), type.toLowerCase()));
        }

        if (search != null && !search.isBlank()) {
            String searchTerm = "%" + search.toLowerCase() + "%";
            countPredicates.add(builder.or(
                    builder.like(builder.lower(countRoot.get("name")), searchTerm),
                    builder.like(builder.lower(countRoot.get("description")), searchTerm)
            ));
        }

        if (minPrice != null) {
            countPredicates.add(builder.ge(countRoot.get("price"), minPrice));
        }

        if (maxPrice != null) {
            countPredicates.add(builder.le(countRoot.get("price"), maxPrice));
        }

        if (minAge != null) {
            countPredicates.add(builder.ge(countRoot.get("age"), minAge));
        }

        if (maxAge != null) {
            countPredicates.add(builder.le(countRoot.get("age"), maxAge));
        }

        if (available != null) {
            countPredicates.add(builder.equal(countRoot.get("available"), available));
        }

        countQuery.select(builder.count(countRoot));
        countQuery.where(countPredicates.toArray(new Predicate[0]));

        Long total = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(pets, pageable, total);
    }

    public Optional<PetDTO> findPetById(java.util.UUID id) {
        return petRepository.findById(id).map(PetDTO::fromEntity);
    }
}

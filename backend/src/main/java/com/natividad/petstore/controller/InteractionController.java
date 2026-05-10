package com.natividad.petstore.controller;

import com.natividad.petstore.dto.PetDTO;
import com.natividad.petstore.service.CartService;
import com.natividad.petstore.service.WishlistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/natividad")
public class InteractionController {

    private final CartService cartService;
    private final WishlistService wishlistService;

    public InteractionController(CartService cartService, WishlistService wishlistService) {
        this.cartService = cartService;
        this.wishlistService = wishlistService;
    }

    @GetMapping("/cart")
    public ResponseEntity<List<PetDTO>> getCart() {
        return ResponseEntity.ok(cartService.getCartItems());
    }

    @PostMapping("/cart/{petId}")
    public ResponseEntity<Void> addToCart(@PathVariable UUID petId) {
        try {
            cartService.addToCart(petId);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @DeleteMapping("/cart/{petId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable UUID petId) {
        cartService.removeFromCart(petId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/wishlist")
    public ResponseEntity<List<PetDTO>> getWishlist() {
        return ResponseEntity.ok(wishlistService.getWishlistItems());
    }

    @PostMapping("/wishlist/{petId}")
    public ResponseEntity<Void> addToWishlist(@PathVariable UUID petId) {
        try {
            wishlistService.addToWishlist(petId);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @DeleteMapping("/wishlist/{petId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable UUID petId) {
        wishlistService.removeFromWishlist(petId);
        return ResponseEntity.noContent().build();
    }
}

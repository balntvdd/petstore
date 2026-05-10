const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Remote service error');
  }
  return response.json();
}

export async function fetchPets({
  type,
  search,
  minPrice,
  maxPrice,
  minAge,
  maxAge,
  availability,
  page = 0,
  size = 20,
} = {}) {
  const params = new URLSearchParams();

  if (type && type !== 'all') {
    params.set('type', type);
  }
  if (search) {
    params.set('search', search);
  }
  if (minPrice) {
    params.set('minPrice', String(minPrice));
  }
  if (maxPrice) {
    params.set('maxPrice', String(maxPrice));
  }
  if (minAge) {
    params.set('minAge', String(minAge));
  }
  if (maxAge) {
    params.set('maxAge', String(maxAge));
  }
  if (availability && availability !== 'all') {
    params.set('availability', availability);
  } else if (availability === 'all') {
    params.set('availability', availability);
  }
  params.set('page', String(page));
  params.set('size', String(size));

  const response = await fetch(`${API_BASE}/natividad/pets?${params.toString()}`);
  return handleResponse(response);
}

export async function fetchPetById(petId) {
  const response = await fetch(`${API_BASE}/natividad/pets/${petId}`);
  return handleResponse(response);
}

export async function fetchCart() {
  const response = await fetch(`${API_BASE}/natividad/cart`);
  return handleResponse(response);
}

export async function addToCart(petId) {
  const response = await fetch(`${API_BASE}/natividad/cart/${petId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Unable to add item to cart.');
  }
}

export async function removeFromCart(petId) {
  const response = await fetch(`${API_BASE}/natividad/cart/${petId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Unable to remove item from cart.');
  }
}

export async function fetchWishlist() {
  const response = await fetch(`${API_BASE}/natividad/wishlist`);
  return handleResponse(response);
}

export async function addToWishlist(petId) {
  const response = await fetch(`${API_BASE}/natividad/wishlist/${petId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Unable to add item to wishlist.');
  }
}

export async function removeFromWishlist(petId) {
  const response = await fetch(`${API_BASE}/natividad/wishlist/${petId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Unable to remove item from wishlist.');
  }
}

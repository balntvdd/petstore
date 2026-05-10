import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, CircularProgress, Box, Alert, Button } from '@mui/material';
import PetCard from '../components/PetCard';
import FilterControls from '../components/FilterControls';
import SearchBar from '../components/SearchBar';
import {
  fetchPets,
  addToCart,
  addToWishlist,
  fetchCart,
  fetchWishlist,
} from '../services/petService';

const PAGE_SIZE = 20;

export default function ListingPage() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    availability: 'true',
    minPrice: '',
    maxPrice: '',
    minAge: '',
    maxAge: '',
  });
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    fetchPets({
      type: filters.type,
      search,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minAge: filters.minAge,
      maxAge: filters.maxAge,
      availability: filters.availability,
      page,
      size: PAGE_SIZE,
    })
      .then((response) => {
        setPets(response.content || response.pets || []);
        setPagination(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load pets.');
        setLoading(false);
      });
  }, [filters, search, page]);

  useEffect(() => {
    fetchCart().catch(() => null);
    fetchWishlist().catch(() => null);
  }, []);

  const handleFilterChange = (updates) => {
    setFilters((current) => ({ ...current, ...updates }));
    setPage(0);
  };

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      availability: 'true',
      minPrice: '',
      maxPrice: '',
      minAge: '',
      maxAge: '',
    });
    setPage(0);
  };

  const handleAddToCart = async (petId) => {
    try {
      await addToCart(petId);
      setSuccessMessage('Pet added to cart.');
    } catch (err) {
      setError(err.message || 'Could not add pet to cart.');
    }
  };

  const handleAddToWishlist = async (petId) => {
    try {
      await addToWishlist(petId);
      setSuccessMessage('Pet added to wishlist.');
    } catch (err) {
      setError(err.message || 'Could not add pet to wishlist.');
    }
  };

  return (
    <Container maxWidth="lg" className="py-12">
      {/* Hero Section */}
      <Box className="rounded-[40px] bg-gradient-to-r from-purple-50 via-white to-pink-50 border-2 border-purple-200 p-12 shadow-[0_50px_140px_-70px_rgba(147,51,234,0.2)] mb-16">
        <Typography variant="h2" className="font-black text-purple-950 tracking-tight mb-6 text-4xl leading-tight">
          🐾 Find Your Perfect Pet Companion
        </Typography>
        <Typography variant="body1" className="max-w-3xl text-purple-700 leading-8 text-lg mb-8">
          Explore our curated selection of adorable, healthy pets. From playful puppies to gentle cats, find the perfect match for your family with confidence.
        </Typography>
        <Box className="grid gap-4 sm:grid-cols-2">
          <Box className="rounded-[32px] bg-gradient-to-br from-purple-100 to-purple-50 p-7 shadow-sm border-2 border-purple-200 hover:shadow-md transition-shadow">
            <Typography variant="subtitle2" className="uppercase tracking-[0.24em] text-purple-700 font-black mb-3 text-sm">
              🔍 Explore
            </Typography>
            <Typography variant="h6" className="font-bold text-purple-950 text-lg">
              Browse all pets with confidence.
            </Typography>
          </Box>
          <Box className="rounded-[32px] bg-gradient-to-br from-orange-100 to-pink-50 p-7 shadow-sm border-2 border-orange-200 hover:shadow-md transition-shadow">
            <Typography variant="subtitle2" className="uppercase tracking-[0.24em] text-orange-700 font-black mb-3 text-sm">
              ♥ Discover
            </Typography>
            <Typography variant="h6" className="font-bold text-orange-950 text-lg">
              Save favorites and revisit later.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Search and Filters + Gallery */}
      <Box className="grid gap-8 xl:grid-cols-[450px_1fr] mb-12">
        {/* Sidebar - Search & Filters */}
        <Box className="rounded-[36px] border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-[0_30px_90px_-50px_rgba(147,51,234,0.18)]">
          <Typography variant="h6" className="font-black text-purple-950 mb-7 text-lg">
            🔍 Search & Filters
          </Typography>
          <SearchBar
            value={search}
            onChange={(value) => { setSearch(value); setPage(0); }}
            className="mb-7"
          />
          <FilterControls filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} />
        </Box>

        {/* Gallery Info */}
        <Box className="rounded-[36px] border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50 p-8 shadow-[0_30px_90px_-50px_rgba(234,88,12,0.18)]">
          <Typography variant="h6" className="font-black text-orange-950 mb-4 text-lg">
            🌟 Pet Gallery
          </Typography>
          <Typography variant="body2" className="text-orange-700 leading-relaxed text-base">
            Use the filters to refine your search by pet type, price range, and age. Our team carefully selects only the healthiest and happiest pets for our customers.
          </Typography>
        </Box>
      </Box>

      {/* Alerts */}
      {successMessage && (
        <Alert severity="success" className="mb-8 rounded-[28px] shadow-md border-2 border-emerald-200">
          <Typography className="font-semibold text-emerald-900">{successMessage}</Typography>
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="mb-8 rounded-[28px] shadow-md border-2 border-red-200">
          <Typography className="font-semibold text-red-900">{error}</Typography>
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <Box className="flex justify-center items-center py-32">
          <Box className="text-center">
            <CircularProgress size={60} className="mb-6" />
            <Typography className="text-purple-700 font-semibold text-lg">Loading adorable pets...</Typography>
          </Box>
        </Box>
      ) : pets.length === 0 ? (
        <Alert severity="info" className="rounded-[28px] shadow-md border-2 border-blue-200">
          <Typography className="font-semibold text-blue-900">No pets found. Try adjusting your filters or search term.</Typography>
        </Alert>
      ) : (
        <>
          {/* Pet Grid */}
          <Box className="mb-12">
            <Typography variant="h5" className="font-black text-purple-950 mb-8 text-2xl">
              ✨ Available Pets ({pets.length})
            </Typography>
            <Grid container spacing={5}>
              {pets.map((pet) => (
                <Grid key={pet.id} item xs={12} sm={6} md={4}>
                  <PetCard
                    pet={pet}
                    onViewDetails={() => navigate(`/pets/${pet.id}`)}
                    onAddToCart={() => handleAddToCart(pet.id)}
                    onAddToWishlist={() => handleAddToWishlist(pet.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <Box className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t-2 border-purple-200">
              <Button
                variant="outlined"
                disabled={page === 0}
                onClick={() => setPage((current) => Math.max(current - 1, 0))}
                className="rounded-full px-8 py-3 border-2 border-purple-600 text-purple-700 font-bold"
              >
                ← Previous
              </Button>
              <Box className="flex items-center gap-2">
                <Typography className="font-bold text-purple-700">
                  Page {page + 1} of {pagination.totalPages}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                disabled={!pagination.hasNext}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-full px-8 py-3 border-2 border-purple-600 text-purple-700 font-bold"
              >
                Next →
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

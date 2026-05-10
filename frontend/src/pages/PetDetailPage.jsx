import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardMedia, CardContent, Typography, Chip, Box, Button, CircularProgress, Alert } from '@mui/material';
import { fetchPetById, addToCart, addToWishlist } from '../services/petService';

export default function PetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchPetById(id)
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load pet details.');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(id);
      setSuccessMessage('Pet added to cart.');
    } catch (err) {
      setError(err.message || 'Unable to add pet to cart.');
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(id);
      setSuccessMessage('Pet added to wishlist.');
    } catch (err) {
      setError(err.message || 'Unable to add pet to wishlist.');
    }
  };

  return (
    <Container maxWidth="lg" className="py-16">
      <Button
        variant="text"
        onClick={() => navigate('/listing')}
        className="mb-6 text-purple-700 hover:text-purple-900 font-semibold"
      >
        ← Back to listings
      </Button>

      {loading ? (
        <Box className="flex justify-center items-center py-24">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" className="rounded-[24px] shadow-sm">
          {error}
        </Alert>
      ) : (
        <Card className="overflow-hidden rounded-[32px] border-4 border-purple-200 bg-white shadow-[0_35px_110px_-50px_rgba(147,51,234,0.18)]">
          <Box className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
            <Box className="relative overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
              <CardMedia
                component="img"
                image={pet.imageUrl || 'https://via.placeholder.com/900x560?text=Pet+Image'}
                alt={pet.name}
                className="h-full w-full object-cover"
              />
              <Box className="absolute left-6 top-6 rounded-full bg-orange-400 px-4 py-2 text-sm font-black text-white shadow-lg">
                {pet.type}
              </Box>
            </Box>

            <CardContent className="p-8 bg-gradient-to-br from-white to-pink-50">
              <Typography variant="h4" className="font-black text-purple-900 mb-4">
                {pet.name}
              </Typography>
              <Typography variant="body2" className="text-purple-700 mb-8 leading-7 text-lg">
                {pet.description || 'No additional description is available for this pet.'}
              </Typography>

              <Box className="rounded-[28px] bg-gradient-to-br from-purple-100 to-pink-100 p-6 mb-8 border-2 border-purple-200">
                <Typography variant="subtitle2" className="text-purple-700 uppercase tracking-[0.2em] mb-3 font-black">
                  Pet Details
                </Typography>
                <Box className="grid gap-3">
                  <Typography variant="body1" className="text-purple-900 font-semibold">
                    <span className="text-orange-600">Price:</span> <span className="text-orange-500 text-xl font-black">${pet.price?.toFixed(2)}</span>
                  </Typography>
                  <Typography variant="body1" className="text-purple-900 font-semibold">
                    <span className="text-purple-700">Age:</span> {pet.age} year{pet.age === 1 ? '' : 's'}
                  </Typography>
                  <Typography variant="body1" className="text-purple-900 font-semibold">
                    <span className="text-purple-700">Availability:</span>{' '}
                    <span className={pet.available ? 'text-emerald-700 font-black' : 'text-slate-500'}>
                      {pet.available ? '✓ Available' : '✗ Unavailable'}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Box className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddToCart}
                  disabled={!pet.available}
                  className="rounded-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold shadow-lg"
                >
                  Add to Cart
                </Button>
                <Button variant="outlined" size="large" onClick={handleAddToWishlist} className="rounded-full px-8 py-3 border-2 border-orange-400 text-orange-600 font-bold hover:bg-orange-50">
                  ♥ Add to Wishlist
                </Button>
              </Box>

              {successMessage && (
                <Alert severity="success" className="my-6 rounded-[24px] shadow-sm">
                  {successMessage}
                </Alert>
              )}
            </CardContent>
          </Box>
        </Card>
      )}
    </Container>
  );
}

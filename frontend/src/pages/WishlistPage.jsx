import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Box, CircularProgress, Alert } from '@mui/material';
import { fetchWishlist, removeFromWishlist } from '../services/petService';
import { useNavigate } from 'react-router-dom';

export default function WishlistPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWishlist = () => {
    setLoading(true);
    setError(null);
    fetchWishlist()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load wishlist.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (petId) => {
    try {
      await removeFromWishlist(petId);
      setItems((current) => current.filter((item) => item.id !== petId));
    } catch (err) {
      setError(err.message || 'Unable to remove item from wishlist.');
    }
  };

  return (
    <Container maxWidth="lg" className="py-16">
      <Box className="rounded-[36px] bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200 p-10 shadow-[0_35px_100px_-58px_rgba(147,51,234,0.16)] mb-10">
        <Typography variant="h3" className="font-black text-purple-900 mb-3 text-center">
          ♥ Wishlist
        </Typography>
        <Typography variant="body1" className="text-purple-700 text-center max-w-2xl mx-auto text-lg">
          Save pets for later and return to the ones that caught your eye.
        </Typography>
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center py-24">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" className="rounded-[24px] shadow-sm">
          {error}
        </Alert>
      ) : items.length === 0 ? (
        <Alert severity="info" className="rounded-[24px] shadow-sm">
          Your wishlist is empty. Add a pet from the listing page.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {items.map((pet) => (
            <Grid key={pet.id} item xs={12} sm={6} md={4}>
              <Card className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_90px_-48px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_105px_-45px_rgba(15,23,42,0.22)]">
                <CardMedia
                  component="img"
                  height="240"
                  image={pet.imageUrl || 'https://via.placeholder.com/400x220?text=Pet+Image'}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography variant="h6" className="font-semibold mb-2 text-slate-900">
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="mb-3 min-h-[54px]">
                    {pet.description || 'No description available.'}
                  </Typography>
                  <Typography variant="subtitle1" className="font-semibold text-slate-900">
                    ${pet.price?.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions className="flex flex-wrap gap-3 p-6 pt-0">
                  <Button variant="outlined" className="rounded-full px-5" onClick={() => navigate(`/pets/${pet.id}`)}>
                    Details
                  </Button>
                  <Button variant="contained" color="secondary" className="rounded-full px-5" onClick={() => handleRemove(pet.id)}>
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

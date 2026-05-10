import { Card, CardMedia, CardContent, CardActions, Typography, Chip, Box, Button } from '@mui/material';

export default function PetCard({ pet, onViewDetails, onAddToCart, onAddToWishlist }) {
  return (
    <Card className="overflow-hidden rounded-[32px] border-4 border-purple-300 bg-white shadow-[0_30px_90px_-35px_rgba(147,51,234,0.35)] transition-all duration-300 hover:shadow-[0_40px_120px_-40px_rgba(147,51,234,0.45)] hover:-translate-y-3">
      <Box className="relative overflow-hidden bg-gradient-to-br from-purple-200 to-pink-100">
        <CardMedia
          component="img"
          height="280"
          image={pet.imageUrl || 'https://via.placeholder.com/400x280?text=Pet'}
          alt={pet.name}
          className="object-cover h-280 w-full"
        />
        <Box className="absolute right-4 top-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-black uppercase tracking-wider text-white shadow-xl">
          {pet.type}
        </Box>
      </Box>

      <CardContent className="p-7">
        {/* Name and Description Section */}
        <Box className="mb-5">
          <Typography variant="h5" className="font-black text-purple-950 text-2xl leading-tight mb-2">
            {pet.name}
          </Typography>
          <Typography variant="body2" className="text-purple-700 text-sm leading-relaxed line-clamp-2">
            {pet.description || 'Adorable pet waiting for you'}
          </Typography>
        </Box>

        {/* Age and Availability Section */}
        <Box className="mb-6 flex items-center gap-3">
          {pet.age && (
            <Box className="flex items-center gap-2 bg-purple-100 rounded-full px-3 py-1.5">
              <Typography variant="caption" className="text-purple-900 font-bold text-xs">
                🎂
              </Typography>
              <Typography variant="caption" className="text-purple-900 font-bold text-xs">
                {pet.age} {pet.age === 1 ? 'year' : 'years'}
              </Typography>
            </Box>
          )}
          <Chip
            label={pet.available ? '✓ Available' : 'Unavailable'}
            className={`rounded-full font-black text-xs ${
              pet.available ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
            }`}
          />
        </Box>

        {/* Price Section */}
        <Box className="mb-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-[24px] p-4 border-2 border-orange-200">
          <Typography variant="caption" className="text-orange-700 font-bold uppercase text-xs tracking-wider">
            Starting Price
          </Typography>
          <Typography variant="h4" className="font-black text-orange-600 text-3xl">
            ${pet.price?.toFixed(2)}
          </Typography>
        </Box>

        {/* Actions */}
        <CardActions className="flex gap-3 p-0">
          <Button
            size="small"
            variant="outlined"
            onClick={onViewDetails}
            className="rounded-full flex-1 border-2 border-purple-600 text-purple-700 font-bold text-sm py-2 hover:bg-purple-100 transition-all"
          >
            View Details
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={onAddToCart}
            disabled={!pet.available}
            className="rounded-full flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-sm py-2 shadow-lg hover:shadow-xl transition-all"
          >
            Add to Cart
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={onAddToWishlist}
            className="rounded-full border-2 border-orange-400 text-orange-600 font-bold text-lg py-2 hover:bg-orange-100 transition-all"
          >
            ♥
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

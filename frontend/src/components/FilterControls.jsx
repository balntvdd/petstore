import { Button, ButtonGroup, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const types = ['all', 'dog', 'cat', 'bird', 'fish'];
const availabilityOptions = [
  { value: 'all', label: 'All' },
  { value: 'true', label: 'Available' },
  { value: 'false', label: 'Unavailable' },
];

export default function FilterControls({ filters, onChange, onReset }) {
  return (
    <Box className="rounded-[32px] border-3 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 p-7 shadow-lg">
      {/* Header */}
      <Box className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Box>
          <Typography variant="h6" className="font-black text-purple-950 text-lg">
            Filter Pets
          </Typography>
          <Typography variant="body2" className="text-purple-600 font-semibold text-sm">
            Find the perfect match
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={onReset} 
          className="rounded-full px-7 py-2.5 bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition-all"
        >
          Reset Filters
        </Button>
      </Box>

      {/* Pet Type Filter */}
      <Box className="mb-8">
        <Typography variant="caption" className="uppercase tracking-widest text-purple-700 font-black text-xs block mb-3">
          Pet Type
        </Typography>
        <Box className="rounded-[24px] bg-white p-2 shadow-md border border-purple-200">
          <ButtonGroup fullWidth variant="outlined" className="gap-2 flex-wrap">
            {types.map((type) => (
              <Button
                key={type}
                onClick={() => onChange({ ...filters, type })}
                variant={filters.type === type ? 'contained' : 'outlined'}
                className={`rounded-full px-4 py-2.5 font-bold text-sm transition-all ${
                  filters.type === type 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-purple-700 border-2 border-purple-300 hover:border-purple-500'
                }`}
              >
                {type === 'all' ? '🐾 All Pets' : `${type.charAt(0).toUpperCase()}${type.slice(1)}`}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>

      {/* Price Range */}
      <Box className="mb-8">
        <Typography variant="caption" className="uppercase tracking-widest text-purple-700 font-black text-xs block mb-3">
          Price Range
        </Typography>
        <Box className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Min Price"
            type="number"
            value={filters.minPrice}
            onChange={(event) => onChange({ ...filters, minPrice: event.target.value })}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="$"
            InputProps={{ className: 'rounded-[18px] bg-white font-semibold' }}
            InputLabelProps={{ className: 'font-semibold' }}
            className="shadow-sm"
          />
          <TextField
            label="Max Price"
            type="number"
            value={filters.maxPrice}
            onChange={(event) => onChange({ ...filters, maxPrice: event.target.value })}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="$"
            InputProps={{ className: 'rounded-[18px] bg-white font-semibold' }}
            InputLabelProps={{ className: 'font-semibold' }}
            className="shadow-sm"
          />
        </Box>
      </Box>

      {/* Age Range */}
      <Box className="mb-8">
        <Typography variant="caption" className="uppercase tracking-widest text-purple-700 font-black text-xs block mb-3">
          Age Range
        </Typography>
        <Box className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Min Age"
            type="number"
            value={filters.minAge}
            onChange={(event) => onChange({ ...filters, minAge: event.target.value })}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Years"
            InputProps={{ className: 'rounded-[18px] bg-white font-semibold' }}
            InputLabelProps={{ className: 'font-semibold' }}
            className="shadow-sm"
          />
          <TextField
            label="Max Age"
            type="number"
            value={filters.maxAge}
            onChange={(event) => onChange({ ...filters, maxAge: event.target.value })}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Years"
            InputProps={{ className: 'rounded-[18px] bg-white font-semibold' }}
            InputLabelProps={{ className: 'font-semibold' }}
            className="shadow-sm"
          />
        </Box>
      </Box>

      {/* Availability */}
      <Box>
        <Typography variant="caption" className="uppercase tracking-widest text-purple-700 font-black text-xs block mb-3">
          Availability
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="availability-label" className="font-semibold">Select Status</InputLabel>
          <Select
            labelId="availability-label"
            value={filters.availability}
            label="Select Status"
            onChange={(event) => onChange({ ...filters, availability: event.target.value })}
            className="rounded-[18px] bg-white font-semibold shadow-sm"
          >
            {availabilityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value} className="font-semibold">
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

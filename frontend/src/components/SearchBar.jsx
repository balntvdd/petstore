import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ value, onChange, className }) {
  return (
    <Box className={className}>
      <TextField
        fullWidth
        label="🔍 Search Pets"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, type, or description..."
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-orange-500 text-xl" />
            </InputAdornment>
          ),
          className: 'rounded-[24px] bg-white shadow-lg text-base font-medium',
        }}
        InputLabelProps={{
          className: 'font-bold text-purple-700',
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
            backgroundColor: '#fff',
            boxShadow: '0 12px 40px rgba(147, 51, 234, 0.12)',
            border: '2px solid transparent',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 16px 50px rgba(147, 51, 234, 0.18)',
              borderColor: 'rgba(147, 51, 234, 0.3)',
            },
            '&.Mui-focused': {
              boxShadow: '0 20px 60px rgba(147, 51, 234, 0.25)',
              borderColor: 'rgba(147, 51, 234, 0.5)',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(147, 51, 234, 0.2)',
          },
        }}
      />
    </Box>
  );
}

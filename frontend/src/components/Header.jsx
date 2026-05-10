import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Browse Pets', path: '/listing', icon: '🐾' },
  { label: 'Cart', path: '/cart', icon: '🛒' },
  { label: 'Wishlist', path: '/wishlist', icon: '♥' },
];

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #7c3aed 0%, #5b21b6 50%, #3b0764 100%)',
        borderBottom: '4px solid #fb923c',
        boxShadow: '0 18px 50px rgba(79, 70, 229, 0.24)',
        backdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            py: 3,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 900,
                  color: 'common.white',
                  letterSpacing: '-0.04em',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                }}
              >
                🐾 PetStore
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#fed7aa',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                }}
              >
                Premium Pets
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.82)', fontWeight: 500, letterSpacing: '0.01em' }}
            >
              Curated companions with premium care.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.25,
              alignItems: 'center',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '999px',
              p: '6px',
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.path === '/listing'}
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-full bg-white px-5 py-2 text-purple-700 font-bold shadow-lg hover:bg-white/95 transition-all duration-200'
                    : 'rounded-full px-5 py-2 text-white font-semibold hover:bg-white/15 hover:text-orange-100 transition-all duration-200'
                }
                size="small"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

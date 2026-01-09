'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Rating,
  Paper,
  InputAdornment,
  Tooltip,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite,
  FavoriteBorder,
  Brightness4,
  Brightness7,
  ArrowBack,
  Error as ErrorIcon
} from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import ProductDetails from './ProductDetails';

// ==================== TYPES ====================
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type ViewMode = 'list' | 'details';

interface AppState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  favorites: number[];
  showFavoritesOnly: boolean;
  selectedProduct: Product | null;
  viewMode: ViewMode;
  darkMode: boolean;
}

// ==================== PRODUCT CARD COMPONENT ====================
interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onView: (product: Product) => void;
}


interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  showFavoritesOnly: boolean;
  favorites: number[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onToggleFavorites: () => void;
  onToggleFavorite: (id: number) => void;
  onViewProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  searchTerm,
  selectedCategory,
  categories,
  showFavoritesOnly,
  favorites,
  onSearchChange,
  onCategoryChange,
  onToggleFavorites,
  onToggleFavorite,
  onViewProduct,
}) => {
  return (
    <>
      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        {/* Search */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Category Filter and Favorites Toggle */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem
                  key={cat}
                  value={cat}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant={showFavoritesOnly ? 'contained' : 'outlined'}
            color={showFavoritesOnly ? 'secondary' : 'primary'}
            onClick={onToggleFavorites}
            startIcon={showFavoritesOnly ? <Favorite /> : <FavoriteBorder />}
            sx={{ height: '56px' }}
          >
            {showFavoritesOnly ? 'Show All' : 'Favorites'}
          </Button>
        </Box>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 3 }}>
          <Typography variant="h6">Error Loading Products</Typography>
          {error}
        </Alert>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
            </Paper>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: '1fr 1fr 1fr',
                    lg: '1fr 1fr 1fr 1fr',
                  },
                  gap: 3,
                }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                    onView={onViewProduct}
                  />
                ))}
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

// ==================== MAIN APP COMPONENT ====================
const ProductExplorer: React.FC = () => {
  const [state, setState] = useState<AppState>({
    products: [],
    loading: true,
    error: null,
    searchTerm: '',
    selectedCategory: 'All',
    favorites: [],
    showFavoritesOnly: false,
    selectedProduct: null,
    viewMode: 'list',
    darkMode: false,
  });

  // Create MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.darkMode ? 'dark' : 'light',
          primary: {
            main: '#2196f3',
          },
          secondary: {
            main: '#f50057',
          },
        },
      }),
    [state.darkMode]
  );

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: Product[] = await response.json();
        setState((prev) => ({ ...prev, products: data, loading: false }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'An error occurred',
        }));
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(state.products.map((p) => p.category))];
    return cats;
  }, [state.products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = state.products;

    if (state.searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === state.selectedCategory);
    }

    if (state.showFavoritesOnly) {
      filtered = filtered.filter((p) => state.favorites.includes(p.id));
    }

    return filtered;
  }, [
    state.products,
    state.searchTerm,
    state.selectedCategory,
    state.showFavoritesOnly,
    state.favorites,
  ]);

  // Handlers
  const toggleFavorite = (productId: number) => {
    setState((prev) => {
      const newFavorites = prev.favorites.includes(productId)
        ? prev.favorites.filter((id) => id !== productId)
        : [...prev.favorites, productId];
      return { ...prev, favorites: newFavorites };
    });
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const viewProduct = (product: Product) => {
    setState((prev) => ({
      ...prev,
      selectedProduct: product,
      viewMode: 'details',
    }));
  };

  const goBack = () => {
    setState((prev) => ({ ...prev, viewMode: 'list', selectedProduct: null }));
  };

  const handleSearchChange = (value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleCategoryChange = (value: string) => {
    setState((prev) => ({ ...prev, selectedCategory: value }));
  };

  const handleToggleFavorites = () => {
    setState((prev) => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        {/* Header */}
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <Typography
              variant="h5"
              component="h1"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              Product Explorer
            </Typography>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {state.darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {state.viewMode === 'list' ? (
            <ProductList
              products={filteredProducts}
              loading={state.loading}
              error={state.error}
              searchTerm={state.searchTerm}
              selectedCategory={state.selectedCategory}
              categories={categories}
              showFavoritesOnly={state.showFavoritesOnly}
              favorites={state.favorites}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onToggleFavorites={handleToggleFavorites}
              onToggleFavorite={toggleFavorite}
              onViewProduct={viewProduct}
            />
          ) : (
            state.selectedProduct && (
              <ProductDetails
                product={state.selectedProduct}
                isFavorite={state.favorites.includes(state.selectedProduct.id)}
                onToggleFavorite={toggleFavorite}
                onBack={goBack}
              />
            )
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ProductExplorer;
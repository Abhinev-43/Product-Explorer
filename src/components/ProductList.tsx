import React from "react";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
} from "@mui/material";

import {
  Search as SearchIcon,
  Favorite,
  FavoriteBorder,
  Error as ErrorIcon,
} from "@mui/icons-material";
import ProductCard from "./ProductCard";

// Types 
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
}) => {
  return (
    <>
      {/* Filterss */}
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

        {/* Category Filter and Favorites */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
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
                  sx={{ textTransform: "capitalize" }}
                >
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant={showFavoritesOnly ? "contained" : "outlined"}
            color={showFavoritesOnly ? "secondary" : "primary"}
            onClick={onToggleFavorites}
            startIcon={showFavoritesOnly ? <Favorite /> : <FavoriteBorder />}
            sx={{ height: "56px" }}
          >
            {showFavoritesOnly ? "Show All" : "Favorites"}
          </Button>
        </Box>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
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

      {/* Product Gridx */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
            </Paper>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Showing {products.length} product
                {products.length !== 1 ? "s" : ""}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr",
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

export default ProductList;
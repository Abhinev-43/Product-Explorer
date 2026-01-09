"use client";

import { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";

// TYPES
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

type ViewMode = "list" | "details";

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

const Page: React.FC = () => {
  const [state, setState] = useState<AppState>({
    products: [],
    loading: true,
    error: null,
    searchTerm: "",
    selectedCategory: "All",
    favorites: [],
    showFavoritesOnly: false,
    selectedProduct: null,
    viewMode: "list",
    darkMode: false,
  });

  // Create MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.darkMode ? "dark" : "light",
          primary: {
            main: "#2196f3",
          },
          secondary: {
            main: "#f50057",
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
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setState((prev) => ({ ...prev, products: data, loading: false }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "An error occurred",
        }));
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(state.products.map((p) => p.category))];
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

    if (state.selectedCategory !== "All") {
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
      viewMode: "details",
    }));
  };

  const goBack = () => {
    setState((prev) => ({ ...prev, viewMode: "list", selectedProduct: null }));
  };

  const handleSearchChange = (value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleCategoryChange = (value: string) => {
    setState((prev) => ({ ...prev, selectedCategory: value }));
  };

  const handleToggleFavorites = () => {
    setState((prev) => ({
      ...prev,
      showFavoritesOnly: !prev.showFavoritesOnly,
    }));
  };


  console.log(state?.products , "productssss");
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        {/* Header */}
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <Typography
              variant="h5"
              component="h1"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Product Explorer
            </Typography>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {state.darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {state.viewMode === "list" ? (
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

export default Page;

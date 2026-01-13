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
import ProductList from "@/components/ProductList";

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

interface AppState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  favorites: number[];
  showFavoritesOnly: boolean;
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
    darkMode:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("darkMode") || "false")
        : false,
  });

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

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();

        setState((prev) => ({
          ...prev,
          products: data,
          loading: false,
        }));
      } catch (err) {
        if (err instanceof DOMException) return;

        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            err instanceof Error
              ? err.message
              : "Something went wrong while fetching products",
        }));
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  const categories = useMemo(() => {
    return ["All", ...new Set(state.products.map((p) => p.category))];
  }, [state.products]);

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

  const toggleFavorite = (productId: number) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(productId)
        ? prev.favorites.filter((id) => id !== productId)
        : [...prev.favorites, productId],
    }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        {/* HEADER */}
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

        {/* CONTENT */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
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
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Page;

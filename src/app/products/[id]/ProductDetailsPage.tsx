"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
  Rating,
  Paper,
  Tooltip,
  CircularProgress,
  Alert,
  Container,
  AppBar,
  Toolbar,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ArrowBack,
  Brightness4,
  Brightness7,
  Error as ErrorIcon,
} from "@mui/icons-material";

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

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const goBack = () => {
    router.push("/");
  };

  // Loading state
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Alert severity="error" icon={<ErrorIcon />}>
            <Typography variant="h6">Error Loading Product</Typography>
            {error || "Product not found"}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={goBack}
            sx={{ mt: 3 }}
          >
            Back to Products
          </Button>
        </Container>
      </ThemeProvider>
    );
  }

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
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={goBack}
            sx={{ mb: 3 }}
          >
            Back to Products
          </Button>

          <Paper elevation={3} sx={{ overflow: "hidden" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              }}
            >
              {/* Image Section */}
              <Box>
                <Box
                  sx={{
                    bgcolor: "white",
                    p: 4,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: { xs: "300px", lg: "500px" },
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>

              {/* Details Section */}
              <Box>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={product.category}
                      sx={{ textTransform: "capitalize" }}
                    />
                    <Tooltip
                      title={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <IconButton
                        onClick={toggleFavorite}
                        color={isFavorite ? "error" : "default"}
                      >
                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                  >
                    ₹{product.price}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                      Description
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      {product.description}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      pt: 3,
                      borderTop: 1,
                      borderColor: "divider",
                      mt: "auto",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Rating:
                    </Typography>
                    <Rating
                      value={product.rating.rate}
                      precision={0.1}
                      readOnly
                    />
                    <Typography variant="body2" fontWeight="600">
                      {product.rating.rate} / 5
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({product.rating.count} reviews)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetailsPage;
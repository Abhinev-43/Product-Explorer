import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
  Rating,
  Paper,
  Tooltip,
} from "@mui/material";
import { Favorite, FavoriteBorder, ArrowBack } from "@mui/icons-material";

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

interface ProductDetailsProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onBack,
}) => {
  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={onBack}
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
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <IconButton
                    onClick={() => onToggleFavorite(product.id)}
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
                <Typography variant="body1" color="text.secondary" paragraph>
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
                <Rating value={product.rating.rate} precision={0.1} readOnly />
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
    </Box>
  );
};

export default ProductDetails;

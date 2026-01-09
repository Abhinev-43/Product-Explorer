import React from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  Box,
  Rating,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

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

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
}) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "white",
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain",
            maxHeight: "200px",
            maxWidth: "100%",
          }}
        />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.paper" },
          }}
        >
          {isFavorite ? (
            <Favorite color="error" fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          pb: 1,
        }}
      >
        <Chip
          label={product.category}
          size="small"
          sx={{ mb: 1.5, textTransform: "capitalize", width: "fit-content" }}
        />

        <Typography
          variant="subtitle1"
          component="h3"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3em",
            lineHeight: 1.5,
            fontWeight: 500,
            mb: 1,
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ mt: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          <Rating
            value={product.rating.rate}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="caption" color="text.secondary">
            ({product.rating.count})
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          justifyContent: "space-between",
          px: 2,
          pb: 2,
          pt: 0,
        }}
      >
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{product.price}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
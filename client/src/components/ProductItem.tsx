import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
} from "@mui/material";
import { Product } from "../interfaces/Product";

interface ProductItemProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onViewComments: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onDelete,
  onEdit,
  onViewComments,
}) => {
  return (
    <Card className="card-item">
      <CardMedia
        component="img"
        height="240"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Count: {product.count}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Size: {product.size.width}x{product.size.height}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Weight: {product.weight}
        </Typography>
      </CardContent>
      <CardActions>
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(product._id!)}>Delete</button>
        <button onClick={onViewComments}>Comments</button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;

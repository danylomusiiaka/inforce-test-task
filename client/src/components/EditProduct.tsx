import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Product } from "../interfaces/Product";

interface EditProductProps {
  open: boolean;
  onClose: () => void;
  onEdit: (product: Product) => void;
  product: Product | null;
}

const EditProduct: React.FC<EditProductProps> = ({
  open,
  onClose,
  onEdit,
  product,
}) => {
  const [editedProduct, setEditedProduct] = React.useState<Product | null>(
    product
  );

  React.useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleEditProduct = () => {
    if (
      editedProduct &&
      editedProduct.imageUrl &&
      editedProduct.name &&
      editedProduct.count > 0 &&
      editedProduct.size.width > 0 &&
      editedProduct.size.height > 0 &&
      editedProduct.weight
    ) {
      onEdit(editedProduct);
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box" sx={{ p: 4, bgcolor: "background.paper" }}>
        <h2>Edit Product</h2>
        {editedProduct && (
          <>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              margin="normal"
              value={editedProduct.imageUrl}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, imageUrl: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              margin="normal"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              type="number"
              label="Product Count"
              variant="outlined"
              margin="normal"
              value={editedProduct.count || ""}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  count: e.target.value ? +e.target.value : 0,
                })
              }
            />
            <TextField
              fullWidth
              type="number"
              label="Size Width"
              variant="outlined"
              margin="normal"
              value={editedProduct.size.width || ""}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  size: {
                    ...editedProduct.size,
                    width: e.target.value ? +e.target.value : 0,
                  },
                })
              }
            />
            <TextField
              fullWidth
              type="number"
              label="Size Height"
              variant="outlined"
              margin="normal"
              value={editedProduct.size.height || ""}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  size: {
                    ...editedProduct.size,
                    height: e.target.value ? +e.target.value : 0,
                  },
                })
              }
            />
            <TextField
              fullWidth
              label="Weight"
              variant="outlined"
              margin="normal"
              value={editedProduct.weight}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, weight: e.target.value })
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditProduct}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EditProduct;

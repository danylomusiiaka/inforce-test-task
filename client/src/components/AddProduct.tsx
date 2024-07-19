import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Product } from "../interfaces/Product";

interface AddProductProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ open, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = React.useState<Product>({
    imageUrl: "",
    name: "",
    count: 0,
    size: { width: 0, height: 0 },
    weight: "",
  });

  const handleAddProduct = () => {
    if (
      newProduct.imageUrl &&
      newProduct.name &&
      newProduct.count > 0 &&
      newProduct.size.width > 0 &&
      newProduct.size.height > 0 &&
      newProduct.weight
    ) {
      onAdd(newProduct);
      setNewProduct({
        imageUrl: "",
        name: "",
        count: 0,
        size: { width: 0, height: 0 },
        weight: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box" sx={{ p: 4, bgcolor: "background.paper" }}>
        <h2>Add Product</h2>
        <TextField
          fullWidth
          label="Image URL"
          variant="outlined"
          margin="normal"
          value={newProduct.imageUrl}
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageUrl: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Product Name"
          variant="outlined"
          margin="normal"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <TextField
          fullWidth
          type="number"
          label="Product Count"
          variant="outlined"
          margin="normal"
          value={newProduct.count || ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
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
          value={newProduct.size.width || ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              size: {
                ...newProduct.size,
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
          value={newProduct.size.height || ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              size: {
                ...newProduct.size,
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
          value={newProduct.weight}
          onChange={(e) =>
            setNewProduct({ ...newProduct, weight: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          sx={{ mt: 2 }}
        >
          Add
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProduct;

import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Product } from "../interfaces/Product";

interface AddProductProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

const AddProduct: React.FC<AddProductProps> = ({open,onClose,onAdd,}) => {
  const [newProduct, setNewProduct] = React.useState<Product>({
    name: "",
    count: 0,
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.count > 0) {
      onAdd(newProduct);
      setNewProduct({ name: "", count: 0 });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Product Count"
          value={newProduct.count}
          onChange={(e) =>
            setNewProduct({ ...newProduct, count: +e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </Box>
    </Modal>
  );
};

export default AddProduct;

import React, { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../services/productService";
import { Product } from "../interfaces/Product";
import ProductItem from "./ProductItem";
import AddProductModal from "./AddProduct";
import DeleteProductModal from "./DeleteProduct";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("name");
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [sortOption]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(sortProducts(data, sortOption));
  };

  const sortProducts = (products: Product[], option: string): Product[] => {
    return [...products].sort((a, b) => {
      if (option === "name") {
        return a.name.localeCompare(b.name);
      } else if (option === "count") {
        return b.count - a.count;
      }
      return 0;
    });
  };

  const handleAddProduct = async (product: Product) => {
    const addedProduct = await addProduct(product);
    const newProducts = [...products, addedProduct];
    setProducts(sortProducts(newProducts, sortOption));
    setOpenAddProduct(false);
  };

  const handleDeleteProduct = async () => {
    if (deleteProductId) {
      await deleteProduct(deleteProductId);
      const newProducts = products.filter(
        (product) => product._id !== deleteProductId
      );
      setProducts(sortProducts(newProducts, sortOption));
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value as string);
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setOpenAddProduct(true)} className="add-btn">
        Add Product
      </button>
      <FormControl variant="outlined" className="sort-options">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOption} onChange={handleSortChange} label="Sort By">
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="count">Count</MenuItem>
        </Select>
      </FormControl>

      <div className="products">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            onDelete={(id: string) => {
              setDeleteProductId(id);
              setShowDeleteModal(true);
            }}
          />
        ))}
      </div>

      <AddProductModal
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
        onAdd={handleAddProduct}
      />

      <DeleteProductModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductList;

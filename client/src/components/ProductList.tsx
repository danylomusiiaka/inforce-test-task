import React, { useState, useEffect } from "react";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../services/productService";
import { Product } from "../interfaces/Product";
import ProductItem from "./ProductItem";
import AddProductModal from "./AddProduct";
import DeleteProductModal from "./DeleteProduct";
import EditProductModal from "./EditProduct";
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("name");

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

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
    setShowAddModal(false);
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

  const handleEditProduct = async (updatedProduct: Product) => {
    const editedProduct = await updateProduct(updatedProduct);
    const newProducts = products.map((product) =>
      product._id === editedProduct._id ? editedProduct : product
    );
    setProducts(sortProducts(newProducts, sortOption));
    setShowEditModal(false);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value as string);
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setShowAddModal(true)} className="add-btn">
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
            onEdit={() => {
              setEditProduct(product);
              setShowEditModal(true);
            }}
          />
        ))}
      </div>

      <AddProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
      />

      <DeleteProductModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteProduct}
      />

      <EditProductModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onEdit={handleEditProduct}
        product={editProduct}
      />
    </div>
  );
};

export default ProductList;

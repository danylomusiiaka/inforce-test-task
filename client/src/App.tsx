import React, { useState, useEffect } from "react";
import {getProducts,addProduct,deleteProduct} from "./services/productService";
import { Product } from "./interfaces/Product";
import ProductItem from "./components/ProductItem";
import AddProductModal from "./components/AddProduct";
import DeleteProductModal from "./components/DeleteProduct";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("name");

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(sortProducts(data, sortOption));
  };

  const sortProducts = (products: Product[], option: string): Product[] => {
    return products.sort((a, b) => {
      if (option === "name") {
        return a.name.localeCompare(b.name);
      } else if (option === "count") {
        return a.count - b.count;
      }
      return 0;
    });
  };

  const handleAddProduct = async (product: Product) => {
    const addedProduct = await addProduct(product);
    setProducts([...products, addedProduct]);
    setOpenAddProduct(false);
  };

  const handleDeleteProduct = async () => {
    if (deleteProductId) {
      await deleteProduct(deleteProductId);
      setProducts(
        products.filter((product) => product._id !== deleteProductId)
      );
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setOpenAddProduct(true)}>Add Product</button>
      <ul>
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
      </ul>

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

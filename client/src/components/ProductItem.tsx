import React from "react";

interface ProductItemProps {
  product: { _id?: string; name: string; count: number };
  onDelete: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  return (
    <li>
      {product.name} - {product.count}
      <button onClick={() => onDelete(product._id!)}>Delete</button>
    </li>
  );
};

export default ProductItem;

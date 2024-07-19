import axios from "axios";
import { Product } from "../interfaces/Product";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

import axios from "axios";
import { Comment } from "../interfaces/Comment"; 

const API_URL = import.meta.env.VITE_API_URL;

export const addComment = async (comment: Comment): Promise<Comment> => {
  const response = await axios.post(`${API_URL}/comments`, comment);
  return response.data;
};
export const getComments = async (productId: string): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/products/${productId}/comments`);
  return response.data;
};
export const updateComment = async (comment: Comment): Promise<Comment> => {
  const response = await axios.put(`${API_URL}/comments/${comment._id}`,comment);
  return response.data;
};
export const deleteComment = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/comments/${id}`);
};

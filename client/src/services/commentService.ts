import axios from "axios";
import { Comment } from "../interfaces/Comment";

const API_URL = import.meta.env.VITE_API_URL + '/comments';

export const addComment = async (comment: Comment): Promise<Comment> => {
  const response = await axios.post(`${API_URL}`, comment);
  return response.data;
};

export const getComments = async (): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const deleteComment = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

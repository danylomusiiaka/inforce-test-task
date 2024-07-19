import { Comment } from "./Comment";

export interface Product {
  _id?: string;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments?: Comment[];
}

export interface Size {
  width: number;
  height: number;
}
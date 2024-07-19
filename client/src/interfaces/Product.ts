export interface Size {
  width: number;
  height: number;
}

export interface Product {
  _id?: string;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
}

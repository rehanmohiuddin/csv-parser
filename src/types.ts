export interface ProductProp {
  [key: string]: {
    [key: string]: {
      _id: string;
      name: string;
      batch: string;
      stock: string;
      deal: string;
      free: string;
      mrp: string;
      rate: string;
      exp: string;
    };
  };
}

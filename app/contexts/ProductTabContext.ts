import React from "react";

export const ProductContext = React.createContext<ProductContextType>({
  title: "",
  setTitle: () => {},
  price: "",
  setPrice: () => {},
  description: "",
  setDescription: () => {},
  location: "",
  setLocation: () => {},
  condition: "",
  setCondition: () => {},
  brand: "",
  setBrand: () => {},
  categ: "",
  setCateg: () => {},
  subCateg: "",
  setSubCateg: () => {},
  productImage: "",
  setProductImage: () => {},
});

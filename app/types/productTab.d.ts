type TabHeaderProps = {
  title: string;
  cancel: boolean;
  back: boolean;
  onCancel?: () => void;
  onBack?: () => void;
};

type ProductContextType = {
  title: string;
  setTitle: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  condition: string;
  setCondition: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  categ: string;
  setCateg: (value: string) => void;
  subCateg: string;
  setSubCateg: (value: string) => void;
  productImage: string;
  setProductImage: (value: string) => void;
};

type CategoriesErrors = {
  brandError?: string;
  categoriesError?: string;
  subCategoriesError?: string;
};

type DetailsErrors = {
  titleError?: string;
  priceError?: string;
  descError?: string;
  locationError?: string;
  conditionError?: string;
};

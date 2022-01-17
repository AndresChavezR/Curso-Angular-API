export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}
//Omit para omita esos atributos
export interface CreateProductDTO extends Omit<Product, 'id'| 'category'> {
  categoryId: number;
}
//Partial es para que todos los atributo sean opcionales ::::: opcional es //! atributo?: "valor"
export interface UpdateProductDTO extends Partial<CreateProductDTO> {
}
export interface Category{
  id: string;
  name: string;
}
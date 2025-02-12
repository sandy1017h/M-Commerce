export interface MyProduct {
    id?: number;
    name: string;
    description: string;
    originalPrice: number;
    discountPercentage?: number;
    discountAmount?: number;
    stockQuantity: number;
    categoryId: number;
    brandId: number;
    thumbnail?: File;
  }
  
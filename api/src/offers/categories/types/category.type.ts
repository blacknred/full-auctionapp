export type CategorySpecifications = Record<string, string | number | boolean>;

export type Category = {
  id: number;
  name: string;
  specifications: CategorySpecifications;
  categoryId?: number;
};

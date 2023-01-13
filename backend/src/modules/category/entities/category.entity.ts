export class Category {
  id?: number;
  name: string;
  user_id?: number;
  description: string;
  PhotoCategory?: Array<PhotoCategory>;
}

interface PhotoCategory {
  filename: string;
  url: string;
}

export class AllCategories {
  categories: Category[];
  count: number;
}

export class Category {
  id?: number;
  name: string;
  user_id?: number;
  PhotoCategory?: Array<PhotoCategory>;
}

interface PhotoCategory {
  filename: string;
  url: string;
}

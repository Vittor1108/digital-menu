export interface ICategoriesForm {
  name: string;
  description: string;
  photo: string;
}

export interface ICategoriesCreate {
  id: number;
  user_id: number;
  name: string;
  description: string;
  updeated_at: Date;
  created_at: Date;
}

export interface IGetAllCategories {
  id: number;
  name: string;
  description: string;
  PhotoCategory: IPhotoCategory[];
}

interface IPhotoCategory {
  filename: string;
  url: string;
}
